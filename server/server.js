const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- AWS RDS PostgreSQL Client (Pool) ---
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test Database Connection & Ensure Tables Exist
pool.connect(async (err, client, release) => {
  if (err) {
    return console.error('❌ Error acquiring client', err.stack);
  }
  console.log('✅ Connected to AWS RDS PostgreSQL');
  
  try {
    // 1. Create table if missing
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100),
          price VARCHAR(100),
          location VARCHAR(255),
          provider VARCHAR(255),
          image_url TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. SELF-HEAL: Ensure columns are correct even if table already existed
    await client.query(`
      DO $$ 
      BEGIN 
        BEGIN
          ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url TEXT;
        EXCEPTION WHEN others THEN RAISE NOTICE 'image_url column exists';
        END;
        
        ALTER TABLE services ALTER COLUMN price TYPE VARCHAR(100);
      END $$;
    `);
    
    console.log('✅ Database schema verified and updated (Price is now VARCHAR)');
  } catch (error) {
    console.error('❌ Error during database initialization:', error);
  }
  
  release();
});

// --- AWS S3 Client ---
const s3Config = {
  region: process.env.AWS_REGION || 'ap-south-1'
};

// Use manual credentials ONLY if they exist (for local development)
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  s3Config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };
}

const s3 = new S3Client(s3Config);

// --- Multer for Image Handling ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- API Routes ---

// 1. Add Service (POST /api/services)
app.post('/api/services', upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, location, provider } = req.body;
    let imageUrl = 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=500&auto=format&fit=crop';

    // S3 Image Upload (Optional)
    const rawBucketName = process.env.S3_BUCKET_NAME;
    if (req.file && rawBucketName && rawBucketName.trim().length > 0) {
      try {
        const bucketName = rawBucketName.trim();
        const region = process.env.AWS_REGION || 'ap-south-1';
        const fileName = `services/${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
        
        console.log(`[S3] 🚀 Starting upload: ${fileName} to ${bucketName}`);
        
        const parallelUploads3 = new Upload({
          client: s3,
          params: {
            Bucket: bucketName,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
          },
        });

        await parallelUploads3.done();
        imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
        console.log(`[S3] ✅ Upload successful! URL: ${imageUrl}`);
      } catch (s3Error) {
        console.error("❌ [S3 ERROR] Upload failed:", s3Error.message);
        console.log("[S3] Falling back to default image to save the listing...");
        // imageUrl remains the default set at the top
      }
    } else if (req.file) {
      console.warn("[S3] Skipping upload: S3_BUCKET_NAME is not configured in .env");
    }

    // Insert into RDS PostgreSQL
    console.log(`[RDS] 💾 Saving listing: ${name}...`);
    const query = `
      INSERT INTO services (name, category, price, location, provider, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [name, category, price, location, provider, imageUrl];
    const result = await pool.query(query, values);
    
    console.log(`[RDS] ✅ Service saved successfully! ID: ${result.rows[0].id}`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ [BACKEND CRASH] Fatal error:', err);
    res.status(500).json({ 
      error: 'Backend failure during listing creation', 
      message: err.message 
    });
  }
});

// 2. Get All Services (GET /api/services)
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Failed to fetch services from RDS' });
  }
});

// 3. Search Services (GET /api/services/search)
app.get('/api/services/search', async (req, res) => {
  const { q } = req.query;
  try {
    const query = `
      SELECT * FROM services 
      WHERE name ILIKE $1 OR category ILIKE $1 OR location ILIKE $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [`%${q}%`]);
    res.json(result.rows);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Failed to search services in RDS' });
  }
});

app.listen(port, () => {
  console.log(`🚀 LYS Backend running with AWS RDS at http://localhost:${port}`);
});

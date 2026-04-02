const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- AWS S3 Client ---
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// --- Multer for Image Handling ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- RDS Database Client ---
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false } // Required for AWS RDS connections
});

// --- Feature 1: Add Service API (POST /api/services) ---
app.post('/api/services', upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, location, provider } = req.body;
    let imageUrl = 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=500&auto=format&fit=crop';

    // Image Upload to S3 (Feature 4)
    if (req.file) {
      const fileName = `services/${Date.now()}_${req.file.originalname}`;
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      };

      const parallelUploads3 = new Upload({
        client: s3,
        params: uploadParams,
      });

      await parallelUploads3.done();
      imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    // Save to RDS (Feature 1)
    const result = await pool.query(
      'INSERT INTO services (name, category, price, location, provider, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, category, price, location, provider, imageUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add service' });
  }
});

// --- Feature 2: Get Services API (GET /api/services) ---
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// --- Feature 3: Search Services API (GET /api/services/search) ---
app.get('/api/services/search', async (req, res) => {
  try {
    const { q } = req.query;
    const result = await pool.query(
      'SELECT * FROM services WHERE name ILIKE $1 OR category ILIKE $1 OR location ILIKE $1',
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// --- Health Check ---
app.get('/health', (req, res) => {
  res.json({ status: 'Platform operational' });
});

app.listen(port, () => {
  console.log(`LYS Backend running at http://localhost:${port}`);
});

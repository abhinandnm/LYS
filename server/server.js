const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'services.json');

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Initial Data Load ---
if (!fs.existsSync(DATA_FILE)) {
  const initialData = [
    { id: 1, name: 'Sharma Electrical Solutions', category: 'Electrician', price: '₹499/hr', location: 'Mumbai, MH', provider: 'Rahul Sharma', rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500&auto=format&fit=crop' },
    { id: 2, name: 'Vedic Math & Science Tutors', category: 'Tutor', price: '₹800/hr', location: 'Bengaluru, KA', provider: 'Anjali Gupta', rating: 5.0, reviews: 45, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop' }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

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

// --- Feature 1 & 4: Add Service API (POST /api/services) ---
app.post('/api/services', upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, location, provider } = req.body;
    let imageUrl = 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=500&auto=format&fit=crop';

    // S3 Upload (If credentials provided)
    if (req.file && process.env.S3_BUCKET_NAME) {
      try {
        const fileName = `services/${Date.now()}_${req.file.originalname}`;
        const parallelUploads3 = new Upload({
          client: s3,
          params: {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
          },
        });
        await parallelUploads3.done();
        imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      } catch (s3Error) {
        console.warn("S3 Upload failed, using default image. Check .env!");
      }
    }

    const services = JSON.parse(fs.readFileSync(DATA_FILE));
    const newService = {
      id: Date.now(),
      name, category, price, location, provider,
      image: imageUrl,
      rating: 5.0,
      reviews: 0,
      created_at: new Date().toISOString()
    };

    services.unshift(newService);
    fs.writeFileSync(DATA_FILE, JSON.stringify(services, null, 2));

    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add service locally' });
  }
});

// --- Feature 2: Get Services API (GET /api/services) ---
app.get('/api/services', (req, res) => {
  const services = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(services);
});

// --- Feature 3: Search Services API (GET /api/services/search) ---
app.get('/api/services/search', (req, res) => {
  const { q } = req.query;
  const services = JSON.parse(fs.readFileSync(DATA_FILE));
  const filtered = services.filter(s => 
    s.name.toLowerCase().includes(q.toLowerCase()) || 
    s.category.toLowerCase().includes(q.toLowerCase()) ||
    s.location.toLowerCase().includes(q.toLowerCase())
  );
  res.json(filtered);
});

app.listen(port, () => {
  console.log(`LYS Backend running with JSON persistence at http://localhost:${port}`);
});

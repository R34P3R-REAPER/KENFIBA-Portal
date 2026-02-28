const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// --- 1. DATABASE CONNECTION ---
const mongoURI = process.env.MONGO_URI;

// Enhanced Options for Sharded Replica Sets
const mongooseOptions = {
  serverSelectionTimeoutMS: 10000, // Wait 10s before failing
  socketTimeoutMS: 45000,         // Close sockets after 45s
  family: 4                       // Force IPv4 (important for Render)
};

mongoose.connect(mongoURI, mongooseOptions)
  .then(() => console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED'))
  .catch(err => {
    console.error('✖ DATABASE CONNECTION ERROR:', err.message);
    console.log('💡 TIP: Go to MongoDB Atlas > Network Access > Add 0.0.0.0/0');
  });

// --- 2. DATA SCHEMA ---
const inquirySchema = new mongoose.Schema({
  trackingId: { type: String, unique: true },
  name: { type: String, required: true },
  office: { type: String, required: true },
  email: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// --- 3. MIDDLEWARE ---
app.use(helmet()); 
app.use(cors({ origin: '*' })); 
app.use(express.json());

// --- 4. API ENDPOINTS ---
app.get('/', (req, res) => res.status(200).send('🇰🇪 KENFIBA API: Systems Operational'));

app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, office, email, details } = req.body;
    const trackingId = `KENFIBA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry = new Inquiry({ trackingId, name, office, email, details });
    await newInquiry.save();
    res.status(201).json({ success: true, trackingId });
  } catch (error) {
    console.error("Save Error:", error.message);
    res.status(500).json({ success: false, message: "Database Save Failed" });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const all = await Inquiry.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).send("Access Denied");
  }
});

app.listen(PORT, () => console.log(`BACKEND LIVE ON ${PORT}`));
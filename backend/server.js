const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// --- 1. DATABASE CONNECTION (SHARD-SPECIFIC) ---
// Disable buffering so the app doesn't hang if the connection is slow
mongoose.set('bufferCommands', false); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 45000, // 45s for Shard election
      connectTimeoutMS: 30000,        // 30s for initial handshake
      family: 4,                       // Forces IPv4 (Render/Atlas requirement)
    });
    console.log('------------------------------------------------');
    console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED');
    console.log('------------------------------------------------');
  } catch (err) {
    console.error('------------------------------------------------');
    console.error('✖ DATABASE BRIDGE BROKEN:', err.message);
    console.error('Check: 1. Atlas IP Whitelist (0.0.0.0/0) | 2. URI Format');
    console.log('------------------------------------------------');
  }
};

connectDB();

// --- 2. DATA SCHEMA ---
const inquirySchema = new mongoose.Schema({
  trackingId: { type: String, unique: true },
  name: { type: String, required: true },
  office: { type: String, required: true },
  email: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// --- 3. MIDDLEWARE ---
app.use(cors({ origin: '*' }));
app.use(express.json());

// --- 4. API ENDPOINTS ---
app.get('/', (req, res) => res.status(200).send('🇰🇪 KENFIBA API: Systems Operational'));

// Inquiry Submission
app.post('/api/inquiries', async (req, res) => {
  // Check connection state before attempting write
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, message: "Database is still waking up. Please retry." });
  }

  try {
    const { name, office, email, details } = req.body;
    const trackingId = `KENFIBA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newInquiry = new Inquiry({ trackingId, name, office, email, details });
    await newInquiry.save();
    
    res.status(201).json({ success: true, trackingId });
  } catch (error) {
    console.error("Save Error:", error.message);
    res.status(500).json({ success: false, message: "Registry Write Failed" });
  }
});

// Secretariat Retrieval
app.get('/api/inquiries', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).send("Database Offline");
  }
  try {
    const all = await Inquiry.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).send("Access Denied");
  }
});

app.listen(PORT, () => console.log(`🚀 BACKEND LIVE ON PORT ${PORT}`));
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// 1. SECURITY & CONNECTION CONFIG
mongoose.set('bufferCommands', false); // Stop the 10s buffering timeout crash

const connectDB = async () => {
  try {
    console.log("📡 INITIALIZING REGISTRY HANDSHAKE...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, 
      heartbeatFrequencyMS: 10000,
      family: 4 // Force IPv4 for Render
    });
    console.log('------------------------------------------------');
    console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED');
    console.log('------------------------------------------------');
  } catch (err) {
    console.error('✖ CONNECTION REFUSED:', err.message);
    console.log('Retrying in 5s...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// 2. SCHEMA & MIDDLEWARE
const inquirySchema = new mongoose.Schema({
  trackingId: { type: String, unique: true },
  name: String, office: String, email: String, details: String,
  createdAt: { type: Date, default: Date.now }
});
const Inquiry = mongoose.model('Inquiry', inquirySchema);

app.use(cors({ origin: '*' }));
app.use(express.json());

// 3. ROUTES
app.get('/', (req, res) => res.send('🇰🇪 KENFIBA API: ONLINE'));

app.post('/api/inquiries', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, message: "Database is waking up. Retry in 10s." });
  }
  try {
    const trackingId = `KENFIBA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry = new Inquiry({ ...req.body, trackingId });
    await newEntry.save();
    res.status(201).json({ success: true, trackingId });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const data = await Inquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (e) { res.status(500).send("Unauthorized"); }
});

app.listen(PORT, () => console.log(`🚀 PORTAL ACTIVE ON ${PORT}`));
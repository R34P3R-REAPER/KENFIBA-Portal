const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 10000;

// --- 1. MIDDLEWARE ---
app.use(cors()); // Allows your frontend (Vercel/Netlify) to talk to this backend
app.use(express.json()); // Allows the server to read JSON data sent in a POST request

// --- 2. SECURE CONNECTION ---
const MASTER_URI = process.env.MONGO_URI;

mongoose.set('bufferCommands', false);

const connectRegistry = async () => {
  try {
    console.log('📡 KENFIBA PROTOCOL: ATTEMPTING SECURE HANDSHAKE...');
    
    if (!MASTER_URI) {
      throw new Error("MONGO_URI is missing from Environment Variables!");
    }

    await mongoose.connect(MASTER_URI, {
      serverSelectionTimeoutMS: 45000,
      family: 4 
    });

    console.log('------------------------------------------------');
    console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED');
    console.log('------------------------------------------------');
  } catch (err) {
    console.error('✖ CONNECTION ERROR:', err.message);
    setTimeout(connectRegistry, 5000);
  }
};

connectRegistry();

// --- 3. DATA SCHEMA (The blueprint for your data) ---
const Inquiry = mongoose.model('Inquiry', new mongoose.Schema({
  trackingId: { type: String, unique: true },
  name: String,
  office: String,
  email: String,
  details: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
}));

// --- 4. API ROUTES ---

// Health Check (To see if the server is awake)
app.get('/', (req, res) => {
  res.send('🇰🇪 KENFIBA API: SYSTEMS OPERATIONAL');
});

// Submit a new Inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const trackingId = `KENFIBA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry = new Inquiry({ ...req.body, trackingId });
    await newInquiry.save();
    res.status(201).json({ success: true, trackingId, message: "Inquiry logged." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all Inquiries (For your dashboard)
app.get('/api/inquiries', async (req, res) => {
  try {
    const data = await Inquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).send("Access Denied");
  }
});

// --- 5. INITIALIZE ---
app.listen(PORT, () => {
  console.log('------------------------------------------------');
  console.log('🚀 PORTAL ACTIVE ON PORT: ' + PORT);
  console.log('------------------------------------------------');
});
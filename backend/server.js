const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 10000;

// --- 1. THE NO-FAIL CONNECTION ---
mongoose.set('bufferCommands', false);

const connectRegistry = async () => {
  // WE ARE HARD-CODING THE STRING HERE TO BYPASS ENV ERRORS
  const MASTER_URI = "mongodb+srv://jakinda24112007_db_user:RVoe6weT8S6Z5Ulj@kenfiba-main-cluster.hes9sp8.mongodb.net/vfm_taskforce?retryWrites=true&w=majority";

  try {
    console.log('📡 KENFIBA PROTOCOL: ATTEMPTING MASTER HANDSHAKE...');
    
    await mongoose.connect(MASTER_URI, {
      serverSelectionTimeoutMS: 45000,
      family: 4 
    });

    console.log('------------------------------------------------');
    console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED');
    console.log('------------------------------------------------');
  } catch (err) {
    console.error('------------------------------------------------');
    console.error('✖ BRIDGE FAILED:', err.message);
    console.log('------------------------------------------------');
    setTimeout(connectRegistry, 5000);
  }
};

connectRegistry();

// --- 2. DATA SCHEMA ---
const Inquiry = mongoose.model('Inquiry', new mongoose.Schema({
  trackingId: { type: String, unique: true },
  name: String, 
  office: String, 
  email: String, 
  details: String,
  createdAt: { type: Date, default: Date.now }
}));

// --- 3. MIDDLEWARE ---
app.use(cors({ origin: '*' }));
app.use(express.json());

// --- 4. API ENDPOINTS ---
app.get('/', (req, res) => res.status(200).send('🇰🇪 KENFIBA API: ONLINE'));

app.post('/api/inquiries', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, message: "Database Offline" });
  }
  try {
    const trackingId = `KENFIBA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry = new Inquiry({ ...req.body, trackingId });
    await newInquiry.save();
    res.status(201).json({ success: true, trackingId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const all = await Inquiry.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) { res.status(500).send("Denied"); }
});

app.listen(PORT, () => console.log(`🚀 PORTAL ACTIVE ON ${PORT}`));
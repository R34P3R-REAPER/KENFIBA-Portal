const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Render default port or 10000
const PORT = process.env.PORT || 10000;

// --- 1. DATABASE CONNECTION ---
// Pulling the URI from Render Environment Variables
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('✖ CRITICAL: MONGO_URI is missing in Environment Variables!');
}

mongoose.connect(mongoURI)
  .then(() => console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED'))
  .catch(err => {
    console.error('✖ DATABASE CONNECTION ERROR:', err.message);
    console.log('💡 TIP: Check MongoDB Atlas "Network Access" and allow 0.0.0.0/0');
  });

// --- 2. DATA SCHEMA ---
const inquirySchema = new mongoose.Schema({
  trackingId: { type: String, unique: true },
  name: { type: String, required: true },
  office: { type: String, required: true }, // Representing County/Station
  email: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// --- 3. MIDDLEWARE ---
app.use(helmet()); 
app.use(cors({ origin: '*' })); // Allows any frontend (Vercel/Local) to connect
app.use(express.json());

// --- 4. API ENDPOINTS ---

// Root Health Check (Verify if server is awake)
app.get('/', (req, res) => {
  res.status(200).send('🇰🇪 KENFIBA National Registry API: Systems Operational');
});

// GET: Secure Registry Retrieval (For Secretariat Admin)
app.get('/api/inquiries', async (req, res) => {
  try {
    const allInquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(allInquiries);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: "Registry Access Denied" });
  }
});

// POST: Log New Inquiry into National Registry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, office, email, details } = req.body;
    
    // Official KENFIBA-2026 Tracking Serial Generation
    const trackingId = `KENFIBA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInquiry = new Inquiry({
      trackingId,
      name,
      office,
      email,
      details
    });

    await newInquiry.save();
    console.log(`[SAVED] New Record: ${trackingId} | Office: ${office}`);

    res.status(201).json({
      success: true,
      trackingId: trackingId,
      message: "Successfully logged in the National Registry."
    });
  } catch (error) {
    console.error("Critical Save Error:", error.message);
    res.status(500).json({ success: false, message: "Registry Offline: Storage Failure." });
  }
});

// --- 5. SERVER START ---
app.listen(PORT, () => {
  console.log(`
  ------------------------------------------------
  🇰🇪 KENFIBA NATIONAL SECRETARIAT BACKEND LIVE
  PORT: ${PORT}
  ------------------------------------------------
  `);
});
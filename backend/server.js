const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// --- 1. DATABASE CONNECTION ---
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000 // Fails fast so we can diagnose the error
})
  .then(() => console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED'))
  .catch(err => {
    console.error('✖ DATABASE CONNECTION ERROR:', err.message);
    console.log('💡 TIP: Ensure 0.0.0.0/0 is whitelisted in MongoDB Atlas Network Access.');
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
app.use(cors({ origin: '*' })); // Prevents "Registry Offline" CORS blocks
app.use(express.json());

// --- 4. API ENDPOINTS ---

app.get('/', (req, res) => {
  res.status(200).send('🇰🇪 KENFIBA National Registry API: Systems Operational');
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const allInquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(allInquiries);
  } catch (error) {
    res.status(500).json({ success: false, message: "Registry Access Denied" });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, office, email, details } = req.body;
    const trackingId = `KENFIBA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInquiry = new Inquiry({ trackingId, name, office, email, details });
    await newInquiry.save();
    
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

app.listen(PORT, () => {
  console.log(`🇰🇪 KENFIBA BACKEND LIVE ON PORT ${PORT}`);
});
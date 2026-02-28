const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// --- 1. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000, 
  socketTimeoutMS: 45000,         
  family: 4,                       
  autoIndex: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED'))
.catch(err => console.error('✖ CONNECTION ERROR:', err.message));

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
app.use(helmet()); 
app.use(cors({ origin: '*' })); // Allows Vercel to bypass CORS
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
    res.status(500).json({ success: false, message: error.message });
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
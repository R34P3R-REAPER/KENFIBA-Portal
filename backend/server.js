const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
// Render uses dynamic ports; default to 10000
const PORT = process.env.PORT || 10000;

// --- 1. DATABASE CONNECTION (SHARD-OPTIMIZED) ---
// We use a 60s selection timeout to handle Render's "Cold Start" + MongoDB Shard Election.
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 60000, // Wait 1 min for Shards to elect a primary
  connectTimeoutMS: 30000,        // Handshake patience
  socketTimeoutMS: 45000,         // Prevent premature connection cuts
  family: 4,                       // FORCE IPv4: Crucial for Render-to-Atlas stability
  maxPoolSize: 10,                 // Maintains a steady "Bridge" of connections
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('------------------------------------------------');
  console.log('✔ KENFIBA REGISTRY: SECURED & CONNECTED');
  console.log('------------------------------------------------');
})
.catch(err => {
  console.error('------------------------------------------------');
  console.error('✖ DATABASE BRIDGE BROKEN:', err.message);
  console.error('Check: 1. Render IP Whitelist | 2. URI Credentials');
  console.error('------------------------------------------------');
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
// Helmet is adjusted to allow cross-origin requests from Vercel
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(cors({ origin: '*' })); // Open bridge for Vercel Frontend
app.use(express.json());

// --- 4. API ENDPOINTS ---

// Root Heartbeat (Used for "Wake-up" pings)
app.get('/', (req, res) => {
  res.status(200).send('🇰🇪 KENFIBA API: Systems Operational');
});

// Submit to Registry
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, office, email, details } = req.body;
    
    // Generate a unique KENFIBA Tracking ID
    const trackingId = `KENFIBA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newInquiry = new Inquiry({ 
      trackingId, 
      name, 
      office, 
      email, 
      details 
    });

    await newInquiry.save();
    console.log(`✔ Inquiry Logged: ${trackingId}`);
    res.status(201).json({ success: true, trackingId });
    
  } catch (error) {
    console.error("Save Error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Database Write Failed. The line may be unstable." 
    });
  }
});

// Retrieve Registry (Secretariat Access)
app.get('/api/inquiries', async (req, res) => {
  try {
    const allInquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(allInquiries);
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).send("Access to Archive Denied");
  }
});

// --- 5. SERVER INITIALIZATION ---
app.listen(PORT, () => {
  console.log(`🚀 BACKEND LIVE ON PORT ${PORT}`);
  console.log(`📡 TARGET: ${mongoURI ? 'URI LOADED' : 'MISSING URI'}`);
});
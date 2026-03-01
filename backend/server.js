const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan'); // For request logging
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// --- 1. ESSENTIAL MIDDLEWARE ---
app.use(cors({ origin: '*' })); // Allow cross-origin requests
app.use(express.json());       // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('dev'));        // Log every request to the terminal

// --- 2. DATABASE CONFIGURATION ---
const MONGO_URI = process.env.MONGO_URI;

const connectionOptions = {
  serverSelectionTimeoutMS: 15000, 
  socketTimeoutMS: 45000,
  family: 4, // Force IPv4 for Render-to-Atlas stability
  maxPoolSize: 10 
};

// Disable buffering to prevent "hanging" requests if DB is slow
mongoose.set('bufferCommands', false);

const connectWithRetry = async () => {
  if (!MONGO_URI) {
    console.error('✖ CRITICAL: MONGO_URI is missing from Environment Variables!');
    process.exit(1); 
  }

  try {
    console.log('📡 KENFIBA PROTOCOL: INITIATING SECURE HANDSHAKE...');
    await mongoose.connect(MONGO_URI, connectionOptions);
    console.log('------------------------------------------------');
    console.log('✔ KENFIBA REGISTRY: SECURED & STABILIZED');
    console.log('------------------------------------------------');
  } catch (err) {
    console.error('✖ HANDSHAKE FAILED:', err.message);
    console.log('🔄 RETRYING IN 5 SECONDS...');
    setTimeout(connectWithRetry, 5000);
  }
};

// Handle mid-session disconnections
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  REGISTRY DISCONNECTED. ATTEMPTING RECONNECT...');
});

// --- 3. DATA MODEL ---
const inquirySchema = new mongoose.Schema({
  trackingId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  office: { type: String, required: true },
  email: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// --- 4. API ENDPOINTS ---

// Health Check / Root
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Operational',
    system: 'KENFIBA PORTAL API',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Create New Inquiry
app.post('/api/inquiries', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, message: "Database Offline" });
  }

  try {
    const trackingId = `KENFIBA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry = new Inquiry({ ...req.body, trackingId });
    await newInquiry.save();
    
    res.status(201).json({ 
      success: true, 
      trackingId, 
      message: "Entry recorded in the registry." 
    });
  } catch (error) {
    console.error("Submission Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Retrieve All Inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const data = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Access to Registry Denied" });
  }
});

// --- 5. GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err.stack);
  res.status(500).send('Something broke on the KENFIBA server!');
});

// --- 6. START SERVER ---
connectWithRetry().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 PORTAL ONLINE: https://kenfiba-portal.onrender.com`);
    console.log(`📡 MONITORING PORT: ${PORT}`);
    console.log('------------------------------------------------');
  });
});
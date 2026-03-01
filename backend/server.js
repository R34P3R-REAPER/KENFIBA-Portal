const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // This allows the code to read the Render vault

const app = express();
const PORT = process.env.PORT || 10000;

// --- 1. SECURE CONNECTION ---
// Now we use process.env.MONGO_URI so the password stays hidden
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
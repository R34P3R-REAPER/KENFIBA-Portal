import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- 1. SECRETARIAT ADMIN DASHBOARD ---
const SecretariatDashboard = ({ onBack }) => {
  const [inquiries, setInquiries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  // UPDATED: Corrected URL for the live registry
  const API_BASE_URL = "https://kenfiba-portal.onrender.com";
  const ADMIN_PASSWORD = "KENFIBA_OFFICIAL_2026"; 

  const fetchRegistry = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/inquiries`);
      setInquiries(res.data);
    } catch (err) {
      console.error("Registry Access Error", err);
      alert("Failed to connect to the National Registry. Check if Render is awake.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchRegistry();
    } else {
      alert("Invalid Secretariat Credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-serif">
        <div className="bg-white p-12 shadow-2xl border-t-8 border-[#004a99] text-center max-w-md w-full">
          <h2 className="text-2xl font-black italic mb-2">🇰🇪 National Secretariat</h2>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-8">Official Access - Reg No. 21578</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Enter Access Key"
              className="w-full p-4 bg-gray-50 border border-gray-200 outline-none focus:border-[#004a99] transition-all italic"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-[#004a99] text-white py-4 font-black uppercase tracking-widest text-xs hover:bg-black transition-all">
              Verify Credentials
            </button>
          </form>
          <button onClick={onBack} className="mt-8 text-[10px] font-black uppercase text-gray-400 hover:text-red-700 tracking-widest">← Return to Portal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-white min-h-screen font-serif">
      <div className="flex justify-between items-end border-b-4 border-[#004a99] pb-6 mb-10">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter">📋 National Member Inquiry Registry</h2>
          <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gray-400">Societies Act Cap 108 | 2002 Charter Compliance</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => window.print()} className="bg-green-600 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">🖨️ Export PDF</button>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-700 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Logout</button>
        </div>
      </div>
      
      <table className="w-full border-collapse font-sans">
        <thead>
          <tr className="bg-[#004a99] text-white text-[10px] uppercase tracking-widest">
            <th className="p-4 text-left border border-gray-200">Tracking ID</th>
            <th className="p-4 text-left border border-gray-200">Date</th>
            <th className="p-4 text-left border border-gray-200">Name</th>
            <th className="p-4 text-left border border-gray-200">Office</th>
            <th className="p-4 text-left border border-gray-200">Details</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {inquiries.length > 0 ? inquiries.map((iq) => (
            <tr key={iq._id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 border border-gray-200 font-bold font-mono">{iq.trackingId}</td>
              <td className="p-4 border border-gray-200">{new Date(iq.createdAt).toLocaleDateString()}</td>
              <td className="p-4 border border-gray-200 italic">{iq.name}</td>
              <td className="p-4 border border-gray-200 font-bold">{iq.office}</td>
              <td className="p-4 border border-gray-200 text-gray-600">{iq.details}</td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="p-10 text-center text-gray-400">No records found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// --- 2. MAIN PORTAL COMPONENT ---
function App() {
  const [view, setView] = useState('landing');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [form, setForm] = useState({ name: "", office: "", email: "", details: "" });

  // UPDATED: Corrected API URL for the main portal
  const API_BASE_URL = "https://kenfiba-portal.onrender.com";

  // AUTO-WAKE: Pings server on load to prevent cold start delays
  useEffect(() => {
    axios.get(API_BASE_URL).catch(() => console.log("Server waking up..."));
  }, []);

  const handleInquiry = async (e) => {
    e.preventDefault();
    try {
      // UPDATED: Corrected route to /api/inquiries
      const res = await axios.post(`${API_BASE_URL}/api/inquiries`, form);
      setTrackingId(res.data.trackingId);
      setIsSubmitted(true);
    } catch (err) { 
      alert("Registry Database Offline. Please ensure your Render server is live."); 
    }
  };

  if (view === 'admin') return <SecretariatDashboard onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif leading-relaxed">
      {/* ... [KEEP ALL PREVIOUS LANDING PAGE SECTIONS: NAV, HERO, ABOUT] ... */}
      
      {/* SECTION SNIPPET: Registry Inquiry */}
      <section id="registry" className="py-32 bg-[#fafafa] border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-black italic mb-2 tracking-tighter uppercase">Secretary-General Registry</h3>
            <p className="font-sans text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Official Communication Intake</p>
          </div>
          
          {!isSubmitted ? (
            <form onSubmit={handleInquiry} className="space-y-12 font-sans bg-white p-12 shadow-2xl border border-gray-100">
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Full Name / Rank</label>
                    <input type="text" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Origin Office / County</label>
                    <input type="text" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.office} onChange={e => setForm({...form, office: e.target.value})} required />
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Official Email Address</label>
                  <input type="email" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Official Briefing / Statement</label>
                  <textarea rows="5" className="w-full bg-gray-50 py-4 px-4 outline-none border-b-2 border-gray-200 focus:border-red-700 transition-all font-serif italic resize-none" value={form.details} onChange={e => setForm({...form, details: e.target.value})} required></textarea>
               </div>
               <button type="submit" className="w-full bg-red-700 text-white py-8 font-black uppercase text-[11px] tracking-[0.5em] hover:bg-black transition-all shadow-2xl">
                 Submit to Secretariat Archive
               </button>
            </form>
          ) : (
            <div className="bg-white p-20 border-t-8 border-green-600 text-center shadow-2xl">
               <div className="inline-block bg-green-100 text-green-800 px-6 py-1 text-[10px] font-black uppercase tracking-widest mb-6 underline">Submission Certified</div>
               <h3 className="text-3xl font-black italic mb-4">Registry Log Finalized</h3>
               <p className="text-sm font-sans text-gray-400 mb-10 leading-relaxed">
                 Verification Reference: <span className="text-black font-bold font-mono tracking-tighter">{trackingId}</span>.<br/>Your inquiry has been queued for the National Secretary-General.
               </p>
               <button onClick={() => setIsSubmitted(false)} className="text-red-700 font-black uppercase text-[10px] tracking-widest hover:underline decoration-2">Record New Statement</button>
            </div>
          )}
        </div>
      </section>
      
      {/* ... [KEEP FOOTER CODE] ... */}
    </div>
  );
}

export default App;
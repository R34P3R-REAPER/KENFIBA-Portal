import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- SECRETARIAT DASHBOARD COMPONENT ---
const SecretariatDashboard = ({ onBack }) => {
  const [inquiries, setInquiries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const API_BASE_URL = "https://kenfiba-portal.onrender.com";

  const fetchRegistry = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/inquiries`);
      setInquiries(res.data);
    } catch (err) {
      alert("Registry Connection Failed. Ensure Backend is Awake.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-serif">
        <div className="bg-white p-12 shadow-2xl border-t-8 border-[#004a99] text-center max-w-md w-full">
          <h2 className="text-2xl font-black italic mb-2">🇰🇪 National Secretariat</h2>
          <form onSubmit={(e) => { e.preventDefault(); if(password === "KENFIBA_OFFICIAL_2026") { setIsAuthenticated(true); fetchRegistry(); } else { alert("Invalid Key"); } }} className="space-y-6">
            <input type="password" placeholder="Access Key" className="w-full p-4 bg-gray-50 border outline-none focus:border-[#004a99]" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="w-full bg-[#004a99] text-white py-4 font-black uppercase text-xs hover:bg-black transition-all">Verify Credentials</button>
          </form>
          <button onClick={onBack} className="mt-8 text-[10px] font-black uppercase text-gray-400">← Return to Portal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-white min-h-screen font-serif">
      <div className="flex justify-between items-end border-b-4 border-[#004a99] pb-6 mb-10">
        <h2 className="text-3xl font-black italic">📋 National Registry</h2>
        <button onClick={() => setIsAuthenticated(false)} className="bg-red-700 text-white px-6 py-2 text-[10px] font-black uppercase">Logout</button>
      </div>
      <table className="w-full border-collapse font-sans text-sm">
        <thead><tr className="bg-[#004a99] text-white uppercase text-[10px]"><th className="p-4 border">ID</th><th className="p-4 border">Name</th><th className="p-4 border">Office</th><th className="p-4 border">Details</th></tr></thead>
        <tbody>{inquiries.map(iq => (<tr key={iq._id}><td className="p-4 border font-mono">{iq.trackingId}</td><td className="p-4 border italic">{iq.name}</td><td className="p-4 border font-bold">{iq.office}</td><td className="p-4 border">{iq.details}</td></tr>))}</tbody>
      </table>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [view, setView] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [form, setForm] = useState({ name: "", office: "", email: "", details: "" });

  const API_BASE_URL = "https://kenfiba-portal.onrender.com";

  const handleInquiry = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/inquiries`, form, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 45000 
      });
      setTrackingId(res.data.trackingId);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Registry Offline. Please wait 15 seconds for the server to wake up and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (view === 'admin') return <SecretariatDashboard onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif">
      <nav className="p-6 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-xl font-black italic tracking-tighter">🇰🇪 KENFIBA PORTAL</h1>
        <button onClick={() => setView('admin')} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Secretariat Login</button>
      </nav>

      <section id="registry" className="py-32 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6">
          {!isSubmitted ? (
            <form onSubmit={handleInquiry} className="space-y-8 bg-white p-12 shadow-2xl border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8">
                <input placeholder="Full Name" className="w-full bg-gray-50 p-4 border-b-2 outline-none focus:border-red-700 font-serif italic" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                <input placeholder="Office/County" className="w-full bg-gray-50 p-4 border-b-2 outline-none focus:border-red-700 font-serif italic" value={form.office} onChange={e => setForm({...form, office: e.target.value})} required />
              </div>
              <input type="email" placeholder="Official Email" className="w-full bg-gray-50 p-4 border-b-2 outline-none focus:border-red-700 font-serif italic" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <textarea placeholder="Official Briefing" rows="4" className="w-full bg-gray-50 p-4 border-b-2 outline-none focus:border-red-700 font-serif italic" value={form.details} onChange={e => setForm({...form, details: e.target.value})} required></textarea>
              
              <button type="submit" disabled={isLoading} className={`w-full py-6 font-black uppercase text-[11px] tracking-[0.5em] transition-all ${isLoading ? 'bg-gray-400 cursor-wait' : 'bg-red-700 hover:bg-black text-white'}`}>
                {isLoading ? "⏳ ESTABLISHING SECURE PROTOCOL..." : "Submit to Secretariat Archive"}
              </button>
            </form>
          ) : (
            <div className="bg-white p-20 border-t-8 border-green-600 text-center shadow-2xl">
              <h3 className="text-3xl font-black italic mb-4">Registry Log Finalized</h3>
              <p className="text-sm font-mono font-bold mb-10">REF: {trackingId}</p>
              <button onClick={() => setIsSubmitted(false)} className="text-red-700 font-black uppercase text-[10px]">Record New Statement</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
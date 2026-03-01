import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// --- CONFIGURATION ---
const API_BASE_URL = "https://kenfiba-portal.onrender.com";
const ADMIN_KEY = "KENFIBA_OFFICIAL_2026";

// --- SECRETARIAT DASHBOARD COMPONENT ---
const SecretariatDashboard = ({ onBack }) => {
  const [inquiries, setInquiries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fetchRegistry = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/inquiries`);
      setInquiries(res.data);
    } catch (err) {
      alert("National Registry connection failed. Ensure the secure line is open.");
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
      fetchRegistry();
    } else {
      alert("Invalid Secretariat Credentials");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-serif p-4">
        <div className="bg-white p-8 md:p-12 shadow-2xl border-t-8 border-[#004a99] text-center max-w-md w-full">
          <h2 className="text-2xl font-black italic mb-2 tracking-tighter text-[#1a1a1a]">🇰🇪 National Secretariat</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8 font-sans">Official Archive Access</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="ENTER ACCESS KEY" 
              className="w-full p-4 bg-gray-50 border border-gray-200 outline-none focus:border-[#004a99] transition-all font-mono text-center" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button type="submit" className="w-full bg-[#004a99] text-white py-4 font-black uppercase text-xs tracking-widest hover:bg-black transition-all">
              Verify Credentials
            </button>
          </form>
          <button onClick={onBack} className="mt-8 text-[10px] font-black uppercase text-gray-400 hover:text-red-700 tracking-widest transition-colors">
            ← Return to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 bg-white min-h-screen font-serif">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-[#004a99] pb-6 mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter">📋 National Registry</h2>
          <p className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-widest">Inquiry Archive 2026</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchRegistry} className="bg-gray-100 text-black px-4 py-2 text-[10px] font-black uppercase border border-gray-200 hover:bg-gray-200">
            {isFetching ? "Syncing..." : "Refresh"}
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-700 text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
            Logout
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-sans text-sm">
          <thead>
            <tr className="bg-[#004a99] text-white uppercase text-[10px] tracking-tighter">
              <th className="p-4 border border-gray-200 text-left">Tracking ID</th>
              <th className="p-4 border border-gray-200 text-left">Timestamp</th>
              <th className="p-4 border border-gray-200 text-left">Member</th>
              <th className="p-4 border border-gray-200 text-left">Office</th>
              <th className="p-4 border border-gray-200 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(iq => (
              <tr key={iq._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 border border-gray-200 font-mono font-bold text-[#004a99]">{iq.trackingId}</td>
                <td className="p-4 border border-gray-200 text-[11px] text-gray-500">{new Date(iq.createdAt).toLocaleString()}</td>
                <td className="p-4 border border-gray-200 italic">{iq.name}</td>
                <td className="p-4 border border-gray-200 font-bold uppercase text-[12px]">{iq.office}</td>
                <td className="p-4 border border-gray-200 text-gray-600 max-w-xs truncate" title={iq.details}>{iq.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

  // WAKE-UP EFFECT: Pings the server on initial load to reduce "Cold Start" lag
  useEffect(() => {
    axios.get(API_BASE_URL).catch(() => console.log("System initialization sequence..."));
  }, []);

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
      setForm({ name: "", office: "", email: "", details: "" }); // Reset form
    } catch (err) {
      console.error(err);
      alert("The Secretariat line is busy or offline. Please wait 15 seconds and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (view === 'admin') return <SecretariatDashboard onBack={() => setView('landing')} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif selection:bg-red-700 selection:text-white">
      <nav className="p-6 md:px-12 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <h1 className="text-xl font-black italic tracking-tighter">🇰🇪 KENFIBA PORTAL</h1>
        <button 
          onClick={() => setView('admin')} 
          className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black border border-gray-200 px-4 py-2 transition-all hover:border-black"
        >
          Secretariat Login
        </button>
      </nav>

      <section id="registry" className="py-24 md:py-32 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Member Intake</h2>
            <p className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">Official Communication Registry</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleInquiry} className="space-y-8 bg-white p-8 md:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
              {isLoading && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 overflow-hidden">
                  <div className="h-full bg-red-700 animate-pulse w-full"></div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Full Name / Rank</label>
                  <input className="w-full bg-gray-50 p-4 border-b-2 border-gray-200 outline-none focus:border-red-700 font-serif italic transition-all" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Office / County</label>
                  <input className="w-full bg-gray-50 p-4 border-b-2 border-gray-200 outline-none focus:border-red-700 font-serif italic transition-all" value={form.office} onChange={e => setForm({...form, office: e.target.value})} required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Official Email Address</label>
                <input type="email" className="w-full bg-gray-50 p-4 border-b-2 border-gray-200 outline-none focus:border-red-700 font-serif italic transition-all" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Official Briefing Statement</label>
                <textarea rows="4" className="w-full bg-gray-50 p-4 border-b-2 border-gray-200 outline-none focus:border-red-700 font-serif italic transition-all resize-none" value={form.details} onChange={e => setForm({...form, details: e.target.value})} required></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className={`w-full py-8 font-black uppercase text-[11px] tracking-[0.5em] transition-all shadow-xl ${
                  isLoading ? 'bg-gray-400 cursor-wait text-white' : 'bg-red-700 hover:bg-black text-white active:scale-95'
                }`}
              >
                {isLoading ? "⏳ ESTABLISHING SECURE PROTOCOL..." : "Submit to Secretariat Archive"}
              </button>
            </form>
          ) : (
            <div className="bg-white p-12 md:p-24 border-t-8 border-green-600 text-center shadow-2xl animate-in fade-in zoom-in duration-500">
              <div className="mb-8 flex justify-center text-green-600 text-5xl">✓</div>
              <h3 className="text-3xl font-black italic mb-4 tracking-tighter">Registry Log Finalized</h3>
              <div className="bg-gray-50 p-6 rounded mb-10 border border-dashed border-gray-200">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Verification Reference</p>
                <p className="text-2xl font-mono font-black text-[#1a1a1a] tracking-tight">{trackingId}</p>
              </div>
              <button onClick={() => setIsSubmitted(false)} className="text-red-700 font-black uppercase text-[10px] tracking-widest hover:underline decoration-2 underline-offset-4">
                Record New Statement
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 text-center text-[10px] text-gray-400 uppercase tracking-widest">
        © 2026 KENFIBA Internal Systems | Societies Act Cap 108
      </footer>
    </div>
  );
}

export default App;
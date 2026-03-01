import React, { useState } from 'react';

// --- HIGH-AUTHORITY DESIGN SYSTEM ---
const styles = {
  topBanner: "bg-[#000] text-[10px] text-gray-400 py-2 px-8 flex justify-between uppercase tracking-widest font-bold border-b border-gray-800",
  nav: "bg-white sticky top-0 z-50 border-b-4 border-[#006400] px-10 py-5 flex justify-between items-center shadow-lg",
  hero: "relative bg-[#004d00] py-32 px-10 text-white overflow-hidden border-b-8 border-[#FFD700]",
  sectionHead: "text-4xl font-black text-gray-900 mb-12 flex items-center gap-4 uppercase tracking-tighter",
  card: "bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all",
  officerCard: "bg-white p-6 rounded-2xl border-l-8 border-[#006400] shadow-md hover:bg-[#f0f7f0] transition-all",
  downloadBtn: "bg-[#006400] text-[#FFD700] px-6 py-2 rounded-full font-black text-[10px] hover:bg-black transition-all",
  iconCircle: "w-14 h-14 bg-[#006400] text-[#FFD700] rounded-full flex items-center justify-center mb-4 text-xl shadow-lg",
};

function App() {
  const [formData, setFormData] = useState({ name: '', office: '', email: '', details: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("📡 ENCRYPTING SUBMISSION FOR NATIONAL REGISTRY...");
    try {
      const response = await fetch('https://kenfiba-portal.onrender.com/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) setStatus(`✔️ REGISTRY SECURED: ID ${data.trackingId}`);
    } catch (err) {
      setStatus("❌ HANDSHAKE FAILURE: DATABASE CLUSTER OFFLINE");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans">
      
      {/* 1. NATIONAL IDENTITY BAR */}
      <div className={styles.topBanner}>
        <span>Republic of Kenya • Societies Act Cap 108</span>
        <span className="text-[#FFD700]">Official Registration No. 21578</span>
      </div>

      {/* 2. NAVIGATION */}
      <nav className={styles.nav}>
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 bg-[#006400] rounded-xl flex items-center justify-center text-white border-b-4 border-[#FFD700] shadow-lg font-black text-2xl italic">K</div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">KENFIBA</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">National Fire Brigades Association</p>
          </div>
        </div>
        <div className="hidden lg:flex gap-10 font-black text-[10px] uppercase tracking-[0.2em]">
          <a href="#leadership" className="hover:text-[#006400]">Leadership</a>
          <a href="#gallery" className="hover:text-[#006400]">Media</a>
          <a href="#vault" className="hover:text-[#006400]">Statutes</a>
          <button className="bg-[#FFD700] text-[#006400] px-6 py-2 rounded-full shadow-md">Portal Access</button>
        </div>
      </nav>

      {/* 3. HERO: MISSION CRITICAL */}
      <header className={styles.hero}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block border-2 border-[#FFD700] px-6 py-2 rounded-full mb-8">
            <span className="text-[#FFD700] font-black text-xs uppercase tracking-[0.3em]">Established July 2002</span>
          </div>
          <h2 className="text-8xl font-black leading-[0.8] mb-10 tracking-tighter uppercase">
            Making Kenya <br/><span className="text-[#FFD700]">Society Safer.</span>
          </h2>
          <p className="text-2xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed border-t border-white/20 pt-8 italic">
            "Support the firemen; the next life they save might be yours."
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FFD700] opacity-5 -skew-x-12 translate-x-20"></div>
      </header>

      {/* 4. NATIONAL LEADERSHIP (The Office Bearers) */}
      <section id="leadership" className="max-w-7xl mx-auto py-24 px-10">
        <h2 className={styles.sectionHead}><span className="w-2 h-12 bg-[#006400]"></span> National Office Bearers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { role: "National Chairman", title: "Strategic Oversight" },
            { role: "Secretary General", title: "Administrative Command" },
            { role: "National Treasurer", title: "Fiscal Registry" },
            { role: "Organizing Secretary", title: "National Coordination" }
          ].map((leader, i) => (
            <div key={i} className={styles.officerCard}>
              <p className="text-[10px] font-black text-[#006400] uppercase mb-1">{leader.title}</p>
              <h4 className="text-xl font-black text-gray-900 uppercase">{leader.role}</h4>
              <p className="text-xs text-gray-500 mt-4">Liaison Office • HQ Nairobi</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MULTIMEDIA GALLERY */}
      <section id="gallery" className="bg-gray-900 py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4 uppercase tracking-tighter">
            <span className="w-2 h-12 bg-[#FFD700]"></span> Operational Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img src="https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=800" className="rounded-3xl h-80 w-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Training" />
            <img src="https://images.unsplash.com/photo-1599700403969-f77b3ca7480d?auto=format&fit=crop&q=80&w=800" className="rounded-3xl h-80 w-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border-x-4 border-[#006400]" alt="Fleet" />
            <img src="https://images.unsplash.com/photo-1534073828943-f801091bb240?auto=format&fit=crop&q=80&w=800" className="rounded-3xl h-80 w-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Rescue" />
          </div>
        </div>
      </section>

      {/* 6. THE STATUTE VAULT (Downloadable Files) */}
      <section id="vault" className="max-w-7xl mx-auto py-24 px-10">
        <h2 className={styles.sectionHead}><span className="w-2 h-12 bg-[#FFD700]"></span> Statutory Vault</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border-2 border-dashed border-gray-200 flex justify-between items-center group hover:border-[#006400] transition-all">
             <div>
                <h4 className="font-black text-xl uppercase italic">Certificate of Registration</h4>
                <p className="text-xs font-bold text-gray-400">REG NO. 21578 • SOCIETIES ACT CAP 108</p>
             </div>
             <button className={styles.downloadBtn}>ACCESS PDF</button>
          </div>
          <div className="bg-white p-10 rounded-[2rem] shadow-xl border-2 border-dashed border-gray-200 flex justify-between items-center group hover:border-[#006400] transition-all">
             <div>
                <h4 className="font-black text-xl uppercase italic">Association Constitution</h4>
                <p className="text-xs font-bold text-gray-400">CHARITABLE OBJECTS & MANDATES</p>
             </div>
             <button className={styles.downloadBtn}>DOWNLOAD</button>
          </div>
        </div>
      </section>

      {/* 7. CONTACT COMMAND CENTER */}
      <section className="bg-[#f0f7f0] py-24 px-10 border-y-2 border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <div className={styles.iconCircle}>📍</div>
            <h4 className="font-black uppercase tracking-widest mb-2">Headquarters</h4>
            <p className="text-sm font-medium text-gray-600 leading-relaxed">Fire & Ambulance HQ, Tom Mboya Street,<br/>Nairobi, Kenya.</p>
          </div>
          <div className="text-center">
            <div className={styles.iconCircle}>📞</div>
            <h4 className="font-black uppercase tracking-widest mb-2">Registry Hotline</h4>
            <p className="text-sm font-medium text-gray-600 leading-relaxed">+254 (020) 2371263<br/>+254 721 981 017</p>
          </div>
          <div className="text-center">
            <div className={styles.iconCircle}>📧</div>
            <h4 className="font-black uppercase tracking-widest mb-2">Official Email</h4>
            <p className="text-sm font-medium text-gray-600 leading-relaxed underline">kenfiba@yahoo.com<br/>registry@kenfiba.org</p>
          </div>
        </div>
      </section>

      {/* 8. SUBMISSION REGISTRY */}
      <main className="max-w-4xl mx-auto py-24 px-10">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border-t-8 border-[#006400]">
          <h3 className="text-3xl font-black mb-8 text-center uppercase tracking-tighter">Liaison Inquiry Registry</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] outline-none transition-all font-bold uppercase text-xs tracking-widest" placeholder="Officer Name & Rank" onChange={(e)=>setFormData({...formData, name:e.target.value})} />
            <input className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] outline-none transition-all font-bold uppercase text-xs tracking-widest" placeholder="Authority / Department" onChange={(e)=>setFormData({...formData, office:e.target.value})} />
            <input className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] outline-none transition-all font-bold uppercase text-xs tracking-widest" placeholder="Official Email Address" onChange={(e)=>setFormData({...formData, email:e.target.value})} />
            <textarea className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] outline-none transition-all font-bold uppercase text-xs tracking-widest" rows="4" placeholder="Report / Inquiry Details..." onChange={(e)=>setFormData({...formData, details:e.target.value})}></textarea>
            <button className="w-full bg-[#006400] text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-black transition-all text-sm">Seal & Submit to Registry</button>
            {status && <div className="p-4 bg-black text-[#FFD700] text-[10px] font-black text-center rounded-xl animate-pulse">{status}</div>}
          </form>
        </div>
      </main>

      {/* FOOTER: THE NATIONAL SEAL */}
      <footer className="bg-black text-white py-20 px-10 border-t-8 border-[#FFD700]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] mb-8 font-black">Official Digital Asset of KENFIBA • Societies Reg No. 21578</p>
          <h2 className="text-3xl font-black mb-4 tracking-tighter">REPUBLIC OF KENYA</h2>
          <p className="text-xs opacity-40 max-w-xl mx-auto uppercase tracking-widest">Support the firemen the next life they save might be yours.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
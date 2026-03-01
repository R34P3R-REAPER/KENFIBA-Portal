import React, { useState } from 'react';

// --- ELITE MULTIMEDIA DESIGN SYSTEM ---
const styles = {
  topBanner: "bg-[#000] text-[10px] text-gray-400 py-2 px-8 flex justify-between uppercase tracking-widest font-bold border-b border-gray-800",
  nav: "bg-white sticky top-0 z-50 border-b-4 border-[#006400] px-10 py-5 flex justify-between items-center shadow-lg",
  hero: "relative bg-[#004d00] py-28 px-10 text-white overflow-hidden border-b-8 border-[#FFD700]",
  sectionHead: "text-4xl font-black text-gray-900 mb-8 flex items-center gap-4 uppercase tracking-tighter",
  downloadCard: "bg-white border-2 border-dashed border-gray-200 p-8 rounded-3xl flex items-center justify-between hover:border-[#006400] hover:bg-[#f0f7f0] transition-all group",
  imgCard: "relative overflow-hidden rounded-3xl shadow-xl h-80 group cursor-pointer",
  contactCard: "bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center hover:-translate-y-2 transition-all",
  iconCircle: "w-16 h-16 bg-[#006400] text-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg",
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
    <div className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-[#FFD700]">
      
      {/* 1. TOP IDENTITY BAR */}
      <div className={styles.topBanner}>
        <span>Republic of Kenya Official Stakeholder Portal</span>
        <span className="text-[#FFD700]">Societies Act (Rule 4) • Form C • Reg No. 21578</span>
      </div>

      {/* 2. NAVIGATION */}
      <nav className={styles.nav}>
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 bg-[#006400] rounded-xl flex items-center justify-center text-white border-b-4 border-[#FFD700] shadow-lg font-black text-2xl">K</div>
          <h1 className="text-2xl font-black tracking-tighter">KENFIBA</h1>
        </div>
        <div className="hidden lg:flex gap-10 font-black text-[10px] uppercase tracking-widest">
          <a href="#media" className="hover:text-[#006400]">Media Gallery</a>
          <a href="#downloads" className="hover:text-[#006400]">Statutes & Vault</a>
          <a href="#contact" className="hover:text-[#006400]">Command Center</a>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <header className={styles.hero}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="bg-[#FFD700] text-[#006400] px-6 py-2 rounded-full font-black text-xs uppercase mb-8 inline-block tracking-[0.2em]">National Security Partner</span>
          <h2 className="text-8xl font-black leading-[0.85] mb-8 tracking-tighter uppercase">
            Making Kenya <br/><span className="text-[#FFD700]">Society Safer.</span>
          </h2>
          <p className="text-2xl opacity-80 font-light max-w-3xl mx-auto leading-relaxed italic">
            "Support the firemen; the next life they save might be yours."
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      </header>

      {/* 4. MEDIA GALLERY (Live Links to Action) */}
      <section id="media" className="max-w-7xl mx-auto py-24 px-10">
        <h2 className={styles.sectionHead}><span className="w-2 h-12 bg-[#FFD700]"></span> Media & Operational Proof</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={styles.imgCard}>
            <img src="https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Training" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <p className="text-white font-black uppercase text-sm tracking-widest">Tactical Training Exercises</p>
            </div>
          </div>
          <div className={styles.imgCard}>
            <img src="https://images.unsplash.com/photo-1599700403969-f77b3ca7480d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Response" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <p className="text-white font-black uppercase text-sm tracking-widest">Disaster Response Operations</p>
            </div>
          </div>
          <div className={styles.imgCard}>
            <img src="https://images.unsplash.com/photo-1534073828943-f801091bb240?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Community" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <p className="text-white font-black uppercase text-sm tracking-widest">Community Safety Outreach</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DOWNLOAD VAULT (Official Files) */}
      <section id="downloads" className="bg-[#f0f7f0] py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className={styles.sectionHead}><span className="w-2 h-12 bg-[#006400]"></span> Official Statutes & Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={styles.downloadCard}>
              <div>
                <h4 className="font-black text-xl mb-1">Societies Act (Form C)</h4>
                <p className="text-gray-500 text-sm uppercase font-bold">Certificate of Registration No. 21578</p>
              </div>
              <button className="bg-[#006400] text-[#FFD700] px-6 py-3 rounded-full font-black text-xs shadow-lg">VIEW PDF</button>
            </div>
            <div className={styles.downloadCard}>
              <div>
                <h4 className="font-black text-xl mb-1">KENFIBA Constitution</h4>
                <p className="text-gray-500 text-sm uppercase font-bold">Memorandum of Charitable Objects</p>
              </div>
              <button className="bg-[#006400] text-[#FFD700] px-6 py-3 rounded-full font-black text-xs shadow-lg">DOWNLOAD</button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIAISON COMMAND CENTER (Contact) */}
      <section id="contact" className="max-w-7xl mx-auto py-24 px-10">
        <h2 className={styles.sectionHead}><span className="w-2 h-12 bg-[#FFD700]"></span> Liaison Command Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={styles.contactCard}>
            <div className={styles.iconCircle}>📍</div>
            <h4 className="font-black uppercase tracking-widest mb-4 text-[#006400]">National HQ</h4>
            <p className="text-gray-600 font-medium">Tom Mboya Street, Fire and Ambulance Headquarters, Nairobi, Kenya.</p>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.iconCircle}>📞</div>
            <h4 className="font-black uppercase tracking-widest mb-4 text-[#006400]">Direct Hotlines</h4>
            <p className="text-gray-600 font-medium">+254 (020) 2371263<br/>+254 721 981 017</p>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.iconCircle}>📧</div>
            <h4 className="font-black uppercase tracking-widest mb-4 text-[#006400]">Digital Registry</h4>
            <p className="text-gray-600 font-medium underline">kenfiba@yahoo.com<br/>registry@kenfiba.org</p>
          </div>
        </div>
      </section>

      {/* 7. NATIONAL REGISTRY FORM (Functional Handshake) */}
      <main className="max-w-4xl mx-auto py-24 px-10">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border-t-8 border-[#006400]">
          <h3 className="text-3xl font-black mb-8 text-center uppercase tracking-tighter">Stakeholder Submission</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] outline-none transition-all font-bold" placeholder="OFFICER NAME & RANK" onChange={(e)=>setFormData({...formData, name:e.target.value})} />
            <input className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] outline-none transition-all font-bold" placeholder="DEPARTMENT / COUNTY" onChange={(e)=>setFormData({...formData, office:e.target.value})} />
            <input className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] outline-none transition-all font-bold" placeholder="OFFICIAL EMAIL" onChange={(e)=>setFormData({...formData, email:e.target.value})} />
            <textarea className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] outline-none transition-all font-bold" rows="4" placeholder="REGISTRY DETAILS..." onChange={(e)=>setFormData({...formData, details:e.target.value})}></textarea>
            <button className="w-full bg-[#006400] text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all">Submit to National Registry</button>
            {status && <div className="p-4 bg-gray-900 text-[#FFD700] text-[10px] font-black text-center rounded-xl animate-pulse">{status}</div>}
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#000] text-white py-16 px-10 text-center border-t-8 border-[#FFD700]">
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] mb-6 font-bold italic">Official Liaison Office of KENFIBA</p>
        <p className="text-xs opacity-60">"The association represents the unified voice of disaster responders across the 47 counties of Kenya."</p>
      </footer>
    </div>
  );
}

export default App;
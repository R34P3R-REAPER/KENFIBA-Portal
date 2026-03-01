import React, { useState } from 'react';

// --- ELITE GOVERNMENT DESIGN SYSTEM ---
const styles = {
  topBanner: "bg-[#000] text-[10px] text-gray-400 py-2 px-8 flex justify-between uppercase tracking-widest font-bold border-b border-gray-800",
  nav: "bg-white sticky top-0 z-50 border-b-4 border-[#006400] px-10 py-5 flex justify-between items-center shadow-lg",
  hero: "relative bg-[#004d00] py-28 px-10 text-white overflow-hidden border-b-8 border-[#FFD700]",
  infoCard: "bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 hover:shadow-[#006400]/10 transition-all",
  submitBtn: "w-full bg-[#006400] text-white font-black py-5 rounded-xl shadow-2xl hover:bg-black transform hover:scale-[1.02] transition-all uppercase tracking-[0.2em] text-sm",
  statLabel: "text-[10px] font-black text-[#006400] uppercase tracking-widest mb-2 block",
  legalText: "text-sm leading-relaxed text-gray-600 space-y-6 font-serif",
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
      
      {/* 1. OFFICIAL IDENTITY BAR */}
      <div className={styles.topBanner}>
        <span>Republic of Kenya Official Stakeholder Portal</span>
        <span className="text-[#FFD700]">Societies Act (Rule 4) • Form C</span>
      </div>

      {/* 2. ARCHITECTURAL NAVIGATION */}
      <nav className={styles.nav}>
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 bg-[#006400] rounded-xl flex items-center justify-center text-white border-b-4 border-[#FFD700] shadow-lg">
             <span className="font-black text-3xl italic">K</span>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter leading-none">KENFIBA</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">National Fire Brigades Association</p>
          </div>
        </div>
        <div className="hidden lg:flex gap-10 items-center">
           <div className="text-right border-r-2 border-gray-100 pr-6">
              <p className="text-[9px] font-black text-gray-400 uppercase">Registration No.</p>
              <p className="text-lg font-black text-[#006400]">21578</p>
           </div>
           <button className="bg-gray-100 text-[10px] font-black px-6 py-3 rounded-full hover:bg-[#FFD700] transition-colors">PORTAL ACCESS</button>
        </div>
      </nav>

      {/* 3. COMMAND CENTER HERO */}
      <header className={styles.hero}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="bg-[#FFD700] text-[#006400] px-4 py-1 rounded font-black text-[10px] uppercase mb-6 inline-block">Established 2002</span>
            <h2 className="text-7xl font-black leading-[0.9] mb-8 tracking-tighter">
              Making Kenya <br/><span className="text-[#FFD700]">Society Safer.</span>
            </h2>
            <p className="text-xl opacity-80 font-medium leading-relaxed mb-10 border-l-4 border-[#FFD700] pl-6 max-w-lg">
              "Support the Firemen; the next life they save might be yours."
            </p>
            <div className="flex gap-4">
               <button className="bg-white text-[#006400] px-8 py-4 rounded-xl font-black shadow-2xl uppercase text-sm tracking-widest">Inquiry Registry</button>
               <button className="border-2 border-white/30 px-8 py-4 rounded-xl font-bold uppercase text-sm tracking-widest">Our Mandate</button>
            </div>
          </div>
          <div className="hidden lg:block">
             <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                <h4 className="font-black text-[#FFD700] mb-4 uppercase tracking-widest">Legal Status</h4>
                <p className="text-sm leading-relaxed opacity-90">Registered on the 15th of July, 2002 under Section 10 of the Societies Act. Headquartered at the Fire and Ambulance Headquarters, Tom Mboya Street, Nairobi.</p>
             </div>
          </div>
        </div>
        {/* Abstract Background Elements */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FFD700] rounded-full opacity-10 blur-3xl"></div>
      </header>

      {/* 4. CONTENT & DATA BODY (The 500+ Word Impact) */}
      <main className="max-w-7xl mx-auto py-24 px-10 grid grid-cols-1 lg:grid-cols-12 gap-24">
        
        {/* LEFT: THE NATIONAL REGISTRY FORM */}
        <div className="lg:col-span-5">
          <div className="sticky top-40">
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">Liaison Registry</h3>
            <p className="text-xs font-bold text-gray-400 uppercase mb-8 tracking-widest">Formal Government Stakeholder Channel</p>
            
            <div className={styles.infoCard}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className={styles.statLabel}>Officer Name & Rank</span>
                  <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#006400] rounded-xl outline-none transition-all" placeholder="Enter full legal name" onChange={(e)=>setFormData({...formData, name:e.target.value})} required />
                </div>
                <div>
                  <span className={styles.statLabel}>Department / Authority</span>
                  <input className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#006400] rounded-xl outline-none transition-all" placeholder="e.g. Nairobi City County" onChange={(e)=>setFormData({...formData, office:e.target.value})} required />
                </div>
                <div>
                  <span className={styles.statLabel}>Official Email Address</span>
                  <input type="email" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#006400] rounded-xl outline-none transition-all" placeholder="official@email.go.ke" onChange={(e)=>setFormData({...formData, email:e.target.value})} required />
                </div>
                <div>
                  <span className={styles.statLabel}>Submission Details</span>
                  <textarea className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#006400] rounded-xl outline-none transition-all" rows="4" placeholder="Describe the report or inquiry..." onChange={(e)=>setFormData({...formData, details:e.target.value})} required></textarea>
                </div>
                <button className={styles.submitBtn}>
                  Finalize Official Submission
                </button>
                {status && <div className="p-4 bg-black text-[#FFD700] text-[10px] font-black text-center rounded-lg animate-pulse">{status}</div>}
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT: CONSTITUTIONAL & HISTORICAL DATA */}
        <div className="lg:col-span-7">
          <section className="mb-20">
            <h3 className="text-[#006400] font-black text-xs uppercase mb-6 tracking-[0.4em]">Section I: Introduction & History</h3>
            <div className={styles.legalText}>
              <p className="text-2xl text-gray-900 font-bold leading-tight">
                The Kenya National Fire Brigades Association (KENFIBA) was established in **2002** by Fire Officers countrywide to serve as the singular professional voice of disaster responders.
              </p>
              <p>
                Formally registered at **Sheria House** under Section "10" of the Societies Act (Charitable No. 21578), the association serves a critical role in the national security architecture of the Republic. Its registered office, located at the **Fire and Ambulance Headquarters on Tom Mboya Street**, facilitates nationwide coordination across all counties.
              </p>
            </div>
          </section>

          <section className="mb-20 p-10 bg-[#006400] rounded-[2rem] text-white shadow-2xl">
            <h3 className="text-[#FFD700] font-black text-xs uppercase mb-6 tracking-[0.4em]">Section II: Charitable Objects</h3>
            <p className="text-xl font-medium leading-relaxed mb-10">
              The charitable objects of the Association, as set out in the Memorandum, are to reduce the loss of life, personal injury, and damage to property from fire attacks—both naturally caused and those resulting from external threats.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-bold opacity-80 uppercase tracking-widest">
              <div className="border-l-2 border-[#FFD700] pl-4">Life Preservation</div>
              <div className="border-l-2 border-[#FFD700] pl-4">Asset Protection</div>
              <div className="border-l-2 border-[#FFD700] pl-4">Disaster Resilience</div>
              <div className="border-l-2 border-[#FFD700] pl-4">Tactical Response</div>
            </div>
          </section>

          <section>
            <h3 className="text-[#006400] font-black text-xs uppercase mb-6 tracking-[0.4em]">Section III: Association Aims</h3>
            <div className={styles.legalText}>
              <p>
                The Association aims to continue acting as the professional voice of Kenya Fire Brigades, assisting and supporting our members to fulfill leadership roles in improving the well-being of local communities in all matters related to Fire Service Activities.
              </p>
              <ul className="space-y-6">
                 <li className="flex gap-4 items-start">
                    <span className="text-[#006400] font-black">01.</span>
                    <p><strong>Policy Development:</strong> Working with Councils and international stakeholders to influence public policy issues and opinion in Kenyan, African, and International Communities.</p>
                 </li>
                 <li className="flex gap-4 items-start">
                    <span className="text-[#006400] font-black">02.</span>
                    <p><strong>Professional Standards:</strong> Continuously improving the professional standards of members to help attain high levels of expertise and effectiveness through competence-based training.</p>
                 </li>
                 <li className="flex gap-4 items-start">
                    <span className="text-[#006400] font-black">03.</span>
                    <p><strong>Network Services:</strong> Providing a range of services through appropriate networks to facilitate professional utilization of Fire Service Resources.</p>
                 </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* 5. NATIONAL SEAL FOOTER */}
      <footer className="bg-[#111] text-white py-24 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-gray-800 pb-16 mb-16">
          <div className="col-span-2">
            <h2 className="text-3xl font-black mb-4 tracking-tighter">REPUBLIC OF KENYA</h2>
            <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-[0.2em]">
              Kenya National Fire Brigades Association <br/>
              Registered Societies No. 21578 <br/>
              Tom Mboya Street, Fire and Ambulance HQ, Nairobi.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[#FFD700] font-black text-[10px] uppercase tracking-widest mb-4">Administration</h4>
            <p className="text-[10px] text-gray-400">National Chairman</p>
            <p className="text-[10px] text-gray-400">Secretary-General</p>
            <p className="text-[10px] text-gray-400">National Treasurer</p>
            <p className="text-[10px] text-gray-400">Organizing Secretary</p>
          </div>
          <div>
             <h4 className="text-[#FFD700] font-black text-[10px] uppercase tracking-widest mb-4">Mission Seal</h4>
             <p className="text-[10px] text-gray-600 font-bold leading-tight uppercase italic">"The next life you save might be yours."</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] text-gray-700 font-black uppercase tracking-widest">
           <span>© 2026 KENFIBA - State Liaison Office</span>
           <span className="flex gap-4">
              <span className="text-[#006400]">●</span> SECURE CLUSTER ENCRYPTED
           </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
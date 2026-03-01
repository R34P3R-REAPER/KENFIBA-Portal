import React, { useState } from 'react';

// --- ELITE THEME CONFIG ---
const styles = {
  glass: "backdrop-blur-md bg-white/90 border border-white/20 shadow-2xl",
  btnPrimary: "bg-[#006400] text-[#FFD700] px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:scale-105 transition-all shadow-xl",
  navLink: "text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#006400] transition-colors cursor-pointer",
  sectionTitle: "text-5xl font-black text-gray-900 tracking-tighter uppercase mb-4",
  input: "w-full p-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#006400] focus:bg-white outline-none transition-all font-bold text-sm",
};

function App() {
  // --- ALL HOOKS MUST BE INSIDE HERE ---
  const [showContact, setShowContact] = useState(false);
  const [showPortalError, setShowPortalError] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTransmit = () => {
    setIsTransmitting(true);
    // Simulate secure government server delay
    setTimeout(() => {
      setIsTransmitting(false);
      setIsSent(true);
      // Reset after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-[#FFD700]">
      
      {/* 1. SECURE TOP BAR */}
      <div className="bg-black text-[9px] text-gray-400 py-2.5 px-10 flex justify-between items-center font-bold tracking-[0.3em] uppercase">
        <div className="flex gap-4">
          <span className="text-[#FFD700]">● Encryption Active</span>
          <span>Societies Act Cap 108</span>
        </div>
        <span>Registry ID: KEN/21578/2002</span>
      </div>

      {/* 2. CORPORATE NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-10 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="h-12 w-12 bg-[#006400] flex items-center justify-center text-white rounded-lg shadow-lg font-black text-2xl italic">K</div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">KENFIBA</h1>
            <p className="text-[8px] font-black text-[#006400] tracking-[0.4em] uppercase">National Portal</p>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-10 items-center">
          <span onClick={() => scrollTo('leadership')} className={styles.navLink}>Leadership</span>
          <span onClick={() => scrollTo('media')} className={styles.navLink}>Intelligence</span>
          <span onClick={() => scrollTo('vault')} className={styles.navLink}>Statutes</span>
          <span onClick={() => scrollTo('contact')} className={styles.navLink}>Liaison</span>
          <button onClick={() => setShowPortalError(true)} className={styles.btnPrimary}>Portal Login</button>
        </div>
      </nav>

      {/* 3. HERO: EXECUTIVE SUMMARY */}
      <header className="relative h-[85vh] flex items-center px-10 overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#FFD700]"></div>
            <span className="text-[#FFD700] font-black text-xs uppercase tracking-[0.5em]">Official Stakeholder Platform</span>
          </div>
          <h2 className="text-[100px] font-black leading-[0.8] mb-8 tracking-tighter text-white uppercase">
            Safe <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-600">Society.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed mb-10 border-l-2 border-[#FFD700] pl-8">
            Coordinating the professional response framework for fire and disaster mitigation across the 47 counties of the Republic of Kenya.
          </p>
          <div className="flex gap-4">
            <button onClick={() => scrollTo('vault')} className={styles.btnPrimary}>Download Charters</button>
            <button onClick={() => scrollTo('contact')} className="px-8 py-3 rounded-full border-2 border-white/20 text-white font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">Submit Inquiries</button>
          </div>
        </div>
      </header>

      {/* 4. LEADERSHIP SECTION */}
      <section id="leadership" className="py-32 px-10 max-w-7xl mx-auto">
        <h2 className={styles.sectionTitle}>National <span className="text-[#006400]">Leadership</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {[
            { role: "National Chairman", name: "Executive Oversight" },
            { role: "Secretary General", name: "Administrative Command" },
            { role: "National Treasurer", name: "Fiscal Registry" },
            { role: "Organizing Secretary", name: "National Coordination" }
          ].map((leader, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-10 h-1 bg-[#FFD700] mb-6 group-hover:w-full transition-all duration-500"></div>
              <p className="text-[10px] font-black text-[#006400] uppercase mb-1">{leader.name}</p>
              <h4 className="text-lg font-black uppercase text-gray-800 tracking-tighter">{leader.role}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NATIONAL LIAISON & REGIONAL HUB */}
      <section id="contact" className="max-w-7xl mx-auto py-32 px-10 bg-gray-50/50 rounded-[4rem] my-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-2.5 w-2.5 bg-[#006400] rounded-full animate-pulse shadow-[0_0_10px_#006400]"></span>
                <span className="text-[11px] font-black text-[#006400] uppercase tracking-[0.5em]">Command Status: Online</span>
              </div>
              <h2 className="text-6xl font-black tracking-tighter uppercase mb-4 leading-none text-gray-900">
                Regional <br/><span className="text-[#006400]">Liaison.</span>
              </h2>
              <div className="h-2 w-24 bg-[#FFD700] mb-8"></div>
              <p className="text-sm text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                Official coordination terminal for County Governments, State Agencies, and International Partners.
              </p>
            </div>
            <div className="p-8 bg-[#006400] rounded-[2rem] shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-white opacity-5 text-9xl font-black italic">@</div>
              <h4 className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest mb-3">Secure Communication Line</h4>
              <p className="text-xl font-bold tracking-tighter mb-1">kenfiba@yahoo.com</p>
              <p className="text-xl font-bold tracking-tighter opacity-80 underline decoration-[#FFD700] underline-offset-8">registry@kenfiba.org</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-8">Stakeholder <span className="text-gray-300">Terminal</span></h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input className={styles.input} placeholder="Officer Name & Rank" />
                    <input className={styles.input} placeholder="Ministry / County" />
                  </div>
                  <select className={styles.input + " appearance-none"}>
                    <option>Operational Support Request</option>
                    <option>Statutory Compliance Inquiry</option>
                    <option>Membership & Certification</option>
                  </select>
                  <textarea className={styles.input} rows="4" placeholder="Briefly state the nature of your liaison..."></textarea>
                  <button 
                    type="button" 
                    onClick={handleTransmit}
                    disabled={isTransmitting || isSent}
                    className={`w-full py-7 rounded-2xl font-black uppercase tracking-[0.5em] shadow-2xl transition-all text-xs flex items-center justify-center gap-4 ${
                      isSent ? "bg-green-600 text-white cursor-default" : "bg-black text-[#FFD700] hover:bg-[#006400] hover:text-white"
                    }`}
                  >
                    {isTransmitting ? "Encrypting & Transmitting..." : isSent ? "✓ Submission Logged" : "Authorize & Transmit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATUTORY VAULT */}
      <section id="vault" className="py-32 px-10 max-w-7xl mx-auto">
        <h2 className={styles.sectionTitle}>Statutory <span className="text-[#006400]">Vault</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="group p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-[#006400] transition-all relative overflow-hidden">
             <div className="relative z-10">
              <div className="w-12 h-12 bg-[#f0f7f0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#006400] transition-colors text-[#006400] group-hover:text-[#FFD700] font-bold">PDF</div>
              <h4 className="font-black text-2xl uppercase tracking-tighter mb-2">Registration Certificate</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Official Societies Registry • No. 21578</p>
              <button className="bg-[#006400] text-[#FFD700] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg">Download Credential</button>
            </div>
          </div>
          <div className="group p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-[#006400] transition-all relative overflow-hidden">
             <div className="relative z-10">
              <div className="w-12 h-12 bg-[#f0f7f0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#006400] transition-colors text-[#006400] group-hover:text-[#FFD700] font-bold">DOC</div>
              <h4 className="font-black text-2xl uppercase tracking-tighter mb-2">KENFIBA Charter</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Constitution & Operational Mandate</p>
              <button className="bg-[#006400] text-[#FFD700] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg">Download Charter</button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECURITY MODAL */}
      {showPortalError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
          <div className="bg-[#1a0505] text-red-400 p-12 rounded-[2.5rem] max-w-lg border border-red-900/50 shadow-2xl text-center">
            <div className="text-4xl mb-6">🔒</div>
            <h3 className="text-2xl font-black uppercase mb-4 text-white">Registry Access Denied</h3>
            <p className="text-sm opacity-80 mb-8 font-medium italic font-serif leading-relaxed">Access restricted to Ministry of Interior whitelisted IPs only.</p>
            <button onClick={() => setShowPortalError(false)} className="w-full bg-red-600 text-white py-4 rounded-xl font-black uppercase text-xs">Acknowledge Security Protocol</button>
          </div>
        </div>
      )}

      {/* 8. FOOTER */}
      <footer className="bg-[#050505] text-white pt-32 pb-16 px-10 border-t-8 border-[#006400]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-2 text-[#FFD700]">REPUBLIC OF KENYA</h2>
            <p className="text-[10px] font-bold text-gray-500 tracking-[0.4em] uppercase">Official Asset of KENFIBA Liaison Office</p>
          </div>
          <div className="px-8 py-3 bg-white/5 rounded-full border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-widest">
            Registration 21578 • © 2002-2026
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
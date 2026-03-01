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
  const [showContact, setShowContact] = useState(false);
  const [showPortalError, setShowPortalError] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
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
          <button onClick={() => setShowContact(true)} className="text-[10px] font-black uppercase tracking-widest bg-gray-100 px-6 py-2 rounded-full hover:bg-[#FFD700] transition-all">Quick Contact</button>
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
            <button onClick={() => setShowContact(true)} className="px-8 py-3 rounded-full border-2 border-white/20 text-white font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">Submit Inquiries</button>
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

      {/* 5. MEDIA & INTELLIGENCE */}
      <section id="media" className="bg-[#050505] py-32 px-10 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-16 tracking-tighter uppercase">Operational <span className="text-[#FFD700]">Intelligence</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative h-[450px] overflow-hidden rounded-3xl">
              <img src="https://images.unsplash.com/photo-1599700403969-f77b3ca7480d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black uppercase tracking-tighter">Response Apparatus</h4>
              </div>
            </div>
            <div className="group relative h-[450px] overflow-hidden rounded-3xl md:mt-12">
              <img src="https://images.unsplash.com/photo-1534073828943-f801091bb240?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black uppercase tracking-tighter">Disaster Coordination</h4>
              </div>
            </div>
            <div className="group relative h-[450px] overflow-hidden rounded-3xl">
              <img src="https://images.unsplash.com/photo-1463171359979-330b66a35898?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black p-10 flex flex-col justify-end">
                <h4 className="text-2xl font-black uppercase tracking-tighter">Officer Training</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POP-UP MODAL (CONTACT) */}
      {showContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden relative animate-in zoom-in duration-200">
            <button onClick={() => setShowContact(false)} className="absolute top-6 right-8 font-black text-xl hover:text-red-600 transition-colors">✕</button>
            <div className="p-12">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Registry Liaison</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Official Inquiry Terminal</p>
              <form className="space-y-4">
                <input className={styles.input} placeholder="Officer Name & Rank" />
                <input className={styles.input} placeholder="Authority / Department" />
                <textarea className={styles.input} rows="4" placeholder="Brief Summary of Inquiry..."></textarea>
                <button type="button" className="w-full bg-[#006400] text-white py-5 rounded-xl font-black uppercase tracking-widest">Seal & Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}

     {/* 7. PORTAL ERROR (SECURITY SIMULATION) */}
      {showPortalError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
          <div className="bg-[#1a0505] text-red-400 p-12 rounded-[2.5rem] max-w-lg border border-red-900/50 shadow-[0_0_50px_rgba(220,38,38,0.2)] text-center animate-in zoom-in duration-300">
            
            {/* Animated Shield/Warning Icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-red-600 opacity-20 animate-ping rounded-full"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-red-950 border-2 border-red-500 rounded-full text-4xl shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                🔒
              </div>
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">Registry Access Denied</h3>
            
            <div className="bg-black/40 p-6 rounded-2xl mb-8 border border-red-900/30">
              <p className="text-[10px] font-mono uppercase tracking-widest text-red-500 mb-2">● Security Protocol: 0x99-SHIELD</p>
              <p className="text-sm leading-relaxed opacity-90 font-medium font-serif">
                Access from this terminal is not authorized. The National Fire Registry is restricted to **Ministry of Interior** whitelisted IPs and biometric-verified personnel only.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowPortalError(false)} 
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all"
              >
                Acknowledge Security Protocol
              </button>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">Incident logged: 2026-NFR-AUTH-ERR</p>
            </div>
          </div>
        </div>
      )}


 {/* 8. STATUTORY VAULT */}
      <section id="vault" className="py-32 px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className={styles.sectionTitle}>Statutory <span className="text-[#006400]">Vault</span></h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Legal Framework & Registration Credentials</p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-100 mx-10 mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Certificate Card */}
          <div className="group p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-[#006400] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="text-8xl font-black italic">01</div>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#f0f7f0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#006400] transition-colors">
                <span className="text-[#006400] group-hover:text-[#FFD700] font-bold">PDF</span>
              </div>
              <h4 className="font-black text-2xl uppercase tracking-tighter mb-2">Registration Certificate</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Official Societies Registry • No. 21578</p>
              {/* Ensure you place 'certificate.pdf' in your public folder */}
              <a href="/docs/certificate.pdf" download className="inline-block bg-[#006400] text-[#FFD700] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-black transition-all">
                Download Credential
              </a>
            </div>
          </div>

          {/* Charter Card */}
          <div className="group p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-[#006400] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="text-8xl font-black italic">02</div>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#f0f7f0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#006400] transition-colors">
                <span className="text-[#006400] group-hover:text-[#FFD700] font-bold">DOC</span>
              </div>
              <h4 className="font-black text-2xl uppercase tracking-tighter mb-2">KENFIBA Charter</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Constitution & Operational Mandate</p>
              <a href="/docs/charter.pdf" download className="inline-block bg-[#006400] text-[#FFD700] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-black transition-all">
                Download Charter
              </a>
            </div>
          </div>
        </div>
      </section>
{/* 7. LIAISON COMMAND CENTER */}
      <section id="contact" className="max-w-7xl mx-auto py-32 px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: ACTIONABLE INTEL */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 bg-[#006400] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-[#006400] uppercase tracking-[0.4em]">Live Status: Active</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">Liaison <br/><span className="text-[#006400]">Command.</span></h2>
              <div className="h-1.5 w-20 bg-[#FFD700] mb-8"></div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed uppercase tracking-wider italic">
                "Official Stakeholder Communication Channels for National Fire Coordination."
              </p>
            </div>

            <div className="space-y-6">
              {/* HQ Card */}
              <div className="group flex gap-6 items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-default">
                <div className="h-12 w-12 bg-[#f0f7f0] text-[#006400] flex items-center justify-center rounded-xl text-xl shadow-inner group-hover:bg-[#006400] group-hover:text-white transition-colors">📍</div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">National Headquarters</h4>
                  <p className="text-sm font-bold text-gray-800 leading-tight">Fire & Ambulance HQ,<br/>Tom Mboya Street, Nairobi.</p>
                </div>
              </div>

              {/* Hotline Card */}
              <div className="group flex gap-6 items-start p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-default">
                <div className="h-12 w-12 bg-[#fffcf0] text-[#b8860b] flex items-center justify-center rounded-xl text-xl shadow-inner group-hover:bg-[#FFD700] group-hover:text-[#006400] transition-colors">📞</div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">24/7 Command Hotline</h4>
                  <p className="text-sm font-bold text-gray-800 leading-tight">+254 (020) 2371263<br/>+254 721 981 017</p>
                </div>
              </div>

              {/* Email Card (The Elite CTA) */}
              <div className="flex gap-6 items-start p-6 bg-[#006400] rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all">
                <div className="h-12 w-12 bg-white/10 text-[#FFD700] flex items-center justify-center rounded-xl text-xl">📧</div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">Digital Registry</h4>
                  <p className="text-sm font-bold text-white leading-tight underline underline-offset-4 decoration-[#FFD700]">kenfiba@yahoo.com<br/>registry@kenfiba.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE LIAISON TERMINAL */}
          <div className="lg:col-span-8">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Background Design Element */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#006400] opacity-[0.03] rounded-full"></div>
              
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter">Stakeholder <span className="italic font-serif text-gray-400">Handshake</span></h3>
                <span className="text-[9px] font-black bg-gray-100 px-3 py-1 rounded-full text-gray-500 uppercase">Ref: Form-C/Liaison</span>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Officer Name & Rank</label>
                  <input className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] focus:bg-white outline-none transition-all font-bold text-sm" placeholder="EX: CHIEF OFFICER J. DOE" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Ministry / County Authority</label>
                  <input className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] focus:bg-white outline-none transition-all font-bold text-sm" placeholder="EX: NAIROBI CITY COUNTY" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Official Inquiry Details</label>
                  <textarea className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#006400] focus:bg-white outline-none transition-all font-bold text-sm" rows="4" placeholder="DESCRIBE THE NATURE OF YOUR OFFICIAL LIAISON OR INQUIRY..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="button" className="w-full bg-black text-[#FFD700] py-6 rounded-2xl font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-[#006400] hover:text-white transition-all text-xs active:scale-95">
                    Authorize & Transmit to Registry
                  </button>
                  <p className="text-center mt-6 text-[9px] font-bold text-gray-300 uppercase tracking-widest">Secure State-Liaison Encryption Enabled</p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
      {/* 9. EXECUTIVE FOOTER */}
      <footer className="bg-[#050505] text-white pt-32 pb-16 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-10 bg-[#006400] flex items-center justify-center text-white rounded-lg font-black italic">K</div>
                <h2 className="text-xl font-black tracking-tighter uppercase">KENFIBA</h2>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                The definitive professional authority for fire services and disaster mitigation in the Republic of Kenya.
              </p>
            </div>
            <div>
              <h4 className="text-[#FFD700] font-black text-[10px] uppercase tracking-[0.3em] mb-8">Command Center</h4>
              <p className="text-sm text-gray-400 mb-2 font-bold uppercase">Nairobi Headquarters</p>
              <p className="text-sm text-gray-500">Fire & Ambulance HQ, Tom Mboya Street</p>
            </div>
            <div>
              <h4 className="text-[#FFD700] font-black text-[10px] uppercase tracking-[0.3em] mb-8">Legal Registry</h4>
              <p className="text-sm text-gray-400 mb-2 font-bold uppercase">Societies Act Cap 108</p>
              <p className="text-sm text-gray-500">Registered July 15th, 2002</p>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">
              <span>© 2002-2026</span>
              <span className="h-1 w-1 bg-gray-800 rounded-full"></span>
              <span>Republic of Kenya Official Asset</span>
            </div>
            <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10">
              <p className="text-[9px] font-black text-[#FFD700] uppercase tracking-[0.3em]">Institutional Integrity Guaranteed</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
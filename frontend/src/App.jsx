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
  const [view, setView] = useState('portal'); // 'portal' or 'gallery'
  const [isUrgent, setIsUrgent] = useState(false);
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
{/* 4. OPERATIONS BENTO GRID */}
<section className="max-w-7xl mx-auto py-24 px-10">
  <div className="flex justify-between items-end mb-16">
    <div className="space-y-4">
      <h2 className="text-6xl font-black tracking-tighter uppercase leading-[0.8] text-gray-900">
        National <br /><span className="text-[#006400]">Operations.</span>
      </h2>
      <div className="h-1.5 w-24 bg-[#FFD700]"></div>
    </div>
    <button 
      onClick={() => setView('gallery')}
      className="px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-[#006400] transition-all active:scale-95 shadow-xl"
    >
      Open Full Archive
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[800px]">
    {/* LARGE FEATURE: Training & Drills */}
    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[3rem] bg-gray-100 border border-gray-200 shadow-2xl">
      <img src="https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?q=80&w=1600" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Drills" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
        <span className="text-[#FFD700] text-[10px] font-black uppercase tracking-widest mb-2">Tactical Command</span>
        <h4 className="text-white text-3xl font-black uppercase tracking-tighter">Strategic Response Training</h4>
      </div>
    </div>

    {/* SMALL: Fleet Management */}
    <div className="relative group overflow-hidden rounded-[3rem] bg-gray-100 border border-gray-200">
      <img src="https://images.unsplash.com/photo-1582268611958-ebaf16150267?q=80&w=800" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Fleet" />
      <div className="absolute top-6 left-6 h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white font-black">01</div>
    </div>

    {/* SMALL: Community Impact */}
    <div className="relative group overflow-hidden rounded-[3rem] bg-gray-100 border border-gray-200">
      <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Community" />
    </div>

    {/* WIDE: Equipment Logistics */}
    <div className="md:col-span-2 relative group overflow-hidden rounded-[3rem] bg-black border border-white/10 shadow-3xl">
      <img src="https://images.unsplash.com/photo-1502740479091-635887520276?q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000" alt="Logistics" />
      <div className="absolute inset-0 flex items-center justify-center text-center p-10">
        <h4 className="text-white text-4xl font-black uppercase tracking-widest italic scale-y-125">Equipment Standards</h4>
      </div>
    </div>
  </div>
</section>
{/* THE FULL GALLERY OVERLAY/SUBPAGE */}
{view === 'gallery' && (
  <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-10 animate-in fade-in slide-in-from-bottom-10 duration-500">
    <div className="max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-8xl font-black tracking-tighter uppercase text-gray-900 leading-none">
          National <br /><span className="text-[#006400]">Archives.</span>
        </h1>
        <button 
          onClick={() => setView('portal')}
          className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center font-black uppercase text-[10px] hover:bg-black hover:text-[#FFD700] transition-all"
        >
          Close
        </button>
      </div>

      {/* MASONRY GRID (20+ PICTURES) */}
      <div className="columns-1 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
          <div key={i} className="relative group overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 break-inside-avoid">
            <img 
              src={`https://picsum.photos/seed/${i + 50}/800/${i % 2 === 0 ? '1200' : '800'}`} 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Archive"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
              <span className="text-white text-[9px] font-black uppercase tracking-widest">Case Log: {2020 + i}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
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
{/* 5. OFFICIAL CONTACT & INQUIRY TERMINAL */}
<section id="contact" className="max-w-7xl mx-auto py-24 px-10">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
    
    {/* LEFT COLUMN: COMMAND DIRECTORY */}
    <div className="lg:col-span-5 space-y-12">
      <div>
        <h2 className="text-5xl font-black tracking-tighter uppercase mb-4 leading-none text-gray-900">
          Get In <br /><span className="text-[#006400]">Touch.</span>
        </h2>
        <div className="h-1.5 w-20 bg-[#FFD700] mb-6"></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Official Registry & Support</p>
      </div>

      <div className="space-y-10">
        {/* EMAIL CHANNELS */}
        <div className="group">
          <h4 className="text-[10px] font-black text-[#006400] uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="h-2 w-2 bg-[#006400] rounded-full animate-pulse"></span> 
            Electronic Correspondence
          </h4>
          <div className="space-y-2">
            <a href="mailto:registry@kenfiba.org" className="block text-2xl font-black tracking-tighter text-gray-900 hover:text-[#006400] transition-colors">
              registry@kenfiba.org
            </a>
            <p className="text-lg font-bold text-gray-500 tracking-tight italic">kenfiba@yahoo.com</p>
          </div>
        </div>

        {/* TELEPHONE LINES */}
        <div className="group">
          <h4 className="text-[10px] font-black text-[#006400] uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="h-2 w-2 bg-[#006400] rounded-full animate-pulse"></span> 
            Direct Command Lines
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-3xl font-black tracking-tighter text-gray-900">0724 333 200</p>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Primary Secretariat</span>
            </div>
            <div className="flex gap-8 border-t border-gray-100 pt-4">
              <div>
                <p className="text-lg font-bold tracking-tighter text-gray-600">0768 321 553</p>
                <p className="text-[8px] font-black text-gray-400 uppercase">Operational A</p>
              </div>
              <div>
                <p className="text-lg font-bold tracking-tighter text-gray-600">0795 491 185</p>
                <p className="text-[8px] font-black text-gray-400 uppercase">Operational B</p>
              </div>
            </div>
          </div>
        </div>

        {/* POSTAL ADDRESS */}
        <div className="group pt-4">
          <h4 className="text-[10px] font-black text-[#006400] uppercase tracking-widest mb-4 flex items-center gap-3">
            <span className="h-2 w-2 bg-[#006400] rounded-full"></span> 
            Postal Registry
          </h4>
          <p className="text-lg font-bold tracking-tight text-gray-700 uppercase leading-tight">
            P.O. BOX 15400-00500<br />
            Nairobi, Republic of Kenya
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN: INQUIRY TERMINAL */}
    <div className="lg:col-span-7">
      <div className={`p-12 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden ${isUrgent ? 'bg-red-50 border-red-200 shadow-red-100 shadow-2xl' : 'bg-[#F8F9FA] border-gray-200 shadow-sm'}`}>
        <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-10">
          Inquiry <span className={isUrgent ? "text-red-600" : "text-gray-300"}>{isUrgent ? "EMERGENCY" : "Form"}</span>
        </h3>
        
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input className={styles.input} placeholder="Full Name" />
            <input className={styles.input} placeholder="Mobile Number (07XX...)" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input className={styles.input} placeholder="Email Address" />
            <input className={styles.input} placeholder="Ministry / County / School" />
          </div>

          <select className={styles.input + " appearance-none cursor-pointer"}>
            <option>General Assistance Inquiry</option>
            <option>Membership & Certification</option>
            <option>Statutory Compliance Inquiry</option>
            <option>Operational Support Request</option>
          </select>

          <textarea className={styles.input} rows="4" placeholder="Briefly describe your request..."></textarea>

          {/* URGENT TOGGLE */}
          <div 
            onClick={() => setIsUrgent(!isUrgent)}
            className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-dashed border-gray-300 cursor-pointer hover:border-red-500 transition-all group"
          >
            <div className={`h-6 w-12 rounded-full relative transition-colors ${isUrgent ? 'bg-red-600' : 'bg-gray-300'}`}>
              <div className={`h-4 w-4 bg-white rounded-full absolute top-1 transition-all ${isUrgent ? 'left-7' : 'left-1'}`}></div>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${isUrgent ? 'text-red-600' : 'text-gray-500'}`}>
              Flag as Urgent Operational Response
            </span>
          </div>
          
          <button 
            type="button" 
            onClick={handleTransmit}
            disabled={isTransmitting || isSent}
            className={`w-full py-7 rounded-2xl font-black uppercase tracking-[0.5em] text-xs transition-all shadow-xl ${
              isSent ? "bg-green-600 text-white" : 
              isUrgent ? "bg-red-600 text-white hover:bg-black" : 
              "bg-black text-[#FFD700] hover:bg-[#006400] hover:text-white"
            }`}
          >
            {isTransmitting ? "TRANSMITTING..." : isSent ? "✓ INQUIRY LOGGED" : isUrgent ? "AUTHORIZE EMERGENCY SEND" : "SUBMIT OFFICIAL INQUIRY"}
          </button>
        </form>
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

     {/* 9. COMMAND CENTER FOOTER (STATE-GRADE) */}
      <footer className="bg-[#050505] text-white pt-24 pb-12 px-10 border-t-8 border-[#006400]">
        <div className="max-w-7xl mx-auto">
          
          {/* TOP ROW: OFFICIAL PARTNERS & LOGOS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black">GoK</div>
              <span className="text-[9px] font-black uppercase tracking-widest">Ministry of Interior</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black">NDOC</div>
              <span className="text-[9px] font-black uppercase tracking-widest">Disaster Operations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black">NPS</div>
              <span className="text-[9px] font-black uppercase tracking-widest">Police Service</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black">KFS</div>
              <span className="text-[9px] font-black uppercase tracking-widest">Fire Services</span>
            </div>
          </div>

          {/* MIDDLE ROW: STRATEGIC SITEMAP */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 py-20">
            
            {/* Column 1: Identity */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#006400] flex items-center justify-center text-white rounded font-black italic">K</div>
                <h2 className="text-xl font-black tracking-tighter uppercase">KENFIBA</h2>
              </div>
              <p className="text-[11px] text-gray-500 font-bold leading-relaxed uppercase tracking-wider">
                The National professional authority for fire and disaster mitigation coordination in the Republic of Kenya. 
              </p>
              <div className="pt-4">
                <span className="px-4 py-2 bg-[#006400]/20 border border-[#006400]/50 rounded text-[#FFD700] text-[9px] font-black uppercase tracking-[0.3em]">
                  Status: Gazetted Asset
                </span>
              </div>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h4 className="text-[#FFD700] font-black text-[10px] uppercase tracking-[0.4em] mb-8">Statutory Links</h4>
              <ul className="space-y-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                <li className="hover:text-white cursor-pointer transition-colors">National Fire Policy 2026</li>
                <li className="hover:text-white cursor-pointer transition-colors">County Response Framework</li>
                <li className="hover:text-white cursor-pointer transition-colors">Institutional Membership</li>
                <li className="hover:text-white cursor-pointer transition-colors">Officer Code of Conduct</li>
              </ul>
            </div>

            {/* Column 3: Administration */}
            <div>
              <h4 className="text-[#FFD700] font-black text-[10px] uppercase tracking-[0.4em] mb-8">Administration</h4>
              <ul className="space-y-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                <li onClick={() => scrollTo('leadership')} className="hover:text-white cursor-pointer transition-colors">Executive Board</li>
                <li className="hover:text-white cursor-pointer transition-colors">Registry Verification</li>
                <li className="hover:text-white cursor-pointer transition-colors">Press & Intelligence</li>
                <li onClick={() => setShowPortalError(true)} className="hover:text-red-500 cursor-pointer transition-colors">Officer Portal</li>
              </ul>
            </div>

            {/* Column 4: Reach */}
            <div>
              <h4 className="text-[#FFD700] font-black text-[10px] uppercase tracking-[0.4em] mb-8">Command HQ</h4>
              <div className="space-y-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                <p className="text-white">Fire & Ambulance HQ</p>
                <p>Tom Mboya Street, Nairobi</p>
                <p className="pt-4 text-gray-400">P.O. BOX 42152-00100</p>
                <p className="text-[#006400]">Nairobi, Kenya</p>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: LEGAL & INTEGRITY */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
                © 2002-2026 Republic of Kenya
              </div>
              <div className="h-1 w-1 bg-gray-800 rounded-full hidden md:block"></div>
              <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
                Societies Act Registration 21578
              </div>
            </div>
            
            <div className="flex gap-8 items-center">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-white cursor-pointer">Privacy Protocol</span>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-white cursor-pointer">State Terms</span>
              <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10">
                <p className="text-[9px] font-black text-[#FFD700] uppercase tracking-[0.3em] animate-pulse">National Integrity Verified</p>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Trophy, Menu, X, Shield, Radio, ArrowUpRight, Zap } from 'lucide-react';
import HomePage from './components/HomePage';
import TeamFixturePage from './components/TeamFixturePage';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'fixtures'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 flex flex-col selection:bg-[#ff2a00] selection:text-white font-body relative">
      
      {/* Live Broadcast Marquee Ticker */}
      <div className="bg-[#ff2a00] text-black font-mono text-xs font-bold py-1.5 overflow-hidden border-b border-[#ff2a00]/40 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="flex items-center gap-2">● LIVE EVENT: NMIMS ESPORTS CHAMPIONSHIP 2026</span>
          <span>// SECTOR 01: MUMBAI • SHIRPUR • BENGALURU • HYDERABAD • NAVI MUMBAI</span>
          <span>// TOTAL PRIZE POOL: ₹1,00,000 INR</span>
          <span>// SINGLE ELIMINATION & ROUND-ROBIN LEAGUE FIXTURES GENERATED</span>
          <span className="flex items-center gap-2">● LIVE EVENT: NMIMS ESPORTS CHAMPIONSHIP 2026</span>
          <span>// SECTOR 01: MUMBAI • SHIRPUR • BENGALURU • HYDERABAD • NAVI MUMBAI</span>
          <span>// TOTAL PRIZE POOL: ₹1,00,000 INR</span>
          <span>// SINGLE ELIMINATION & ROUND-ROBIN LEAGUE FIXTURES GENERATED</span>
        </div>
      </div>

      {/* Top Asymmetric Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0c0e14]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-10 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo & Event Credential Pass */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-sm bg-[#ff2a00] text-black font-display font-black text-xl flex items-center justify-center shrink-0 border border-white/20 transform group-hover:-rotate-3 transition-transform">
              N6
            </div>
            <div>
              <div className="font-display font-black text-xl tracking-tight text-white leading-none flex items-center gap-2">
                NMIMS <span className="text-[#ff2a00]">STADIUM '26</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  OFFICIAL ESPORTS PASS
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-semibold hidden sm:inline-block">
                  #NMIMS-ESP-2026
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 bg-[#12151e] p-1.5 rounded-md border border-slate-800">
            <button 
              onClick={() => handleNavClick('home')}
              className={`px-5 py-2 rounded font-display font-bold text-xs uppercase tracking-wider transition ${
                activePage === 'home' 
                  ? 'bg-[#ff2a00] text-black shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              01 // Home
            </button>
            <button 
              onClick={() => handleNavClick('fixtures')}
              className={`px-5 py-2 rounded font-display font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 ${
                activePage === 'fixtures' 
                  ? 'bg-[#ff2a00] text-black shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" /> 02 // Teams & Fixtures
            </button>
          </nav>

          {/* Right Status Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-emerald-400 font-bold uppercase text-[11px]">ARENA LIVE</span>
            </div>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff2a00]" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-slate-800 mt-3 font-display font-bold text-xs uppercase">
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => handleNavClick('home')}
                className={`w-full py-3 px-4 rounded text-left transition flex items-center justify-between ${
                  activePage === 'home' ? 'bg-[#ff2a00] text-black font-black' : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                <span>01 // Home Arena</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleNavClick('fixtures')}
                className={`w-full py-3 px-4 rounded text-left transition flex items-center justify-between ${
                  activePage === 'fixtures' ? 'bg-[#ff2a00] text-black font-black' : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> <span>02 // Teams & Tournament Fixtures</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
        {activePage === 'home' ? (
          <HomePage onNavigateToFixtures={() => handleNavClick('fixtures')} />
        ) : (
          <TeamFixturePage />
        )}
      </main>

      {/* Editorial Arena Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0c0e14] py-8 px-4 lg:px-10 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#ff2a00] text-black font-display font-black text-xs flex items-center justify-center">
              N6
            </div>
            <span className="text-slate-300 font-display font-bold">NMIMS ESPORTS CHAMPIONSHIP 2026</span>
          </div>
          <div className="text-slate-500 text-[11px] text-center md:text-right">
            STUDENT ORGANIZED CAMPUS TOURNAMENT • BUILT FOR COMPETITIVE ESPORTS
          </div>
        </div>
      </footer>

    </div>
  );
}

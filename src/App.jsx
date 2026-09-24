import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import HomePage from './components/HomePage';
import TeamFixturePage from './components/TeamFixturePage';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'fixtures'
  const [initialTab, setInitialTab] = useState('fixtures'); // 'fixtures' | 'teams'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page, targetTab = 'fixtures') => {
    setActivePage(page);
    setInitialTab(targetTab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#111318] cyber-grid font-body text-[#e2e2e8] selection:bg-[#ff5167] selection:text-[#5b0015] min-h-screen flex flex-col justify-between relative overflow-x-hidden">
      {/* Radial ambient glow overlays */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#ff5167]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#00e3fd]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Stitch Header */}
      <header className="w-full bg-[#0c0e12]/80 backdrop-blur-md border-b border-[#282a2e] sticky top-0 z-50 transition-all duration-300">
        <div className="h-20 max-w-6xl mx-auto px-4 md:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer text-left group"
          >
            <div className="w-8 h-8 rounded bg-[#ff5167] text-[#5b0015] font-display font-black text-lg flex items-center justify-center shrink-0">
              N
            </div>
            <span className="font-display font-bold text-xl uppercase tracking-tight text-[#e2e2e8]">
              NEXUS <span className="text-[#ff5167]">ARENA</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('home')}
              className={`nav-link-animated font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                activePage === 'home' 
                  ? 'text-[#e2e2e8] active-nav' 
                  : 'text-[#e6bcbd] hover:text-[#e2e2e8]'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('fixtures')}
              className={`nav-link-animated font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                activePage === 'fixtures' 
                  ? 'text-[#e2e2e8] active-nav' 
                  : 'text-[#e6bcbd] hover:text-[#e2e2e8]'
              }`}
            >
              Teams &amp; Fixtures
            </button>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded bg-[#1e2024] border border-[#282a2e] text-[#e2e2e8]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff5167]" /> : <Menu className="w-5 h-5 text-[#e2e2e8]" />}
          </button>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#282a2e] bg-[#0c0e12] px-4 py-4 flex flex-col gap-3 font-mono text-xs uppercase">
            <button 
              onClick={() => handleNavClick('home')}
              className={`w-full py-2.5 px-4 rounded text-left transition ${
                activePage === 'home' ? 'bg-[#ff5167] text-[#5b0015] font-bold' : 'bg-[#1e2024] text-[#e2e2e8]'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('fixtures')}
              className={`w-full py-2.5 px-4 rounded text-left transition ${
                activePage === 'fixtures' ? 'bg-[#ff5167] text-[#5b0015] font-bold' : 'bg-[#1e2024] text-[#e2e2e8]'
              }`}
            >
              Teams & Fixtures
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-12 flex flex-col justify-center py-10 lg:py-16">
        {activePage === 'home' ? (
          <HomePage onNavigateToFixtures={(targetTab) => handleNavClick('fixtures', targetTab || 'fixtures')} />
        ) : (
          <TeamFixturePage initialTab={initialTab} />
        )}
      </main>

      {/* Stitch Footer */}
      <footer className="w-full bg-[#0c0e12] border-t border-[#282a2e] py-4">
        <div className="max-w-6xl mx-auto px-4 md:px-12 text-center">
          <p className="font-mono text-xs text-[#e6bcbd] tracking-wider uppercase">
            © 2026 NEXUS ARENA • NMIMS ESPORTS CHAMPIONSHIP
          </p>
        </div>
      </footer>

    </div>
  );
}

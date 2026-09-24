import React, { useState } from 'react';
import { Trophy, Menu, X, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white font-sans">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              ⚡
            </div>
            <div>
              <div className="font-bold text-lg text-white leading-none tracking-tight flex items-center gap-1.5">
                NMIMS <span className="text-cyan-400">ESPORTS 2026</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-0.5 font-mono">College Tournament Portal</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
            <button 
              onClick={() => handleNavClick('home')}
              className={`px-4 py-1.5 rounded-md font-medium text-xs uppercase tracking-wider transition ${
                activePage === 'home' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('fixtures')}
              className={`px-4 py-1.5 rounded-md font-medium text-xs uppercase tracking-wider transition flex items-center gap-1.5 ${
                activePage === 'fixtures' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Teams & Fixtures
            </button>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t border-slate-800 mt-3">
            <nav className="flex flex-col gap-2 text-xs uppercase font-semibold">
              <button 
                onClick={() => handleNavClick('home')}
                className={`w-full py-2.5 px-4 rounded-lg text-left transition ${
                  activePage === 'home' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('fixtures')}
                className={`w-full py-2.5 px-4 rounded-lg text-left transition flex items-center gap-2 ${
                  activePage === 'fixtures' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-400" /> <span>Teams & Fixtures</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activePage === 'home' ? (
          <HomePage onNavigateToFixtures={() => handleNavClick('fixtures')} />
        ) : (
          <TeamFixturePage />
        )}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          NMIMS Esports Tournament 2026 • Student Organized Campus Event
        </div>
      </footer>

    </div>
  );
}

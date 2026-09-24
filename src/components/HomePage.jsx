import React, { useState, useEffect } from 'react';
import { Trophy, Swords, Shield, Users, Radio, ArrowUpRight, Flame, Zap, Award, Barcode } from 'lucide-react';

export default function HomePage({ onNavigateToFixtures }) {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 30 });
  const [activeTab, setActiveTab] = useState('fifa');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: Math.max(0, prev.minutes - 1) };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const gameModes = {
    fifa: {
      title: "FIFA '26",
      subtitle: 'Tactical Football & Ultimate Showdown',
      desc: 'High-speed 1v1 and 2v2 tactical football. Precision passing, custom formations, skill execution, and high-pressure penalty shootouts on the grand arena pitch.',
      icon: '⚽',
      specs: { format: 'Knockout & League', duration: '12 Min Matches', mode: '1v1 / 2v2 Squads' }
    },
    minecraft: {
      title: 'MINECRAFT',
      subtitle: 'BedWars & Tactical Survival PvP',
      desc: 'Resource acquisition, speed-building fortresses, and tactical island elimination. Squads defend their team base while raiding opposing beds.',
      icon: '⛏️',
      specs: { format: 'Squad Battle Royale', duration: 'Survival Heat', mode: 'BedWars PvP' }
    },
    valorant: {
      title: 'VALORANT',
      subtitle: '5v5 Tactical Shooter & Agent Utility',
      desc: 'Precise gunplay combined with agent tactical executes. Coordinated entry site takes, spike plant retakes, and 24-round regulation matches.',
      icon: '🎯',
      specs: { format: 'Best of 3 (BO3)', duration: '24 Rounds', mode: '5v5 Tactical FPS' }
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 max-w-full">

      {/* HERO SECTION: Asymmetric 7:5 Editorial Poster & Stadium Pass */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2 sm:pt-6">
        
        {/* Left Column (7 Columns) - Asymmetric Typography & Scoreboard Timer */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Top Event Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded bg-[#12151e] border border-slate-800 text-[#ff2a00] font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#ff2a00] animate-pulse"></span>
            SECTOR 01 // NMIMS CAMPUS ESPORTS TOURNAMENT
          </div>

          {/* Main Massive Poster Display Title */}
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.9] text-left">
            NMIMS <br />
            <span className="text-[#ff2a00]">ESPORTS</span> <br />
            <span className="text-slate-300">2026</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body max-w-xl">
            The official NMIMS campus gaming championship. Manage 5 teams, build 25-player rosters, generate single-elimination & round-robin fixtures, and follow match outcomes.
          </p>

          {/* Arena Scoreboard Countdown Timer */}
          <div className="pt-2 space-y-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#ff2a00]" /> TOURNAMENT LAUNCH COUNTDOWN
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 font-mono">
              <div className="bg-[#12151e] border border-slate-800 p-3 sm:p-4 rounded min-w-[70px] sm:min-w-[85px] text-center shadow-lg">
                <span className="font-display font-black text-2xl sm:text-4xl text-[#ff2a00]">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 block uppercase tracking-wider mt-1 font-sans">Days</span>
              </div>
              <span className="text-xl font-bold text-slate-700">:</span>
              <div className="bg-[#12151e] border border-slate-800 p-3 sm:p-4 rounded min-w-[70px] sm:min-w-[85px] text-center shadow-lg">
                <span className="font-display font-black text-2xl sm:text-4xl text-[#ff2a00]">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 block uppercase tracking-wider mt-1 font-sans">Hours</span>
              </div>
              <span className="text-xl font-bold text-slate-700">:</span>
              <div className="bg-[#12151e] border border-slate-800 p-3 sm:p-4 rounded min-w-[70px] sm:min-w-[85px] text-center shadow-lg">
                <span className="font-display font-black text-2xl sm:text-4xl text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 block uppercase tracking-wider mt-1 font-sans">Mins</span>
              </div>
              <span className="text-xl font-bold text-slate-700">:</span>
              <div className="bg-[#12151e] border border-slate-800 p-3 sm:p-4 rounded min-w-[70px] sm:min-w-[85px] text-center shadow-lg">
                <span className="font-display font-black text-2xl sm:text-4xl text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] text-slate-400 block uppercase tracking-wider mt-1 font-sans">Secs</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 max-w-md">
            <button 
              onClick={onNavigateToFixtures}
              className="px-8 py-4 rounded bg-[#ff2a00] hover:bg-[#e02500] text-black font-display font-black text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 transform hover:translate-x-1 shadow-md"
            >
              <Trophy className="w-4 h-4 text-black" /> Manage Teams & Fixtures <ArrowUpRight className="w-4 h-4" />
            </button>
            <a 
              href="#modes"
              className="px-6 py-4 rounded bg-[#12151e] hover:bg-slate-800 border border-slate-800 text-slate-200 font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              Explore Disciplines
            </a>
          </div>

        </div>

        {/* Right Column (5 Columns) - Rotated Stadium Ticket Credential Card */}
        <div className="lg:col-span-5 relative">
          
          {/* Background Structural Accent Frame */}
          <div className="absolute -inset-2 bg-gradient-to-br from-[#ff2a00]/20 to-amber-500/10 rounded-lg blur-xl opacity-50 pointer-events-none"></div>

          {/* Stadium Pass Card */}
          <div className="relative bg-[#12151e] border-2 border-slate-800 rounded-lg p-6 space-y-6 shadow-2xl transform lg:rotate-1 hover:rotate-0 transition-transform duration-300">
            
            {/* Pass Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#ff2a00] font-bold uppercase tracking-widest block">
                  NMIMS ARENA // TICKET PASS
                </span>
                <h2 className="font-display font-black text-xl text-white mt-1">OFFICIAL CHAMPIONSHIP PASS</h2>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[#ff2a00]">
                <Shield className="w-6 h-6" />
              </div>
            </div>

            {/* Prize Callout Box */}
            <div className="bg-[#08090c] border border-slate-800 p-4 rounded text-left space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4" /> TOTAL CHAMPIONSHIP PRIZE
              </span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white">
                ₹1,00,000 <span className="text-xs font-mono text-slate-400 uppercase font-normal">INR</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">1ST PLACE</span>
                  <span className="font-bold text-amber-400">₹50,000</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">2ND PLACE</span>
                  <span className="font-bold text-slate-300">₹30,000</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">3RD PLACE</span>
                  <span className="font-bold text-amber-500">₹20,000</span>
                </div>
              </div>
            </div>

            {/* Event Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300">
              <div className="p-3 bg-slate-900 rounded border border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase block">Campus Sectors</span>
                <span className="font-bold text-white">5 Regions</span>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase block">Roster Format</span>
                <span className="font-bold text-white">5 Players / Team</span>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase block">Bracket Type</span>
                <span className="font-bold text-cyan-400">Knockout & League</span>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase block">Status</span>
                <span className="font-bold text-emerald-400">Rosters Active</span>
              </div>
            </div>

            {/* Ticket Barcode Footer */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>PASS ID: #2026-NMIMS-ESP</span>
              <span className="tracking-widest text-[#ff2a00] font-bold">||||| ||| |||| || |||</span>
            </div>

          </div>

        </div>

      </section>

      {/* SECTION 2: EDITORIAL PRIZE POSTER & DISCIPLINE SHOWCASE */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-800 pb-4 gap-2">
          <div>
            <span className="text-xs font-mono text-[#ff2a00] uppercase font-bold tracking-widest">
              02 // CHAMPIONSHIP REWARDS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase mt-1">
              PRIZE POOL DISTRIBUTION
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Total Distributed Cash Purse: <strong className="text-white">₹1,00,000 INR</strong>
          </span>
        </div>

        {/* Asymmetric Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1st Place Card - Solar Gold Accent */}
          <div className="bg-[#12151e] border-2 border-amber-500/80 p-6 rounded-lg space-y-4 relative overflow-hidden group hover:border-amber-400 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-3xl font-display font-black text-amber-400">01</span>
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
                CHAMPIONS
              </span>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">1st Place Prize</div>
              <div className="font-display font-black text-4xl text-amber-300 mt-1">₹50,000</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Awarded to the Grand Champion team winning the finals match. Includes official championship trophy and campus medal.
            </p>
          </div>

          {/* 2nd Place Card - Crimson Red Accent */}
          <div className="bg-[#12151e] border-2 border-[#ff2a00]/70 p-6 rounded-lg space-y-4 relative overflow-hidden group hover:border-[#ff2a00] transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-3xl font-display font-black text-[#ff2a00]">02</span>
              <span className="px-2.5 py-1 rounded bg-[#ff2a00]/20 text-[#ff2a00] font-mono text-xs font-bold border border-[#ff2a00]/40">
                RUNNER UP
              </span>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">2nd Place Prize</div>
              <div className="font-display font-black text-4xl text-slate-100 mt-1">₹30,000</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Awarded to the tournament runner-up team advancing through to the Grand Finals match.
            </p>
          </div>

          {/* 3rd Place Card - Slate Steel Accent */}
          <div className="bg-[#12151e] border border-slate-800 p-6 rounded-lg space-y-4 relative overflow-hidden hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-3xl font-display font-black text-slate-400">03</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-700">
                3RD PLACE
              </span>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">3rd Place Prize</div>
              <div className="font-display font-black text-4xl text-slate-300 mt-1">₹20,000</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Awarded to the winner of the 3rd place decider match between semifinalists.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: FEATURED DISCIPLINES (GAME MODES) */}
      <section id="modes" className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-800 pb-4 gap-2">
          <div>
            <span className="text-xs font-mono text-[#ff2a00] uppercase font-bold tracking-widest">
              03 // ARENA DISCIPLINES
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase mt-1">
              FEATURED GAMES
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            3 Core Championship Titles
          </span>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {Object.keys(gameModes).map(key => (
            <button 
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-3 rounded font-display font-bold text-xs uppercase tracking-wider transition ${
                activeTab === key 
                  ? 'bg-[#ff2a00] text-black shadow-md' 
                  : 'bg-[#12151e] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {gameModes[key].icon} {gameModes[key].title}
            </button>
          ))}
        </div>

        {/* Selected Discipline Poster Card */}
        <div className="bg-[#12151e] border border-slate-800 p-6 sm:p-8 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-4 text-left">
            <span className="text-4xl">{gameModes[activeTab].icon}</span>
            <h3 className="font-display font-black text-3xl text-white uppercase">{gameModes[activeTab].title}</h3>
            <div className="text-xs font-mono text-[#ff2a00] font-bold uppercase">{gameModes[activeTab].subtitle}</div>
            <p className="text-sm text-slate-300 leading-relaxed font-body">{gameModes[activeTab].desc}</p>
          </div>

          <div className="md:col-span-4 bg-[#08090c] border border-slate-800 p-5 rounded font-mono text-xs space-y-3">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-500">Format:</span>
              <span className="text-white font-bold">{gameModes[activeTab].specs.format}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-500">Duration:</span>
              <span className="text-amber-400 font-bold">{gameModes[activeTab].specs.duration}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Mode:</span>
              <span className="text-[#ff2a00] font-bold">{gameModes[activeTab].specs.mode}</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

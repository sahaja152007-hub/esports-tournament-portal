import React, { useState, useEffect } from 'react';
import { Trophy, Swords, Shield, Users, Radio, ChevronRight, Globe } from 'lucide-react';

export default function HomePage({ onNavigateToFixtures }) {
  // Countdown state
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
      title: 'FIFA',
      subtitle: 'Competitive Football & Ultimate Team Showdown',
      desc: 'High-speed tactical football matches. Master precision passing, skill moves, tactical formations, and penalty shootouts to dominate the pitch.',
      icon: '⚽',
      stats: { teams: '5 Teams / 25 Players', arena: 'Campus Esports Arena', mode: 'Knockout & League' }
    },
    minecraft: {
      title: 'MINECRAFT',
      subtitle: 'BedWars & Survival PvP Challenges',
      desc: 'Resource management, speed-building, and tactical PvP combat. Squads construct defensive fortresses and eliminate opposing beds to survive.',
      icon: '⛏️',
      stats: { teams: '5 Squads', arena: 'Craft Arena', mode: 'BedWars / Survival' }
    },
    valorant: {
      title: 'VALORANT',
      subtitle: '5v5 Tactical FPS & Agent Abilities',
      desc: 'Precise gunplay meets tactical agent utility. Synchronize team entry executes, spike defenses, and mid-round calls across regulation matches.',
      icon: '🎯',
      stats: { teams: '5 Teams', arena: 'Haven / Ascent', mode: 'Best of 3 (BO3)' }
    }
  };

  return (
    <div className="space-y-12 pb-12 max-w-full">

      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 text-cyan-400" /> NMIMS Esports Championship 2026
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
          NMIMS <span className="text-cyan-400">2026</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
          Official NMIMS College Esports Tournament Portal. Create campus teams, manage 5-player rosters, generate knockout & round-robin fixtures, and follow match results.
        </p>

        {/* Countdown Timer */}
        <div className="pt-2 flex justify-center items-center gap-3 sm:gap-5 font-mono">
          <div className="flex flex-col p-3 rounded-lg bg-slate-950 border border-slate-800 min-w-[70px] sm:min-w-[85px] text-center">
            <span className="text-2xl sm:text-3xl font-bold text-cyan-400">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Days</span>
          </div>
          <span className="text-xl text-slate-600 font-bold">:</span>
          <div className="flex flex-col p-3 rounded-lg bg-slate-950 border border-slate-800 min-w-[70px] sm:min-w-[85px] text-center">
            <span className="text-2xl sm:text-3xl font-bold text-cyan-400">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Hours</span>
          </div>
          <span className="text-xl text-slate-600 font-bold">:</span>
          <div className="flex flex-col p-3 rounded-lg bg-slate-950 border border-slate-800 min-w-[70px] sm:min-w-[85px] text-center">
            <span className="text-2xl sm:text-3xl font-bold text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Mins</span>
          </div>
          <span className="text-xl text-slate-600 font-bold">:</span>
          <div className="flex flex-col p-3 rounded-lg bg-slate-950 border border-slate-800 min-w-[70px] sm:min-w-[85px] text-center">
            <span className="text-2xl sm:text-3xl font-bold text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Secs</span>
          </div>
        </div>

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 max-w-md mx-auto">
          <button 
            onClick={onNavigateToFixtures}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4" /> Teams & Tournament Fixtures <ChevronRight className="w-4 h-4" />
          </button>
          <a 
            href="#modes"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition flex items-center justify-center gap-2"
          >
            Explore Game Modes
          </a>
        </div>
      </section>

      {/* Prize Pool Showcase Section */}
      <section className="max-w-6xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs text-amber-400 uppercase font-semibold tracking-wider">Tournament Rewards</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              ₹1,00,000 Total Prize Pool
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Participating teams compete for cash prize distribution and championship trophies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 text-center">
              <div className="text-xs text-amber-400 font-medium uppercase mb-1">🥇 1st Place</div>
              <div className="text-2xl font-bold text-amber-300">₹50,000</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-700 text-center">
              <div className="text-xs text-slate-300 font-medium uppercase mb-1">🥈 2nd Place</div>
              <div className="text-2xl font-bold text-slate-200">₹30,000</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-800/40 text-center">
              <div className="text-xs text-amber-500 font-medium uppercase mb-1">🥉 3rd Place</div>
              <div className="text-2xl font-bold text-amber-500">₹20,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Game Modes Section */}
      <section id="modes" className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs text-cyan-400 uppercase font-semibold tracking-wider">Featured Disciplines</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Tournament Games</h2>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center flex-wrap gap-2 border-b border-slate-800 pb-4">
          {Object.keys(gameModes).map(key => (
            <button 
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-lg font-medium text-xs uppercase tracking-wider transition ${
                activeTab === key ? 'bg-cyan-600 text-white font-semibold' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {gameModes[key].icon} {gameModes[key].title}
            </button>
          ))}
        </div>

        {/* Selected Mode Detail Card */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2 text-left">
            <span className="text-3xl">{gameModes[activeTab].icon}</span>
            <h3 className="text-xl font-bold text-white">{gameModes[activeTab].title}</h3>
            <h4 className="text-xs font-semibold text-cyan-400">{gameModes[activeTab].subtitle}</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{gameModes[activeTab].desc}</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Scale:</span>
              <span className="text-white font-medium">{gameModes[activeTab].stats.teams}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Arena:</span>
              <span className="text-cyan-300 font-medium">{gameModes[activeTab].stats.arena}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Format:</span>
              <span className="text-amber-300 font-medium">{gameModes[activeTab].stats.mode}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

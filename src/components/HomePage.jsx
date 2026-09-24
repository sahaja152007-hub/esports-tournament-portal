import React, { useState, useEffect } from 'react';

export default function HomePage({ onNavigateToFixtures }) {
  const [activeTab, setActiveTab] = useState('fifa');

  // IntersectionObserver for scroll-triggered reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(section => {
      revealObserver.observe(section);
    });

    return () => revealObserver.disconnect();
  }, []);

  const gameModes = {
    fifa: {
      title: "FIFA '26",
      subtitle: "Tactical Football Showdown",
      desc: "High-speed 1v1 and 2v2 tactical football. Precision passing, skill moves, tactical formations, and high-pressure penalty shootouts.",
      icon: "⚽",
      specs: { format: "Knockout & League", duration: "12 Min Matches", mode: "1v1 / 2v2 Squads" }
    },
    minecraft: {
      title: "MINECRAFT",
      subtitle: "BedWars & Survival PvP",
      desc: "Resource management, speed-building, and tactical island elimination. Squads construct fortresses while raiding opposing beds.",
      icon: "⛏️",
      specs: { format: "Squad Survival", duration: "Heat Format", mode: "BedWars PvP" }
    },
    valorant: {
      title: "VALORANT",
      subtitle: "5v5 Tactical FPS",
      desc: "Precise gunplay meets agent tactical utility. Coordinated site executes, spike defenses, and strategic regulation matches.",
      icon: "🎯",
      specs: { format: "Best of 3 (BO3)", duration: "24 Rounds", mode: "5v5 Tactical Shooter" }
    }
  };

  return (
    <div className="flex flex-col gap-16 md:gap-24 w-full">
      
      {/* Minimal Hero Section - Stitch Export */}
      <section className="flex flex-col items-center text-center gap-4 pt-4 reveal-on-scroll">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e2024] border border-[#282a2e] text-xs font-mono text-[#bdf4ff] uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#ff5167] animate-radar"></span>
          <span>Championship 2026</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#e2e2e8] leading-none">
          NEXUS <span className="text-[#ff5167]">ARENA</span> <span className="text-[#00e3fd]">'26</span>
        </h1>
        <p className="font-mono text-sm sm:text-base text-[#bdf4ff] uppercase tracking-widest font-bold">
          OCTOBER 24 – 28, 2026 • NMIMS CHAMPIONSHIP
        </p>
        <div className="pt-4">
          <button 
            onClick={onNavigateToFixtures}
            className="btn-cyber-glow btn-tactile inline-flex items-center gap-2 px-8 py-3 bg-[#ff5167] hover:bg-[#00e3fd] text-[#680019] hover:text-[#001f24] font-mono text-sm uppercase tracking-wider font-bold transition-all duration-200 clip-chamfer shadow-lg cursor-pointer"
          >
            <span>View Teams &amp; Fixtures</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Minimal Highlights Section: Exactly 3 Stat Cards - Stitch Export */}
      <section className="w-full reveal-on-scroll">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          
          {/* Stat 1: Prize Pool */}
          <div className="card-cyber p-6 bg-[#1e2024] shadow-md flex flex-col items-center text-center gap-1 clip-chamfer border border-[#282a2e] hover:border-[#ff5167]/60">
            <span className="font-mono text-xs text-[#e6bcbd] uppercase tracking-widest">PRIZE POOL</span>
            <span className="font-display text-3xl sm:text-4xl text-[#ff5167] font-bold leading-none mt-1">₹50,000</span>
          </div>

          {/* Stat 2: Format */}
          <div className="card-cyber p-6 bg-[#1e2024] shadow-md flex flex-col items-center text-center gap-1 clip-chamfer border border-[#282a2e] hover:border-[#00e3fd]/60">
            <span className="font-mono text-xs text-[#e6bcbd] uppercase tracking-widest">FORMAT</span>
            <span className="font-display text-2xl sm:text-3xl text-[#bdf4ff] font-bold leading-none mt-1">SINGLE ELIMINATION</span>
          </div>

          {/* Stat 3: Teams */}
          <div className="card-cyber p-6 bg-[#1e2024] shadow-md flex flex-col items-center text-center gap-1 clip-chamfer border border-[#282a2e] hover:border-[#e2e2e8]/60">
            <span className="font-mono text-xs text-[#e6bcbd] uppercase tracking-widest">TEAMS</span>
            <span className="font-display text-3xl sm:text-4xl text-[#e2e2e8] font-bold leading-none mt-1">32 SQUADS</span>
          </div>

        </div>
      </section>

      {/* Tournament Game Disciplines */}
      <section className="w-full max-w-4xl mx-auto space-y-6 reveal-on-scroll">
        <div className="text-center space-y-1">
          <span className="font-mono text-xs text-[#ff5167] uppercase tracking-widest">FEATURED DISCIPLINES</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e2e2e8] uppercase">COMPETITIVE GAMES</h2>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center flex-wrap gap-2">
          {Object.keys(gameModes).map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`btn-tactile px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition clip-chamfer border ${
                activeTab === key 
                  ? 'bg-[#ff5167] text-[#5b0015] font-bold border-[#ff5167]' 
                  : 'bg-[#1e2024] text-[#e6bcbd] hover:text-[#e2e2e8] border-[#282a2e]'
              }`}
            >
              {gameModes[key].icon} {gameModes[key].title}
            </button>
          ))}
        </div>

        {/* Game Detail Chamfer Card */}
        <div className="card-cyber p-6 bg-[#1e2024] border border-[#282a2e] clip-chamfer-lg grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <span className="text-3xl">{gameModes[activeTab].icon}</span>
            <h3 className="font-display text-2xl font-bold text-[#e2e2e8] uppercase">{gameModes[activeTab].title}</h3>
            <div className="font-mono text-xs text-[#00e3fd] font-bold uppercase">{gameModes[activeTab].subtitle}</div>
            <p className="text-sm text-[#e2e2e8]/80 leading-relaxed font-body">{gameModes[activeTab].desc}</p>
          </div>

          <div className="p-4 bg-[#111318] border border-[#282a2e] clip-chamfer font-mono text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-[#282a2e]">
              <span className="text-[#e6bcbd]">Format:</span>
              <span className="text-[#e2e2e8] font-bold">{gameModes[activeTab].specs.format}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#282a2e]">
              <span className="text-[#e6bcbd]">Duration:</span>
              <span className="text-[#bdf4ff] font-bold">{gameModes[activeTab].specs.duration}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#e6bcbd]">Mode:</span>
              <span className="text-[#ff5167] font-bold">{gameModes[activeTab].specs.mode}</span>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Tournament Results & Standings Teaser */}
      <section className="w-full max-w-4xl mx-auto reveal-on-scroll card-cyber relative p-8 md:p-10 bg-[#1e2024] border border-[#282a2e] clip-chamfer-lg shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="corner-bracket absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00e3fd] opacity-60"></div>
        
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111318] border border-[#282a2e] text-xs font-mono text-[#00e3fd] uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00e3fd] animate-radar"></span>
            <span>LIVE TOURNAMENT TELEMETRY</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#e2e2e8] font-black">
            LEAGUE STANDINGS &amp; <span className="text-[#00e3fd]">MATCH RESULTS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-[#e6bcbd] max-w-xl">
            Track live match schedules, single-elimination knockout brackets, and real-time campus standings leaderboards.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={() => onNavigateToFixtures('fixtures')}
            className="btn-cyber-glow btn-tactile inline-flex items-center gap-2 px-6 py-3 bg-[#282a2e] hover:bg-[#00e3fd] text-[#00e3fd] hover:text-[#001f24] border border-[#333539] hover:border-[#00e3fd] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold clip-chamfer shadow-lg cursor-pointer transition-all duration-200"
          >
            <span>VIEW LEAGUE RESULTS</span>
            <span className="material-symbols-outlined text-[18px]">leaderboard</span>
          </button>
        </div>
      </section>

      {/* Collegiate Division Closing CTA Section */}
      <section className="w-full max-w-4xl mx-auto reveal-on-scroll card-cyber relative p-8 md:p-12 bg-[#1e2024] border border-[#282a2e] clip-chamfer-lg shadow-xl flex flex-col items-center text-center gap-6 overflow-hidden">
        <div className="corner-bracket absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00e3fd] opacity-60"></div>
        
        {/* Pill/Badge Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111318] border border-[#282a2e] text-xs font-mono text-[#ff5167] uppercase tracking-widest font-bold">
          <span className="text-[#ff5167] text-[10px]">●</span>
          <span>COLLEGIATE DIVISION</span>
        </div>

        {/* Large Bold Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#e2e2e8] leading-tight max-w-2xl font-black">
          ARE YOU READY TO <span className="text-[#ff5167]">REPRESENT</span> YOUR CAMPUS?
        </h2>

        {/* Subheading */}
        <p className="font-body text-base sm:text-lg text-[#bdf4ff] max-w-md">
          Assemble your squad. Battle for collegiate glory.
        </p>

        {/* CTA Button - Wired to Teams Registration Tab */}
        <div className="pt-2">
          <button
            onClick={() => onNavigateToFixtures('teams')}
            className="btn-cyber-glow btn-tactile inline-flex items-center gap-2 px-6 py-3 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] font-mono text-sm uppercase tracking-wider font-bold clip-chamfer shadow-lg cursor-pointer transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">sports_esports</span>
            <span>JOIN THE CLASH</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

    </div>
  );
}

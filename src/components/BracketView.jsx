import React, { useState } from 'react';
import { Trophy, CheckCircle2, Play, Sparkles } from 'lucide-react';

export default function BracketView({ matches, onSelectMatch, onSimulateMatch, onSimulateAll, champion }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'completed'

  const filteredMatches = matches.filter(m => {
    if (filter === 'upcoming') return m.status === 'UPCOMING';
    if (filter === 'completed') return m.status === 'COMPLETED';
    return true;
  });

  const round1Matches = filteredMatches.filter(m => m.round === 1);
  const round2Matches = filteredMatches.filter(m => m.round === 2);
  const round3Matches = filteredMatches.filter(m => m.round === 3);

  const getMatchCardClass = (status) => {
    if (status === 'COMPLETED') return 'border-emerald-500/50 bg-[#12151e]';
    if (status === 'LIVE') return 'border-[#ff2a00] bg-[#12151e]';
    return 'border-slate-800 bg-[#12151e] hover:border-slate-700';
  };

  return (
    <div className="space-y-6">
      {/* Bracket Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded bg-[#12151e] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[#ff2a00] shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-base text-white uppercase">SINGLE ELIMINATION KNOCKOUT BRACKET</h3>
            <p className="text-xs font-mono text-slate-400">Clear stage progression, matchup details, and match results.</p>
          </div>
        </div>

        {/* Status Filter Buttons & Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto font-display text-xs">
          <div className="flex items-center justify-between sm:justify-start gap-1 bg-[#08090c] p-1 rounded border border-slate-800 font-mono w-full sm:w-auto">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded transition text-center ${filter === 'all' ? 'bg-[#ff2a00] text-black font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              All ({matches.length})
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded transition text-center ${filter === 'upcoming' ? 'bg-[#ff2a00] text-black font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Upcoming ({matches.filter(m => m.status === 'UPCOMING').length})
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded transition text-center ${filter === 'completed' ? 'bg-[#ff2a00] text-black font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Completed ({matches.filter(m => m.status === 'COMPLETED').length})
            </button>
          </div>

          <button 
            onClick={onSimulateAll}
            className="w-full sm:w-auto justify-center px-4 py-2 rounded bg-[#ff2a00] hover:bg-[#e02500] text-black font-black text-xs uppercase tracking-wider transition flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" /> Auto-Simulate Matches
          </button>
        </div>
      </div>

      {/* Champion Banner */}
      {champion && (
        <div className="p-6 rounded bg-[#12151e] border-2 border-amber-400 text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{champion.logo || '🏆'}</span>
            <div>
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">NMIMS 2026 GRAND CHAMPION</span>
              <h2 className="font-display font-black text-3xl text-amber-300 uppercase">{champion.name}</h2>
            </div>
            <span className="text-4xl">{champion.logo || '🏆'}</span>
          </div>
        </div>
      )}

      {/* Visual Bracket Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[920px] grid grid-cols-3 gap-6 relative items-start">

          {/* STAGE 1: QUARTER-FINALS */}
          <div className="space-y-4">
            <div className="text-center font-display font-black text-xs tracking-wider text-[#ff2a00] uppercase py-2.5 bg-[#12151e] rounded border border-slate-800">
              STAGE 01 // QUARTER-FINALS
            </div>

            {round1Matches.length === 0 ? (
              <div className="p-4 rounded bg-[#12151e] border border-slate-800 text-center text-xs text-slate-500 font-mono italic">
                No matches in this view
              </div>
            ) : (
              round1Matches.map((m) => (
                <ClearMatchCard 
                  key={m.id} 
                  match={m} 
                  onSelectMatch={onSelectMatch} 
                  onSimulateMatch={onSimulateMatch}
                  cardClass={getMatchCardClass(m.status)}
                />
              ))
            )}
          </div>

          {/* STAGE 2: SEMIFINALS */}
          <div className="space-y-4">
            <div className="text-center font-display font-black text-xs tracking-wider text-amber-400 uppercase py-2.5 bg-[#12151e] rounded border border-slate-800">
              STAGE 02 // SEMIFINALS
            </div>

            {round2Matches.length === 0 ? (
              <div className="p-4 rounded bg-[#12151e] border border-slate-800 text-center text-xs text-slate-500 font-mono italic">
                No matches in this view
              </div>
            ) : (
              round2Matches.map((m) => (
                <ClearMatchCard 
                  key={m.id} 
                  match={m} 
                  onSelectMatch={onSelectMatch} 
                  onSimulateMatch={onSimulateMatch}
                  cardClass={getMatchCardClass(m.status)}
                />
              ))
            )}
          </div>

          {/* STAGE 3: FINALS */}
          <div className="space-y-4">
            <div className="text-center font-display font-black text-xs tracking-wider text-amber-300 uppercase py-2.5 bg-[#12151e] rounded border border-amber-500/50">
              STAGE 03 // GRAND FINALS
            </div>

            {round3Matches.length === 0 ? (
              <div className="p-4 rounded bg-[#12151e] border border-slate-800 text-center text-xs text-slate-500 font-mono italic">
                No matches in this view
              </div>
            ) : (
              round3Matches.map((m) => (
                <ClearMatchCard 
                  key={m.id} 
                  match={m} 
                  onSelectMatch={onSelectMatch} 
                  onSimulateMatch={onSimulateMatch}
                  cardClass={getMatchCardClass(m.status)}
                  isFinal={true}
                />
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function ClearMatchCard({ match, onSelectMatch, onSimulateMatch, cardClass, isFinal = false }) {
  const isTeam1Winner = match.winnerId && match.winnerId === match.team1?.id;
  const isTeam2Winner = match.winnerId && match.winnerId === match.team2?.id;
  const winnerTeam = isTeam1Winner ? match.team1 : (isTeam2Winner ? match.team2 : null);

  const formatMatchName = (id, num) => {
    if (num) return num.toUpperCase();
    return id.toUpperCase();
  };

  return (
    <div className={`relative rounded border p-4 transition-all ${cardClass} ${isFinal ? 'border-amber-500/80' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 font-mono">
        <span className="font-bold text-xs text-[#ff2a00] tracking-wider">
          {formatMatchName(match.id, match.matchNum)}
        </span>

        <div className="flex items-center gap-2">
          {match.status === 'COMPLETED' && (
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Completed
            </span>
          )}
          {match.status === 'UPCOMING' && (
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
              Upcoming
            </span>
          )}
          {match.status === 'UPCOMING' && match.team1 && match.team2 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSimulateMatch(match);
              }}
              className="px-2.5 py-0.5 rounded bg-[#ff2a00] text-black font-bold text-[10px] flex items-center gap-1 transition"
            >
              <Play className="w-2.5 h-2.5 fill-black" /> Sim
            </button>
          )}
        </div>
      </div>

      {/* Team A vs Team B */}
      <div 
        onClick={() => onSelectMatch(match)}
        className="p-3 rounded bg-[#08090c] border border-slate-800 hover:border-slate-700 cursor-pointer transition space-y-2 mb-3"
      >
        {/* Team A */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl shrink-0 p-1 rounded bg-[#12151e] border border-slate-800">
              {match.team1?.logo || '🛡️'}
            </span>
            <div className="truncate">
              <div className={`font-display font-bold text-sm truncate ${isTeam1Winner ? 'text-[#ff2a00]' : 'text-slate-100'}`}>
                {match.team1?.name || 'TBD'}
              </div>
            </div>
          </div>
          <span className="font-mono text-sm font-bold text-white px-2.5 py-0.5 rounded bg-[#12151e] border border-slate-800 shrink-0">
            {match.score1}
          </span>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center gap-2 my-1">
          <div className="h-px bg-slate-800 flex-1"></div>
          <span className="px-2 py-0.5 rounded bg-[#12151e] text-slate-400 font-mono font-bold text-[10px]">
            VS
          </span>
          <div className="h-px bg-slate-800 flex-1"></div>
        </div>

        {/* Team B */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl shrink-0 p-1 rounded bg-[#12151e] border border-slate-800">
              {match.team2?.logo || '⚔️'}
            </span>
            <div className="truncate">
              <div className={`font-display font-bold text-sm truncate ${isTeam2Winner ? 'text-[#ff2a00]' : 'text-slate-100'}`}>
                {match.team2?.name || 'TBD'}
              </div>
            </div>
          </div>
          <span className="font-mono text-sm font-bold text-white px-2.5 py-0.5 rounded bg-[#12151e] border border-slate-800 shrink-0">
            {match.score2}
          </span>
        </div>
      </div>

      {/* Winner Banner */}
      {winnerTeam && (
        <div className="pt-2 border-t border-slate-800 text-center text-xs font-mono text-emerald-400 flex items-center justify-center gap-1 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Winner: <strong className="text-white font-sans">{winnerTeam.name}</strong>
        </div>
      )}
    </div>
  );
}

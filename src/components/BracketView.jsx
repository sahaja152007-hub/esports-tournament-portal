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
    if (status === 'COMPLETED') return 'border-emerald-500/40 bg-slate-900';
    if (status === 'LIVE') return 'border-cyan-400 bg-slate-900';
    return 'border-slate-800 bg-slate-900 hover:border-slate-700';
  };

  return (
    <div className="space-y-6">
      {/* Bracket Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Single Elimination Tournament Bracket</h3>
            <p className="text-xs text-slate-400">Clear stage progression, matchup details, and results.</p>
          </div>
        </div>

        {/* Status Filter Buttons & Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium w-full sm:w-auto">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md transition text-center ${filter === 'all' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              All ({matches.length})
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md transition text-center ${filter === 'upcoming' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Upcoming ({matches.filter(m => m.status === 'UPCOMING').length})
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md transition text-center ${filter === 'completed' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Completed ({matches.filter(m => m.status === 'COMPLETED').length})
            </button>
          </div>

          <button 
            onClick={onSimulateAll}
            className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" /> Auto-Simulate Matches
          </button>
        </div>
      </div>

      {/* Champion Banner */}
      {champion && (
        <div className="p-5 rounded-xl bg-slate-900 border-2 border-amber-500 text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">{champion.logo || '🏆'}</span>
            <div>
              <span className="text-xs font-mono tracking-wider text-amber-400 uppercase font-semibold">GRAND CHAMPION</span>
              <h2 className="font-bold text-2xl text-amber-300">{champion.name}</h2>
            </div>
            <span className="text-3xl">{champion.logo || '🏆'}</span>
          </div>
        </div>
      )}

      {/* Visual Bracket Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[920px] grid grid-cols-3 gap-6 relative items-start">

          {/* STAGE 1: QUARTER-FINALS */}
          <div className="space-y-4">
            <div className="text-center font-bold text-xs tracking-wider text-cyan-400 uppercase py-2 bg-slate-900 rounded-lg border border-slate-800">
              QUARTER-FINALS
            </div>

            {round1Matches.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500 italic">
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
            <div className="text-center font-bold text-xs tracking-wider text-cyan-400 uppercase py-2 bg-slate-900 rounded-lg border border-slate-800">
              SEMIFINALS
            </div>

            {round2Matches.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500 italic">
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
            <div className="text-center font-bold text-xs tracking-wider text-amber-400 uppercase py-2 bg-slate-900 rounded-lg border border-amber-500/40">
              GRAND FINALS
            </div>

            {round3Matches.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500 italic">
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
    <div className={`relative rounded-xl border p-4 transition-all ${cardClass} ${isFinal ? 'border-amber-500/60' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <span className="font-bold text-xs text-cyan-400 tracking-wider">
          {formatMatchName(match.id, match.matchNum)}
        </span>

        <div className="flex items-center gap-2">
          {match.status === 'COMPLETED' && (
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-mono text-[10px] font-semibold border border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Completed
            </span>
          )}
          {match.status === 'UPCOMING' && (
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
              Upcoming
            </span>
          )}
          {match.status === 'UPCOMING' && match.team1 && match.team2 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSimulateMatch(match);
              }}
              className="px-2 py-0.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px] font-bold flex items-center gap-1 transition"
            >
              <Play className="w-2.5 h-2.5" /> Sim
            </button>
          )}
        </div>
      </div>

      {/* Team A vs Team B */}
      <div 
        onClick={() => onSelectMatch(match)}
        className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition space-y-2 mb-3"
      >
        {/* Team A */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl shrink-0 p-1 rounded bg-slate-900 border border-slate-800">
              {match.team1?.logo || '🛡️'}
            </span>
            <div className="truncate">
              <div className={`font-semibold text-sm truncate ${isTeam1Winner ? 'text-cyan-400 font-bold' : 'text-slate-100'}`}>
                {match.team1?.name || 'TBD'}
              </div>
            </div>
          </div>
          <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0">
            {match.score1}
          </span>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center gap-2 my-1">
          <div className="h-px bg-slate-800 flex-1"></div>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-bold text-[10px]">
            VS
          </span>
          <div className="h-px bg-slate-800 flex-1"></div>
        </div>

        {/* Team B */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl shrink-0 p-1 rounded bg-slate-900 border border-slate-800">
              {match.team2?.logo || '⚔️'}
            </span>
            <div className="truncate">
              <div className={`font-semibold text-sm truncate ${isTeam2Winner ? 'text-cyan-400 font-bold' : 'text-slate-100'}`}>
                {match.team2?.name || 'TBD'}
              </div>
            </div>
          </div>
          <span className="font-mono text-sm font-bold text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0">
            {match.score2}
          </span>
        </div>
      </div>

      {/* Winner Banner */}
      {winnerTeam && (
        <div className="pt-2 border-t border-slate-800 text-center text-xs text-emerald-400 flex items-center justify-center gap-1 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Winner: <strong className="text-white">{winnerTeam.name}</strong>
        </div>
      )}
    </div>
  );
}

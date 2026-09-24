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
    if (status === 'COMPLETED') return 'border-[#5d3f40] bg-[#1e2024]';
    if (status === 'LIVE') return 'border-[#ff5167] bg-[#1e2024]';
    return 'border-[#282a2e] bg-[#1e2024] hover:border-[#333539]';
  };

  return (
    <div className="space-y-6 w-full">
      {/* Bracket Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-[#1e2024] clip-chamfer border border-[#282a2e]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded bg-[#111318] border border-[#282a2e] text-[#ff5167] shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-[#e2e2e8] uppercase">SINGLE ELIMINATION KNOCKOUT BRACKET</h3>
            <p className="text-xs font-mono text-[#e6bcbd]">Clear stage progression, matchup details, and match results.</p>
          </div>
        </div>

        {/* Status Filter Buttons & Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto font-mono text-xs">
          <div className="flex items-center justify-between sm:justify-start gap-1 bg-[#111318] p-1 rounded border border-[#282a2e] w-full sm:w-auto">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded transition text-center ${filter === 'all' ? 'bg-[#ff5167] text-[#5b0015] font-bold' : 'text-[#e6bcbd] hover:text-[#e2e2e8]'}`}
            >
              All ({matches.length})
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded transition text-center ${filter === 'upcoming' ? 'bg-[#ff5167] text-[#5b0015] font-bold' : 'text-[#e6bcbd] hover:text-[#e2e2e8]'}`}
            >
              Upcoming ({matches.filter(m => m.status === 'UPCOMING').length})
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded transition text-center ${filter === 'completed' ? 'bg-[#ff5167] text-[#5b0015] font-bold' : 'text-[#e6bcbd] hover:text-[#e2e2e8]'}`}
            >
              Completed ({matches.filter(m => m.status === 'COMPLETED').length})
            </button>
          </div>

          <button 
            onClick={onSimulateAll}
            className="w-full sm:w-auto justify-center px-4 py-2 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] font-mono font-bold text-xs uppercase tracking-wider transition clip-chamfer flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Auto-Simulate Matches
          </button>
        </div>
      </div>

      {/* Champion Banner */}
      {champion && (
        <div className="p-6 bg-[#1e2024] clip-chamfer border-2 border-[#00e3fd] text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{champion.logo || '🏆'}</span>
            <div>
              <span className="text-xs font-mono tracking-widest text-[#00e3fd] uppercase font-bold">NMIMS 2026 GRAND CHAMPION</span>
              <h2 className="font-display font-black text-3xl text-[#e2e2e8] uppercase">{champion.name}</h2>
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
            <div className="text-center font-mono font-bold text-xs tracking-wider text-[#ff5167] uppercase py-2.5 bg-[#1e2024] clip-chamfer border border-[#282a2e]">
              STAGE 01 // QUARTER-FINALS
            </div>

            {round1Matches.length === 0 ? (
              <div className="p-4 bg-[#1e2024] clip-chamfer border border-[#282a2e] text-center text-xs text-[#e6bcbd] font-mono italic">
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
            <div className="text-center font-mono font-bold text-xs tracking-wider text-[#00e3fd] uppercase py-2.5 bg-[#1e2024] clip-chamfer border border-[#282a2e]">
              STAGE 02 // SEMIFINALS
            </div>

            {round2Matches.length === 0 ? (
              <div className="p-4 bg-[#1e2024] clip-chamfer border border-[#282a2e] text-center text-xs text-[#e6bcbd] font-mono italic">
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
            <div className="text-center font-mono font-bold text-xs tracking-wider text-[#bdf4ff] uppercase py-2.5 bg-[#1e2024] clip-chamfer border border-[#ff5167]">
              STAGE 03 // GRAND FINALS
            </div>

            {round3Matches.length === 0 ? (
              <div className="p-4 bg-[#1e2024] clip-chamfer border border-[#282a2e] text-center text-xs text-[#e6bcbd] font-mono italic">
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
    <div className={`animate-fixture-cascade relative p-4 transition-all clip-chamfer border ${cardClass} ${isFinal ? 'border-[#ff5167]' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#282a2e] pb-2.5 mb-3 font-mono">
        <span className="font-bold text-xs text-[#ff5167] tracking-wider">
          {formatMatchName(match.id, match.matchNum)}
        </span>

        <div className="flex items-center gap-2">
          {match.status === 'COMPLETED' && (
            <span className="px-2 py-0.5 rounded bg-[#111318] text-[#bdf4ff] text-[10px] font-bold border border-[#282a2e] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#00e3fd]" /> Completed
            </span>
          )}
          {match.status === 'UPCOMING' && (
            <span className="px-2 py-0.5 rounded bg-[#111318] text-[#e6bcbd] text-[10px]">
              Upcoming
            </span>
          )}
          {match.status === 'UPCOMING' && match.team1 && match.team2 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSimulateMatch(match);
              }}
              className="px-2.5 py-0.5 rounded bg-[#ff5167] text-[#5b0015] font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
            >
              <Play className="w-2.5 h-2.5 fill-[#5b0015]" /> Sim
            </button>
          )}
        </div>
      </div>

      {/* Team A vs Team B */}
      <div 
        onClick={() => onSelectMatch(match)}
        className="p-3 bg-[#111318] clip-chamfer border border-[#282a2e] hover:border-[#333539] cursor-pointer transition space-y-2 mb-3"
      >
        {/* Team A */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl shrink-0 p-1 rounded bg-[#1e2024] border border-[#282a2e]">
              {match.team1?.logo || '🛡️'}
            </span>
            <div className="truncate">
              <div className={`font-display font-bold text-sm truncate ${isTeam1Winner ? 'text-[#ff5167]' : 'text-[#e2e2e8]'}`}>
                {match.team1?.name || 'TBD'}
              </div>
            </div>
          </div>
          <span className="font-mono text-sm font-bold text-[#e2e2e8] px-2.5 py-0.5 rounded bg-[#1e2024] border border-[#282a2e] shrink-0">
            {match.score1}
          </span>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center gap-2 my-1">
          <div className="h-px bg-[#282a2e] flex-1"></div>
          <span className="px-2 py-0.5 rounded bg-[#1e2024] text-[#e6bcbd] font-mono font-bold text-[10px]">
            VS
          </span>
          <div className="h-px bg-[#282a2e] flex-1"></div>
        </div>

        {/* Team B */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl shrink-0 p-1 rounded bg-[#1e2024] border border-[#282a2e]">
              {match.team2?.logo || '⚔️'}
            </span>
            <div className="truncate">
              <div className={`font-display font-bold text-sm truncate ${isTeam2Winner ? 'text-[#ff5167]' : 'text-[#e2e2e8]'}`}>
                {match.team2?.name || 'TBD'}
              </div>
            </div>
          </div>
          <span className="font-mono text-sm font-bold text-[#e2e2e8] px-2.5 py-0.5 rounded bg-[#1e2024] border border-[#282a2e] shrink-0">
            {match.score2}
          </span>
        </div>
      </div>

      {/* Winner Banner */}
      {winnerTeam && (
        <div className="pt-2 border-t border-[#282a2e] text-center text-xs font-mono text-[#00e3fd] flex items-center justify-center gap-1 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" /> Winner: <strong className="text-[#e2e2e8] font-body">{winnerTeam.name}</strong>
        </div>
      )}
    </div>
  );
}

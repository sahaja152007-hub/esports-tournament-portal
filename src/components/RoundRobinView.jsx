import React, { useState } from 'react';
import { Table, Trophy, Play, CheckCircle2, Sparkles } from 'lucide-react';

export default function RoundRobinView({ matches, teams, onSelectMatch, onSimulateMatch, onSimulateAll }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'completed'

  const filteredMatches = matches.filter(m => {
    if (filter === 'upcoming') return m.status === 'UPCOMING';
    if (filter === 'completed') return m.status === 'COMPLETED';
    return true;
  });

  // Calculate Standings Table from matches
  const standings = teams.map(team => {
    let played = 0;
    let wins = 0;
    let losses = 0;
    let points = 0;
    let roundsWon = 0;
    let roundsLost = 0;

    matches.forEach(m => {
      if (m.status === 'COMPLETED') {
        if (m.team1?.id === team.id) {
          played++;
          roundsWon += m.score1;
          roundsLost += m.score2;
          if (m.winnerId === team.id) {
            wins++;
            points += 3;
          } else {
            losses++;
          }
        } else if (m.team2?.id === team.id) {
          played++;
          roundsWon += m.score2;
          roundsLost += m.score1;
          if (m.winnerId === team.id) {
            wins++;
            points += 3;
          } else {
            losses++;
          }
        }
      }
    });

    return {
      team,
      played,
      wins,
      losses,
      points,
      diff: roundsWon - roundsLost
    };
  });

  // Sort by Points descending, then by diff
  standings.sort((a, b) => b.points - a.points || b.diff - a.diff);

  const formatMatchName = (id, num, index) => {
    if (num) return num.toUpperCase();
    return `MATCH ${String(index + 1).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Standings Table Section */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" /> Round-Robin League Standings
          </h3>
          <button 
            onClick={onSimulateAll}
            className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4" /> Auto-Simulate League
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase text-[11px]">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-4">Team</th>
                <th className="py-3 px-3 text-center">Played</th>
                <th className="py-3 px-3 text-center">Wins</th>
                <th className="py-3 px-3 text-center">Losses</th>
                <th className="py-3 px-3 text-center">Diff</th>
                <th className="py-3 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {standings.map((item, index) => (
                <tr 
                  key={item.team.id}
                  className={`transition hover:bg-slate-800/40 ${
                    index === 0 ? 'bg-amber-950/20 font-bold' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    {index === 0 ? (
                      <span className="text-amber-400 font-bold">🥇 1</span>
                    ) : (
                      <span className="text-slate-400 px-1">{index + 1}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                    <span className="text-lg">{item.team.logo}</span>
                    <span>{item.team.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">[{item.team.tag}]</span>
                  </td>
                  <td className="py-3 px-3 text-center text-slate-300">{item.played}</td>
                  <td className="py-3 px-3 text-center text-emerald-400 font-bold">{item.wins}</td>
                  <td className="py-3 px-3 text-center text-red-400 font-bold">{item.losses}</td>
                  <td className={`py-3 px-3 text-center font-bold ${item.diff > 0 ? 'text-emerald-400' : (item.diff < 0 ? 'text-red-400' : 'text-slate-400')}`}>
                    {item.diff > 0 ? `+${item.diff}` : item.diff}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-cyan-400 text-sm">{item.points} PTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixtures Schedule Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Table className="w-5 h-5 text-cyan-400 shrink-0" /> League Fixtures ({matches.length} Matches)
          </h3>

          {/* Status Filter Buttons */}
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
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMatches.map((match, i) => {
            const isTeam1Winner = match.winnerId === match.team1?.id;
            const isTeam2Winner = match.winnerId === match.team2?.id;
            const winnerTeam = isTeam1Winner ? match.team1 : (isTeam2Winner ? match.team2 : null);

            return (
              <div 
                key={match.id}
                onClick={() => onSelectMatch(match)}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition space-y-3"
              >
                {/* 1. MATCH HEADER */}
                <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800 pb-2">
                  <span className="font-bold text-xs text-cyan-400">
                    {formatMatchName(match.id, match.matchNum, i)}
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
                    {match.status === 'UPCOMING' && (
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

                {/* 2. TEAMS COMPARISON */}
                <div className="grid grid-cols-7 items-center text-center py-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="col-span-3 flex items-center gap-2 justify-start min-w-0">
                    <span className="text-xl shrink-0">{match.team1?.logo || '🛡️'}</span>
                    <span className={`font-semibold text-xs sm:text-sm truncate ${isTeam1Winner ? 'text-cyan-400 font-bold' : 'text-slate-200'}`}>
                      {match.team1?.name || 'TBD'}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center justify-center font-mono font-bold text-sm text-cyan-400 bg-slate-900 py-1 px-2 rounded border border-slate-800">
                    {match.score1}:{match.score2}
                  </div>

                  <div className="col-span-3 flex items-center gap-2 justify-end min-w-0">
                    <span className={`font-semibold text-xs sm:text-sm truncate ${isTeam2Winner ? 'text-cyan-400 font-bold' : 'text-slate-200'}`}>
                      {match.team2?.name || 'TBD'}
                    </span>
                    <span className="text-xl shrink-0">{match.team2?.logo || '⚔️'}</span>
                  </div>
                </div>

                {/* 3. WINNER DISPLAY */}
                {winnerTeam && (
                  <div className="text-center text-xs text-emerald-400 font-semibold pt-1">
                    Winner: <strong className="text-white">{winnerTeam.name}</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
    <div className="space-y-8">
      {/* Standings Table Section */}
      <div className="p-5 rounded bg-[#12151e] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono text-[#ff2a00] font-bold uppercase tracking-wider block">
              LEAGUE TABLE // ROUND-ROBIN
            </span>
            <h3 className="font-display font-black text-lg text-white flex items-center gap-2 uppercase mt-0.5">
              <Trophy className="w-5 h-5 text-amber-400 shrink-0" /> CAMPUS STANDINGS LEADERBOARD
            </h3>
          </div>
          <button 
            onClick={onSimulateAll}
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded bg-[#ff2a00] hover:bg-[#e02500] text-black font-display font-black text-xs uppercase tracking-wider transition flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4" /> Auto-Simulate League
          </button>
        </div>

        <div className="overflow-x-auto rounded border border-slate-800 bg-[#08090c]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0c0e14] text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-4"># RANK</th>
                <th className="py-3 px-4">TEAM NAME</th>
                <th className="py-3 px-3 text-center">PLAYED</th>
                <th className="py-3 px-3 text-center">WINS</th>
                <th className="py-3 px-3 text-center">LOSSES</th>
                <th className="py-3 px-3 text-center">DIFF</th>
                <th className="py-3 px-4 text-right">POINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {standings.map((item, index) => (
                <tr 
                  key={item.team.id}
                  className={`transition hover:bg-slate-900/60 ${
                    index === 0 ? 'bg-amber-950/20 font-bold' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    {index === 0 ? (
                      <span className="text-amber-400 font-bold">🥇 #01</span>
                    ) : (
                      <span className="text-slate-500 font-bold">#{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-display font-bold text-white flex items-center gap-2.5 text-sm">
                    <span className="text-lg p-1 rounded bg-[#12151e] border border-slate-800">{item.team.logo}</span>
                    <span>{item.team.name}</span>
                    <span className="text-[10px] text-[#ff2a00] font-mono">[{item.team.tag}]</span>
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate-300">{item.played}</td>
                  <td className="py-3.5 px-3 text-center text-emerald-400 font-bold">{item.wins}</td>
                  <td className="py-3.5 px-3 text-center text-red-400 font-bold">{item.losses}</td>
                  <td className={`py-3.5 px-3 text-center font-bold ${item.diff > 0 ? 'text-emerald-400' : (item.diff < 0 ? 'text-red-400' : 'text-slate-500')}`}>
                    {item.diff > 0 ? `+${item.diff}` : item.diff}
                  </td>
                  <td className="py-3.5 px-4 text-right font-display font-black text-[#ff2a00] text-base">{item.points} PTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixtures Schedule Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded bg-[#12151e] border border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-[#ff2a00] font-bold uppercase tracking-wider block">
              SCHEDULE // LEAGUE MATCHUPS
            </span>
            <h3 className="font-display font-black text-base text-white uppercase flex items-center gap-2 mt-0.5">
              <Table className="w-5 h-5 text-[#ff2a00] shrink-0" /> LEAGUE FIXTURES ({matches.length} MATCHES)
            </h3>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center justify-between sm:justify-start gap-1 bg-[#08090c] p-1 rounded border border-slate-800 font-mono text-xs w-full sm:w-auto">
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
                className="p-4 rounded bg-[#12151e] border border-slate-800 hover:border-slate-700 cursor-pointer transition space-y-3"
              >
                {/* MATCH HEADER */}
                <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800 pb-2">
                  <span className="font-bold text-xs text-[#ff2a00]">
                    {formatMatchName(match.id, match.matchNum, i)}
                  </span>

                  <div className="flex items-center gap-2">
                    {match.status === 'COMPLETED' && (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                    {match.status === 'UPCOMING' && (
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono text-[10px]">
                        Upcoming
                      </span>
                    )}
                    {match.status === 'UPCOMING' && (
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

                {/* TEAMS COMPARISON */}
                <div className="grid grid-cols-7 items-center text-center py-1 bg-[#08090c] p-3 rounded border border-slate-800">
                  <div className="col-span-3 flex items-center gap-2 justify-start min-w-0">
                    <span className="text-xl shrink-0">{match.team1?.logo || '🛡️'}</span>
                    <span className={`font-display font-bold text-xs sm:text-sm truncate ${isTeam1Winner ? 'text-[#ff2a00]' : 'text-slate-200'}`}>
                      {match.team1?.name || 'TBD'}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center justify-center font-mono font-bold text-sm text-[#ff2a00] bg-[#12151e] py-1 px-2 rounded border border-slate-800">
                    {match.score1}:{match.score2}
                  </div>

                  <div className="col-span-3 flex items-center gap-2 justify-end min-w-0">
                    <span className={`font-display font-bold text-xs sm:text-sm truncate ${isTeam2Winner ? 'text-[#ff2a00]' : 'text-slate-200'}`}>
                      {match.team2?.name || 'TBD'}
                    </span>
                    <span className="text-xl shrink-0">{match.team2?.logo || '⚔️'}</span>
                  </div>
                </div>

                {/* WINNER DISPLAY */}
                {winnerTeam && (
                  <div className="text-center text-xs font-mono text-emerald-400 font-bold pt-1">
                    Winner: <strong className="text-white font-sans">{winnerTeam.name}</strong>
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

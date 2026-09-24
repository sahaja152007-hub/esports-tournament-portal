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
      <div className="p-5 bg-[#1e2024] clip-chamfer border border-[#282a2e] space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#282a2e] pb-3">
          <div>
            <span className="text-[10px] font-mono text-[#ff5167] font-bold uppercase tracking-wider block">
              LEAGUE TABLE // ROUND-ROBIN
            </span>
            <h3 className="font-display font-black text-lg text-[#e2e2e8] flex items-center gap-2 uppercase mt-0.5">
              <Trophy className="w-5 h-5 text-[#00e3fd] shrink-0" /> CAMPUS STANDINGS LEADERBOARD
            </h3>
          </div>
          <button 
            onClick={onSimulateAll}
            className="w-full sm:w-auto justify-center px-4 py-2.5 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] font-mono font-bold text-xs uppercase tracking-wider transition clip-chamfer flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Auto-Simulate League
          </button>
        </div>

        <div className="overflow-x-auto clip-chamfer border border-[#282a2e] bg-[#111318]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#282a2e] bg-[#111318] text-[#e6bcbd] uppercase text-[10px] font-bold">
                <th className="py-3 px-4"># RANK</th>
                <th className="py-3 px-4">TEAM NAME</th>
                <th className="py-3 px-3 text-center">PLAYED</th>
                <th className="py-3 px-3 text-center">WINS</th>
                <th className="py-3 px-3 text-center">LOSSES</th>
                <th className="py-3 px-3 text-center">DIFF</th>
                <th className="py-3 px-4 text-right">POINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282a2e]">
              {standings.map((item, index) => (
                <tr 
                  key={item.team.id}
                  className={`transition hover:bg-[#1e2024]/60 ${
                    index === 0 ? 'bg-[#ff5167]/10 font-bold' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    {index === 0 ? (
                      <span className="text-[#00e3fd] font-bold">🥇 #01</span>
                    ) : (
                      <span className="text-[#e6bcbd] font-bold">#{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-display font-bold text-[#e2e2e8] flex items-center gap-2.5 text-sm">
                    <span className="text-lg p-1 rounded bg-[#1e2024] border border-[#282a2e]">{item.team.logo}</span>
                    <span>{item.team.name}</span>
                    <span className="text-[10px] text-[#ff5167] font-mono">[{item.team.tag}]</span>
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#e2e2e8]">{item.played}</td>
                  <td className="py-3.5 px-3 text-center text-[#00e3fd] font-bold">{item.wins}</td>
                  <td className="py-3.5 px-3 text-center text-[#ff5167] font-bold">{item.losses}</td>
                  <td className={`py-3.5 px-3 text-center font-bold ${item.diff > 0 ? 'text-[#00e3fd]' : (item.diff < 0 ? 'text-[#ff5167]' : 'text-[#e6bcbd]')}`}>
                    {item.diff > 0 ? `+${item.diff}` : item.diff}
                  </td>
                  <td className="py-3.5 px-4 text-right font-display font-black text-[#ff5167] text-base">{item.points} PTS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixtures Schedule Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#1e2024] clip-chamfer border border-[#282a2e]">
          <div>
            <span className="text-[10px] font-mono text-[#ff5167] font-bold uppercase tracking-wider block">
              SCHEDULE // LEAGUE MATCHUPS
            </span>
            <h3 className="font-display font-black text-base text-[#e2e2e8] uppercase flex items-center gap-2 mt-0.5">
              <Table className="w-5 h-5 text-[#ff5167] shrink-0" /> LEAGUE FIXTURES ({matches.length} MATCHES)
            </h3>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center justify-between sm:justify-start gap-1 bg-[#111318] p-1 clip-chamfer border border-[#282a2e] font-mono text-xs w-full sm:w-auto">
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
                className="p-4 bg-[#1e2024] clip-chamfer border border-[#282a2e] hover:border-[#333539] cursor-pointer transition space-y-3"
              >
                {/* MATCH HEADER */}
                <div className="flex justify-between items-center text-xs font-mono border-b border-[#282a2e] pb-2">
                  <span className="font-bold text-xs text-[#ff5167]">
                    {formatMatchName(match.id, match.matchNum, i)}
                  </span>

                  <div className="flex items-center gap-2">
                    {match.status === 'COMPLETED' && (
                      <span className="px-2 py-0.5 rounded bg-[#111318] text-[#00e3fd] font-mono text-[10px] font-bold border border-[#282a2e] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#00e3fd]" /> Completed
                      </span>
                    )}
                    {match.status === 'UPCOMING' && (
                      <span className="px-2 py-0.5 rounded bg-[#111318] text-[#e6bcbd] font-mono text-[10px]">
                        Upcoming
                      </span>
                    )}
                    {match.status === 'UPCOMING' && (
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

                {/* TEAMS COMPARISON */}
                <div className="grid grid-cols-7 items-center text-center py-1 bg-[#111318] p-3 clip-chamfer border border-[#282a2e]">
                  <div className="col-span-3 flex items-center gap-2 justify-start min-w-0">
                    <span className="text-xl shrink-0 p-1 rounded bg-[#1e2024] border border-[#282a2e]">{match.team1?.logo || '🛡️'}</span>
                    <span className={`font-display font-bold text-xs sm:text-sm truncate ${isTeam1Winner ? 'text-[#ff5167]' : 'text-[#e2e2e8]'}`}>
                      {match.team1?.name || 'TBD'}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center justify-center font-mono font-bold text-sm text-[#ff5167] bg-[#1e2024] py-1 px-2 rounded border border-[#282a2e]">
                    {match.score1}:{match.score2}
                  </div>

                  <div className="col-span-3 flex items-center gap-2 justify-end min-w-0">
                    <span className={`font-display font-bold text-xs sm:text-sm truncate ${isTeam2Winner ? 'text-[#ff5167]' : 'text-[#e2e2e8]'}`}>
                      {match.team2?.name || 'TBD'}
                    </span>
                    <span className="text-xl shrink-0 p-1 rounded bg-[#1e2024] border border-[#282a2e]">{match.team2?.logo || '⚔️'}</span>
                  </div>
                </div>

                {/* WINNER DISPLAY */}
                {winnerTeam && (
                  <div className="text-center text-xs font-mono text-[#00e3fd] font-bold pt-1">
                    Winner: <strong className="text-[#e2e2e8] font-body">{winnerTeam.name}</strong>
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

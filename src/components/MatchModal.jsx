import React from 'react';
import { X, Trophy, Swords, UserCheck, Flame } from 'lucide-react';

export default function MatchModal({ match, onClose, onUpdateScore }) {
  if (!match) return null;

  const team1 = match.team1;
  const team2 = match.team2;

  const handleScoreChange = (t1Score, t2Score) => {
    onUpdateScore(match.id, parseInt(t1Score) || 0, parseInt(t2Score) || 0);
  };

  const handleQuickWinner = (winnerTeam) => {
    if (winnerTeam === 'team1') {
      onUpdateScore(match.id, 2, 1);
    } else {
      onUpdateScore(match.id, 1, 2);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-base text-white">Match Details - {match.matchNum || 'Fixtures'}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Teams Arena Banner */}
        <div className="flex flex-col sm:grid sm:grid-cols-7 items-center text-center bg-slate-950 p-5 rounded-xl border border-slate-800 gap-4">
          {/* Team 1 */}
          <div className="sm:col-span-3 flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-slate-900 border border-slate-800">
              {team1?.logo || '🛡️'}
            </div>
            <h3 className="font-bold text-base text-white">{team1?.name || 'TBD'}</h3>
          </div>

          {/* VS & Score Inputs */}
          <div className="sm:col-span-1 flex flex-col items-center justify-center gap-1.5">
            <span className="font-bold text-slate-500 text-sm">VS</span>
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 font-mono font-bold text-lg text-cyan-400">
              <input 
                type="number" 
                min="0"
                max="5"
                value={match.score1} 
                onChange={(e) => handleScoreChange(e.target.value, match.score2)}
                className="w-8 text-center bg-transparent focus:outline-none focus:text-cyan-300 border-b border-slate-700"
              />
              <span>:</span>
              <input 
                type="number" 
                min="0"
                max="5"
                value={match.score2} 
                onChange={(e) => handleScoreChange(match.score1, e.target.value)}
                className="w-8 text-center bg-transparent focus:outline-none focus:text-pink-300 border-b border-slate-700"
              />
            </div>
          </div>

          {/* Team 2 */}
          <div className="sm:col-span-3 flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-slate-900 border border-slate-800">
              {team2?.logo || '⚔️'}
            </div>
            <h3 className="font-bold text-base text-white">{team2?.name || 'TBD'}</h3>
          </div>
        </div>

        {/* Quick Win Selection Buttons */}
        {team1 && team2 && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => handleQuickWinner('team1')}
              className="flex-1 py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Trophy className="w-4 h-4 text-cyan-400" /> Declare {team1.name} Winner
            </button>
            <button 
              onClick={() => handleQuickWinner('team2')}
              className="flex-1 py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Trophy className="w-4 h-4 text-cyan-400" /> Declare {team2.name} Winner
            </button>
          </div>
        )}

        {/* Lineup rosters preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> {team1?.name || 'Team 1'} Roster
            </h4>
            <ul className="space-y-1 text-slate-400">
              {team1?.members?.map((m) => (
                <li key={m.id} className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-slate-200">{m.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">{m.role}</span>
                </li>
              )) || <li className="italic text-slate-600">No roster added yet</li>}
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <h4 className="font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> {team2?.name || 'Team 2'} Roster
            </h4>
            <ul className="space-y-1 text-slate-400">
              {team2?.members?.map((m) => (
                <li key={m.id} className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-slate-200">{m.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">{m.role}</span>
                </li>
              )) || <li className="italic text-slate-600">No roster added yet</li>}
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition"
          >
            Save & Close
          </button>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { X, Trophy, Swords, UserCheck } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#12151e] border-2 border-slate-800 rounded p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-display">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-[#ff2a00]" />
            <span className="font-black text-base text-white uppercase">MATCH DETAILS // {match.matchNum || 'FIXTURE'}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Teams Arena Banner */}
        <div className="flex flex-col sm:grid sm:grid-cols-7 items-center text-center bg-[#08090c] p-6 rounded border border-slate-800 gap-4">
          {/* Team 1 */}
          <div className="sm:col-span-3 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded flex items-center justify-center text-3xl bg-[#12151e] border border-slate-800">
              {team1?.logo || '🛡️'}
            </div>
            <h3 className="font-display font-black text-lg text-white uppercase">{team1?.name || 'TBD'}</h3>
          </div>

          {/* VS & Score Inputs */}
          <div className="sm:col-span-1 flex flex-col items-center justify-center gap-2 font-mono">
            <span className="font-display font-black text-slate-500 text-base">VS</span>
            <div className="flex items-center gap-2 bg-[#12151e] px-3 py-2 rounded border border-slate-800 font-bold text-xl text-[#ff2a00]">
              <input 
                type="number" 
                min="0"
                max="5"
                value={match.score1} 
                onChange={(e) => handleScoreChange(e.target.value, match.score2)}
                className="w-8 text-center bg-transparent focus:outline-none focus:text-[#ff2a00] border-b border-slate-700"
              />
              <span>:</span>
              <input 
                type="number" 
                min="0"
                max="5"
                value={match.score2} 
                onChange={(e) => handleScoreChange(match.score1, e.target.value)}
                className="w-8 text-center bg-transparent focus:outline-none focus:text-amber-400 border-b border-slate-700"
              />
            </div>
          </div>

          {/* Team 2 */}
          <div className="sm:col-span-3 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded flex items-center justify-center text-3xl bg-[#12151e] border border-slate-800">
              {team2?.logo || '⚔️'}
            </div>
            <h3 className="font-display font-black text-lg text-white uppercase">{team2?.name || 'TBD'}</h3>
          </div>
        </div>

        {/* Quick Win Selection Buttons */}
        {team1 && team2 && (
          <div className="flex flex-col sm:flex-row gap-3 font-display">
            <button 
              onClick={() => handleQuickWinner('team1')}
              className="flex-1 py-2.5 px-4 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[#ff2a00] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <Trophy className="w-4 h-4 text-[#ff2a00]" /> Declare {team1.name} Winner
            </button>
            <button 
              onClick={() => handleQuickWinner('team2')}
              className="flex-1 py-2.5 px-4 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[#ff2a00] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <Trophy className="w-4 h-4 text-[#ff2a00]" /> Declare {team2.name} Winner
            </button>
          </div>
        )}

        {/* Lineup rosters preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded bg-[#08090c] border border-slate-800">
            <h4 className="font-display font-bold text-slate-300 mb-2 flex items-center gap-1.5 uppercase">
              <UserCheck className="w-4 h-4 text-[#ff2a00]" /> {team1?.name || 'Team 1'} Roster
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              {team1?.members?.map((m) => (
                <li key={m.id} className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-slate-200">{m.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#12151e] text-slate-300 border border-slate-800">{m.role}</span>
                </li>
              )) || <li className="italic text-slate-600">No roster added yet</li>}
            </ul>
          </div>

          <div className="p-4 rounded bg-[#08090c] border border-slate-800">
            <h4 className="font-display font-bold text-slate-300 mb-2 flex items-center gap-1.5 uppercase">
              <UserCheck className="w-4 h-4 text-[#ff2a00]" /> {team2?.name || 'Team 2'} Roster
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              {team2?.members?.map((m) => (
                <li key={m.id} className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-slate-200">{m.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#12151e] text-slate-300 border border-slate-800">{m.role}</span>
                </li>
              )) || <li className="italic text-slate-600">No roster added yet</li>}
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-3 border-t border-slate-800 font-display">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded bg-[#ff2a00] hover:bg-[#e02500] text-black text-xs font-black uppercase tracking-wider transition"
          >
            Save & Close
          </button>
        </div>

      </div>
    </div>
  );
}

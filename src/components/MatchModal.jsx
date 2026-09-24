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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111318]/90 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1e2024] clip-chamfer-lg border-2 border-[#ff5167] p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#282a2e] font-display">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-[#ff5167]" />
            <span className="font-black text-base text-[#e2e2e8] uppercase">MATCH DETAILS // {match.matchNum || 'FIXTURE'}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-[#e6bcbd] hover:text-[#e2e2e8] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Teams Arena Banner */}
        <div className="flex flex-col sm:grid sm:grid-cols-7 items-center text-center bg-[#111318] clip-chamfer p-6 border border-[#282a2e] gap-4">
          {/* Team 1 */}
          <div className="sm:col-span-3 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded flex items-center justify-center text-3xl bg-[#1e2024] border border-[#282a2e]">
              {team1?.logo || '🛡️'}
            </div>
            <h3 className="font-display font-black text-lg text-[#e2e2e8] uppercase">{team1?.name || 'TBD'}</h3>
          </div>

          {/* VS & Score Inputs */}
          <div className="sm:col-span-1 flex flex-col items-center justify-center gap-2 font-mono">
            <span className="font-display font-black text-[#e6bcbd] text-base">VS</span>
            <div className="flex items-center gap-2 bg-[#1e2024] px-3 py-2 clip-chamfer border border-[#282a2e] font-bold text-xl text-[#ff5167]">
              <input 
                type="number" 
                min="0"
                max="5"
                value={match.score1} 
                onChange={(e) => handleScoreChange(e.target.value, match.score2)}
                className="w-8 text-center bg-transparent focus:outline-none focus:text-[#00e3fd] border-b border-[#282a2e]"
              />
              <span>:</span>
              <input 
                type="number" 
                min="0"
                max="5"
                value={match.score2} 
                onChange={(e) => handleScoreChange(match.score1, e.target.value)}
                className="w-8 text-center bg-transparent focus:outline-none focus:text-[#00e3fd] border-b border-[#282a2e]"
              />
            </div>
          </div>

          {/* Team 2 */}
          <div className="sm:col-span-3 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded flex items-center justify-center text-3xl bg-[#1e2024] border border-[#282a2e]">
              {team2?.logo || '⚔️'}
            </div>
            <h3 className="font-display font-black text-lg text-[#e2e2e8] uppercase">{team2?.name || 'TBD'}</h3>
          </div>
        </div>

        {/* Quick Win Selection Buttons */}
        {team1 && team2 && (
          <div className="flex flex-col sm:flex-row gap-3 font-mono">
            <button 
              onClick={() => handleQuickWinner('team1')}
              className="flex-1 py-2.5 px-4 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] clip-chamfer text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Trophy className="w-4 h-4" /> Declare {team1.name} Winner
            </button>
            <button 
              onClick={() => handleQuickWinner('team2')}
              className="flex-1 py-2.5 px-4 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] clip-chamfer text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Trophy className="w-4 h-4" /> Declare {team2.name} Winner
            </button>
          </div>
        )}

        {/* Lineup rosters preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-[#111318] clip-chamfer border border-[#282a2e]">
            <h4 className="font-display font-bold text-[#e2e2e8] mb-2 flex items-center gap-1.5 uppercase">
              <UserCheck className="w-4 h-4 text-[#ff5167]" /> {team1?.name || 'Team 1'} Roster
            </h4>
            <ul className="space-y-1.5 text-[#e6bcbd]">
              {team1?.members?.map((m) => (
                <li key={m.id} className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-[#e2e2e8]">{m.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e2024] text-[#00e3fd] border border-[#282a2e]">{m.role}</span>
                </li>
              )) || <li className="italic text-[#e6bcbd]">No roster added yet</li>}
            </ul>
          </div>

          <div className="p-4 bg-[#111318] clip-chamfer border border-[#282a2e]">
            <h4 className="font-display font-bold text-[#e2e2e8] mb-2 flex items-center gap-1.5 uppercase">
              <UserCheck className="w-4 h-4 text-[#ff5167]" /> {team2?.name || 'Team 2'} Roster
            </h4>
            <ul className="space-y-1.5 text-[#e6bcbd]">
              {team2?.members?.map((m) => (
                <li key={m.id} className="flex justify-between items-center py-0.5">
                  <span className="font-medium text-[#e2e2e8]">{m.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e2024] text-[#00e3fd] border border-[#282a2e]">{m.role}</span>
                </li>
              )) || <li className="italic text-[#e6bcbd]">No roster added yet</li>}
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-3 border-t border-[#282a2e] font-mono">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] clip-chamfer text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            Save & Close
          </button>
        </div>

      </div>
    </div>
  );
}

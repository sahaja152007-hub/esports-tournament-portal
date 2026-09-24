import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Shield, Plus, Trophy, RefreshCw, 
  Trash2, AlertCircle, X
} from 'lucide-react';
import BracketView from './BracketView';
import RoundRobinView from './RoundRobinView';
import MatchModal from './MatchModal';
import { 
  INITIAL_PRESET_TEAMS, TEAM_LOGOS, PLAYER_ROLES 
} from '../utils/sampleData';

export default function TeamFixturePage({ initialTab = 'fixtures' }) {
  // State initialization with localStorage persistence
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('nexus_teams');
    return saved ? JSON.parse(saved) : INITIAL_PRESET_TEAMS;
  });

  const [activeTab, setActiveTab] = useState(initialTab); // 'fixtures' | 'teams'

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [fixtureFormat, setFixtureFormat] = useState('single'); // 'single' | 'roundrobin'
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('nexus_matches');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [champion, setChampion] = useState(null);

  // Modal States
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  // Add Team Form State
  const [newTeam, setNewTeam] = useState({
    name: '',
    tag: '',
    logo: '⚡'
  });

  // Add Player Form State
  const [newPlayer, setNewPlayer] = useState({
    teamId: '',
    name: '',
    tag: '',
    role: 'Entry Fragger'
  });

  const [formError, setFormError] = useState('');

  // Save to localStorage whenever teams change
  useEffect(() => {
    localStorage.setItem('nexus_teams', JSON.stringify(teams));
  }, [teams]);

  // Save to localStorage whenever matches change
  useEffect(() => {
    localStorage.setItem('nexus_matches', JSON.stringify(matches));
  }, [matches]);

  // Scroll reveal observer for major sections
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
  }, [activeTab]);

  // Auto-generate initial single-elimination fixtures if teams exist but no matches generated yet
  useEffect(() => {
    if (teams.length >= 2 && matches.length === 0) {
      generateFixtures(teams, 'single');
    }
  }, []);

  // Handler: Generate Fixtures
  const generateFixtures = (teamsList, format) => {
    if (!teamsList || teamsList.length < 2) {
      setMatches([]);
      return;
    }

    if (format === 'single') {
      const generatedMatches = [];
      const numTeams = teamsList.length;

      // Round 1 (Quarter-Finals)
      generatedMatches.push({
        id: 'm1',
        round: 1,
        matchNum: 'QF 1',
        team1: teamsList[0] || null,
        team2: teamsList[1] || null,
        score1: 0,
        score2: 0,
        status: 'UPCOMING',
        winnerId: null
      });

      if (numTeams >= 4) {
        generatedMatches.push({
          id: 'm2',
          round: 1,
          matchNum: 'QF 2',
          team1: teamsList[2] || null,
          team2: teamsList[3] || null,
          score1: 0,
          score2: 0,
          status: 'UPCOMING',
          winnerId: null
        });
      } else {
        generatedMatches.push({
          id: 'm2',
          round: 1,
          matchNum: 'QF 2 (BYE)',
          team1: teamsList[2] || null,
          team2: null,
          score1: 2,
          score2: 0,
          status: 'COMPLETED',
          winnerId: teamsList[2]?.id || null
        });
      }

      // Round 2 (Semifinals)
      generatedMatches.push({
        id: 'm3',
        round: 2,
        matchNum: 'SEMI 1',
        team1: null,
        team2: teamsList[4] || null,
        score1: 0,
        score2: 0,
        status: 'UPCOMING',
        winnerId: null
      });

      // Round 3 (Grand Finals)
      generatedMatches.push({
        id: 'm4',
        round: 3,
        matchNum: 'FINALS',
        team1: null,
        team2: null,
        score1: 0,
        score2: 0,
        status: 'UPCOMING',
        winnerId: null
      });

      setMatches(generatedMatches);
    } else {
      // Round Robin Format: Every team plays every other team
      const rrMatches = [];
      let matchCount = 1;
      for (let i = 0; i < teamsList.length; i++) {
        for (let j = i + 1; j < teamsList.length; j++) {
          rrMatches.push({
            id: `rr-${matchCount}`,
            round: 1,
            matchNum: `Match ${matchCount}`,
            team1: teamsList[i],
            team2: teamsList[j],
            score1: 0,
            score2: 0,
            status: 'UPCOMING',
            winnerId: null
          });
          matchCount++;
        }
      }
      setMatches(rrMatches);
    }
  };

  // Handler: Quick Load 5 Preset Teams
  const handleQuickLoadPresets = () => {
    setTeams(INITIAL_PRESET_TEAMS);
    generateFixtures(INITIAL_PRESET_TEAMS, fixtureFormat);
    setChampion(null);
    setFormError('');
  };

  // Handler: Reset All Teams & Matches
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all teams, rosters, and fixtures?')) {
      setTeams([]);
      setMatches([]);
      setChampion(null);
      localStorage.removeItem('nexus_teams');
      localStorage.removeItem('nexus_matches');
    }
  };

  // Handler: Create New Team (Modal Submission)
  const handleCreateTeamSubmit = (e) => {
    e.preventDefault();
    if (!newTeam.name.trim() || !newTeam.tag.trim()) {
      setFormError('Please enter a valid Team Name and Tag.');
      return;
    }

    const createdTeam = {
      id: `team-${Date.now()}`,
      name: newTeam.name.trim(),
      tag: newTeam.tag.trim().toUpperCase(),
      logo: newTeam.logo || '⚡',
      color: '#ff5167',
      members: []
    };

    const updatedTeams = [...teams, createdTeam];
    setTeams(updatedTeams);
    setNewTeam({ name: '', tag: '', logo: '⚡' });
    setFormError('');
    setIsAddTeamModalOpen(false);

    if (updatedTeams.length >= 2) {
      generateFixtures(updatedTeams, fixtureFormat);
    }
  };

  // Handler: Add Participant / Member to Team (Modal Submission)
  const handleAddPlayerSubmit = (e) => {
    e.preventDefault();
    if (!newPlayer.teamId) {
      setFormError('Please select a team for this participant.');
      return;
    }
    if (!newPlayer.name.trim() || !newPlayer.tag.trim()) {
      setFormError('Please enter participant name and gamer tag.');
      return;
    }

    const playerObj = {
      id: `player-${Date.now()}`,
      name: newPlayer.name.trim(),
      tag: newPlayer.tag.trim(),
      role: newPlayer.role || 'Member'
    };

    const updatedTeams = teams.map(t => {
      if (t.id === newPlayer.teamId) {
        return { ...t, members: [...t.members, playerObj] };
      }
      return t;
    });

    setTeams(updatedTeams);
    setNewPlayer({ teamId: '', name: '', tag: '', role: 'Entry Fragger' });
    setFormError('');
    setIsAddPlayerModalOpen(false);
  };

  // Handler: Delete Team
  const handleDeleteTeam = (teamId) => {
    if (window.confirm('Delete this team and its members?')) {
      const updatedTeams = teams.filter(t => t.id !== teamId);
      setTeams(updatedTeams);
      generateFixtures(updatedTeams, fixtureFormat);
    }
  };

  // Handler: Delete Player Member
  const handleDeletePlayer = (teamId, playerId) => {
    const updatedTeams = teams.map(t => {
      if (t.id === teamId) {
        return { ...t, members: t.members.filter(m => m.id !== playerId) };
      }
      return t;
    });
    setTeams(updatedTeams);
  };

  // Handler: Update Match Score (Simulate)
  const handleUpdateScore = (matchId, s1, s2) => {
    const winner = s1 > s2 ? selectedMatch.team1 : (s2 > s1 ? selectedMatch.team2 : null);

    const updated = matches.map(m => {
      if (m.id === matchId) {
        return { ...m, score1: s1, score2: s2, status: 'COMPLETED', winnerId: winner?.id || null };
      }
      return m;
    });

    if (fixtureFormat === 'single') {
      if (matchId === 'm1' && winner) {
        const semiMatch = updated.find(m => m.id === 'm3');
        if (semiMatch) semiMatch.team1 = winner;
      } else if (matchId === 'm2' && winner) {
        const semiMatch = updated.find(m => m.id === 'm3');
        if (!semiMatch.team2) semiMatch.team2 = winner;
      } else if (matchId === 'm3' && winner) {
        const finalMatch = updated.find(m => m.id === 'm4');
        if (finalMatch) finalMatch.team1 = winner;
      } else if (matchId === 'm4' && winner) {
        setChampion(winner);
      }
    }

    setMatches(updated);
    setSelectedMatch(null);
  };

  // Handler: Simulate Single Match Quick
  const handleSimulateMatch = (match) => {
    if (match.status === 'COMPLETED') return;
    if (!match.team1 || !match.team2) return;

    let score1 = Math.floor(Math.random() * 3) + 1;
    let score2 = Math.floor(Math.random() * 3);
    if (score1 === score2) score1 += 1;

    handleUpdateScore(match.id, score1, score2);
  };

  // Handler: Simulate All Matches
  const handleSimulateAll = () => {
    let currentMatches = [...matches];
    
    currentMatches.forEach(m => {
      if (m.status === 'UPCOMING' && m.team1 && m.team2) {
        let s1 = Math.floor(Math.random() * 3) + 1;
        let s2 = Math.floor(Math.random() * 3);
        if (s1 === s2) s1 += 1;
        m.score1 = s1;
        m.score2 = s2;
        m.status = 'COMPLETED';
        m.winnerId = s1 > s2 ? m.team1.id : m.team2.id;
      }
    });

    if (fixtureFormat === 'single') {
      const m1 = currentMatches.find(m => m.id === 'm1');
      const m2 = currentMatches.find(m => m.id === 'm2');
      const m3 = currentMatches.find(m => m.id === 'm3');
      const m4 = currentMatches.find(m => m.id === 'm4');

      if (m1 && m1.winnerId) {
        const w1 = m1.winnerId === m1.team1?.id ? m1.team1 : m1.team2;
        if (m3) m3.team1 = w1;
      }

      if (m2 && m2.winnerId) {
        const w2 = m2.winnerId === m2.team1?.id ? m2.team1 : m2.team2;
        if (m3 && !m3.team2) m3.team2 = w2;
      }

      if (m3 && m3.team1 && m3.team2 && m3.status === 'UPCOMING') {
        let s1 = Math.floor(Math.random() * 3) + 1;
        let s2 = Math.floor(Math.random() * 3);
        if (s1 === s2) s1 += 1;
        m3.score1 = s1;
        m3.score2 = s2;
        m3.status = 'COMPLETED';
        m3.winnerId = s1 > s2 ? m3.team1.id : m3.team2.id;
      }

      if (m3 && m3.winnerId && m4) {
        const w3 = m3.winnerId === m3.team1?.id ? m3.team1 : m3.team2;
        m4.team1 = w3;
        if (teams.length >= 5) m4.team2 = teams[4];
      }

      if (m4 && m4.team1 && m4.team2 && m4.status === 'UPCOMING') {
        let s1 = Math.floor(Math.random() * 3) + 1;
        let s2 = Math.floor(Math.random() * 3);
        if (s1 === s2) s1 += 1;
        m4.score1 = s1;
        m4.score2 = s2;
        m4.status = 'COMPLETED';
        m4.winnerId = s1 > s2 ? m4.team1.id : m4.team2.id;
        setChampion(s1 > s2 ? m4.team1 : m4.team2);
      }
    }

    setMatches(currentMatches);
  };

  // Flat list of participants for table
  const allParticipants = teams.flatMap(team => 
    team.members.map(member => ({
      ...member,
      teamName: team.name,
      teamTag: team.tag,
      teamLogo: team.logo,
      teamId: team.id
    }))
  );

  return (
    <div className="space-y-8 pb-12 w-full">

      {/* Stitch Telemetry Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#1e2024] p-6 clip-chamfer border border-[#282a2e] reveal-on-scroll">
        <div>
          <span className="font-mono text-xs text-[#e6bcbd] uppercase tracking-widest block">
            TELEMETRY NODE // TOURNAMENT HUB
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[#e2e2e8] uppercase mt-1 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#ff5167]" /> TEAMS &amp; FIXTURES
          </h1>
        </div>

        {/* Header Primary Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto font-mono text-xs">
          <button 
            onClick={() => { setFormError(''); setIsAddTeamModalOpen(true); }}
            className="btn-tactile btn-cyber-glow px-4 py-2.5 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] font-bold uppercase tracking-wider transition clip-chamfer flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Team
          </button>
          
          <button 
            onClick={() => { setFormError(''); setIsAddPlayerModalOpen(true); }}
            className="btn-tactile px-4 py-2.5 bg-[#282a2e] hover:bg-[#333539] text-[#bdf4ff] border border-[#333539] font-bold uppercase tracking-wider transition clip-chamfer flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-[#00e3fd]" /> Add Participant
          </button>

          <button 
            onClick={handleQuickLoadPresets}
            className="btn-tactile px-3 py-2.5 bg-[#282a2e] hover:bg-[#333539] text-[#e2e2e8] border border-[#333539] font-mono text-xs clip-chamfer cursor-pointer"
            title="Load Preset Teams"
          >
            Load 5 Sample Teams
          </button>

          <button 
            onClick={handleReset}
            className="btn-tactile p-2.5 bg-[#282a2e] hover:bg-[#93000a] text-[#e2e2e8] hover:text-[#ffdad6] border border-[#333539] transition clip-chamfer cursor-pointer"
            title="Reset All Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#282a2e] pb-4 reveal-on-scroll">
        <div className="flex items-center gap-2 font-mono text-xs">
          <button 
            onClick={() => setActiveTab('fixtures')}
            className={`btn-tactile px-5 py-2.5 font-bold uppercase tracking-wider transition clip-chamfer ${
              activeTab === 'fixtures' ? 'bg-[#ff5167] text-[#5b0015]' : 'bg-[#1e2024] text-[#e6bcbd] border border-[#282a2e] hover:text-[#e2e2e8]'
            }`}
          >
            <Trophy className="w-4 h-4 inline-block mr-1.5" /> 01 // Tournament Fixtures ({matches.length})
          </button>
          <button 
            onClick={() => setActiveTab('teams')}
            className={`btn-tactile px-5 py-2.5 font-bold uppercase tracking-wider transition clip-chamfer ${
              activeTab === 'teams' ? 'bg-[#ff5167] text-[#5b0015]' : 'bg-[#1e2024] text-[#e6bcbd] border border-[#282a2e] hover:text-[#e2e2e8]'
            }`}
          >
            <Users className="w-4 h-4 inline-block mr-1.5" /> 02 // Teams &amp; Rosters ({teams.length})
          </button>
        </div>

        {/* Fixture Format Selector */}
        {activeTab === 'fixtures' && (
          <div className="flex items-center gap-1 bg-[#1e2024] p-1 clip-chamfer border border-[#282a2e] font-mono text-xs">
            <button 
              onClick={() => {
                setFixtureFormat('single');
                generateFixtures(teams, 'single');
              }}
              className={`px-3 py-1.5 rounded transition ${
                fixtureFormat === 'single' ? 'bg-[#111318] text-[#00e3fd] font-bold border border-[#282a2e]' : 'text-[#e6bcbd] hover:text-[#e2e2e8]'
              }`}
            >
              Knockout Bracket
            </button>
            <button 
              onClick={() => {
                setFixtureFormat('roundrobin');
                generateFixtures(teams, 'roundrobin');
              }}
              className={`px-3 py-1.5 rounded transition ${
                fixtureFormat === 'roundrobin' ? 'bg-[#111318] text-[#00e3fd] font-bold border border-[#282a2e]' : 'text-[#e6bcbd] hover:text-[#e2e2e8]'
              }`}
            >
              Round-Robin League
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: FIXTURES & BRACKET VIEW */}
      {activeTab === 'fixtures' && (
        <div>
          {matches.length === 0 ? (
            <div className="text-center py-12 p-6 bg-[#1e2024] clip-chamfer border border-[#282a2e] space-y-3">
              <Trophy className="w-10 h-10 text-[#5d3f40] mx-auto" />
              <h3 className="font-display font-bold text-base text-[#e2e2e8]">No Tournament Fixtures Generated</h3>
              <p className="text-xs text-[#e6bcbd] font-mono">Add teams or click Load 5 Sample Teams to create tournament fixtures.</p>
              <button 
                onClick={handleQuickLoadPresets}
                className="px-5 py-2.5 bg-[#ff5167] text-[#5b0015] font-mono text-xs uppercase tracking-wider font-bold clip-chamfer cursor-pointer"
              >
                Load Sample Teams
              </button>
            </div>
          ) : (
            fixtureFormat === 'single' ? (
              <BracketView 
                matches={matches} 
                onSelectMatch={(m) => setSelectedMatch(m)}
                onSimulateMatch={handleSimulateMatch}
                onSimulateAll={handleSimulateAll}
                champion={champion}
              />
            ) : (
              <RoundRobinView 
                matches={matches}
                teams={teams}
                onSelectMatch={(m) => setSelectedMatch(m)}
                onSimulateMatch={handleSimulateMatch}
                onSimulateAll={handleSimulateAll}
              />
            )
          )}
        </div>
      )}

      {/* TAB 2: TEAMS & ROSTERS VIEW */}
      {activeTab === 'teams' && (
        <div className="space-y-10">
          
          {/* SECTION 1: TEAMS LIST */}
          <div className="space-y-4 reveal-on-scroll">
            <div className="flex justify-between items-center border-b border-[#282a2e] pb-3">
              <div>
                <span className="text-xs font-mono text-[#ff5167] uppercase font-bold tracking-widest block">
                  MODULE A
                </span>
                <h2 className="font-display font-black text-xl text-[#e2e2e8] uppercase flex items-center gap-2 mt-0.5">
                  <Shield className="w-5 h-5 text-[#ff5167]" /> REGISTERED SQUADS ({teams.length})
                </h2>
              </div>
              <button 
                onClick={() => { setFormError(''); setIsAddTeamModalOpen(true); }}
                className="btn-tactile btn-cyber-glow px-4 py-2 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition clip-chamfer cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Add Team
              </button>
            </div>

            {teams.length === 0 ? (
              <div className="p-8 bg-[#1e2024] clip-chamfer border border-[#282a2e] text-center text-[#e6bcbd] font-mono text-xs">
                No teams registered yet. Click <strong>+ Add Team</strong> above to create a team.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map(team => (
                  <div key={team.id} className="team-card animate-card-enter bg-[#1e2024] clip-chamfer border border-[#282a2e] p-5 space-y-4 relative">
                    
                    {/* Team Pass Header */}
                    <div className="flex items-center justify-between border-b border-[#282a2e] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded bg-[#111318] border border-[#282a2e]">
                          {team.logo}
                        </span>
                        <div>
                          <h3 className="font-display font-bold text-base text-[#e2e2e8]">{team.name}</h3>
                          <span className="text-xs font-mono text-[#ff5167]">
                            [{team.tag}] • {team.members.length} Members
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDeleteTeam(team.id)}
                        className="btn-tactile text-[#e6bcbd] hover:text-[#ffb4ab] p-1 transition cursor-pointer"
                        title="Delete Team"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Team Members List */}
                    <div className="space-y-2 font-mono text-xs">
                      <span className="text-[10px] text-[#e6bcbd] uppercase tracking-wider block font-bold">ROSTER MEMBERS:</span>
                      {team.members.length === 0 ? (
                        <div className="text-xs text-[#e6bcbd]/60 italic p-2 border border-dashed border-[#282a2e] rounded text-center">
                          No participants added yet.
                        </div>
                      ) : (
                        team.members.map(m => (
                          <div key={m.id} className="animate-card-enter flex justify-between items-center p-2 bg-[#111318] border border-[#282a2e] clip-chamfer">
                            <div>
                              <div className="font-semibold text-[#e2e2e8]">{m.name}</div>
                              <div className="text-[10px] text-[#e6bcbd]">{m.tag}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#1e2024] text-[#bdf4ff] font-bold border border-[#282a2e]">
                                {m.role}
                              </span>
                              <button 
                                onClick={() => handleDeletePlayer(team.id, m.id)}
                                className="btn-tactile text-[#e6bcbd] hover:text-[#ffb4ab] px-1 font-bold text-sm cursor-pointer"
                                title="Remove participant"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 2: PARTICIPANTS TABLE */}
          <div className="space-y-4 reveal-on-scroll">
            <div className="flex justify-between items-center border-b border-[#282a2e] pb-3">
              <div>
                <span className="text-xs font-mono text-[#ff5167] uppercase font-bold tracking-widest block">
                  MODULE B
                </span>
                <h2 className="font-display font-black text-xl text-[#e2e2e8] uppercase flex items-center gap-2 mt-0.5">
                  <Users className="w-5 h-5 text-[#bdf4ff]" /> PARTICIPANTS ROSTER ({allParticipants.length})
                </h2>
              </div>
              <button 
                onClick={() => { setFormError(''); setIsAddPlayerModalOpen(true); }}
                className="btn-tactile px-4 py-2 bg-[#282a2e] hover:bg-[#333539] text-[#bdf4ff] border border-[#333539] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition clip-chamfer cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#00e3fd]" /> Add Participant
              </button>
            </div>

            <div className="overflow-x-auto bg-[#1e2024] clip-chamfer border border-[#282a2e]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#282a2e] bg-[#0c0e12] text-[#e6bcbd] uppercase text-[10px] font-bold">
                    <th className="py-3 px-4"># INDEX</th>
                    <th className="py-3 px-4">PARTICIPANT NAME</th>
                    <th className="py-3 px-4">GAMER TAG</th>
                    <th className="py-3 px-4">ASSIGNED SQUAD</th>
                    <th className="py-3 px-4">ROLE</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#282a2e]">
                  {allParticipants.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-[#e6bcbd]">
                        No participants added yet. Click <strong>+ Add Participant</strong> to add players.
                      </td>
                    </tr>
                  ) : (
                    allParticipants.map((p, index) => (
                      <tr key={p.id} className="animate-card-enter hover:bg-[#282a2e]/50 transition">
                        <td className="py-3 px-4 text-[#e6bcbd] font-bold">{index + 1}</td>
                        <td className="py-3 px-4 font-bold text-[#e2e2e8] font-body">{p.name}</td>
                        <td className="py-3 px-4 text-[#ff5167] font-bold">{p.tag}</td>
                        <td className="py-3 px-4 text-[#e2e2e8]">
                          <span className="mr-1.5">{p.teamLogo}</span> {p.teamName} <span className="text-[10px] text-[#e6bcbd]">[{p.teamTag}]</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-[#111318] text-[#bdf4ff] text-[10px] border border-[#282a2e]">
                            {p.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button 
                            onClick={() => handleDeletePlayer(p.teamId, p.id)}
                            className="text-[#e6bcbd] hover:text-[#ffb4ab] font-bold transition cursor-pointer"
                            title="Remove Participant"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* MODAL 1: ADD NEW TEAM */}
      {isAddTeamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#1e2024] border-2 border-[#282a2e] clip-chamfer max-w-md w-full p-6 space-y-4 relative shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#282a2e] pb-3">
              <h3 className="font-display font-bold text-base text-[#e2e2e8] uppercase flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ff5167]" /> Add New Team
              </h3>
              <button 
                onClick={() => setIsAddTeamModalOpen(false)}
                className="text-[#e6bcbd] hover:text-[#e2e2e8] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded bg-[#93000a]/80 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#ffb4ab]" /> {formError}
              </div>
            )}

            <form onSubmit={handleCreateTeamSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#e2e2e8] font-bold uppercase mb-1">Team Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Cyber Vipers"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded bg-[#111318] border border-[#282a2e] text-[#e2e2e8] font-body focus:outline-none focus:border-[#ff5167]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#e2e2e8] font-bold uppercase mb-1">Team Tag (3-4 Chars) *</label>
                  <input 
                    type="text" 
                    maxLength="4"
                    placeholder="e.g. CVP"
                    value={newTeam.tag}
                    onChange={(e) => setNewTeam({ ...newTeam, tag: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-[#111318] border border-[#282a2e] text-[#e2e2e8] uppercase font-mono focus:outline-none focus:border-[#ff5167]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#e2e2e8] font-bold uppercase mb-1">Emblem Logo</label>
                  <select 
                    value={newTeam.logo}
                    onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-[#111318] border border-[#282a2e] text-[#e2e2e8] focus:outline-none focus:border-[#ff5167]"
                  >
                    {TEAM_LOGOS.map((logo, i) => (
                      <option key={i} value={logo}>{logo} Emblem {i+1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#282a2e] font-mono">
                <button 
                  type="button"
                  onClick={() => setIsAddTeamModalOpen(false)}
                  className="px-4 py-2 bg-[#282a2e] hover:bg-[#333539] text-[#e2e2e8] font-bold text-xs uppercase clip-chamfer cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] font-bold text-xs uppercase tracking-wider clip-chamfer cursor-pointer"
                >
                  Save Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD PARTICIPANT */}
      {isAddPlayerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#1e2024] border-2 border-[#282a2e] clip-chamfer max-w-md w-full p-6 space-y-4 relative shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#282a2e] pb-3">
              <h3 className="font-display font-bold text-base text-[#e2e2e8] uppercase flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#00e3fd]" /> Add Participant
              </h3>
              <button 
                onClick={() => setIsAddPlayerModalOpen(false)}
                className="text-[#e6bcbd] hover:text-[#e2e2e8] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded bg-[#93000a]/80 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#ffb4ab]" /> {formError}
              </div>
            )}

            <form onSubmit={handleAddPlayerSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#e2e2e8] font-bold uppercase mb-1">Select Squad *</label>
                <select 
                  value={newPlayer.teamId}
                  onChange={(e) => setNewPlayer({ ...newPlayer, teamId: e.target.value })}
                  className="w-full px-3 py-2.5 rounded bg-[#111318] border border-[#282a2e] text-[#e2e2e8] focus:outline-none focus:border-[#ff5167]"
                  required
                >
                  <option value="">Select a team...</option>
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.logo} {t.name} ({t.tag})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#e2e2e8] font-bold uppercase mb-1">Participant Full Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alex Mercer"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded bg-[#111318] border border-[#282a2e] text-[#e2e2e8] font-body focus:outline-none focus:border-[#ff5167]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#e2e2e8] font-bold uppercase mb-1">Gamer Tag / ID *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Kage#001"
                    value={newPlayer.tag}
                    onChange={(e) => setNewPlayer({ ...newPlayer, tag: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-[#111318] border border-[#282a2e] text-[#e2e2e8] font-mono focus:outline-none focus:border-[#ff5167]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#e2e2e8] font-bold uppercase mb-1">Role</label>
                  <select 
                    value={newPlayer.role}
                    onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-[#111318] border border-[#282a2e] text-[#e2e2e8] focus:outline-none focus:border-[#ff5167]"
                  >
                    {PLAYER_ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#282a2e] font-mono">
                <button 
                  type="button"
                  onClick={() => setIsAddPlayerModalOpen(false)}
                  className="px-4 py-2 bg-[#282a2e] hover:bg-[#333539] text-[#e2e2e8] font-bold text-xs uppercase clip-chamfer cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#ff5167] hover:bg-[#00e3fd] text-[#5b0015] hover:text-[#001f24] font-bold text-xs uppercase tracking-wider clip-chamfer cursor-pointer"
                >
                  Save Participant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Match Details Modal */}
      {selectedMatch && (
        <MatchModal 
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onUpdateScore={handleUpdateScore}
        />
      )}

    </div>
  );
}

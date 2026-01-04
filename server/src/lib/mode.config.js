export const GAME_RULES = {
  FREE_FIRE: {
    SOLO: { maxPlayersPerTeam: 1, maxTeams: 48 },
    DUO: { maxPlayersPerTeam: 2, maxTeams: 24 },
    SQUAD: { maxPlayersPerTeam: 4, maxTeams: 12 },
  },

  BGMI: {
    SOLO: { maxPlayersPerTeam: 1, maxTeams: 100 },
    DUO: { maxPlayersPerTeam: 2, maxTeams: 50 },
    SQUAD: { maxPlayersPerTeam: 4, maxTeams: 25 },
  },

  COD: {
    SOLO: { maxPlayersPerTeam: 1, maxTeams: 16 },
    DUO: { maxPlayersPerTeam: 2, maxTeams: 16 },
    SQUAD: { maxPlayersPerTeam: 5, maxTeams: 16 }, 
  },
};


export default GAME_RULES;
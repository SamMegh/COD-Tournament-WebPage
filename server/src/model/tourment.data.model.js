import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  name: String,
  season: String,

  game: {
    type: String,
    enum: ["COD", "FREE_FIRE", "BGMI"],
    required: true,
  },

  mode: {
    type: String,
    enum: ["SOLO", "DUO", "SQUAD"],
    required: true,
  },

  teamRules: {
    maxPlayersPerTeam: Number,
    maxTeams: Number,
  },

  startDate: Date,

  status: {
    type: String,
    enum: ["Upcoming", "Registration Open", "Live", "Completed"],
    default: "Upcoming",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeamData" }],
  championTeam: { type: mongoose.Schema.Types.ObjectId, ref: "TeamData" },


},

  { timestamps: true }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;

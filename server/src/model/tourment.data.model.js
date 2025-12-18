import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    season: {
      type: String, //  "Season  k liya "
      required: true,
    },
    startDate: {
      type: Date, 
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Live", "Completed", "Registration Open"], 
      default: "Upcoming",
    },
    prizePool: {
      type: Number,
      required: true,
      default: 0,
    },
    totalTeams: {
      type: Number,
      required: true,
      default: 0,
    },
    championTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamData",
      default: null,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamData",
      },
    ],
    registrationOpen: {
      type: Boolean,
      default: false,
    },
    matchResults: [
      {
        teamA: { type: mongoose.Schema.Types.ObjectId, ref: "TeamData" },
        teamB: { type: mongoose.Schema.Types.ObjectId, ref: "TeamData" },
        score: { type: String, default: "0-0" },
        matchDate: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;

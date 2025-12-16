import mongoose from "mongoose";

const teamDataSchema = new mongoose.Schema(
  {
    teamName: {
        type: String,
        required: true,
        trim: true,
    },
    teamLogo: {
        type: String,
        required: true,
    },
    members: [
        {
            uid:{
             type: String,
            required: true,
        },
        gameName:{
            type: String,
            required: true,
        }
        }
    ],
    teamleader: {
        uid:{
            type: String,
            required: true,
        },
        gameName:{
            type: String,
            required: true,
        },
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    matchedTournament: [{
        apponentTeamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeamData",
            required: true,
        },
        tournamentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true,
        },
        matchDate: {
            type: Date,
            required: true,
        },
        Score:{
            type:String,
            default:"0-0"
        },
        overscored:{
            type:String,
            default:"0"
        },
        totalOverPlayers:{
            type:String,
            default:"0"
        },
        totalAponentPlayers:{
            type:String,
            default:"0"
        }

    }],
    tournamentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true,
    }],
    completedTournament: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
        }
    ],
  },
  { timestamps: true }
);

const TeamData = mongoose.model("TeamData", teamDataSchema);
export default TeamData;
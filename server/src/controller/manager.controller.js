import Tournament from "../model/tourment.data.model.js";
import GAME_RULES from "../lib/mode.config.js";


export const creat = async (req, res) => {
  try {
    const { name, season, game, mode, startDate } = req.body;

    //  Basic validation
    if (!name || !season || !game || !mode || !startDate) {
      return res.status(400).json({
        success: false,
        message: "name, season, game, mode and startDate are required",
      });
    }

    //  Game + Mode rules
    const teamRules = GAME_RULES[game]?.[mode];

    if (!teamRules) {
      return res.status(400).json({
        success: false,
        message: "Invalid game or mode selected",
      });
    }

    //  Final payload
    const tournamentData = {
      name,
      season,
      game,
      mode,
      teamRules,
      startDate,
      status: "Upcoming",
     createdBy: req.user._id,
    };

    //  SAVE TO DATABASE
    const tournament = await Tournament.create(tournamentData);

    return res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      tournament,
    });

    console.log("Data recieved:=",tournament);
  } catch (error) {
    console.error("CREATE TOURNAMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating tournament",
    });
  }
};

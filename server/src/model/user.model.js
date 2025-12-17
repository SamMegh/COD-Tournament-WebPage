import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

 phoneNumber: {
  type: String,
  unique: true,
  sparse: true,
  trim: true,
  match: [/^\+[1-9]\d{6,14}$/, "Invalid phone number"],
},

    password: {
      type: String,
      minlength: 6,
      select: false, 
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },



    role: {
      type: String,
      enum: ["admin", "tournament_manager", "game_player"],
      default: "game_player",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

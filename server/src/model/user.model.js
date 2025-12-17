import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

phoneNumber: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  match: [/^\+[1-9]\d{6,14}$/, "Invalid phone number"],
},




    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false   // 🔐 security (password response me nahi jayega)
    },

    role: {
      type: String,
      enum: ["admin", "tournament_manager", "game_player"],
      default: "game_player"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

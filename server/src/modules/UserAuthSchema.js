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
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"]
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
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

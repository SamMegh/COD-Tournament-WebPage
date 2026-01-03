import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import instance from "../../lib/Axios";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

interface PendingUser {
  name: string;
  email: string;
  role?: string;
  phoneNumber?: string;
}

interface Props {
  user: PendingUser;
  setPendingUser: React.Dispatch<React.SetStateAction<PendingUser | null>>;
}

const PendingGoogleForm: React.FC<Props> = ({ user, setPendingUser }) => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState(user.phoneNumber || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(user.role || "game_player");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validations
    if (phone.length < 8) {
      toast.error("Enter valid phone number");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // 🔐 Pending Google signup complete
      const res = await instance.post("/api/register", {
        name: user.name,
        email: user.email, // ✅ identify user safely
        phoneNumber: `+${phone}`,
        password,
        role,
        completeProfile: true, // 🔑 backend flag
      });

      toast.success(res.data.message || "Signup completed");

      // clear pending state
      setPendingUser(null);

      // store token/user
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // 🔁 role based redirect
      switch (res.data.user.role) {
        case "tournament_manager":
          navigate("/manager");
          break;

        case "game_player":
        default:
          navigate("/player");
          break;
      }
    }
    catch (err: unknown)
     {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Google  failed");
      } else {
        toast.error("Unexpected error occurred");
      }
    
     } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200 py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-white">
          Complete Your Signup
        </h2>

        {/* Name */}
        <input
          value={user.name}
          disabled
          className="w-full p-3 rounded bg-gray-600 text-white cursor-not-allowed"
        />

        {/* Email */}
        <input
          value={user.email}
          disabled
          className="w-full p-3 rounded bg-gray-600 text-white cursor-not-allowed"
        />

        {/* Phone */}
        <PhoneInput
          country="in"
          value={phone}
          onChange={setPhone}
          inputClass="!w-full !bg-gray-700 !text-white"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white"
        >
          <option value="game_player">Game Player</option>
          <option value="tournament_manager">Tournament Manager</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg"
        >
          {loading ? "Submitting..." : "Complete Signup"}
        </button>

        {/* Login link */}
        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 font-bold">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default PendingGoogleForm;

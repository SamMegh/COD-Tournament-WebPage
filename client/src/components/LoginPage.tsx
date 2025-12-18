import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../utils/firbase.ts";
import { signInWithPopup } from "firebase/auth";
import PendingGoogleForm from "./PendingGoogleForm";
import googleLogo from "../assets/google.logo.png";
import { useApi } from "../lib/Axios";
import "react-toastify/dist/ReactToastify.css";

interface PendingUser {
  name: string;
  email: string;
  phoneNumber?: string;
  role?: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { serverurl } = useApi();

  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverurl}/api/login`,
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Login successful");

      const role = res.data.user.role;
      if (role === "game_player") navigate("/player-dashboard");
      else if (role === "tournament_manager") navigate("/tournament-dashboard");
      else navigate("/");

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await axios.post(
        `${serverurl}/api/googleSignup`,
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );

      if (res.data.pending) {
        setPendingUser(res.data.user);
      } else {
        const role = res.data.user.role;
        if (role === "game_player") navigate("/player-dashboard");
        else if (role === "tournament_manager") navigate("/tournament-dashboard");
        else navigate("/");
      }

    } catch (error: any) {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  if (pendingUser) {
    return <PendingGoogleForm user={pendingUser} setPendingUser={setPendingUser} />;
  }

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200 py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-white text-gray-900 font-semibold text-lg py-3 rounded-lg"
        >
          <img src={googleLogo} className="w-7 h-7" />
          Sign in with Google
        </button>

        <div className="text-center text-gray-300">or</div>

        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone Number"
          value={formData.emailOrPhone}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-600 text-white"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-600 text-white"
            required
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* 🔹 FORGOT PASSWORD BUTTON */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-orange-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-300 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-400 font-bold hover:underline">
            Register Now!
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;

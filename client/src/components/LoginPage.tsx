import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../utils/firbase.ts";
import { signInWithPopup } from "firebase/auth";
import PendingGoogleForm from "./PendingGoogleForm";
import googleLogo from "../assets/google.logo.png";
import { useApi } from "../lib/Axios";
import 'react-toastify/dist/ReactToastify.css';

// Interface for pending user
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

  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePassword = () => setShowPassword(!showPassword);

  // Email/Phone login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverurl}/api/login`,
        { emailOrPhone: formData.emailOrPhone, password: formData.password },
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

  // Google login / signup
const handleGoogleLogin = async () => {
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const name = user.displayName || "";
    const email = user.email || "";

    if (!email) throw new Error("Google account has no email");

    const res = await axios.post(
      `${serverurl}/api/googleSignup`,
      { name, email },  // abhi phoneNumber nahi bhej rahe front se
      { withCredentials: true }
    );

    if (res.data.pending) {
      // Pending form dikhao jisme user phoneNumber aur role bhar sake
      setPendingUser({ name: res.data.user.name, email: res.data.user.email });
    } else {
      const role = res.data.user.role;
      if (role === "game_player") navigate("/player-dashboard");
      else if (role === "tournament_manager") navigate("/tournament-dashboard");
      else navigate("/");
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message || "Google login failed");
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  // If pending user exists, show PendingGoogleForm
  if (pendingUser) {
    return <PendingGoogleForm user={pendingUser} setPendingUser={setPendingUser} />;
  }

  // Original login form
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
          className="w-full flex items-center justify-center gap-4 bg-white text-gray-900 font-semibold text-lg py-3 rounded-lg shadow-md transition hover:bg-gray-100"
        >
          <img src={googleLogo} alt="Google Logo" className="w-7 h-7 rounded-full" />
          {loading ? "Processing..." : "Sign in with Google"}
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
          <span>or</span>
        </div>

        {/* Email/Password */}
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
            className="absolute right-3 top-3 cursor-pointer text-gray-300"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
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

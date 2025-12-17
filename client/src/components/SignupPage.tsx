import { useState } from "react";
import logoSvg from "../assets/logo.svg";
import googleLogo from "../assets/google.logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApi } from "../lib/Axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";

// ✅ Firebase imports
import { auth, googleProvider } from "../utils/firbase.ts";
import { signInWithPopup } from "firebase/auth";
import PendingGoogleForm from "./PendingGoogleForm";

// ✅ Pending user interface
interface PendingUser {
  name: string;
  email: string;
  phoneNumber?: string;
  role?: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const { serverurl } = useApi();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "game_player",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Pending user state
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Normal registration
  const handleRegister = async () => {
    if (!formData.phone || formData.phone.length < 8) {
      toast.error("Enter valid phone number");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverurl}/api/register`,
        {
          name: formData.name,
          email: formData.email,
          phone: `+${formData.phone}`,
          password: formData.password,
          role: formData.role,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Registration successful");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google signup
  const googleSignUp = async () => {
    try {
      setLoading(true);

      // 🔹 Firebase popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const name = user.displayName || "Google User";
      const email = user.email || "";

      if (!email) throw new Error("Google account has no email");

      // 🔹 Backend call
      const res = await axios.post(
        `${serverurl}/api/googleSignup`,
        { name, email },
        { withCredentials: true }
      );

      // ⏳ Pending user → phone & role missing
      if (res.data.pending) {
        setPendingUser({
          name: res.data.user.name,
          email: res.data.user.email,
        });
        return;
      }

      // ✅ Direct signup/login
      const role = res.data.user.role;
      toast.success("Signup successful");

      if (role === "game_player") navigate("/player-dashboard");
      else if (role === "tournament_manager")
        navigate("/tournament-dashboard");
      else navigate("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Google signup failed"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render PendingGoogleForm if pending user exists
  if (pendingUser) {
    return (
      <PendingGoogleForm
        user={pendingUser}
        setPendingUser={setPendingUser}
      />
    );
  }

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200 py-20">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">
          Create Account
        </h2>

        {/* GOOGLE SIGN UP */}
        <button
          type="button"
          onClick={googleSignUp}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-gray-300 text-[#232526] font-semibold text-lg py-3 rounded-lg shadow-md transition mb-2 mt-2"
        >
          <img
            src={googleLogo}
            alt="Google Logo"
            className="w-7 h-7 bg-white rounded-full"
          />
          {loading ? "Processing..." : "Sign Up with Google"}
        </button>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        {/* PHONE INPUT */}
        <div className="w-full">
          <PhoneInput
            country="in"
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            containerClass="phone-container"
            inputClass="phone-input"
            buttonClass="phone-button"
            dropdownClass="phone-dropdown"
            inputProps={{
              name: "phone",
              required: true,
              placeholder: "Phone Number",
            }}
          />
        </div>

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        {/* ROLE */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700 text-white"
        >
          <option value="game_player">Game Player</option>
          <option value="tournament_manager">Tournament Manager</option>
        </select>

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-3 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg"
        >
          {loading ? "Registering..." : "Register Now"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 font-bold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpForm;

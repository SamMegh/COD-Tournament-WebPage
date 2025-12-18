import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import instance from "../lib/Axios";
import PendingGoogleForm from "./PendingGoogleForm";
import googleLogo from "../assets/google.logo.png";

interface PendingUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "game_player",
  });

  const [loading, setLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);

  const redirect = (role: string) => {
    navigate(
      role === "game_player"
        ? "/player-dashboard"
        : "/tournament-dashboard"
    );
  };

  // 🔹 GOOGLE INIT (EXACT SAME AS LOGIN)
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id:"776048365412-r16p659dgn6jppvdghs1j3909n5nrmdo.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {
        theme: "outline",
        size: "large",
        width: "100%",
      }
    );
  }, []);

  // 🔹 GOOGLE RESPONSE (EXACT SAME LOGIC)
  const handleGoogleResponse = async (res: any) => {
    setLoading(true);
    try {
      const response = await instance.post(
        "/api/googleSignup",
        { idToken: res.credential },
        { withCredentials: true }
      );

      if (response.data.pending) {
        setPendingUser(response.data.user);
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
        toast.success("Signup successful");
        redirect(response.data.user.role);
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Google signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 NORMAL SIGNUP
  const handleRegister = async () => {
    if (!formData.phone || formData.phone.length < 8)
      return toast.error("Enter valid phone number");

    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const res = await instance.post("/api/register", {
        ...formData,
        phone: `+${formData.phone}`,
      });
      toast.success(res.data.message || "Registration successful");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (pendingUser)
    return (
      <PendingGoogleForm
        user={pendingUser}
        setPendingUser={setPendingUser}
      />
    );

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200 py-20">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">
          Create Account
        </h2>

        {/* 🔹 GOOGLE SIGNUP (SAME AS LOGIN, ONLY TEXT DIFFERENT) */}
        <div id="googleButton" className="mb-2"></div>
        <div className="text-center text-gray-400">or</div>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        {/* PHONE */}
        <PhoneInput
          country="in"
          value={formData.phone}
          onChange={(phone) =>
            setFormData({ ...formData, phone })
          }
          inputClass="!w-full !bg-gray-700 !text-white !border-none !rounded-lg !pl-14 !h-12"
          buttonClass="!bg-gray-700 !border-none !rounded-l-lg"
          dropdownClass="!bg-gray-800 !text-white"
          containerClass="!w-full"
          searchClass="!bg-gray-700 !text-white"
          enableSearch
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            })
          }
          className="w-full p-3 rounded bg-gray-700 text-white"
        />

        {/* ROLE */}
        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
          className="w-full p-3 rounded bg-gray-700 text-white"
        >
          <option value="game_player">Game Player</option>
          <option value="tournament_manager">
            Tournament Manager
          </option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-3 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg"
        >
          Register Now
        </button>

        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-400 font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpForm;

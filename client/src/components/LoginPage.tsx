import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApi } from "../lib/Axios";
import { toast } from "react-toastify"; // npm install react-toastify
import 'react-toastify/dist/ReactToastify.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { serverurl } = useApi();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 🔹 for eye icon

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverurl}/api/login`,
        {
          emailOrPhone: formData.emailOrPhone,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Login successful"); // ✅ toast success

      // ROLE BASED NAVIGATION
      const role = res.data.user.role;
      if (role === "game_player") navigate("/player-dashboard");
      else if (role === "tournament_manager") navigate("/tournament-dashboard");
      else navigate("/");

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed"); // ✅ toast error
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200 py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md space-y-5 relative"
      >
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>

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
          <Link
            to="/signup"
            className="text-orange-400 font-bold hover:underline"
          >
            Register Now !
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;

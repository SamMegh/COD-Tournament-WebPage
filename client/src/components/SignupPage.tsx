import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApi } from "../lib/Axios.tsx"; // 👈 path apne hisaab se
import { toast } from "react-toastify"; // npm install react-toastify
import 'react-toastify/dist/ReactToastify.css';

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

  // input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit handler
  const handleRegister = async () => {
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
          phone: formData.phone,
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

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200 py-20">
      <div className="bg-gray-700 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Sign Up
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-600 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-600 text-white"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-600 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-600 text-white"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-600 text-white"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-600 text-white"
        >
          <option value="game_player">Game Player</option>
          <option value="tournament_manager">Tournament Manager</option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg"
        >
          {loading ? "Registering..." : "Register Now"}
        </button>

        <p className="text-center text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 font-bold hover:underline">
            Login!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpForm;

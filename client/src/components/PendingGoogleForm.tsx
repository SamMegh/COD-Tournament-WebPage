    import React, { useState } from "react";
    import axios from "axios";
    import { toast } from "react-toastify";
    import { useNavigate, Link } from "react-router-dom";
    import { useApi } from "../lib/Axios";
    import PhoneInput from "react-phone-input-2";
    import "react-phone-input-2/lib/style.css";

    interface PendingUser {
    name: string;
    email: string;
    }

    interface Props {
    user: PendingUser;
    setPendingUser: React.Dispatch<React.SetStateAction<PendingUser | null>>;
    }

    const PendingGoogleForm: React.FC<Props> = ({ user, setPendingUser }) => {
    const navigate = useNavigate();
    const { serverurl } = useApi();

    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("game_player"); // ✅ default role
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!phone || phone.length < 8) {
        toast.error("Enter valid phone number");
        return;
        }

        if (!password || password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
        }

        if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
        }

        setLoading(true);
        try {
   const res = await axios.post(
  `${serverurl}/api/googleSignup`,
  {
    name: user.name,
    email: user.email,
    phoneNumber: `+${phone}`, // ✅ FIX
    password,
    role,
  },
  { withCredentials: true }
);

        toast.success(res.data.message || "Signup successful");
        setPendingUser(null);

        // ✅ Role based navigation
        const userRole = res.data.user.role;
        console.log("ROLE FROM SERVER:", userRole);
console.log("FULL RESPONSE:", res.data);

        if (userRole === "game_player") navigate("/player-dashboard");
        else if (userRole === "tournament_manager")
            navigate("/tournament-dashboard");
        else navigate("/");

        } catch (error: any) {
        toast.error(error?.response?.data?.message || "Signup failed");
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

            <input
            type="text"
            value={user.name}
            disabled
            className="w-full p-3 rounded bg-gray-600 text-white cursor-not-allowed"
            />

            <input
            type="email"
            value={user.email}
            disabled
            className="w-full p-3 rounded bg-gray-600 text-white cursor-not-allowed"
            />

            {/* 🌍 Phone with country code */}
            <PhoneInput
            country="in"
            value={phone}
            onChange={(val) => setPhone(val)}
            inputClass="!w-full !bg-gray-700 !text-white"
            />

            {/* 🔐 Password */}
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

            {/* 🎮 Role */}
            <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white"
            >
            <option value="game_player">Game Player</option>
            <option value="tournament_manager">Tournament Manager</option>
            </select>

            <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg"
            >
            {loading ? "Submitting..." : "Complete Signup"}
            </button>

       
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

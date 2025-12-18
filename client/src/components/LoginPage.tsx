import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import api from "../lib/Axios.tsx";
import { auth, googleProvider } from "../utils/firbase";
import PendingGoogleForm from "../components/PendingGoogleForm.tsx";
import googleLogo from "../assets/google.logo.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState<any>(null);

  const redirect = (role: string) =>
    navigate(role === "game_player" ? "/player-dashboard" :
            role === "tournament_manager" ? "/tournament-dashboard" : "/");

  const login = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/login", { emailOrPhone, password });
      toast.success("Login successful");
      redirect(res.data.user.role);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const user = (await signInWithPopup(auth, googleProvider)).user;
      const res = await api.post("/api/googleSignup", { name: user.displayName, email: user.email });
      res.data.pending ? setPendingUser(res.data.user) : redirect(res.data.user.role);
    } catch { toast.error("Google login failed"); }
    finally { setLoading(false); }
  };

  if (pendingUser) return <PendingGoogleForm user={pendingUser} setPendingUser={setPendingUser} />;

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200">
      <form onSubmit={login} className="bg-gray-700 p-8 rounded w-full max-w-md space-y-4">
        <h2 className="text-white text-2xl font-bold text-center">Login</h2>

          {/* GOOGLE SIGN UP */}
        <button
          type="button"
          onClick={googleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 bg-gray-300 text-[#232526] font-semibold text-lg py-3 rounded-lg shadow-md transition mb-2 mt-2"
        >
          <img src={googleLogo} alt="Google Logo" className="w-7 h-7 bg-white rounded-full" />
          {loading ? "Processing..." : "Sign Up with Google"}
        </button>

        <div className="text-center text-gray-300">or</div>

        <input value={emailOrPhone} onChange={e => setEmailOrPhone(e.target.value)} placeholder="Email or Phone" required
          className="w-full p-2 rounded bg-gray-600 text-white" />

        <div className="relative">
          <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" required className="w-full p-2 rounded bg-gray-600 text-white" />
          <span onClick={() => setShowPass(!showPass)} className="absolute right-2 top-2 cursor-pointer">
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-orange-400">Forgot Password?</Link>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-orange-500 py-2 rounded text-white font-bold">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-300 text-sm">
          Don’t have an account? <Link to="/signup" className="text-orange-400">Register</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;

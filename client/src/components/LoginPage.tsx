import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../lib/Axios.tsx";
import PendingGoogleForm from "../components/PendingGoogleForm.tsx";
import googleLogo from "../assets/google.logo.png";

declare global { interface Window { google: any; } }

const LoginForm = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState<any>(null);

  const redirect = (role: string) => {
    navigate(role === "game_player" ? "/player-dashboard" : "/tournament-dashboard");
  };

  // Google Login Init
  useEffect(() => {
    if (!window.google) return;
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });
    window.google.accounts.id.renderButton(document.getElementById("googleButton"), { theme: "outline", size: "large" });
  }, []);

  const handleGoogleResponse = async (res: any) => {
    setLoading(true);
    try {
      const response = await instance.post("/api/googleSignup", { idToken: res.credential }, { withCredentials: true });
      if (response.data.pending) setPendingUser(response.data.user);
      else { toast.success("Logged in successfully"); redirect(response.data.user.role); }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Google login failed");
    } finally { setLoading(false); }
  };

  const googleLogin = () => window.google ? window.google.accounts.id.prompt() : toast.error("Google API not loaded");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post("/api/login", { emailOrPhone, password }, { withCredentials: true });
      toast.success("Login successful");
      redirect(res.data.user.role);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  if (pendingUser) return <PendingGoogleForm user={pendingUser} setPendingUser={setPendingUser} />;

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200">
      <form onSubmit={login} className="bg-gray-700 p-8 rounded w-full max-w-md space-y-4">
        <h2 className="text-white text-2xl font-bold text-center">Login</h2>

        <div id="googleButton" className="mb-2"></div>
        <div className="text-center text-gray-300">or</div>

        <input value={emailOrPhone} onChange={e => setEmailOrPhone(e.target.value)} placeholder="Email or Phone" required className="w-full p-2 rounded bg-gray-600 text-white" />

        <div className="relative">
          <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 rounded bg-gray-600 text-white" />
          <span onClick={() => setShowPass(!showPass)} className="absolute right-2 top-2 cursor-pointer select-none">{showPass ? "🙈" : "👁️"}</span>
        </div>

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-orange-400">Forgot Password?</Link>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-orange-500 py-2 rounded text-white font-bold">{loading ? "Logging in..." : "Login"}</button>

        <p className="text-center text-gray-300 text-sm">
          Don’t have an account? <Link to="/signup" className="text-orange-400">Register</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;

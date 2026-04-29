import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthInput from "./AuthInput";
import GoogleAuthButton from "./GoogleAuthButton";
import PendingGoogleForm from "../../components/auth/PendingGoogleForm";
import {useLogin,useGoogleAuth} from "../../files/CheckAuthFile"


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();
  const { handleGoogleLogin, pendingUser, setPendingUser } = useGoogleAuth();

  const handleSubmit = () => {
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }
login({ emailOrPhone: email, password,});

  };
    //  pending true → sirf Pending form
  if (pendingUser) {
    return (
      <PendingGoogleForm
        user={pendingUser}
        setPendingUser={setPendingUser}
      />
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-white font-mono">
        Login Account !
      </h2>
 <GoogleAuthButton onSuccess={handleGoogleLogin} />
      <AuthInput
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthInput
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-gray-300 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-orange-400 font-bold">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;

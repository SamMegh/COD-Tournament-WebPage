import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AuthInput from "./AuthInput";
import RoleSelect from "./RoleSelect";
import { useSignup } from "../../hooks/auth/use.Signup";  
import type { SignupPayload } from "../../interface/auth.types";
import type { UserRole } from "../../interface/auth.types";
import GoogleAuthButton from "./GoogleAuthButton";
import useGoogleAuth from "../../hooks/auth/google";
import PendingGoogleForm from "../../components/auth/PendingGoogleForm";


const SignupForm = () => {
  //  Simple states (jo tumhe samajh aa rahi hain)
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("game_player");
      const { handleGoogleLogin, pendingUser, setPendingUser } = useGoogleAuth();

  const { signup, loading } = useSignup();

  //  Simple submit logic
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload: SignupPayload = {
      name,
      email: `${email}`,
      phoneNumber: `+${phoneNumber}`,
      password,
      ConfirmPassword: confirmPassword,
      role,
    };

    await signup(payload);
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
        Create Account
      </h2>
 <GoogleAuthButton onSuccess={handleGoogleLogin} />
      {/* Name */}
      <AuthInput
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Phone */}
      <PhoneInput
        country="in"
        value={phoneNumber}
        onChange={(value) => setPhoneNumber(value)}
        inputClass="!w-full !bg-gray-700 !text-white !border-none !rounded-lg !pl-14 !h-12"
        buttonClass="!bg-gray-700 !border-none"
        containerClass="!w-full"
      />

      <AuthInput
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      {/* Password */}
      <AuthInput
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Confirm Password */}
      <AuthInput
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Role */}
      <RoleSelect
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}

      />

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register Now"}
      </button>

      <p className="text-center text-gray-300 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-400 font-bold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;

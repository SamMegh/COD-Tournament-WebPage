import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import instance from "../lib/Axios";


export type UserRole = "game_player" | "tournament_manager";


export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  ConfirmPassword: string;
  phoneNumber?: string;
  role: UserRole;
}


export interface LoginPayload {
  emailOrPhone: string;
  password: string;
}


type GoogleResponse = {
  credential: string;
};

type PendingUser = {
  email: string;
  name: string;
};

  export const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async (formData: SignupPayload) => {
    setLoading(true);
    setError("");

    try {
      const res = await instance.post("/api/register", formData);

      toast.success("User registered successfully");
      navigate("/login");

      return res.data;
    }
     catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Signup failed";
        setError(msg);
        toast.error(msg); //  backend error yahin dikhega
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
  };


  export const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginPayload) => {
      try {
        setLoading(true);
        setError(null);

        const res = await instance.post("/api/login", data);
         const user = res.data.user;
      const role: UserRole = user.role;
   
   console.log("LOGIN RESPONSE:", res.data);

        toast.success(`Login successful`);
  
         switch (role) {
        case "tournament_manager":
          navigate("/manager");
          break;

        case "game_player":
        default:
          navigate("/player");
          break;
      }

        return res.data;
      } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Login failed";
        setError(msg);
        toast.error(msg); //  backend error yahin dikhega
      }
     } 
     finally {
        setLoading(false);
      }
    };

    return { login, loading, error };
  };

  export const useGoogleAuth = () => {
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);

  const handleGoogleLogin = async (res: GoogleResponse) => {
    const response = await instance.post("/api/googleSignup", {
      idToken: res.credential,
    });


    if (response.data.pending) {
      setPendingUser({
        email: response.data.user.email,
        name: response.data.user.name,
      });
    } 
  
    else {
      const {  user } = response.data;


        toast.success(`Login successful`);
      // role based redirect
      if (user.role === "tournament_manager") {
        window.location.href = "/manager";
      } else {
        window.location.href = "/player";
      }
    }
  };

  return { handleGoogleLogin, pendingUser, setPendingUser };
};
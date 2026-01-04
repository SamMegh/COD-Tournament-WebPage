import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import instance from "../../lib/Axios";
import type { SignupPayload } from "../../interface/auth.types";

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

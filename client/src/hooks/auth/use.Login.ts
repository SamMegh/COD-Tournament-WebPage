  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { toast } from "react-toastify";
  import instance from "../../lib/Axios";
  import type { LoginPayload,UserRole} from "../../interface/auth.types";

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

  export default useLogin;

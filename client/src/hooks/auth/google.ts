import { useState } from "react";
import api from "../../lib/Axios";
import { toast } from "react-toastify";
type GoogleResponse = {
  credential: string;
};

type PendingUser = {
  email: string;
  name: string;
};

export const useGoogleAuth = () => {
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);

  const handleGoogleLogin = async (res: GoogleResponse) => {
    const response = await api.post("/api/googleSignup", {
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

export default useGoogleAuth;

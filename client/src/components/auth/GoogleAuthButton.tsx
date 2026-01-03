import { useEffect } from "react";

type GoogleResponse = {
  credential: string;
};

type Props = {
  onSuccess: (res: GoogleResponse) => void;
};

const GoogleAuthButton = ({ onSuccess }: Props) => {
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: onSuccess, //  bas yahi logic
    });

    const el = document.getElementById("googleBtn");
    if (el) {
      window.google.accounts.id.renderButton(el, {
        theme: "outline",
        size: "large",
      });
    }
  }, [onSuccess]);

  return <div id="googleBtn"></div>;
};

export default GoogleAuthButton;

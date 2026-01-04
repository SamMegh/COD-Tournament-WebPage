import { useEffect } from "react";

type GoogleResponse = {
  credential: string;
};

type Props = {
  onSuccess: (res: GoogleResponse) => void;
};

const GoogleAuthButton = ({ onSuccess }: Props) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const google = (window as any).google;

    if (!google) return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: onSuccess,
    });

    const el = document.getElementById("googleBtn");
    if (el) {
      google.accounts.id.renderButton(el, {
        theme: "outline",
        size: "large",
      });
    }
  }, [onSuccess]);

  return <div id="googleBtn"></div>;
};

export default GoogleAuthButton;

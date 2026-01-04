import type { MouseEventHandler } from "react";

type Props = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const AuthButton = ({ text, onClick, disabled }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full mt-3 py-3 font-bold rounded-lg active:scale-110 ${
        disabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-orange-500 to-red-500"
      }`}
    >
      {text}
    </button>
  ); 
};

export default AuthButton;

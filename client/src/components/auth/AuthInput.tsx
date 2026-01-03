type AuthInputProps = {
  placeholder: string;
  value: string;
    type?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AuthInput = ({ placeholder, value, onChange }: AuthInputProps) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded bg-gray-700 text-white"
    />
  );
};

export default AuthInput;

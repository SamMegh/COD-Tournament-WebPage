import type { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const RoleSelect = ({ value, onChange }: Props) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded bg-gray-700 text-white"
    >
      <option value="game_player">Game Player</option>
      <option value="tournament_manager">
        Tournament Manager
      </option>
    </select>
  );
};

export default RoleSelect;

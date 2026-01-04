
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


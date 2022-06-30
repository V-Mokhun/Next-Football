import { League, Team } from "../models";

export interface IClientViewer {
  email: string;
  timezone: string;
  favoriteLeagues: League[];
  favoriteTeams: Team[];
}

export interface IViewer extends IClientViewer {
  password: string;
}

export type ViewerRequestBody = Pick<IViewer, "email" | "password">;

export type RegisterResponse =
  | {
      success: true;
      data: IClientViewer;
    }
  | {
      success: false;
      data: string;
    };

export type LoginResponse = RegisterResponse;

export type LogoutResponse =
  | { success: true; data: null }
  | { success: false; data: string };

export type ChangeTimezoneResponse = { success: boolean; data: string };

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};
export type ChangePasswordResponse = LogoutResponse;

export type GetLeaguesResponse =
  | {
      success: true;
      data: League[];
    }
  | { success: false; data: string };
export type AddLeagueResponse =
  | {
      success: true;
      data: null;
    }
  | { success: false; data: string };
export type RemoveLeagueResponse = AddLeagueResponse;

export type GetTeamsResponse =
  | {
      success: true;
      data: Team[];
    }
  | { success: false; data: string };
export type AddTeamResponse =
  | {
      success: true;
      data: null;
    }
  | { success: false; data: string };
export type RemoveTeamResponse = AddTeamResponse;

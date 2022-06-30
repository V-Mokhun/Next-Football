import axios from "axios";
import { catchError } from "../lib";
import { League, Team } from "../models";
import {
  AddLeagueResponse,
  AddTeamResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangeTimezoneResponse,
  GetLeaguesResponse,
  GetTeamsResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  RemoveLeagueResponse,
  RemoveTeamResponse,
  ViewerRequestBody,
} from "./models";

const VIEWER_API = "/api/viewer";
const LOGIN_URL = `${VIEWER_API}/login`;
const REGISTER_URL = `${VIEWER_API}/register`;
const LOGOUT_URL = `${VIEWER_API}/logout`;
const CHANGE_TIMEZONE_URL = `${VIEWER_API}/change-timezone`;
const CHANGE_PASSWORD_URL = `${VIEWER_API}/change-password`;
const GET_LEAGUES = `${VIEWER_API}/leagues`;
const ADD_LEAGUE = `${VIEWER_API}/add-league`;
const REMOVE_LEAGUE = `${VIEWER_API}/remove-league`;
const GET_TEAMS = `${VIEWER_API}/teams`;
const ADD_TEAM = `${VIEWER_API}/add-team`;
const REMOVE_TEAM = `${VIEWER_API}/remove-team`;

class ViewerApi {
  private async postRequest<T>(body: ViewerRequestBody, url: string) {
    try {
      const { data } = await axios.post<T>(url, body);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  private async updateRequest<T, F>(body: F, url: string) {
    try {
      const { data } = await axios.patch<T>(url, body);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  private async getRequest<T>(url: string) {
    try {
      const { data } = await axios.get<T>(url);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async login(body: ViewerRequestBody) {
    const response = await this.postRequest<LoginResponse>(body, LOGIN_URL);

    return response;
  }

  async register(body: ViewerRequestBody) {
    const response = await this.postRequest<RegisterResponse>(
      body,
      REGISTER_URL
    );

    return response;
  }

  async logout() {
    try {
      const { data } = await axios.post<LogoutResponse>(LOGOUT_URL);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async changeTimezone(timezone: string) {
    try {
      const { data } = await axios.patch<ChangeTimezoneResponse>(
        CHANGE_TIMEZONE_URL,
        {
          timezone,
        }
      );

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async changePassword(body: ChangePasswordRequest) {
    try {
      const { data } = await axios.patch<ChangePasswordResponse>(
        CHANGE_PASSWORD_URL,
        body
      );

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async getFavoriteLeagues() {
    const response = await this.getRequest<GetLeaguesResponse>(GET_LEAGUES);

    return response;
  }

  async addFavoriteLeague(league: League) {
    const response = await this.updateRequest<AddLeagueResponse, League>(
      league,
      ADD_LEAGUE
    );

    return response;
  }

  async removeFavoriteLeague(id: number) {
    const response = await this.updateRequest<RemoveLeagueResponse, number>(
      id,
      REMOVE_LEAGUE
    );

    return response;
  }

  async getFavoriteTeams() {
    const response = await this.getRequest<GetTeamsResponse>(GET_TEAMS);

    return response;
  }

  async addFavoriteTeam(team: Team) {
    const response = await this.updateRequest<AddTeamResponse, Team>(
      team,
      ADD_TEAM
    );

    return response;
  }

  async removeFavoriteTeam(id: number) {
    const response = await this.updateRequest<RemoveTeamResponse, number>(
      id,
      REMOVE_TEAM
    );

    return response;
  }
}

export const viewerApi = new ViewerApi();

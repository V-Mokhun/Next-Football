import { COOKIE_NAME } from "@/shared/config";
import { AxiosRequestConfig } from "axios";
import { BaseApi } from "../base";
import { catchError } from "../lib";
import { League, Team } from "../models";
import { apiInstance } from "./config";
import {
  AddFavoriteLeagueResponse,
  AddFavoriteTeamResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangeTimezoneResponse,
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RegisterResponse,
  RemoveFavoriteLeagueResponse,
  RemoveFavoriteTeamResponse,
  ViewerRequestBody
} from "./models";

const VIEWER_API = "/api/viewer";
const FAVORITE_LEAGUE_API = "/api/leagues";
const FAVORITE_TEAM_API = "/api/teams";

const ME_URL = `${VIEWER_API}/me`;
const LOGIN_URL = `${VIEWER_API}/login`;
const REGISTER_URL = `${VIEWER_API}/register`;
const LOGOUT_URL = `${VIEWER_API}/logout`;
const CHANGE_TIMEZONE_URL = `${VIEWER_API}/change-timezone`;
const CHANGE_PASSWORD_URL = `${VIEWER_API}/change-password`;

const ADD_LEAGUE = `${FAVORITE_LEAGUE_API}/add`;
const REMOVE_LEAGUE = `${FAVORITE_LEAGUE_API}/remove`;

const ADD_TEAM = `${FAVORITE_TEAM_API}/add`;
const REMOVE_TEAM = `${FAVORITE_TEAM_API}/remove`;

class ViewerApi extends BaseApi {
  async me(cookieValue?: string) {
    try {
      const options: AxiosRequestConfig = {
        headers: {}
      };

      if (typeof window === "undefined") {
        options.withCredentials = true;
        options.headers!.Cookie = cookieValue
          ? `${COOKIE_NAME}=${cookieValue};`
          : "";
      } 

      const { data } = await apiInstance.get<MeResponse>(ME_URL, options);

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
      const { data } = await apiInstance.post<LogoutResponse>(LOGOUT_URL);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async changeTimezone(timezone: string) {
    try {
      const { data } = await apiInstance.patch<ChangeTimezoneResponse>(
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
      const { data } = await apiInstance.patch<ChangePasswordResponse>(
        CHANGE_PASSWORD_URL,
        body
      );

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async addFavoriteLeague(league: League) {
    const response = await this.updateRequest<
      AddFavoriteLeagueResponse,
      League
    >(league, ADD_LEAGUE);

    return response;
  }

  async removeFavoriteLeague(id: number) {
    const response = await this.updateRequest<
      RemoveFavoriteLeagueResponse,
      { id: number }
    >({ id }, REMOVE_LEAGUE);

    return response;
  }

  async addFavoriteTeam(team: Team) {
    const response = await this.updateRequest<AddFavoriteTeamResponse, Team>(
      team,
      ADD_TEAM
    );

    return response;
  }

  async removeFavoriteTeam(id: number) {
    const response = await this.updateRequest<
      RemoveFavoriteTeamResponse,
      { id: number }
    >({ id }, REMOVE_TEAM);

    return response;
  }
}

export const viewerApi = new ViewerApi(apiInstance);

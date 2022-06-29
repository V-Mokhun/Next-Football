import axios from "axios";
import { catchError } from "../lib";
import {
  ChangeTimezoneResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  ViewerRequestBody,
} from "./models";

const VIEWER_API = "/api/viewer";
const LOGIN_URL = `${VIEWER_API}/login`;
const REGISTER_URL = `${VIEWER_API}/register`;
const LOGOUT_URL = `${VIEWER_API}/logout`;
const CHANGE_TIMEZONE_URL = `${VIEWER_API}/change-timezone`;

class ViewerApi {
  private async makeRequest<T>(body: ViewerRequestBody, url: string) {
    try {
      const { data } = await axios.post<T>(url, body);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async login(body: ViewerRequestBody) {
    const response = await this.makeRequest<LoginResponse>(body, LOGIN_URL);

    return response;
  }

  async register(body: ViewerRequestBody) {
    const response = await this.makeRequest<RegisterResponse>(
      body,
      REGISTER_URL
    );

    return response;
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

  async logout() {
    try {
      const { data } = await axios.post<LogoutResponse>(LOGOUT_URL);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const viewerApi = new ViewerApi();

import axios from "axios";
import { catchError } from "../lib";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
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
const CHANGE_PASSWORD_URL = `${VIEWER_API}/change-password`;

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
}

export const viewerApi = new ViewerApi();

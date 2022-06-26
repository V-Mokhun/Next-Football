import axios from "axios";
import { catchError } from "../lib";
import {
  IUser,
  LoginResponse,
  RegisterResponse,
  UserRequestBody,
} from "./models";

const USER_API = "/api/user";
const LOGIN_URL = `${USER_API}/login`;
const REGISTER_URL = `${USER_API}/register`;
const LOGOUT_URL = `${USER_API}/logout`;

class UserApi {
  private async makeRequest<T>(body: UserRequestBody, url: string) {
    try {
      const { data } = await axios.post<T>(url, {
        method: "POST",
        body,
      });

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async login(body: UserRequestBody) {
    const response = await this.makeRequest<LoginResponse>(body, LOGIN_URL);

    return response;
  }

  async register(body: UserRequestBody) {
    const response = await this.makeRequest<RegisterResponse>(
      body,
      REGISTER_URL
    );

    return response;
  }

  async logout() {
    try {
      const { data } = await axios.get(LOGOUT_URL);

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }
}

export const userApi = new UserApi();

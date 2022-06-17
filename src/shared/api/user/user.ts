import axios from "axios";
import { catchError } from "../lib";
import { User } from "./models";

const USER_API = "/api/user";
const LOGIN_URL = `${USER_API}/login`;
const REGISTER_URL = `${USER_API}/register`;
const LOGOUT_URL = `${USER_API}/logout`;

type UserReqBody = Pick<User, "email" | "password">;

class UserApi {
  private async makeRequest(body: UserReqBody, url: string) {
    try {
      const { data } = await axios.post(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      return data;
    } catch (error) {
      throw catchError(error);
    }
  }

  async login(body: UserReqBody) {
    const response = await this.makeRequest(body, LOGIN_URL);

    return response;
  }

  async register(body: UserReqBody) {
    const response = await this.makeRequest(body, REGISTER_URL);

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

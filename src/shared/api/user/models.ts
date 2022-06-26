export interface IClientUser {
  email: string;
  timezone: string;
}

export interface IUser extends IClientUser {
  password: string;
}

export type UserRequestBody = Pick<IUser, "email" | "password">;

export type RegisterResponse =
  | {
      success: true;
      data: IClientUser;
    }
  | {
      success: false;
      data: string;
    };

export type LoginResponse = RegisterResponse;

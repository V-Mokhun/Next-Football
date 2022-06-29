export interface IClientViewer {
  email: string;
  timezone: string;
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

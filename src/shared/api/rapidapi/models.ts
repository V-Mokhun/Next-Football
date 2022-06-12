export interface User {
  email: string;
  password: string;
}

type ApiResponse = {
  get: string;
  errors: { [key: string]: string }[];
  parameters: { [key: string]: string }[];
  paging: {
    current: number;
    total: number;
  };
  results: number;
};

export type GetTimezonesResponse = ApiResponse & {
  response: string[];
};

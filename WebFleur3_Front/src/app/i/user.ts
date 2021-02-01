export interface User {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  address: string;
  cp: string;
  town: string;
}

export interface CurrentUser {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  address: string;
  cp: string;
  town: string;
  token: string;
  expires_in: string;
}

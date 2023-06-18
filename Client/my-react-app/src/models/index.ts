// All Interfaces ,Types are described here


export type userDetails = {
    name:string,
    email:string,
    token:string
}

export type loginDetails = {
    email:string,
    password:string
}

export interface AuthContextValue {
    authState: userDetails;
    loginUser: (loginDetails: loginDetails) => Promise<any>;
  }

export enum APP_CONFIGS  {
    API_BASE_URL=import.meta.env.VITE_APP_API_BASE_URL
}
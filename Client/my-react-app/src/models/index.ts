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
    setLoginUserDetails: (loginDetails: userDetails) => void;
  }

export type tableColumn = {
    fieldName:string,
    id:string,
    isSort:boolean,
    isSorted?:boolean,
    order_by?:string,
    isSearch:boolean,
    isSearchEnabled?:boolean
}

export enum APP_CONFIGS  {
    API_BASE_URL=import.meta.env.VITE_APP_API_BASE_URL
}
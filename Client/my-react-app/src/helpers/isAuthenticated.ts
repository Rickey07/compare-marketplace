import getCookie from "./getCookie";

export const isAuthenticated = (): boolean => {
    const cookie = getCookie("userDetails");
    return cookie === "" ? false : true;
  };
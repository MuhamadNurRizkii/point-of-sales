import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => {
  return localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const deleteToken = (name) => {
  return localStorage.removeItem(name);
};

export const parsingToken = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }
  return jwtDecode(token);
};

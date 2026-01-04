import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => {
  return localStorage.setItem("access_token", token);
};

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const parsingToken = (token) => {
  return jwtDecode(token);
};

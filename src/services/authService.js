import http from './httpService';
import jwtDecode from 'jwt-decode';

const KEY = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post('/auth', { email, password });
  localStorage.setItem(KEY, jwt);
}

export function setToken(jwt) {
  localStorage.setItem(KEY, jwt);
}

export function getAuthUser() {
  try {
    const jwt = localStorage.getItem(KEY);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function getJwt() {
  return localStorage.getItem(KEY);
}

export default {
  login,
  getJwt,
  setToken,
  getAuthUser,
  logout
}

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// action type, data 정의
export async function loginUser(userInfo) {
  const { data } = await axios.post(`${apiUrl}/api/login`, userInfo, {
    withCredentials: true,
  });
  return {
    type: 'LOGIN_USER',
    payload: data,
  };
}

export async function register(userInfo) {
  const { data } = await axios.post(`${apiUrl}/api/register`, userInfo);
  return {
    type: 'REGISTER',
    payload: data,
  };
}

export async function auth() {
  const { data } = await axios.get(`${apiUrl}/api/auth`, {
    withCredentials: true,
  });
  return {
    type: 'AUTH',
    payload: data,
  };
}

export async function logout() {
  const { data } = await axios.get(`${apiUrl}/api/logout`, {
    withCredentials: true,
  });
  return {
    type: 'LOGOUT',
    payload: data,
  };
}

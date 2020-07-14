import axios from 'axios';

// action type, data 정의
export async function loginUser(userInfo) {
  const { data } = await axios.post('/api/login', userInfo);
  return {
    type: 'LOGIN_USER',
    payload: data,
  };
}

export async function register(userInfo) {
  const { data } = await axios.post('/api/register', userInfo);
  return {
    type: 'REGISTER',
    payload: data,
  };
}

export async function auth() {
  const { data } = await axios.get('/api/auth');
  return {
    type: 'AUTH',
    payload: data,
  };
}

export async function logout() {
  const { data } = await axios('/api/logout');
  return {
    type: 'LOGOUT',
    payload: data,
  };
}

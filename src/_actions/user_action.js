/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// action type, data 정의
export async function loginUser(userInfo) {
  const { data } = await axios.post(`${apiUrl}/api/user/login`, userInfo, {
    withCredentials: true,
  });
  return {
    type: 'LOGIN_USER',
    payload: data,
  };
}

export async function register(userInfo) {
  const { data } = await axios.post(`${apiUrl}/api/user/register`, userInfo);
  return {
    type: 'REGISTER',
    payload: data,
  };
}

export async function auth() {
  const { data } = await axios.get(`${apiUrl}/api/user/auth`, {
    withCredentials: true,
  });
  return {
    type: 'AUTH',
    payload: data,
  };
}

export async function logout() {
  const { data } = await axios.get(`${apiUrl}/api/user/logout`, {
    withCredentials: true,
  });
  return {
    type: 'LOGOUT',
    payload: data,
  };
}

export async function addToCart(cartInfo) {
  const body = {
    productId: cartInfo,
  };
  const { data } = await axios.post(`${apiUrl}/api/user/addToCart`, body, {
    withCredentials: true,
  });
  return {
    type: 'ADDTOCART',
    payload: data,
  };
}

export async function getCartItems(cartItem, userCart) {
  const { data } = await axios.get(
    `${apiUrl}/api/product/products_by_id?id=${cartItem}&type=array`,
  );
  userCart.forEach(cartItem => {
    data.product.forEach((productDetail, index) => {
      if (cartItem.id === productDetail._id) {
        data.product[index].quantity = cartItem.quantity;
      }
    });
  });
  return {
    type: 'GET_CART_ITEM',
    payload: data,
  };
}

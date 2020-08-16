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
    data.forEach((productDetail, index) => {
      if (cartItem.id === productDetail._id) {
        data[index].quantity = cartItem.quantity;
      }
    });
  });
  return {
    type: 'GET_CART_ITEM',
    payload: data,
  };
}

export async function removeCartItem(productId) {
  const { data } = await axios.get(
    `${apiUrl}/api/user/removeFromCart?id=${productId}`,
    {
      withCredentials: true,
    },
  );

  data.cart.forEach(item => {
    data.productInfo.forEach((product, index) => {
      if (item.id === product._id) {
        data.productInfo[index].quantity = item.quantity;
      }
    });
  });

  return {
    type: 'REMOVE_CART_ITEM',
    payload: data,
  };
}

export async function onSuccessBuy(paymentData) {
  const { data } = await axios.post(
    `${apiUrl}/api/user/successBy`,
    paymentData,
    {
      withCredentials: true,
    },
  );

  return {
    type: 'ON_SUCCESS_BUY',
    payload: data,
  };
}

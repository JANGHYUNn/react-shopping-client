export default function (state = {}, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, login: action.payload };
    case 'REGISTER':
      return { ...state, register: action.payload };
    case 'AUTH':
      return { ...state, auth: action.payload };
    case 'ADDTOCART':
      return { ...state, userData: { ...state.auth }, cart: action.payload };
    case 'GET_CART_ITEM':
      return { ...state, cartDetail: action.payload };
    default:
      return state;
  }
}

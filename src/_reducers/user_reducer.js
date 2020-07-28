export default function (state = {}, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, login: action.payload };
    case 'REGISTER':
      return { ...state, register: action.payload };
    case 'AUTH':
      return { ...state, auth: action.payload };
    case 'ADDTOCART':
      return { ...state };
    default:
      return state;
  }
}

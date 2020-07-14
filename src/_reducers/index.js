// combineReducers reducer들을 하나로 합쳐주는 역활
import { combineReducers } from 'redux';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;

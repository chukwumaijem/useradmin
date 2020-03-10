import { combineReducers } from 'redux';
import usersReducer from './users';

const rootReducer = combineReducers({
  user: usersReducer
});

export default rootReducer;

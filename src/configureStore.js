import { combineReducers } from 'redux';

import rentalReducer from './modules/Rental';
import returnReducer from './modules/Return';
import tagReducer from './modules/Tag';
import userReducer from './modules/User';

const rootReducer = combineReducers({
  rentalItem: rentalReducer,
  returnStore: returnReducer,
  tagList: tagReducer,
  userList: userReducer,
});

export default rootReducer;

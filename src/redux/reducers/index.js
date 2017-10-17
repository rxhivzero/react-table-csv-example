import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import table from './table';

export default combineReducers({
  table,
  routing
});

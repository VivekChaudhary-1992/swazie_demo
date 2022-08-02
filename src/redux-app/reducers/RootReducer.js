import {combineReducers} from 'redux';
import HomeReducer from '../../features/home/HomeReducer';

export default combineReducers({
  home: HomeReducer,
});

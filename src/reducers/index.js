import { combineReducers } from 'redux';
import getAllProjectsReducer from './getAllProjectsReducer';
import getUserInfoReducer from './getUserInfoReducer';

const rootReducer = combineReducers({
  allProjects: getAllProjectsReducer,
  current_user: getUserInfoReducer
})

export default rootReducer;
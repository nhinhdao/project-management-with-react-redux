import { combineReducers } from 'redux';
import getAllProjectsReducer from './getAllProjectsReducer';
import getAllTasksReducer from './getAllTasksReducer';
import getUserInfoReducer from './getUserInfoReducer';

const rootReducer = combineReducers({
  allProjects: getAllProjectsReducer,
  allTasks: getAllTasksReducer,
  current_user: getUserInfoReducer
})

export default rootReducer;
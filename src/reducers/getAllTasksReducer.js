export default function getAllTasksReducer(state = {tasks: [], loading: false}, action) {
  switch (action.type) {
    case "LOADING_API":
      return {...state, loading: true}
    case "GET_ALL_TASKS":
      return { ...state, loading: false, tasks: action }
    default:
      return state;
  }
}
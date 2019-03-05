export default function getUserInfoReducer(state = {user: {}, loading: false}, action) {
  let user;
  switch (action.type) {
    case "LOADING_API":
      return {...state, loading: true}
    case "SIGN_IN":
      debugger
      user = {id: action.id, username: action.username, email: action.email, image: action.image, project_count: action.project.length, task_count: action.tasks.length}
      return { ...state, user: user, loading: false }
    default:
      return state;
  }
}
export default function getUserInfoReducer(state = {user: {}, users: [], loading: false}, action) {
  let user, resp;
  switch (action.type) {
    case "LOADING_API":
      return {...state, loading: true}
    case "SIGN_IN":
      resp = action.resp;
      user = {id: resp.id, username: resp.username, email: resp.email, image: resp.image, project_count: resp.projects.length, task_count: resp.tasks.length}
      return {...state, user: user, loading: false}
    case "GET_ALL_USERS":
      resp = action.payload.map(data => data = {id: data.id, username: data.username, email: data.email, image: data.image, project_count: data.projects.length, task_count: data.tasks.length})
      return { ...state, users: resp, loading: false }
    case "UPDATE_USER_ACCOUNT":
      debugger
      return state;
    default:
      return state;
  }
}
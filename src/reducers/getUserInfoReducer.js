export default function getUserInfoReducer(state = {user: {}, loading: false}, action) {
  let user, resp;
  switch (action.type) {
    case "LOADING_API":
      return {...state, loading: true}
    case "SIGN_IN":
      resp = action.resp;
      user = {id: resp.id, username: resp.username, email: resp.email, image: resp.image, project_count: resp.projects.length, task_count: resp.tasks.length}
      return { ...state, user: user, loading: false }
    default:
      return state;
  }
}
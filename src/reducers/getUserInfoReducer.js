export default function getUserInfoReducer(state = defaultState, action) {
  let newUser, user, resp;
  switch (action.type) {
    case "LOADING_API":
      return {...state, loading: true}
    case "SIGN_IN":
      resp = action.resp;
      user = {id: resp.id, username: resp.username, email: resp.email, image: resp.image, project_count: resp.projects.length, task_count: resp.tasks.length}
      return {...state, user: user, error: false, loading: false}
    // return {...state, error: false, loading: false}
    case "REGISTER_NEW_USER":
      resp = action.resp;
      user = {id: resp.id, username: resp.username, email: resp.email, image: resp.image, project_count: resp.projects.length, task_count: resp.tasks.length}
      return {...state, user: user, error: false, loading: false}
    case "GET_CURRENT_USER":
    // debugger
      resp = action.resp;
      user = {id: resp.id, username: resp.username, email: resp.email, image: resp.image, project_count: resp.projects.length, task_count: resp.tasks.length}
      return {...state, user: user, error: false, loading: false}
    case "GET_ALL_USERS":
      resp = action.payload.map(data => data = {id: data.id, username: data.username, email: data.email, image: data.image, project_count: data.projects.length, task_count: data.tasks.length})
      return { ...state, users: resp, error: false, loading: false }
    case "UPDATE_USER_ACCOUNT":
      resp = action.resp;
      newUser = {id: resp.id, username: resp.username, email: resp.email, image: resp.image, project_count: resp.projects.length, task_count: resp.tasks.length}
      return {...state, user: newUser, error: false, loading: false, users: state.users.map(user => {
        if (user.id === resp.id){return newUser}
        return user;
      })};
    case "SIGN_OUT":
      return defaultState
    case "SIGN_IN_ERROR":
      return {...state, error: true}
    case 'RESET_ERROR':
      return {...state, error: false}
    default:
      return state;
  }
}

const defaultState = {user: {}, users: [], error: false, loading: false}
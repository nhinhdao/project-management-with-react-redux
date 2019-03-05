export function getUserInfo(userId) {
  const url = `/api/v1/users/${userId}`
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: 'GET_USER_INFO', payload: data }));
  }
}

export function getAllTasks() {
  const url = '/api/v1/tasks'
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: 'GET_ALL_TASKS', payload: data }));
  }
}

export function getAllProjects() {
  const url = '/api/v1/projects'
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: 'GET_ALL_PROJECTS', payload: data }));
  }
}

export function createNewProject(project) {
  const url = 'api/v1/projects'
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    }).then(resp => resp.json())
    .then(resp => {
      if (resp.coffee_shop) {
        // Update redux sore with return data
        dispatch({type: 'ADD_PROJECT_TO_STORE', resp});
      } else {
        dispatch({ type: "ADD_PROJECT_ERROR", errors: resp.errors });
      }
    });
  }
}

export function createNewTask(task) {
  const url = 'api/v1/tasks'
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    }).then(resp => resp.json())
    .then(resp => {
      if (resp.coffee_shop) {
        // Update redux sore with return data
        dispatch({type: 'ADD_TASK_TO_STORE', resp});
      } else {
        dispatch({ type: "ADD_TASK_ERROR", errors: resp.errors });
      }
    });
  }
}

export function signIn(user) {
  const url = 'http://localhost:3001/api/v1/login'
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(resp => resp.json())
      .then(resp => {
      debugger
      if (resp) {
        // Update redux sore with return data
        dispatch({type: 'SIGN_IN', resp});
      } else {
        dispatch({ type: "SIGN_IN_ERROR", errors: resp.errors });
      }
    });
  }
}

export function signOut() {
  const url = 'api/v1/logout'
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    }).then(resp => resp.json())
    .then(resp => {
      if (!resp.error) {
        dispatch({type: 'SIGN_OUT'});
      }
    });
  }
}

export function register(user) {
  const url = 'api/v1/signup'
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(resp => resp.json())
    .then(resp => {
      if (resp.coffee_shop) {
        // Update redux sore with return data
        dispatch({type: 'REGISTER_NEW_USER', resp});
      } else {
        dispatch({ type: "REGISTER_USER_ERROR", errors: resp.errors });
      }
    });
  }
}
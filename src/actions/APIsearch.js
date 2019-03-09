export function getAllUsers() {
  const url = `http://localhost:3001/api/v1/users/`
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: 'GET_ALL_USERS', payload: data }));
  }
}

export function getAllProjects(id) {
  const url = `http://localhost:3001/api/v1/allprojects/${id}`
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: 'GET_ALL_PROJECTS', payload: data }));
  }
}

export function createNewProject(project) {
  let newProject = {
    owner_id: project.owner_id, name: project.name, 
    description: project.description, status: parseInt(project.status), 
    start_date: getDate(project.start_date), end_date: getDate(project.end_date),
    tasks: project.tasks
  }
  const url = 'http://localhost:3001/api/v1/projects'
  return dispatch => {
    dispatch({ type: "LOADING_API" });
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProject)
    }).then(resp => resp.json())
    .then(resp => {
      if (resp.id) {
        // Update redux sore with return data
        dispatch({type: 'ADD_PROJECT_TO_STORE', resp});
      } else {debugger
        dispatch({ type: "ADD_PROJECT_ERROR", errors: resp.errors });
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
  const url = 'http://localhost:3001/api/v1/logout'
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
  const url = 'http://localhost:3001/api/v1/signup'
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
      if (resp) {
        // Update redux sore with return data
        dispatch({type: 'REGISTER_NEW_USER', resp});
      } else {
        dispatch({ type: "REGISTER_USER_ERROR", errors: resp.errors });
      }
    });
  }
}

function getDate(date) {
  return `${date.getFullYear()}-${date.getDate()}-${date.getMonth()}`
}
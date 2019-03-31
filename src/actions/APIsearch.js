import history from '../components/history';

const BASEURL = 'https://wetask-project-management.herokuapp.com/api/v1'

export function getCurrentUser(id) {
  const url = `${BASEURL}/users/${id}`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url)
      .then(response => response.json())
      .then(resp => dispatch({
          type: 'GET_CURRENT_USER',
          resp
        })
      );
  }
}

export function getAllUsers() {
  const url = `${BASEURL}/users`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({
        type: 'GET_ALL_USERS',
        payload: data
      }));
  }
}

export function getAllProjects(id) {
  const url = `${BASEURL}/allprojects/${id}`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({
        type: 'GET_ALL_PROJECTS',
        payload: data
      }));
  }
}

export function getProject(id) {
  const url = `${BASEURL}/projects/${id}`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({
        type: 'GET_PROJECT',
        data
      }));
  }
}

export function createNewProject(project) {
  let newProject = {
    owner_id: project.owner.id,
    title: project.title,
    description: project.description,
    start_date: project.start_date,
    end_date: project.end_date,
    tasks: project.tasks.map(task => task = {
      content: task.content,
      user_id: task.user_id
    })
  };
  const url = `${BASEURL}/projects`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
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
          localStorage.setItem('projectID', resp.id)
          dispatch({
            type: 'ADD_PROJECT_TO_STORE',
            resp
          });
        } else {
          dispatch({
            type: "ADD_PROJECT_ERROR",
            errors: resp.errors
          });
        }
      });
  }
}

export function updateProject(project) {
  let editProject = {
    id: project.project_id,
    title: project.title,
    description: project.description,
    start_date: project.start_date,
    end_date: project.end_date,
    tasks: project.tasks.map(task => task = {
      content: task.content,
      user_id: task.user_id
    })
  };
  const url = `${BASEURL}/projects/${project.project_id}`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editProject)
      }).then(resp => resp.json())
      .then(resp => {
        if (resp.id) {
          // Update redux sore with return data
          dispatch({
            type: 'UPDATE_PROJECT',
            resp
          });
        } else {
          dispatch({
            type: "ADD_PROJECT_ERROR",
            errors: resp.errors
          });
        }
      });
  }
}

export const deleteProject = (projectID) => {
  const url = `${BASEURL}/projects/${projectID}`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: projectID
        })
      }).then(resp => resp.json())
      .then(resp => {
        dispatch({
          type: "DELETE_PROJECT",
          projectID: resp.id
        });
        // history.push("/projects");
      });
  }
}

export function updateUserAccount(user) {
  const id = localStorage.getItem('userID');
  const url = `${BASEURL}/users/${id}`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(resp => resp.json())
      .then(resp => {
        localStorage.setItem("userImage", resp.image);
        localStorage.setItem("userUsername", resp.username);
        dispatch({
          type: "UPDATE_USER_ACCOUNT",
          resp
        });
      })
  }
}

export function signIn(user) {
  const url = `${BASEURL}/login`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }).then(resp => resp.json())
      .then(resp => {
        if (resp.id) {
          // set userId to localstorage for accessing its projects later
          localStorage.setItem("userID", parseInt(resp.id));
          localStorage.setItem("userImage", resp.image);
          localStorage.setItem("userUsername", resp.username);
          // Update redux sore with return data
          dispatch({
            type: 'SIGN_IN',
            resp
          });
          history.push("/")
        } else {
          dispatch({
            type: "SIGN_IN_ERROR",
            errors: resp.errors
          });
        }
      })
  }
}

export function signOut() {
  const url = `${BASEURL}/logout`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
    return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      }).then(resp => resp.json())
      .then(resp => dispatch({
        type: 'SIGN_OUT'
      }))
  }
}

export function register(user) {
  const url = `${BASEURL}/signup`;
  return dispatch => {
    dispatch({
      type: "LOADING_API"
    });
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
          // set userId to localstorage for accessing its projects later
          localStorage.setItem("userID", resp.id);
          localStorage.setItem("userImage", resp.image);
          localStorage.setItem("userUsername", resp.username);
          // Update redux sore with return data
          dispatch({
            type: 'REGISTER_NEW_USER',
            resp
          });
          history.push("/");
        } else {
          dispatch({
            type: "SIGN_IN_ERROR",
            errors: resp.errors
          });
        }
      });
  }
}

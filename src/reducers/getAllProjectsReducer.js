export default function getAllProjectsReducer(state = { projects: [], project: {}, loading: false }, action) {
  let data, project, updatedProject;
  switch (action.type) {
    case 'LOADING_API':
      return { ...state, loading: true}
    case 'GET_ALL_PROJECTS':
      data = action.payload.map(project => 
        data = { id: project.id, title: project.title, owner: project.owner, description: project.description, 
          start_date: project.start_date, end_date: project.end_date, tasks: project.tasks}
        );
      return { ...state, projects: data, loading: false };
    case 'GET_PROJECT':
      data = action.data;
      project = {
        id: data.id,
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        owner: data.owner,
        tasks: data.tasks
      }
      return { ...state, project: project, loading: false };
    case 'ADD_PROJECT_TO_STORE':
      data = action.resp;
      project = {
        id: data.id,
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        owner: data.owner,
        tasks: data.tasks
      }
      return { ...state, project: project, loading: false };
    case 'UPDATE_PROJECT':
      data = action.resp;
      updatedProject = {
        id: data.id,
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        owner: data.owner,
        tasks: data.tasks
      }
      return {...state, projects: state.projects.map(project => {
        if (project.id === data.id){return updatedProject}
        return project;
      })};
    case 'DELETE_PROJECT':
      return { ...state, projects: state.projects.filter(project => project.id !== action.projectID)};
    default:
      return state;
  }
}
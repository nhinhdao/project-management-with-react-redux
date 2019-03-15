export default function getAllProjectsReducer(state = { projects: [], project: {}, loading: false }, action) {
  let places, singlePlace, data;
  switch (action.type) {
    case 'LOADING_QUERY':
      return { ...state, loading: true}
    case 'GET_ALL_PROJECTS':
      data = action.payload.map(project => 
        data = { id: project.id, title: project.title, owner: project.owner, description: project.description, 
          start_date: project.start_date, end_date: project.end_date, tasks: project.tasks}
        );
      return { ...state, projects: data, loading: false };
    case 'ADD_PROJECT_TO_STORE':
      data = action.resp;
      let project = {
        id: data.id,
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        owner: data.owner,
        tasks: data.tasks
      }
      return { ...state, project: project, loading: false };
    case 'REMOVE_FROM_MY_LIST':
      places = [...state.places.map(place => {
        if (place.id !== action.id) { return place }
        return { ...place, isAddedToList: false }
      })];
      singlePlace = { ...state.singlePlace, isAddedToList: false };
      return { ...state, places: places, singlePlace: singlePlace, myList: [...state.myList.filter(place => place.id !== action.id)]};
    default:
      return state;
  }
}
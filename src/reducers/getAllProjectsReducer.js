export default function getAllProjectsReducer(state = { projects: [], project: {}, loading: false }, action) {
  let places, singlePlace, data;
  switch (action.type) {
    case 'LOADING_QUERY':
      return { ...state, loading: true}
    case 'GET_ALL_PROJECTS':
    debugger
      data = action.payload.map(data => data = { id: data.id, name: data.name, category: data.categories[0] ? data.categories[0].title : 'N/A', image: data.image_url, isAddedToList: false});
      return { ...state, places: data, loading: false };
    case 'ADD_PROJECT_TO_STORE':
      data = action.resp;
      let project = {
        id: data.id,
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
        owner: data.owner,
        tasks: data.tasks
      }
      return { ...state, project: project, loading: false };
    case 'ADD_TO_MY_LIST':
      places = [...state.places.map(place => {
        if (place.id !== action.id) { return place }
        return { ...place, isAddedToList: true }
      })];
      singlePlace = { ...state.singlePlace, isAddedToList: true };
      return { ...state, places: places, singlePlace: singlePlace, myList: [...state.myList, singlePlace] };
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
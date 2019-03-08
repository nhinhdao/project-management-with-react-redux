export default function getAllProjectsReducer(state = { projects: [], loading: false }, action) {
  let places, singlePlace, data;
  switch (action.type) {
    case 'LOADING_QUERY':
      return { ...state, loading: true}
    case 'GET_ALL_PROJECTS':
    debugger
      data = action.payload.map(data => data = { id: data.id, name: data.name, category: data.categories[0] ? data.categories[0].title : 'N/A', image: data.image_url, isAddedToList: false});
      return { ...state, places: data, loading: false };
    case 'ADD_PROJECT_TO_STORE':
    debugger
      data = action.payload;
      let searchItem = {
        id: data.id,
        name: data.name,
        contact: data.display_phone,
        category: data.categories[0].title,
        location: data.location.display_address.join(", "),
        rating: data.rating,
        photos: data.photos,
        isAddedToList: false,
      }
      return { ...state, singlePlace: searchItem, loading: false };
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
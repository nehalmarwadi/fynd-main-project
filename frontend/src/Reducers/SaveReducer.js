export function saveReducer(state, action){
    switch (action.type) {
        case "ADD-TO-SAVEDVIDEOS":
            return { ...state, savedVideos: [ ...state.savedVideos, { ...action.payload }] }
        case "REMOVE-FROM-SAVEDVIDEOS":
            return { ...state, savedVideos: state.savedVideos.filter(item => item._id !== action.payload._id) }
        case "LOAD":
            return { ...state, savedVideos: action.payload }
        default:
            return state
    }
}
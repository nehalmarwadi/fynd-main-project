export function likeReducer(state, action){
    switch (action.type) {
        case "ADD-TO-LIKEVIDEOS":
            return { ...state, likedVideos: [ ...state.likedVideos, { ...action.payload }] }
        case "REMOVE-FROM-LIKEVIDEOS":
            return { ...state, likedVideos: state.likedVideos.filter(item => item._id !== action.payload._id) }
        case "LOAD":
            return { ...state, likedVideos: action.payload }
        default:
            return state
    }
}
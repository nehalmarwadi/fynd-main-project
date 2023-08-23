export function playlistReducer(state, action) {
    switch (action.type) {
        case "CREATE-PLAYLIST":
            return { ...state, playlist: action.payload }
        case "DELETE-PLAYLIST":
            return { ...state, playlist: state.playlist.filter(item => item._id !== action.payload) }
        case "CHANGE-PLAYLIST-NAME":
            return { ...state, playlist: state.playlist.map(item => item._id === action.payload.playlistId ? { ...item, playlistName: action.payload.playlistName } : item) }
        case "ADD-TO-PLAYLIST":
            return { ...state, playlist: state.playlist.map(item => item._id === action.payload.playlist ? { ...item, videos: [ ...item.videos, action.payload.video ]} : item) }
        case "REMOVE-FROM-PLAYLIST":
            return { ...state, playlist: state.playlist.map(item => item._id === action.payload.playlist ? { ...item, videos: item.videos.filter(obj => obj._id !== action.payload.video._id)} : item) }
        case "LOAD":
            return { ...state, playlist: action.payload }
        default:
            return state
    }
}
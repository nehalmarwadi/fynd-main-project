export function videoPlayerReducer(state, action) {
    switch (action.type) {
        case "DESC":
            return { ...state, desc: action.payload }
        case "LIKE":
            return { ...state, like: action.payload }
        case "SAVED":
            return { ...state, saved: action.payload }
        case "NEW-PLAYLIST":
            return { ...state, newPlaylist: action.payload }
        case "OPEN-MODAL":
            return { ...state, openModal: action.payload }
        case "PLAYLIST-NAME":
            return { ...state, playlistName: action.payload }
        default:
            return state
    }
}
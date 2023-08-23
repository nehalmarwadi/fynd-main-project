import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "./authContext";
import { playlistReducer } from "../Reducers";

const PlaylistContext = createContext();

export function PlaylistProvider({ children }){

    const [playlistState, playlistDispatch] = useReducer(playlistReducer, { playlist: [] })
    const { authState } = useAuth();

    useEffect(()=>{
        (async function(){
            const { data: { result } } = await axios.get("http://localhost:3000/playlist", { headers: { Authorization: authState.token } });
            playlistDispatch({ type: "LOAD", payload: result })
        })()
    },[authState])

    return(
        <PlaylistContext.Provider value={{ playlistState, playlistDispatch }}>
            {children}
        </PlaylistContext.Provider>
    )
}

export function usePlaylist(){
    return useContext(PlaylistContext)
}
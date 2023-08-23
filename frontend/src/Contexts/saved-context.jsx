import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { saveReducer } from "../Reducers";
import { useAuth } from "./authContext";

const SavedVideosContext = createContext();

export function SavedVideosProvider({ children }){

    const [savedState, savedDispatch] = useReducer(saveReducer, { savedVideos: [] });
    const { authState } = useAuth();

    useEffect(()=>{
        (async function(){
            const { data: { result } } = await axios.get("http://localhost:3000/savedVideos", { headers: { Authorization: authState.token } });
            savedDispatch({ type: "LOAD", payload: result })
        })()
    },[authState])  

    return(
        <SavedVideosContext.Provider value={{ savedState, savedDispatch }}>
            {children}
        </SavedVideosContext.Provider>
    )
}

export function useSavedVideos(){
    return useContext(SavedVideosContext)
}
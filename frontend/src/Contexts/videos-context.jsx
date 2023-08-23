import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const VideosContext = createContext();

export function VideosProvider({children}){

    const [videos, setVideos] = useState([])

    useEffect(()=>{
        (async function(){
            const { data: { result } } = await axios.get("http://localhost:3000/video");
            setVideos(result)
        })()
    },[])

    return(
        <VideosContext.Provider value={{ videos, setVideos }}>
            {children}
        </VideosContext.Provider>
    )
}

export function useVideos(){
    return useContext(VideosContext)
}
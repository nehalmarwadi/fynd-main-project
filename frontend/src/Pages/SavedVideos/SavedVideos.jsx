import React, { useEffect } from 'react'
import { Nav, VideoCard } from "../../Components/index";
import './savedVideos.css';
import { useSavedVideos } from "../../Contexts";
import { NavLink } from 'react-router-dom';

export function SavedVideos() {

    const { savedState } = useSavedVideos();

    useEffect(()=>{
        window.scroll({ top: 0, left: 0 });
    },[])

    return (
        <>
            <Nav />
            <div className="watch-page">
                <div className="watch-card">
                    {savedState.savedVideos.map(video => <VideoCard data={video} key={video.videoId} />)}
                </div>
                {
                    savedState.savedVideos.length === 0 &&
                    <div className="add-video">
                        <h2>You didn't save any video yet.</h2>
                        <h3><NavLink to='/' className="sign-up">Explore</NavLink> and save some videos.</h3>
                    </div>
                }
            </div>
        </>
    )
}

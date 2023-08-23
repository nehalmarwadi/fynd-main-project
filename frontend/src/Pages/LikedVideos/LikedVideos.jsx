import { useEffect } from 'react'
import { Nav, VideoCard } from "../../Components/index";
import { useLikedVideos } from "../../Contexts/like-context";
import { NavLink } from 'react-router-dom';
import './likedvideos.css';

export function LikedVideos() {

    const { likeState } = useLikedVideos();

    useEffect(()=>{
        window.scroll({ top: 0, left: 0 });
    },[])

    return (
        <>
        <Nav />
        <div className="like-page">
            <div className="like-card">
                { likeState.likedVideos.map(video => <VideoCard data={video} key={video.videoId} />) }
            </div>
            {
                likeState.likedVideos.length === 0 &&
                <div className="add-video">
                    <h2>You didn&apos;t like any video yet.</h2>
                    <h3><NavLink to='/' className="sign-up">Explore</NavLink> and like some videos to add them.</h3>
                </div>
            }
        </div>
        </>
    )
}
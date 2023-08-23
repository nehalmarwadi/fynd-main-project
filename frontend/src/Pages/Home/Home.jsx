import { React } from 'react'
import "./home.css"
import { Nav, VideoCard } from "../../Components/index";
import { useVideos } from "../../Contexts";

export function Home() {

    const { videos } = useVideos();

    return (
        <>
            <Nav />
            <div className="video-page">
                {
                    videos.map(video => <VideoCard data={video} key={video._id} />)
                }
            </div>
        </>
    )
}

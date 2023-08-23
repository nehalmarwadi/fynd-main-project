import React from 'react'
import ReactPlayer from "react-player";
import './videocard.css'
import { useNavigate } from "react-router-dom";

export function VideoCard(props) {

    const { data } = props;
    const navigate = useNavigate();
    return (
        <div className="card" onClick={() => navigate(`/watch/${data.videoId}`)}>
            <ReactPlayer
                light='true'
                className='player'
                style={{backgroundImage: `url(${data.img})`}}
            />
            <div className="card-text">
                <p className="card-primary-text">{data.title}</p>
                <p className="card-secondary-text">{data.views} views <b>·</b> {data.uploadDate.substr(0, 10)}</p>
            </div>
        </div>
    )
}
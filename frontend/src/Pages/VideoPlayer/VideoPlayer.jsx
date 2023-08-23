import { React, useState, useEffect, useReducer } from "react";
import axios from 'axios';
import ReactPlayer from "react-player";
import { useParams, useNavigate } from 'react-router-dom';
import { BiLike } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiFillLike } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import './videoplayer.css';
import { Nav } from "../../Components/index";
import { useAuth, useLikedVideos, useSavedVideos, usePlaylist, useVideos } from "../../Contexts";
import { videoPlayerReducer } from "../../Reducers";
import { useSnackbar } from 'react-simple-snackbar';
import { error, success, info } from "../../Utils/snackbar";

export function VideoPlayer() {

    const { likeState, likeDispatch } = useLikedVideos();
    const { savedState, savedDispatch } = useSavedVideos();
    const { playlistState, playlistDispatch } = usePlaylist();
    const { authState } = useAuth();
    const { videos } = useVideos();
    const navigate = useNavigate();
    const axiosConfig = { headers: { Authorization: authState.token } };
    const { id } = useParams();
    const [video, setVideo] = useState({});
    const initialState = { desc: true, like: false, saved: false, newPlaylist: false, openModal: "modal", playlistName: "" }
    const [videoPlayerState, videoPlayerDispatch] = useReducer(videoPlayerReducer, initialState);
    const [openErrorSnackbar] = useSnackbar(error);
    const [openSuccessSnackbar] = useSnackbar(success);
    const [openInfoSnackbar] = useSnackbar(info);

    const likeHandler = async (video) => {
        try {
            if (authState.isUserLoggedIn) {
                if (videoPlayerState.like) {
                    await axios.delete(`http://localhost:3000/likedVideos`, { headers: { Authorization: authState.token }, data: { id: video._id } })
                    likeDispatch({ type: "REMOVE-FROM-LIKEVIDEOS", payload: video });
                    videoPlayerDispatch({ type: "LIKE", payload: false });
                    openSuccessSnackbar('Removed from Liked Videos', 2000)
                } else {
                    var postData = { id: video._id };
                    let axiosConfig = { headers: { Authorization: authState.token } };
                    await axios.post("http://localhost:3000/likedVideos", postData, axiosConfig)
                    likeDispatch({ type: "ADD-TO-LIKEVIDEOS", payload: video });
                    videoPlayerDispatch({ type: "LIKE", payload: true });
                    openSuccessSnackbar('Added to Liked Videos', 2000)
                }
            } else {
                openInfoSnackbar('Login to proceed.', 2000)
                videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal open" })
            }
        } catch (e) {
            if(e.response.status === 401){
                return openInfoSnackbar('Login to proceed.', 2000)
            }else{
                return openErrorSnackbar('Failed to update.', 2000)
            }
        }
    };
    const saveHandler = async (video) => {
        try {
            if (authState.isUserLoggedIn) {
                if (videoPlayerState.saved) {
                    await axios.delete(`http://localhost:3000/savedVideos`, { headers: { Authorization: authState.token }, data: { id: video._id } })
                    savedDispatch({ type: "REMOVE-FROM-SAVEDVIDEOS", payload: video });
                    videoPlayerDispatch({ type: "SAVED", payload: false });
                    openSuccessSnackbar('Removed from Saved Videos', 2000)
                } else {
                    let postData = { id: video._id };
                    await axios.post("http://localhost:3000/savedVideos", postData, axiosConfig)
                    savedDispatch({ type: "ADD-TO-SAVEDVIDEOS", payload: video });
                    videoPlayerDispatch({ type: "SAVED", payload: true });
                    openSuccessSnackbar('Added to Saved Videos', 2000)
                }
            } else {
                openInfoSnackbar('Login to proceed.', 2000)
                videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal open" })
            }
        } catch (e) {
            if(e.response.status === 401){
                return openInfoSnackbar('Login to proceed.', 2000)
            }else{
                return openErrorSnackbar('Failed to update.', 2000)
            }
        }
    };
    const addPlaylistHandler = async (video, playlist, action) => {
        try {
            if (authState.isUserLoggedIn) {
                await axios.patch(`http://localhost:3000/playlist/${playlist._id}`, { videoId: video._id }, axiosConfig)
                playlistDispatch({ type: "ADD-TO-PLAYLIST", payload: { playlist: playlist._id, video: video } });
                videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" })
                openSuccessSnackbar('Added to Playlist.', 2000)
            } else {
                openInfoSnackbar('Login to proceed.', 2000)
            }
        } catch (e) {
            if(e.response.status === 401){
                return openInfoSnackbar('Login to proceed.', 2000)
            }else{
                return openErrorSnackbar('Failed to update.', 2000)
            }
        }
    }
    const removePlaylistHandler = async (video, playlist) => {
        try {
            if (authState.isUserLoggedIn) {
                await axios.delete(`http://localhost:3000/playlist/${playlist._id}`, axiosConfig, { videoId: video._id })
                playlistDispatch({ type: "REMOVE-FROM-PLAYLIST", payload: { playlist: playlist._id, video: video } });
                videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" })
                openSuccessSnackbar('Removed from Playlist.', 2000)
            } else {
                openInfoSnackbar('Login to proceed.', 2000)
            }
        } catch (e) {
            if(e.response.status === 401){
                return openInfoSnackbar('Login to proceed.', 2000)
            }else{
                return openErrorSnackbar('Failed to update.', 2000)
            }
        }
    }
    const createPlaylistHandler = async (video) => {
        try {
            if (authState.isUserLoggedIn) {
                const { data: { result } } = await axios.post("http://localhost:3000/playlist", { playlistName: videoPlayerState.playlistName, videoId: video._id }, axiosConfig)
                playlistDispatch({ type: "CREATE-PLAYLIST", payload: result });
                videoPlayerDispatch({ type: "NEW-PLAYLIST", payload: false });
                videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" })
                openSuccessSnackbar('Playlist created.', 2000)
            } else {
                openInfoSnackbar('Login to proceed.', 2000)
            }
        } catch (e) {
            if(e.response.status === 401){
                return openInfoSnackbar('Login to proceed.', 2000)
            }else{
                return openErrorSnackbar('Failed to update.', 2000)
            }
        }
    }

    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
        const data = videos.find(video => video.videoId === id)
        setVideo(data);
        const isLiked = likeState.likedVideos.some(video => video.videoId === data.videoId);
        const isSaved = savedState.savedVideos.some(video => video.videoId === data.videoId);
        isLiked && videoPlayerDispatch({ type: "LIKE", payload: true });
        isSaved && videoPlayerDispatch({ type: "SAVED", payload: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Nav />
            <div className="player-page">
                <div className="player-card">
                    <ReactPlayer
                        url={video.url}
                        controls='true'
                        playing='true'
                        className="media-player"
                    />
                    <div className="card-text">
                        <p className="card-primary-text">{video.title}</p>
                        <p className="card-secondary-text">{video.views} views <b>·</b>{video.uploadDate}</p>
                        <div className="actions">
                            {videoPlayerState.like && <AiFillLike className="action-icon liked" onClick={() => { likeHandler(video) }} />}
                            {!videoPlayerState.like && <BiLike className="action-icon not-liked" onClick={() => { likeHandler(video) }} />}
                            <RiPlayListAddFill className="action-icon" onClick={() => { videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal open" }) }} />
                            {videoPlayerState.saved && <BsFillBookmarkFill className="action-icon liked" onClick={() => { saveHandler(video) }} />}
                            {!videoPlayerState.saved && <BsBookmark className="action-icon not-liked" onClick={() => { saveHandler(video) }} />}
                        </div>
                        <div className="desc">
                            <p>Description</p>
                            {!videoPlayerState.desc && <IoIosArrowDown className="action-icon" onClick={() => videoPlayerDispatch({ type: "DESC", payload: true })} />}
                            {videoPlayerState.desc && <IoIosArrowUp className="action-icon" onClick={() => videoPlayerDispatch({ type: "DESC", payload: false })} />}
                        </div>
                        {
                            videoPlayerState.desc &&
                            <div className="desc-content">
                                <p>{video.description}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* Playlist Modal */}
            <div className={videoPlayerState.openModal}>
                {
                    authState.isUserLoggedIn
                    ?
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Playlist</h2>
                        </div>
                        <div className="modal-body">
                            {
                                playlistState.playlist.map(item => {
                                    if (item.videos.some(obj => obj._id === video._id)) {
                                        return (
                                            <div key={item._id} className="playlist-name">
                                                <label for={item._id} className="label">{item.playlistName}</label>
                                                <button className="action-btn" onClick={() => { removePlaylistHandler(video, item) }}>Remove</button>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={item._id} className="playlist-name">
                                                <label for={item._id} className="label">{item.playlistName}</label>
                                                <button className="action-btn" onClick={() => { addPlaylistHandler(video, item) }}>Add</button>
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                videoPlayerState.newPlaylist &&
                                <div className="input-div">
                                    <input type="text" placeholder="New Playlist Name" className="playlist-name-input" onChange={(e) => { videoPlayerDispatch({ type: "PLAYLIST-NAME", payload: e.target.value }) }} />
                                    <button className="logout-btn" onClick={() => { createPlaylistHandler(video) }}>Create</button>
                                </div>
                            }
                        </div>
                        <div className="modal-buttons">
                            <button 
                                onClick={() => {
                                    videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" });
                                    videoPlayerDispatch({ type: "NEW-PLAYLIST", payload: false });
                                }}
                                className="close-btn"
                            >Close</button>
                            <button className="logout-btn" onClick={() => { videoPlayerDispatch({ type: "NEW-PLAYLIST", payload: true }); }}>Create new playlist</button>
                        </div>
                    </div>
                    :
                    <div className="modal-content">
                        <div className="modal-header">
                            <p>Login to continue.</p>
                        </div>
                        <div className="modal-body">
                            <div className="modal-buttons">
                                <button 
                                    onClick={() => {
                                        videoPlayerDispatch({ type: "OPEN-MODAL", payload: "modal" });
                                    }}
                                    className="close-btn"
                                >Close</button>
                                <button className="logout-btn" onClick={()=>{navigate('/login')}}>Login</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.route('/')
    .get(authorizedUser, async (req, res) => {
        const { username } = req.body;
        try{
            const { playlist } = await User.findOne({ username: username }).populate({ path: 'playlist', populate: { path: 'videos', populate: 'Video' } })
            res.json({
                success: true,
                result: playlist
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to fetch the playlist"
            })
        }
    })
    .post(authorizedUser, async (req, res) => {
        const { username, playlistName, videoId } = req.body;
        try{
            const updatedData = await User.findOneAndUpdate({ username: username }, { $push: { playlist: { playlistName: playlistName, videos: videoId } } });
            const { playlist } = await User.findOne({ username: username }).populate({ path: 'playlist', populate: { path: 'videos', populate: 'Video' } });
            res.json({
                success: true,
                result: playlist
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to create new playlist."
            })
        }
    })
    .delete(authorizedUser, async (req, res) => {
        const { username, playlistId } = req.body;
        try{
            const deletedData = await User.findOneAndUpdate({ username: username }, { $pull: { playlist: { _id: playlistId } } });
            res.json({
                success: true,
                result: "Playlist deleted successfully."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to delete the playlist."
            })
        }
    })

router.route('/:id')
    .patch(authorizedUser, async (req, res) => {
        const { username, videoId } = req.body;
        const { id } = req.params;
        try{
            // const { playlist } = await User.findOne({ username: username }).populate({ path: 'videos', populate: 'Video' })
            // const requiredPlaylist = playlist.find(item => item._id.toString() === id.toString())
            const updatedData = await User.findOneAndUpdate({ username: username, "playlist._id": id }, { $push: { "playlist.$.videos": videoId } })
            res.json({
                success: true,
                result: "Playlist updated successfully."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to update the playlist."
            })
        }
    })
    .delete(authorizedUser, async (req, res) => {
        const { username, videoId } = req.body;
        const { id } = req.params;
        try{
            const updatedData = await User.findOneAndUpdate({ username: username, "playlist._id": id }, { $pull: { "playlist.$.videos": videoId } })
            res.json({
                success: true,
                result: "Playlist updated successfully."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to update the playlist."
            })
        }
    })

module.exports = router
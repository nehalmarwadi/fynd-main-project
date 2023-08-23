const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.route('/')
    .get(authorizedUser, async (req, res) => {
        const { username } = req.body;
        try{
            const { likedVideos } = await User.findOne({ username: username }).populate({ path: 'likedVideos', populate: 'Video' })
            res.json({
                success: true,
                result: likedVideos
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to fetch the liked videos"
            })
        }
    })
    .post(authorizedUser, async (req, res) => {
        const { username, id } = req.body;
        try{
            const updatedData = await User.findOneAndUpdate({ username: username }, { $push: { likedVideos: id } })
            res.json({
                success: true,
                result: "Added to the Liked Videos."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to add to the liked videos."
            })
        }
    })
    .delete(authorizedUser, async (req, res) => {
        const { username, id } = req.body;
        try{
            const deletedData = await User.findOneAndUpdate({ username: username }, { $pull: { likedVideos: id } });
            res.json({
                success: true,
                result: "Video removed from liked videos."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to delete the video from liked videos."
            })
        }
    })

module.exports = router
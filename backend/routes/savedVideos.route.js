const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.route('/')
    .get(authorizedUser, async (req, res) => {
        const { username } = req.body;
        try{
            const { savedVideos } = await User.findOne({ username: username }).populate({ path: 'savedVideos', populate: 'Video' })
            res.json({
                success: true,
                result: savedVideos
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to fetch the saved videos."
            })
        }
    })
    .post(authorizedUser, async (req, res) => {
        const { username, id } = req.body;
        try{
            const updatedData = await User.findOneAndUpdate({ username: username }, { $push: { savedVideos: id } })
            res.json({
                success: true,
                result: "Added to the Saved Videos."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to add to the saved videos."
            })
        }
    })
    .delete(authorizedUser, async (req, res) => {
        const { username, id } = req.body;
        try{
            const deletedData = await User.findOneAndUpdate({ username: username }, { $pull: { savedVideos: id } });
            res.json({
                success: true,
                result: "Video removed from saved videos."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to delete the video from saved videos."
            })
        }
    })

module.exports = router
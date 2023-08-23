const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.route('/')
    .get(authorizedUser, async (req, res) => {
        const { username } = req.body;
        try{
            const { history } = await User.findOne({ username: username }).populate({ path: 'history', populate: 'Video' })
            res.json({
                success: true,
                result: history
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to fetch the history"
            })
        }
    })
    .post(authorizedUser, async (req, res) => {
        const { username, id } = req.body;
        try{
            const updatedData = await User.findOneAndUpdate({ username: username }, { $push: { history: id } })
            res.json({
                success: true,
                result: "Added to History."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to add to the history"
            })
        }
    })
    .delete(authorizedUser, async (req, res) => {
        const { username, id } = req.body;
        try{
            const deletedData = await User.findOneAndUpdate({ username: username }, { $pull: { history: id } });
            res.json({
                success: true,
                result: "Video removed from history."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to delete the video from history"
            })
        }
    })

module.exports = router
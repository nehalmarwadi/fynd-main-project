const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.route('/')
    .get(authorizedUser, async (req, res) => {
        const { username } = req.body;
        try{
            const { notes } = await User.findOne({ username: username }).populate({ path: 'notes', populate: { path: 'videoId', populate: 'Video' } })
            res.json({
                success: true,
                result: notes
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to fetch the notes."
            })
        }
    })
    .post(authorizedUser, async (req, res) => {
        const { username, note } = req.body;
        try{
            const user = await User.findOne({ username: username })
            const prevData = user.notes.find(item => item.videoId.toString() === note.videoId.toString())
            if (prevData) {
                const updatedData = await User.findOneAndUpdate({ username: username, "notes.videoId": note.videoId.toString() }, { $set: { "notes.$.videoNote": note.videoNote } })
            } else {
                const updatedData = await User.findOneAndUpdate({ username: username }, { $push: { notes: note } })
            }
            res.json({
                success: true,
                result: "Notes created successfully."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to create new note."
            })
        }
    })
    .delete(authorizedUser, async (req, res) => {
        const { username, noteId } = req.body;
        try{
            const deletedData = await User.findOneAndUpdate({ username: username }, { $pull: { notes: { _id: noteId } } });
            res.json({
                success: true,
                result: "Notes deleted successfully."
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error:  e.message,
                result: "Failed to delete the note."
            })
        }
    })

module.exports = router
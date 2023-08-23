const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: { type: String, lowercase: true, unique: true, index: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    likedVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    savedVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    playlist: [
        {
            playlistName: { type: String },
            videos: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Video'
                }
            ]
        }
    ],
    notes: [
        {
            videoId: {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            },
            videoNote: { type: String }
        }
    ]
}, { timestamps: true })
const User = mongoose.model('User', userSchema)

module.exports = { User }
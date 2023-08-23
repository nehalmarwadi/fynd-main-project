const mongoose = require('mongoose')
const { Schema } = mongoose

const videoSchema = new Schema({
    videoId: { type: String, unique: true, index: true, required: true },
    url: { type: String },
    img: { type: String },
    title: { type: String },
    topic: { type: String },
    views: { type: Number },
    uploadDate: { type: Date },
    like: { type: Number },
    description: { type: String }
}, { timestamps: true })
const Video = mongoose.model('Video', videoSchema)

module.exports = { Video }
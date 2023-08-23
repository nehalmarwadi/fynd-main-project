const User = require('./user.route');
const Video = require('./video.route');
const History = require('./history.route');
const LikedVideos = require('./likedVideos.route');
const SavedVideos = require('./savedVideos.route');
const Playlist = require('./playlist.route');
const Notes = require('./notes.route');

module.exports = { User, Video, History, LikedVideos, SavedVideos, Playlist, Notes }
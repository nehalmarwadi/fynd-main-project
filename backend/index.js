require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { User, Video, History, LikedVideos, SavedVideos, Playlist, Notes } = require('./routes/index')
const { appConnection } = require('./utils/appConnection')

const app = express();
const PORT = process.env['PORT'];
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the server of Learn It - Video Library App.")
});

app.use('/user', User);

app.use('/video', Video);

app.use('/history', History);

app.use('/likedVideos', LikedVideos);

app.use('/savedVideos', SavedVideos);

app.use('/playlist', Playlist);

app.use('/notes', Notes);

app.use('*', (req, res) => {
    res.status(404).send("Error 404 - Page not found.")
});

app.listen(PORT, () => appConnection(PORT));
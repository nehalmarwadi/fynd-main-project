const express = require('express')
const router = express.Router()
const { Video } = require('../models/video.model')
const { authorizedUser } = require('../utils/authorizedUser')

router.route('/')

    .get(async(req, res)=>{
        try{
            const videos = await Video.find();
            res.json({
                success: true,
                result: videos
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error: e.message,
                result: 'Unable to fetch data.'
            })
        }
        
    })

    .post(authorizedUser, async(req,res)=>{
        const { videoId, url, img, title, topic, views, uploadDate, like, description } = req.body;
        try{
            const newVideo = await new Video({
                videoId: videoId,
                url: url,
                img: img,
                title: title,
                topic: topic,
                views: views,
                uploadDate: uploadDate,
                like:  like,
                description: description  
            })
            const video = await newVideo.save();
            res.json({
                success: true,
                result: `${video.title} - video added successfully.`
            })
        }catch(e){
            console.log(e.message);
            res.status(409).json({
                success: false,
                error: e.message,
                result: "Failed to add new video."
            })
        }
    })

router.route('/:id')

    .get(async(req, res)=>{
        const  { id }  = req.params;
        try{
            const video = await Video.findOne({ videoId: id});
            res.json({
                success: true,
                result: video
            })
        }catch(e){
            console.log(e.message);
            res.status(404).json({
                success: false,
                error: e.message,
                result: 'Video not found'
            })
        }
    })

module.exports = router
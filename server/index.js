import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import multer from 'multer';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
import { storage } from './storage/storage';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const staticReactFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticReactFiles);

const upload = multer({ storage: storage });

app.post('/upload-video', upload.fields([{name: 'video', maxCount: 1}, {name: 'images', maxCount: 8}, {name: 'videoEditor', maxCount: 1}]), (req, res, next) => {
    const filters = [];
    const videoEditorData = JSON.parse(req.body['videoEditor']);
    let input2 = 1;

    const ffmpegChained = new ffmpeg(`./videos/${req.files['video'][0].originalname}`);
    
    for (let i = 0 ; i < req.files['images'].length; i++) {
        ffmpegChained.input(`./videos/${req.files['images'][i].originalname}`);
    }

    for (let i = 0; i < videoEditorData.length; i++) {
        const item = videoEditorData[i];

        if (input2 === 1) {
            filters.push({
                "filter": item.type,
                "options": {
                    "x": item.position.x,
                    "y": item.position.y,
                    "enable": `between(t,${item.time})`
                },
                "inputs": "[0][1]",
                "outputs": "[tmp]"
            });
        } else if (input2 === videoEditorData.length) {
            filters.push({
                "filter": item.type,
                "options": {
                    "x": item.position.x,
                    "y": item.position.y,
                    "enable": `between(t,${item.time})`
                },
                "inputs": `[tmp][${input2}]`,
            });
        } else {
            filters.push({
                "filter": item.type,
                "options": {
                    "x": item.position.x,
                    "y": item.position.y,
                    "enable": `between(t,${item.time})`
                },
                "inputs": `[tmp][${input2}]`,
                "outputs": "[tmp]"
            });
        }   

        input2 += 1;
    }

    ffmpegChained
        .complexFilter(filters)
        .videoCodec('libx264')
        .videoBitrate(2500)
        .format('mp4')
        .audioCodec('libmp3lame')
        .save('./dupa.mp4')
        .on('end', () => {
            console.log('success');
        });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Started');
});
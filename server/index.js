import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import multer from 'multer';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

import { storage } from './storage/storage';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const staticReactFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticReactFiles);

ffmpeg.setFfmpegPath(ffmpegPath);

const upload = multer({ storage: storage });

app.post('/upload-video', upload.fields([{name: 'video', maxCount: 1}, {name: 'images', maxCount: 8}, {name: 'videoEditor', maxCount: 1}]), (req, res, next) => {
    const filters = [];
    const videoEditorData = JSON.parse(req.body['videoEditor']);
    let input = 1;

    const ffmpegChained = new ffmpeg(`./videos/${req.files['video'][0].originalname}`);

    if (req.files['images']) {
        for (let i = 0 ; i < req.files['images'].length; i++) {
            ffmpegChained.input(`./images/${req.files['images'][i].originalname}`);
        }
    }

    for (let i = 0; i < videoEditorData.length; i++) {
        const item = videoEditorData[i];

        switch(item.type) {
            case 'overlay':
                filters.push({
                    filter: item.type,
                    options: {
                        x: item.position.x,
                        y: item.position.y,
                        enable: `between(${item.time})`
                    }
                });
                break;
            default: throw new Error('Wrong type!');
        }
    }

    for (let i = 0; i < filters.length; i++) {
        const item = filters[i];

        if (filters.length !== 1) {
            switch(input) {
                case 1:
                    item['inputs'] = "0";
                    item['outputs'] = "1";
                    break;
                case filters.length:
                    item['inputs'] = (input -= 1).toString();
                    break;
                default:
                    item['inputs'] = (input -= 1).toString();
                    item['outputs'] = (input += 1).toString();
                    break;
            }
        } else {
            item['inputs'] = '0';
        }

        input++;
    }

    console.log(filters);    

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

    return res.status(200);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Started');
});
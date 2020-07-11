import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import multer from 'multer';
import { storage } from './storage/storage';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const staticReactFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticReactFiles);

const upload = multer({ storage: storage });

app.post('/upload-video', upload.single('video'), (req, res, next) => {
    res.status(200).send({name: req.file.filename});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Started');
});
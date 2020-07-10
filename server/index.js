import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const staticReactFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticReactFiles);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
})

app.listen(process.env.PORT || 8080, () => {
    console.log('Started');
})
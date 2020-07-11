import multer from 'multer';

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './videos')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
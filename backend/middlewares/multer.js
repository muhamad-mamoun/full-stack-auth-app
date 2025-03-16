const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => { callback(null, 'uploads') },

    filename: (req, file, callback) => {
        const extension = file.originalname.split('.')[1];
        const fileName = `${req.body.FullName.replace(/\s/g, '-')}-${Math.round(Math.random() * 1E9)}.${extension}`;
        req.body.ProfilePicture = fileName;
        callback(null, fileName);

    }
});

const uploads = multer({ storage });

module.exports = uploads;
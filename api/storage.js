const multer = require('multer'); // multer is a middleware that handles file uploads
const path = require('path'); // path is a built-in module that allows us to work with file paths

const storage = multer.diskStorage({ // this is the settings for the disk storage engine
    destination: (req, file, callback) => { // here, we define the destination folder for the uploaded files
        callback(null, 'public/images');
    },
    filename: (req, file, callback) => { // here, we define the filename for the uploaded files
        callback(null, Date.now() + path.extname(file.originalname)); // this is required to avoid filename conflicts and to keep the filenames unique
    }
});

// create the upload middleware with the storage configuration above
const upload = multer({ storage: storage });

// export the upload middleware to be used in the project files
module.exports = upload;
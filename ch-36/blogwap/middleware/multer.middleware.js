const multer = require("multer");
const crypto = require("crypto");

const unique = crypto.randomBytes(5).toString("hex");
const storage = multer.diskStorage({
    destination : (request, fileInfo, callBack)=>{
        callBack(null, "storage/images")
    },
    filename : (request, fileInfo, callBack)=>{
        callBack(null, unique+"image.jpg");
    }
})
const multipart = multer({
    storage : storage
}).single("image");

module.exports = multipart;
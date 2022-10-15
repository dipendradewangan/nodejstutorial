const multer = require("multer");
const storage = multer.diskStorage({
    destination : (request, fileInfo, callBack)=>{
        callBack(null, "storage/images")
    },
    filename : (request, fileInfo, callBack)=>{
        callBack(null, "demo.jpg");
    }
})
const multipart = multer({
    storage : storage
}).single("image");

module.exports = multipart;
const uploadFile = (request, response)=>{
    response.json({
        textData : request.body,
        fileData : request.file
    });
};


module.exports = {
    uploadFile : uploadFile
}
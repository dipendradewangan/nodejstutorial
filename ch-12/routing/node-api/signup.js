exports.result = (request, response) => {

    let formData = "";
    request.on("data", (chunks)=>{
        formData += chunks.toString();
    });

    request.on("end", ()=>{
        console.log(formData);
        return response.end();
    })

    /*
    response.writeHead(200, {
        'Content-type': 'application/json'
    });

    const message = JSON.stringify({
        message : "success"
    })

    response.write(message);
    return response.end();
    */
};

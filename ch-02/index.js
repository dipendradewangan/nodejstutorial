const http = require("http");

const server = http.createServer((request, response)=>{
    // operation section
    const date = new Date();
    const current_date = date.toLocaleDateString();
    const current_time = date.toLocaleTimeString();
    // response info
    response.writeHead(200,{
        'content-type': 'application/json'
    });

    // response in json formate
    const period = {
        current_date : current_date,
        current_time : current_time
    }

    const period_string = JSON.stringify(period);
    response.write(period_string);
    response.end();
})


server.listen(800);
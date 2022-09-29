const http = require("http");
const mongo = require("mongodb");

const server = http.createServer((request, response)=>{

    const url = "mongodb://127.0.0.1:27017";
    mongo.MongoClient.connect(url, (error, conn)=>{
        if(error)
            throw error;
        
        const db = conn.db("project");

        const order = {
            purchased_at : 1
        }

        db.collection("products").find().sort(order).limit(10).toArray((error, dataResponse)=>{
            response.writeHead("200", {
                'Content-type' : 'application/json'
            });



            const successMessage = JSON.stringify(dataResponse);
            response.write(successMessage);
            response.end();
        })
    })

    // response.end();
});

server.listen(10);
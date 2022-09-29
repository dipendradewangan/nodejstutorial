const http = require("http");
const mongo = require("mongodb");

const server = http.createServer((request, responce) => {

    const url = "mongodb://127.0.0.1:27017";
    mongo.MongoClient.connect(url, (error, conn) => {
        if (error)
            throw error;

        const db = conn.db("project");

        const query = {
            id : {
                $nin : [2,3],
                
            }
        }

        const fieldControl = {
            projection: {
                _id : 0
                
            }
        }

        db.collection("posts").find(query, fieldControl).limit(3).toArray((error, dataResponse) => {
            responce.write(JSON.stringify(dataResponse));
            // console.log(dataResponse);
            responce.end()

        });
    });
});

server.listen(1000);
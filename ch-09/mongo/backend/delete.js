const http = require("http");
const mongo = require("mongodb");

const server = http.createServer((request, response)=>{


    // delete one

    const url = "mongodb://127.0.0.1:27017";
    mongo.MongoClient.connect(url, (error, conn)=>{
        if(error)
            throw error;
        
        
        const db = conn.db("project");
        const deleteQuery = {
            id : 2
        };
        db.collection("products").deleteOne(deleteQuery, (error, checkDelete)=>{
            if(error)
                throw error;
            
            console.log(checkDelete);
            response.end();
        });
    });


    // delete many 

    // const url = "mongodb://127.0.0.1:27017";
    // mongo.MongoClient.connect(url, (error, conn)=>{
    //     if(error)
    //         throw error;
        
        
    //     const db = conn.db("project");
    //     const deleteQuery = {
    //         id : 2
    //     };
    //     db.collection("products").deleteMany(deleteQuery, (error, checkDelete)=>{
    //         if(error)
    //             throw error;
            
    //         console.log(checkDelete);
    //         response.end();
    //     });
    // });
});

server.listen(10);
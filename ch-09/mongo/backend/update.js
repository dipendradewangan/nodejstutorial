const http = require("http");
const mongo = require("mongodb");


const server = http.createServer((request, response)=>{

// update one

//     const url = "mongodb://127.0.0.1:27017";
//     mongo.MongoClient.connect(url, (error, conn)=>{
//         if(error)
//             throw error;

//         const db = conn.db("project");

//         const query = {
//             id : 2
//         };

//         const updateData = {
//             $set : {
//                 product_name : "Camera"
//             }
//         };
//         db.collection("products").updateOne(query, updateData, (error, checkUpdate)=>{
//             if(error)
//                 throw error;
            
//             console.log("update success");
//             response.end()
//         });
//     });


// update many

    const url = "mongodb://127.0.0.1:27017";
    mongo.MongoClient.connect(url, (error, conn)=>{
        if(error)
            throw error;
        
        const db = conn.db("project");

        const query = {
            id : 2
        };

        const updateData = {
            $set : {
                id : "Mouse"
            }
        };
        db.collection("products").updateMany(query, updateData, (error , checkUpdate)=>{
            if(error)
                throw error;
            
            console.log("mulitple update success!");
            response.end();
        });
    });
    
});


server.listen(100);


// update many



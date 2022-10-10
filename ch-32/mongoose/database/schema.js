const mongo = require("mongoose");
const { Schema } = mongo;
const userSchema =new Schema({
    name : String,
    username : String,
    password : String,
    mobile : Number,
    isLogged : Boolean
});

module.exports = {
    userSchema : mongo.model("User", userSchema)
}























// const mongo = require("mongoose");
// const { Schema } = mongo;

// const userSchema = new Schema({
//     name : String,
//     username : String, 
//     password : String,
//     mobile : Number,
//     isLogged : Boolean
// })

// module.exports = {
//     userSchema : mongo.model("User", userSchema)
// }

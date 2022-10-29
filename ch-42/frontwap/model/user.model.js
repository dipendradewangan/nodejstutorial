const mongo = require("mongoose");
const { Schema } = mongo;

const userSchema = new Schema({
    uid : {
        type : String,
        unique : true
    },
    password : {
        type : String,
        required : [true, "Password field is reqquired"],
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

})
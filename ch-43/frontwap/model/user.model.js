const mongo = require("mongoose");
const bcryptService = require("../services/bcrypt.servises");
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

});

userSchema.pre("save", async function(){
    const data = this.password.toString();
    const encryptedPassword = await bcryptService.encrypt(data);
    this.password = encryptedPassword;
})


module.exports = mongo.model("User", userSchema);
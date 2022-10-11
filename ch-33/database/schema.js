const mongo = require("mongoose");
const { Schema } = mongo;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: String,
  password: String,
  mobile: [Number],
  islogged: {
    type: Boolean,
    default: false
  },
  address: {
    city: String,
    state: String,
    country: String,
    pincode: Number
  },
  qualifications: [
    {
      class: Number,
      marks: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  userSchema: mongo.model("User",userSchema)
}

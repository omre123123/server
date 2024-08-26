
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  phone: {
    type: String,
    required: true,
    unique:true
  },
  pass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart:{
    type:Array,
    default:[]
  }
});
const USER_MODEL = model("user", userSchema);

module.exports = USER_MODEL;


const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  id:{
    type: String,
    required: true,
    unique:true,
  },
  name: String,
  phone: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart:[]
});
const USER_MODEL = model("user", userSchema);

module.exports = USER_MODEL;

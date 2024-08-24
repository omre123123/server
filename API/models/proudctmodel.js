
const { Schema, model } = require("mongoose");

const prodctSchema = new Schema({
  id:{
    type: String,
    required: true,
    unique:true,
  },
  name: {
    type: String,
    required: true,
  },
  hp: Number,
  price:Number,
  info:String,
  model: {
    type: String,
    required: false,
  },
  slenders: {
    type: String,
    required: false,
  },
  image:{
    type:String,
    required:false
  }
});
const  prodct_MODEL = model(" prodct", prodctSchema);

module.exports =  prodct_MODEL;

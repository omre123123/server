const { Schema, model } = require("mongoose");

const studentmoduleSchema = new Schema({
  name:{
    type: String,
    required: true,
    unique:true,
  },
  age: String,
  hobbies: String,
  number_id: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum:[1,2,3]
  }
});

const STUDENT_MODULE = model("studentmodule", studentmoduleSchema);

module.exports = STUDENT_MODULE;

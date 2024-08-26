const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  pass: {
    type: String,
    required: true,
    minlength: 6, // Ensuring password has at least 6 characters
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  cart: {
    type: [Schema.Types.Mixed], // Using Schema.Types.Mixed to allow diverse data types
    default: [],
  }
});

const USER_MODEL = model("User", userSchema);

module.exports = USER_MODEL;
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
    validate: [validator.isEmail, 'Invalid email address'], // Validate email format
  },
  cart: {
    type: [Schema.Types.Mixed], // Using Schema.Types.Mixed to allow diverse data types
    default: [],
  }
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('pass')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.pass = await bcrypt.hash(this.pass, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Method to compare given password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.pass);
  } catch (err) {
    throw err;
  }
};

const USER_MODEL = model("User", userSchema);

module.exports = USER_MODEL;

const USER_MODEL = require("../models/user.model");

// Create a single user
const createuser = async (req, res) => {
  try {
    const { name, phone, email, pass } = req.body;

    if (!name || !phone || !email || !pass) {
      return res.status(400).json({
        error: true,
        errormessage: "All fields are required.",
      });
    }

    // Trim email to remove any unwanted spaces
    const trimmedEmail = email.trim();

    // Create user
    const user = await USER_MODEL.create({
      name,
      phone,
      email: trimmedEmail,
      pass,
    });

    res.status(201).json({
      user,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

// Create multiple users
const createusers = async (req, res) => {
  try {
    const usersData = req.body.users; // Expecting an array of user objects

    if (!Array.isArray(usersData) || usersData.length === 0) {
      return res.status(400).json({
        error: true,
        errormessage: "A non-empty array of users is required.",
      });
    }

    // Create multiple users in the database
    const users = await USER_MODEL.insertMany(usersData, { throwOnValidationError: true });

    res.status(201).json({
      users,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

// Find users by phone number
const find = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        error: true,
        errormessage: "Phone number is required.",
      });
    }

    const users = await USER_MODEL.find({ phone });

    res.status(200).json({
      users,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

// Find a single user by phone number
const findone = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        error: true,
        errormessage: "Phone number is required.",
      });
    }

    const user = await USER_MODEL.findOne({ phone });

    res.status(200).json({
      user,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

// Delete a user by phone number
const deleteone = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        error: true,
        errormessage: "Phone number is required.",
      });
    }

    const result = await USER_MODEL.deleteOne({ phone });

    res.status(200).json({
      result,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

// Update a user by phone number
const updateone = async (req, res) => {
  try {
    const { phone, pass } = req.body;

    if (!phone || !pass) {
      return res.status(400).json({
        error: true,
        errormessage: "Phone number and new password are required.",
      });
    }

    const user = await USER_MODEL.findOneAndUpdate(
      { phone },
      { pass },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      user,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) {
      return res.status(400).json({
        error: true,
        errormessage: "Email and password are required.",
      });
    }

    // Trim email to remove any unwanted spaces
    const trimmedEmail = email.trim();

    const user = await USER_MODEL.findOne({ email: trimmedEmail, pass });

    res.status(200).json({
      user,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

// Get users older than a specified age
const get18 = async (req, res) => {
  try {
    const { age } = req.body;

    if (age === undefined) {
      return res.status(400).json({
        error: true,
        errormessage: "Age is required.",
      });
    }

    const users = await USER_MODEL.find({ age: { $gt: age } });

    res.status(200).json({
      users,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

module.exports = {
  createuser,
  createusers,
  find,
  findone,
  deleteone,
  updateone,
  login,
  get18
};
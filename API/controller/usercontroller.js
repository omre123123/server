const USER_MODEL = require("../models/user.model");

// app.post("/createuser", 
const createuser = async (req, res) => {
    try {
      const { name, age, pass, phone,id,email } = req.body;
      const user = await USER_MODEL.create({
        id,
        name,
        age,
        pass,
        phone,
        email
      });
  
      res.status(200).json({
        user: user,
      });
  
    } catch (error) {
      res.status(500).json({
        error: true,
        errormessage: error.message,
      });
    }
  };

//   app.post("/createusers", 
const createusers=   async (req, res) => {
    try {
      const usersData = req.body.users; // Expecting an array of user objects
  
      if (!Array.isArray(usersData) || usersData.length === 0) {
        return res.status(400).json({
          error: true,
          errormessage: "A non-empty array of users is required",
        });
      }
  
      // Create multiple users in the database
      const users = await USER_MODEL.insertMany(usersData,{throwOnValidationError:true});
  
      res.status(200).json({
        users: users,
      });
  
    } catch (error) {
      res.status(500).json({
        error: true,
        errormessage: error.message,
      });
    }
  };

//   app.post("/find",
    const find= async (req, res) => {
    try {
      const { phone } = req.body;
      const user = await USER_MODEL.find({ phone: phone });
  
      res.status(200).json({
        user: user,
      });
  
    } catch (error) {
      res.status(500).json({
        error: true,
        errormessage: error.message,
      });
    }
  };
  
//   app.post("/findone", 
   const findone= async (req, res) => {
    try {
      const { phone } = req.body;
      const user = await USER_MODEL.findOne({ phone: phone });
  
      res.status(200).json({
        user: user,
      });
  
    } catch (error) {
      res.status(500).json({
        error: true,
        errormessage: error.message,
      });
    }
  };
  
//   app.post("/deleteone",
    const deleteone= async (req, res) => {
    try {
      const { phone } = req.body;
      const result = await USER_MODEL.deleteOne({ phone: phone });
  
      res.status(200).json({
        result: result,
      });
  
    } catch (error) {
      res.status(500).json({
        error: true,
        errormessage: error.message,
      });
    }
  };
  
//   app.post("/updateone", 
   const updateone= async (req, res) => {
    try {
      const { phone, pass } = req.body;
      const user = await USER_MODEL.findOneAndUpdate(
        { phone: phone },
        { pass: pass },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        user: user,
      });
  
    } catch (error) {
      res.status(500).json({
        error: true,
        errormessage: error.message,
      });
    }
  };
  
//   app.post("/login", 
   const login = async (req, res) => {
    try {
      const { phone, pass } = req.body;
      const user = await USER_MODEL.findOne({ phone: phone, pass: pass });
  
      res.status(200).json({
        user: user,
      });
  
    } catch (error) {
      res.status(500).json({
        error: true,
        errormessage: error.message,
      });
    }
  };
  
//   app.post("/get18",
    const get18= async (req, res) => {
    try {
      const { age } = req.body;
      const users = await USER_MODEL.find({ age: { $gt: age } });
  
      res.status(200).json({
        users: users,
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
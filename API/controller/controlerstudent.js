const STUDENT_MODULE = require("../models/studentmodule");
const { login } = require("./usercontroller");

const createstudent = async (req, res) => {
    try {
      const { name, age, hobbies, number_id,level } = req.body;
      const user = await STUDENT_MODULE.create({
        name,
        age,
        hobbies,
        number_id,
        level
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

  module.exports = {
    createstudent
  }
const prodct_MODEL = require("../models/proudctmodel");

const createpro = async (req, res) => {
  try {
    const { name, price, info, selenders, model, hp, id,image} = req.body;
    const prodct = await prodct_MODEL.create({
      name,
      price,
      info,
      selenders,
      model,
      hp,
      id,
      image
    });

    res.status(200).json({
      prodct: prodct,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

const createprodects = async (req, res) => {
  try {
    const prodactsData = req.body.prodcts;

    if (!Array.isArray(prodactsData) || prodactsData.length === 0) {
      return res.status(400).json({
        error: true,
        errormessage: "A non-empty array of prodacts is required",
      });
    }

    const prodct = await prodct_MODEL.insertMany(prodactsData, {
      throwOnValidationError: true,
    });

    res.status(200).json({
      prodct: prodct,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

const findpro = async (req, res) => {
  try {
    let query = {};

    if (Object.keys(req.body).length > 0) {
      query = req.body;
    }

    const prodct = await prodct_MODEL.find(query);

    res.status(200).json({
      prodct: prodct,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

const findone = async (req, res) => {
  try {
    const { name } = req.body;
    const prodct = await prodct_MODEL.findOne({ name: name });

    res.status(200).json({
      prodct: prodct,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

const deleteonepro = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await prodct_MODEL.deleteOne({ name: name });

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

const updateonepro = async (req, res) => {
  try {
    const { name, price } = req.body;
    const prodct = await prodct_MODEL.findOneAndUpdate(
      { name: name },
      { price },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      prodct: prodct,
    });

  } catch (error) {
    res.status(500).json({
      error: true,
      errormessage: error.message,
    });
  }
};

module.exports = {
  createpro,
  createprodects,
  findpro,
  findone,
  updateonepro,
  deleteonepro,
};

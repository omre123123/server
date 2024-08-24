const { Router } = require("express");
const { createpro, createprodects, findpro, updateonepro, deleteonepro, findone } = require("../controller/ prodctcontroller");
const { createstudent } = require("../controller/controlerstudent");


const productRouter = Router();

productRouter.post("/createPro", createpro); 
productRouter.post("/createstudent", createstudent); 

productRouter.post("/createMultiple", createprodects); 
productRouter.post("/findpro", findpro); 
productRouter.post("/findOnePro", findone);
productRouter.post("/updateonepro", updateonepro);
productRouter.post("/deletePro", deleteonepro); 

module.exports = productRouter;

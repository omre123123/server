const { Router } = require("express");
const { login, createuser, createusers, updateone, deleteone, findone, get18, find } = require("../controller/usercontroller");
// const { login } = require("../controller/user.controller");

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/createuser",createuser );
userRouter.post("/createusers",createusers );
userRouter.post("/updateone",updateone );
userRouter.post("/deleteone",deleteone );
userRouter.post("/findone", findone);
userRouter.post("/find", find);
userRouter.post("/get18",get18 );
userRouter.post("/", );
// userRouter.post("/login", (req , res) =>  login(req , res));

module.exports = userRouter;
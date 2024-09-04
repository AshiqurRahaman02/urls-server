const express =require("express") ;
const  {
	getUser,
	userLogin,
	userRegister,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/authentication.middlewares");

const userRouter = express.Router();

// Get user
userRouter.get("/get/:id", verifyToken, getUser);

// Register route
userRouter.post("/register", userRegister);

// Login route
userRouter.post("/login", userLogin);

module.exports= userRouter;

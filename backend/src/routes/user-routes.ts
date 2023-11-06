import Router from "express"
import {getAllUsers,userSignUp,userLogin, verifyUser} from "../controllers/user-controller.js"
import {validate,signupValidator,loginValidator} from "../utils/validators.js"
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/",getAllUsers)
userRoutes.post("/signup",validate(signupValidator),userSignUp)
// verify the user token , if the token verification is succesfull 
userRoutes.post("/login",validate(loginValidator),userLogin)
userRoutes.get("/auth-status", verifyToken, verifyUser);

export default userRoutes
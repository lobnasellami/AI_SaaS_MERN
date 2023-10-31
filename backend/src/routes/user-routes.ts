import Router from "express"
import {getAllUsers,userSignUp,userLogin} from "../controllers/user-controller.js"
import {validate,signupValidator,loginValidator} from "../utils/validators.js"
const userRoutes = Router();
userRoutes.get("/",getAllUsers)
userRoutes.post("/signup",validate(signupValidator),userSignUp)
userRoutes.post("/login",validate(loginValidator),userLogin)

export default userRoutes
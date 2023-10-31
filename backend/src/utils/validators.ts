import { NextFunction ,Response,Request} from "express";
import { body,ValidationChain,validationResult } from "express-validator";

export const validate =(validations :ValidationChain[])=>{
    return (
        async(req :Request, res:Response,next:NextFunction)=>{
            for (let validation of validations){
                const result=await validation.run(req)
                //result get the error 
                if (!result.isEmpty()){
                    break
            }
        }
        const errors =validationResult(req);
        if(errors.isEmpty()){
              return next();
            }
        res.status(500).json({error:"Error",cause:errors})
       }
       )
};

export const  loginValidator  = [
    body("email").trim().isEmail().withMessage("Please Enter A Valid Email"),
    body("password").isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters')
        .matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]')
        .withMessage('Password Must Contain an Uppercase Letter')
];

export const  signupValidator  = [
    body("name").notEmpty().isString().withMessage("Name is required"),
    ...loginValidator,
];


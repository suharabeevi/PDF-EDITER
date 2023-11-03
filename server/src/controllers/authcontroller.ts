
import { Request, Response } from "express";
import { HttpStatus } from "../types/httpstatus";
import asyncHandler from "express-async-handler";

 import authHelper from "../application/usecases/authusecases";

 const authentication = authHelper();

const authControl = () => {
  // Define a function for user signup.
  const userSignup = asyncHandler(async (req: Request, res: Response) => {
    // Call the userRegister method from the authentication helper to register a user.
     const result = await authentication.userRegister(req.body);
    // Send a response with a status code and user token upon successful registration.
    res.status(HttpStatus.OK).send({
      status: HttpStatus.OK,
      userToken: result,
          message: "user registered successfully",
    }); 
  });
  const userLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    // const user: UserInterface = req.body;
    const { token, user } = await authentication.userLogin(
      email,
      password,
    
    );
    res.json({
      status: true,
      message: "user login successful",
      token,
    });
  });
  return {
    userSignup,
    userLogin
  };
};

export default authControl;
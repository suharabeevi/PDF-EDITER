import express from "express";
import authControl from "../../../controllers/authcontroller";
const authRouter = express.Router();
const controller = authControl();

// Define a route for user registration, mapped to the 'userSignup' function in the controller.
authRouter.post("/register", controller.userSignup);

export default authRouter;
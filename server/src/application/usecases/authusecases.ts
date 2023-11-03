import jwtAuthentication from "../../framework/services/authservices";
import UserModel from "../../framework/database/usermodel";
import { UserDataInterface } from "../../types/userData";
import authRouter from "../../framework/webserver/routes/authRouter";
import { HttpStatus } from "../../types/httpstatus";
import AppError from "../../utils/appError";

const jwtTokens = jwtAuthentication ();

const authHelper = () => {
    //getUserByEmail this function check the user is Exist or not
    const getUserByEmail = async (email: string) => {
      const data = await UserModel.find({ email });
      return data;
    };
  
    //userRegister this function takes the formData and check user is exist or
    // not.If user exist then create token else create user and return token
    const userRegister = async (userData: UserDataInterface) => {
      const userExist = await getUserByEmail(userData.email);
      let id;
      //check user exists already
      if (userExist.length) {
        id = userExist[0]._id.toString();
        throw new AppError("email already exists", HttpStatus.CONFLICT);
       
      } else {
        
       // Create the user with their data, including the password
    const data = await UserModel.create(userData);

    // Encrypt the user's password and update the user object
    const encryptedPassword = await jwtTokens.encryptPassword(data.password);
        data.password = encryptedPassword;
        await data.save();
        id = data._id.toString();
      }
  
      //create payload object for token
      const payload = {
        email: userData.email,
        role: "user",
        id,
      };
      //call function for create token
      const token = jwtTokens.generateToken(payload);
      return token;
    };
     const userLogin = async (
        email: string,
        password: string,

      ) => {
        const user  = await getUserByEmail(email);
        if (!user) {
          throw new AppError("this user doesn't exist", HttpStatus.NOT_FOUND);
        }
        const isPasswordCorrect = await jwtTokens.comparePassword(
          password,
          user[0].password ?? ""
        );
        if (!isPasswordCorrect) {
          throw new AppError(
            "sorry, your password was incorrect.Please double-check your password",
            HttpStatus.UNAUTHORIZED
          );
        }
      
        
        let id = "";
        if (user) {
          id = user[0]._id.toString();
        }
        const payload = {
            email: user[0].email,
            role: "user",
            id,
        };
      
        const token = jwtTokens.generateToken(payload);
        return {
          token,
          user,
        };
      };

  


    return {
      userRegister,
      userLogin
    };
  };

  export default authHelper
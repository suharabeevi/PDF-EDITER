import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configKeys from "../../config";
interface Payload {
    email: string;
    role: string;
    id:string;
  }
  
const jwtAuthentication = () => {
    const generateToken = (payload: Payload) => {
      const token = jwt.sign(payload, configKeys.JWT_KEY, { expiresIn: "3d" });
      return token;
    };
  
    const verifyToken = (token: string) => {
      return jwt.verify(token, configKeys.JWT_KEY);
    };
    const encryptPassword = async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password;
      };
    
      const comparePassword = (password: string, hashedPassword: string) => {
        return bcrypt.compare(password, hashedPassword);
      };
    return {
      generateToken,
      verifyToken,
      encryptPassword,
      comparePassword
    };
  
  };
  export default jwtAuthentication
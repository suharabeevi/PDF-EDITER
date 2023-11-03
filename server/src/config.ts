import dotenv from "dotenv"
dotenv.config();
const ConfigKeys={
    MONGO_DB_URL: process.env.MONGODB_URL as string,
    DB_NAME: process.env.DB_NAME as string,
    PORT: process.env.PORT,
    JWT_KEY: process.env.JWT_SECRET as string,


}
export default ConfigKeys;
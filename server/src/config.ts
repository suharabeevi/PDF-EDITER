import dotenv from "dotenv"
dotenv.config();
const ConfigKeys={
    MONGO_DB_URL: process.env.MONGODB_URL as string,
    DB_NAME: process.env.DB_NAME as string,
    PORT: process.env.PORT,

}
export default ConfigKeys;
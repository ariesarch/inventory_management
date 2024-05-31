import { config } from "dotenv";

const configFile = `./.env`;

config({path:configFile});

const {NODE_ENV,PORT,JWT_SECRET,MONGO_URI} = process.env;

export default{
    env:NODE_ENV,
    PORT,
    JWT_SECRET,
    MONGO_URI
}
import { config } from "dotenv";

//load .env file
config();


const dotEnv = {
    MONGODB_URI: process.env.DB_CONN_STRING,
    DB_CONN_STRING: process.env.DB_CONN_STRING,
    DB_NAME: process.env.DB_NAME,
    COLLECTION_PLAYERS: process.env.COLLECTION_PLAYERS,
    PORT:process.env.PORT,
};

export default dotEnv;
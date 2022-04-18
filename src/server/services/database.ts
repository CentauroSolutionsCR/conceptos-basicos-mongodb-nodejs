import * as mongoDB from "mongodb";
import  dotEnv  from "../config"; 
import PlayersDAO from '../Dao/players'
export const collections: { players?: mongoDB.Collection } = {};

export async function connectToDatabase() {


    // Create a new MongoDB client with the connection string from .env
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dotEnv.DB_CONN_STRING);

    // Connect to the cluster
    await client.connect().catch(err=>{ console.error(err.stack)
        process.exit(1)}).then(async client =>{
    //Se llaman todos los DAO para hacer la conexión a diferentes colecciopnes
            await PlayersDAO.injectDB(client);
        })

    // Connect to the database with the name specified in .env
    const db: mongoDB.Db = client.db(dotEnv.DB_NAME);
    console.log(
        `Successfully connected to database: ${db.databaseName}`,
    );
}

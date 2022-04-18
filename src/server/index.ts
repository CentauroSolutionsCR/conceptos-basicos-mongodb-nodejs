import dotEnv from "./config";
import app from './app'
import { connectToDatabase } from './services/database'
try {
    // start the Express server
    connectToDatabase().then(() => {
        app.listen(dotEnv.PORT, () => {
            console.log(`Server started at http://localhost:${dotEnv.PORT}`);
        })
    });
} catch (error) {
    console.log(error);
}
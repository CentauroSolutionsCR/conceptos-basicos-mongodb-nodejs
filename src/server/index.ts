import express from "express";
import { connectToDatabase } from "./services/database.service";
import { playersRouter } from "./routes/player.router";
import * as dotenv from "dotenv";
import { env } from "process";

const app = express();
const port = process.env.PORT||8000; // default port to listen

connectToDatabase()
    .then(() => {
        // send all calls to /players to our playersRouter
        app.use("/players", playersRouter);

        // start the Express server
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
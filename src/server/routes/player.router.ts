import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Player from "../models/player";
import cors from "cors";
export const playersRouter = express.Router();

playersRouter.use(express.json());
playersRouter.use(cors())
playersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Player array to take advantage of types
        const players = (await collections.players.find({}).toArray()) as Player[];
        res.status(200).send(players);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


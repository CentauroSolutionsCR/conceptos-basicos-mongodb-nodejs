import { json } from "stream/consumers";
import PlayersDAO from "../Dao/players";
import Player from "../models/player";

export default class PlayersController {
    static async getPlayers(req: any, res: any, next: any) {
        try {
            const PLAYERS_PER_PAGE = 20;
            const playersList = await PlayersDAO.getPlayers();

            console.log(playersList);
            res.status(200).send(playersList);
        } catch (error) {
            res.status(404).send(error);
        }
    }
    static async getPlayersData(req: any, res: any, next: any) {
        try {
            const playersData = await PlayersDAO.getPlayersData();

            console.log(playersData);
            res.status(200).send(playersData);
        } catch (error) {
            res.status(404).send(error);
        }
    }

    static async getPlayersByNationality(req: any, res: any, next: any) {
        try {

            const playersList = await PlayersDAO.getPlayersByNationality();
            res.status(200).send(playersList);
        } catch (error) {
            res.status(404).send(error);
        }
    }

    static async getPlayersByAge(req: any, res: any, next: any) {
        try {
          let number = req.params.age as number;
            const playersList = await PlayersDAO.getPlayerByAge(Number(number));
            res.status(200).send(playersList);
        } catch (error) {
            res.status(404).send(error);
        }
    }

    static async countOlderPlayersByAge(req: any, res: any, next: any) {
      try {
        let number = req.params.age as number;
          const playersList = await PlayersDAO.countOlderPlayersByAge(Number(number));
          res.status(200).send(playersList);
      } catch (error) {
          res.status(404).send(error);
      }
  }


  static async insertPlayer(req: any, res: any, next: any) {
    try {
      let player = req.body as Player| Player[];
      const insertPlayer = await PlayersDAO.insertPlayer(player);
      console.log(insertPlayer);
      if(typeof insertPlayer != "number") {
          console.log(typeof insertPlayer)
        res.status(201).send(JSON.stringify(insertPlayer));
      } else {
        res.status(404).send(insertPlayer);
      }
        
    } catch (error) {
        res.status(404).send(error);
    }
}
}

import express from "express";
import PlayersCtrl from "../controller/players.controller";
import cors from "cors";

export const router = express.Router();

router.use(express.json());       // to support JSON-encoded bodies
router.use(express.urlencoded({extended:true})); // to support URL-encoded bodies
 router.use(cors())

router.route("/").get(PlayersCtrl.getPlayers);
router.route("/player/data").get(PlayersCtrl.getPlayersData);
router.route("/nationalities").get(PlayersCtrl.getPlayersByNationality);
router.route("/age/:age").get(PlayersCtrl.getPlayersByAge);
router.route("/older/:age").get(PlayersCtrl.countOlderPlayersByAge);
router.route("/player").post(PlayersCtrl.insertPlayer)
export default router;

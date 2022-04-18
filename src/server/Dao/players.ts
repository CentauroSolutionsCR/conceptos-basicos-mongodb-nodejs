import { Db, ObjectId } from "mongodb";
import dotEnv from "../config";
import Player from "../models/player";

let players: any;
let database: any;
export default class PlayersDAO {
    static async injectDB(conn: any) {
        if (players) {
            return;
        }
        try {
            database = await conn.db(dotEnv.DB_NAME);
            players = await database.collection(dotEnv.COLLECTION_PLAYERS);
            //this.jugadores = jugadores; // this is only for testing
        } catch (e) {
            console.error(`Unable to establish a collection handle in moviesDAO: ${e}`);
        }
    }

    /**
     * Finds and returns players matching a given text in their title or description.
     * @param {string} text - The text to match with.
     * @returns {QueryParams} The QueryParams for text search
     */
    static textSearchQuery(text: string) {
        const query = { $text: { $search: text } };
        const meta_score = { $meta: "textScore" };
        const sort = [["score", meta_score]];
        const project = { score: meta_score };

        return { query, project, sort };
    }

    /**
     * Finds and returns players by country.
     * Returns a list of objects, each object contains a title and an _id.
     * @param {Object} filters - The search parameters to use in the query.
     * @param {number} page - The page of players to retrieve.
     * @param {number} playersPerPage - The number of movies to display per page.
     * @returns {GetPlayersResult} An object with movie results and total results
     * that would match this query
     */
    static async getPlayers({ filters = null as any, page = 11, playersPerPage = 20 } = {}) {
        let queryParams = {};
        if (filters) {
            if ("text" in filters) {
                queryParams = this.textSearchQuery(filters["text"]);
            }
        }
        let query = {};
        let project = {};
        let sort = {};
        let cursor;
        try {
            cursor = await players.find(query).project(project).sort(sort);
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { playersList: [] as any, totalNumPlayers: 0 };
        }

        const displayCursor = cursor.skip(playersPerPage * page).limit(playersPerPage);

        try {
            const playersList = (await displayCursor.toArray()) as Player[];
            const totalNumPlayers = page === 0 ? await players.countDocuments(query) : 0;

            return playersList;
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { playersList: [] as any, totalNumPlayers: 0 };
        }
    }


    static async getPlayersData() {
        let query = {};
        let aggregation =[{$group: {_id:null as any, avg_age:{$avg:"$age"},total:{$sum:1}}},{$project:{_id:0,avg_age:{$round:["$avg_age",0]},total:1}}]
        let cursor;
        try {
            cursor = await players.aggregate(aggregation);

        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { };
        }

        try {
            //const totalPlayers = totalDocs.toString();
            const playersData = await cursor.next();
            return playersData;
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { totalPlayers: [] as any, totalNumPlayers: 0 };
        }
    }

    static async getPlayersByNationality(){
        let nationalities:string[] = ["Argentina"]
        let query = {'nationality.country':{$in:nationalities}};
        let project = {_id:0,position:1,name:1,"nationality":"$nationality.country"};
        let sort = {name:-1};
        let cursor;
        try {
            cursor = await players.find(query).project(project).sort(sort).limit(10);
        } catch (error) {
            console.error(`Unable to issue find command, ${error}`);
            return []
        }
        try {
            const playersList = (await cursor.toArray()) as Player[];
            return  playersList;
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { playersList: [] as any, totalNumPlayers: 0 };
        }
    }


    static async getPlayerByAge(age: number){
        let query = {'age':age};
        let project = {_id:0,'posición':'$position','nombre':'$name','edad':'age'};
        let sort = {};
        let cursor;
        try {
            cursor = await players.find(query).project(project);
           
        } catch (error) {
            console.error(`Unable to issue find command, ${error}`);
            return []
        }
        try {
            const playersList = (await cursor.toArray()) as Player[];
            return  playersList;
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { playersList: [] as any, totalNumPlayers: 0 };
        }
    }

    static async countOlderPlayersByAge(age: number){
        let query = {'age':{$gt:age}};
        let project = {};
        let sort = {};
        let cursor;
        try {
            cursor = await players.countDocuments(query);
           
        } catch (error) {
            console.error(`Unable to issue find command, ${error}`);
            return error;
        }
        try {
            return  cursor.toString();
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
            return { playersList: [] as any, totalNumPlayers: 0 };
        }
    }

    static async insertPlayer(player: Player[]| Player){
      
        let options = {};
        let cursor;
        try {
           if( player ) {
            cursor = await players.insertOne(player,options);
            return cursor;
           }else {
            cursor = await players.insertMany(player,options);
            return cursor;
           }
           
        } catch (error) {
            console.error(`Unable to issue insert command, ${error}`);
            return error;
        }
      
    }
}




/**
 * Result set for getPlayers method
 * @typedef GetPlayersResult
 * @property {SoccerPlayers[]} moviesList
 * @property {number} totalNumResults
 */

/**
 * This is a parsed query, sort, and project bundle.
 * @typedef QueryParams
 * @property {Object} query - The specified query, transformed accordingly
 * @property {any[]} sort - The specified sort
 * @property {Object} project - The specified project, if any
 */

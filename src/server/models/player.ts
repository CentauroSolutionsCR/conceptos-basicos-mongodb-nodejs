import { Double, ObjectId } from "mongodb";

export default class Player {
    constructor(public _id: ObjectId, public id: Double,public position: string,  public name: string, public age: Double,public photo: string,public body:object, public nationality: object, public description: string,public value: string  ) {}
}

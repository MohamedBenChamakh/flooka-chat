import { User } from "./User";

export class Room {
    _id: string;
    members: User[];
    createdAt: Date;


    constructor(
        _id: string,
        members: User[],
        createdAt: Date) {
        this._id = _id;
        this.members = members;
        this.createdAt = createdAt;
    }
}
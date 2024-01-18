import { User } from "./User";


export class Message {
    sender: User;
    content: string;
    roomId: string;
    createdAt: Date;

    constructor(
        sender: User,
        content: string,
        roomId: string,
        createdAt: Date,) {
        this.content = content;
        this.sender = sender;
        this.roomId = roomId;
        this.createdAt = createdAt;
    }
}
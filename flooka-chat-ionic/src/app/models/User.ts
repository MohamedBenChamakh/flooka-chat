import { Room } from "./Room";

export class User {
    _id: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    phone?: string;
    age?: Date;
    country?: string;
    gender?: string;
    email?: string;

    constructor(
        _id: string,
        username?: string,
        firstName?: string,
        lastName?: string,
        picture?: string,
        phone?: string,
        age?: Date,
        country?: string,
        gender?: string,
        email?: string) {
        this._id = _id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
        this.age = age;
        this.country = country;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
    }
}
export class Preferences {
    age: number;
    gender: string;
    country: string;

    constructor(
        age: number,
        gender: string,
        country: string) {
        this.age = age;
        this.gender = gender;
        this.country = country;
    }
}
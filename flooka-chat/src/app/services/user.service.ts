import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
    providedIn: "root",
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUserById(userId: string): Observable<User> {
        return this.http
            .get<User>(`/user/${userId}`);
    }


    getPersonalInfo(): Observable<User> {
        return this.http
            .get<User>(`/user/profile`);
    }

}
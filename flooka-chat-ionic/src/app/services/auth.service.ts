import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http
      .post("/auth/signup", user);
  }

  login(user: any): Observable<any> {
    return this.http.post("/auth/login", user).pipe(
      tap((response: any) => {
        localStorage.setItem("access_token", response.token);
        localStorage.setItem("user_id", response.userId);
      })
    );
  }

  isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem('user_id');
    if (!userId || !token) {
      return false;
    }
    const decodedToken = helper.decodeToken(token);
    const isExpired = helper.isTokenExpired(token);
    const IsUserId = userId === decodedToken.userId;

    if (!isExpired && IsUserId) {
      return true;
    } else {
      return false;
    }
  }

}
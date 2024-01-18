import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem('user_id');
    if(!userId || ! token){
      this.router.navigateByUrl("/auth");
      return false;
    }
    const decodedToken = helper.decodeToken(token);
    const isExpired = helper.isTokenExpired(token);
    const IsUserId = userId === decodedToken.userId;
    if (!isExpired && IsUserId) {
      return true;
    } else {
      this.router.navigateByUrl("/auth");
      return false;
    }
  }
}
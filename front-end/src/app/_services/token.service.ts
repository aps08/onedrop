import { Injectable } from '@angular/core';
const JWT = 'auth-token';
const USER_R = 'user-role';
const  USER_H = "user-history";
const  USER_DT = "user-data";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public saveToken(token: string): void {
    window.localStorage.removeItem(JWT);
    window.localStorage.setItem(JWT, JSON.stringify(token));
  }

  public getToken(): string | null {
    return window.localStorage.getItem(JWT);
  }

  public getUserData(): string | null {
    return window.localStorage.getItem(USER_DT);
  }

  public saveUserData(userdata: any): void {
    window.localStorage.removeItem(USER_DT);
    window.localStorage.setItem(USER_DT, JSON.stringify(userdata));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_R);
    if (user) {
      return user;
    }
    return null;
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_R);
    window.localStorage.setItem(USER_R, JSON.stringify(user.authority));
  }

  IsLoggedIn(): boolean{
    return this.getToken() != null && this.getUserData() != null && this.getUser() != null;
  }

  logout(): any{
    window.localStorage.clear();
  }
}

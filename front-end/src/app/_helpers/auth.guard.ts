import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {TokenService} from '../_services/token.service';
import { Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private token: TokenService,
    private loc: Location
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let current_Role = JSON.parse(this.token.getUser());
    if(current_Role){
      if(route.data.role[0] == current_Role){
        return true;
      }else{
        return this.router.navigate(['/home']);
      }
    }else{
      this.loc.back();
    }
  }
}

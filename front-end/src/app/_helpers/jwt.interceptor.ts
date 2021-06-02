import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from '../_services/token.service';

const HEADER = 'Authorization';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authrequest = request;
    let token = JSON.parse(this.token.getToken());
    if(token!=null){
      authrequest = request.clone({ headers: request.headers.set(HEADER, 'Bearer ' + token) });
    }
    return next.handle(authrequest);
  }
}


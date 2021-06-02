import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {TokenService} from '../_services/token.service';
import { ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private Token:TokenService,private Toast: ToastrService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.Toast.warning("Something went wrong. Re-login", "Unauthorized",{
          closeButton: true,
          timeOut: 3000
        })
        setTimeout(function(){
          this.Token.logout();
          location.reload();
        },3000)
      }
      this.Toast.error(err.error.message);
      return throwError(err.error.message);
    }));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const API1 = 'http://localhost:8080/v1/';
const API2 = 'http://localhost:8080/v2/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Addadmin(data:any):Observable<any>{
    return this.http.post(API2+'add',data,{responseType: 'json'});
  }

  EditInfo(data: any): Observable<any>{
    return this.http.put(API1+'edit', data , {responseType: 'json'});
  }

  ChangePasswordInfo(data: any): Observable<any> {
    return this.http.put(API1 + 'change',  data ,{ responseType: 'json' });
  }

  deleting(password: string): Observable<any> {
    return this.http.delete(API1+'delete',{ params: { password }, responseType: 'json' });
  }

  BloodRequest(data:any): Observable<any> {
    return this.http.post(API1 + 'bloodrequest',  data , {
      responseType: 'json' });
  }
  campsregister(data: any):Observable<any>{
    return this.http.post(API1+'camps',data ,{ responseType: 'json' });
  }

  Userhistory(): Observable<any>{
    return this.http.get(API1+'history',{ responseType: 'json'});
  }
}

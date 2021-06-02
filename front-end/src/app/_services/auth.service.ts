import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DatePipe} from '@angular/common';

const API = 'http://localhost:8080/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'responseType': 'json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,
              public datepipe: DatePipe) { }
  register( data:any): Observable<any> {
    return this.http.post(API + 'register', data, httpOptions);
  }

  login(data: any): Observable<any> {
    return this.http.post(API + 'login', data , httpOptions);
  }

  search(data: any): Observable<any> {
    return this.http.get(API+'search',{
      params:{
        state: data.state,
        city: data.city,
        bloodgroup: data.bloodgroup
      },responseType: 'json'
    })
  }

  searchlist():Observable<any>{
    return this.http.get('/assets/assets/indian-states-and-cities.json',{responseType: "json"});
  }

  camps():Observable<any> {
    return this.http.get('/assets/assets/listed-camps.json', {responseType: "json"});
  }
}

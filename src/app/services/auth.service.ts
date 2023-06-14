import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthUser} from "../models/auth-user";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    var initLogged = true;
    if (initLogged) {
      this.currentUser = {
        jwt: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjg2NjY5NTUxLCJleHAiOjE2ODY3NTU5NTF9.cdUovnt-ObrjltbmhZ4wnldIebDyv7MvG6MectYOYZ_T5SG40GgIZ7pHkbWjB71YX-kH8ECrX4_3Yv0IAMkmpg',
        fullName: 'Darkahn',
        phoneNumber: '+7 (776)-226-68-78'
      }
    }
  }
  apiUrl = 'http://localhost:8080/api/auth';
  public currentUser?: AuthUser = undefined;

  signup(phoneNumber: string, fullName: string, password: string): Observable<any> {
    var response = this.http.post<any>(this.apiUrl + '/signup', {
      phoneNumber: phoneNumber,
      fullName: fullName,
      password: password
    });
    return response.pipe(map(res => {
      console.log('dara 1')
      this.currentUser = {
        jwt: res.jwt,
        fullName: res.fullName,
        phoneNumber: res.phoneNumber
      }
    }))
  }

  isLogged(): boolean {
    return this.currentUser != undefined;
  }
}

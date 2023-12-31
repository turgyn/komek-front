import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthDto} from "../models/auth-dto";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    var initLogged = false;   // test
    if (initLogged) {
      this.currentUser = {
        jwt: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjg2NjY5NTUxLCJleHAiOjE2ODY3NTU5NTF9.cdUovnt-ObrjltbmhZ4wnldIebDyv7MvG6MectYOYZ_T5SG40GgIZ7pHkbWjB71YX-kH8ECrX4_3Yv0IAMkmpg',
        fullName: 'Darkahn',
        phoneNumber: '+7 (776)-226-68-78'
      }
    }
  }

  // apiUrl = 'http://localhost:8080/api/auth';
  apiUrl = 'http://77.243.80.191:8080/api/auth';
  public currentUser?: AuthDto = undefined;

  signup(phoneNumber: string, fullName: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/signup', {
      phoneNumber: phoneNumber,
      fullName: fullName,
      password: password
    }).pipe(map(res => this.saveToStorage(res)))
  }

  signin(phoneNumber: string, password: string): Observable<any> {
    console.log('post /signin')
    return this.http.post<any>(this.apiUrl + '/signin', {
      phoneNumber: phoneNumber,
      password: password
    }).pipe(map(res => this.saveToStorage(res)))
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/profile', {
      headers: {'Authorization': this.currentUser!.jwt}
    });
    // .pipe(map(res => {
    //   return {
    //     phoneNumber: res.phoneNumber,
    //   }
    // }));
      // {
      //   "id": 19,
      //   "email": null,
      //   "phoneNumber": "+7 (700)-000-00-00",
      //   "fullName": "darkhan",
      //   "password": "$2a$10$JXm/HAT.P3myhEZWVGsBH.0ih3DdBfFxIPe6XKMePESV0PXR3F44m",
      //   "role": "ROLE_USER",
      //   "isEnabled": true,
      //   "registrationDateTime": "2023-06-15T15:43:57.36731"
      // }
  }

  editProfile(phoneNumber: string, fullName: string, password: string, passwordNew: string): Observable<any> {
    console.log('post /profile')
    return this.http.post<any>(this.apiUrl + '/profile', {
      phoneNumber: phoneNumber,
      fullName: fullName,
      password: password,
      newPassword: passwordNew
    }, {
      headers: {'Authorization': this.currentUser!.jwt}
      }
    ).pipe(map(res => {
      console.log('look here')
      console.log(res)
      this.saveToStorage(res)
    }))
  }

  logout() {
    localStorage.clear();
    this.currentUser = undefined;
  }

  saveToStorage(res: any) {
    this.currentUser = {
      jwt: res.jwt,
      fullName: res.fullName,
      phoneNumber: res.phoneNumber
    }
    // @ts-ignore
    localStorage.setItem('user.jwt', this.currentUser.jwt);
    localStorage.setItem('user.fullName', this.currentUser.fullName);
    localStorage.setItem('user.phoneNumber', this.currentUser.phoneNumber);
  }

  tryExtractFromStorage() {
    if (localStorage.getItem('user.jwt') != null) {
      this.currentUser = {
        jwt: localStorage.getItem('user.jwt')!,
        fullName: localStorage.getItem('user.fullName')!,
        phoneNumber: localStorage.getItem('user.phoneNumber')!
      }
    }
  }

  isLogged(): boolean {
    this.tryExtractFromStorage();
    return this.currentUser != undefined;
  }
}

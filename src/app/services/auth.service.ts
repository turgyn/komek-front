import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:8080/api/auth/signup';
  currentUser?: string

  signup(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, {
      email: email,
      password: password
    }).subscribe(res => {
      console.log(res);
      console.log(res.token)
      this.currentUser = res.token
    })
  }

  isLogged(): boolean {
    // console.log(this.currentUser);
    return this.currentUser != undefined;
  }
}

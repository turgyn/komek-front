import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stage: number = 4
  title = 'komek-angular-cabinet';

  constructor(private authService: AuthService) {
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  getFullName(): string {
    // @ts-ignore
    return this.authService.currentUser.fullName;
  }

  nextStage() {
    this.stage++;
  }
}

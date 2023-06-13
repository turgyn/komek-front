import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  @Output() endRegistrationEvent = new EventEmitter();
  title: string = 'Даваите создадим профиль'
  emailValue: string = '';
  passValue: string = '';

  emailValid: boolean = true;
  passwordValid: boolean = true;

  constructor(private authService: AuthService) {}

  login(email: string, pass: string): void {
    this.authService.signup(email, pass);
    this.endRegistrationEvent.emit();
  }

  emailChanged() {
    var a = String(this.emailValue)
      .toLowerCase()
      .match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
    this.emailValid = a != null;
  }

  passChanged() {
    var a = String(this.passValue)
      .match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      );
    this.passwordValid = a != null;
    console.log(this.passwordValid)
  }
}

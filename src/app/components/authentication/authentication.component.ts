import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  title: string = 'Даваите создадим профиль'
  hidePassword = true;
  registrationErrors = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  registrationForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("(\\+7 \\(7)[0-9]{2}(\\)\\-)[0-9]{3}(\\-)[0-9]{2}(\\-)[0-9]{2}")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$")]),
  })

  onSubmit() {
    console.log('submit')
    var phoneNumber = this.registrationForm.value.phoneNumber;
    var password = this.registrationForm.value.password;
    if (phoneNumber == null || password == null) {
      alert("Введенные данные не верны")
      return;
    }
    this.authService.signin(phoneNumber, password).subscribe(
      res => {
        console.log('succes')
        this.isLoading = true;
      }, error => {
        console.log(error);
        if (error.error.message == 'phoneNumber not found') {
          this.registrationErrors = 'phoneNumberNotFound';
          console.warn("phone number not found");
        }
        else {
          this.registrationForm.controls.password.setErrors({wrongPass: true})
          // this.registrationErrors = 'unknown';
          console.warn("another error");
        }
      }
    )
  }

  getPhoneNumberErrorMessage() {
    if (this.registrationForm.controls.phoneNumber.hasError('required')) {
      return '';//'Введите номер телефона';
    }
    return this.registrationForm.controls.phoneNumber.hasError('pattern') ? 'Некоректный номер телефона' : '';
  }

  getPasswordErrorMessage() {
    if (this.registrationForm.controls.password.hasError('required')) {
      return ''//Введите пароль';
    }
    if (this.registrationForm.controls.password.hasError('minlength')) return 'Минимальная длина пароля: 8';
    if (this.registrationForm.controls.password.hasError('pattern')) return 'Используите хотя бы одну букву и одну цифру в пароле';
    if (this.registrationForm.controls.password.hasError('wrongPass')) return 'Не верный пароль';
    return '';
  }

  fillingPhone(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    var newNum = charCode - 48;
    var prevState = this.registrationForm.controls.phoneNumber.getRawValue();
    if (prevState == null || prevState.length < 6) prevState = '+7 (7';
    else if (prevState.length == 7) prevState += ')-';
    else if (prevState.length == 8) prevState += '-';
    else if (prevState.length == 12) prevState += '-';
    else if (prevState.length == 15) prevState += '-';
    else if (prevState.length == 18) return false;

    this.registrationForm.controls.phoneNumber.setValue(prevState);
    return true;
  }
}

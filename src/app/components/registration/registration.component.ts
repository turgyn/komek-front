import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {

  title: string = 'Даваите создадим профиль'
  hidePassword = true;
  registrationErrors = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private surveyService: SurveyService) {
    if (this.authService.isLogged()) {
      this.router.navigate(['specialists'])
    }
  }

  registrationForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("(\\+7 \\(7)[0-9]{2}(\\)\\-)[0-9]{3}(\\-)[0-9]{2}(\\-)[0-9]{2}")]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$")]),
  })

  onSubmit() {
    var phoneNumber = this.registrationForm.value.phoneNumber;
    var fullName = this.registrationForm.value.fullName;
    var password = this.registrationForm.value.password;
    if (phoneNumber == null || fullName == null || password == null) {
      alert("Введенные данные не верны")
      return;
    }
    this.authService.signup(phoneNumber, fullName, password).subscribe(
      res => {
        this.isLoading = true;
        const storedArrayString = localStorage.getItem('feedbacks');
        const storedArray: string[] = JSON.parse(storedArrayString!);
        this.surveyService.postFeedback(storedArray).subscribe(res => {
          console.log('send feedback after reg')
        })
      }, error => {
        console.log(error);
        if (error.error.message == 'Error: PhoneNumber is already taken!') {
          this.registrationErrors = 'phoneNumberTaken';
          console.warn("phone number already used error");
        }
        else {
          this.registrationErrors = 'unknown';
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
    return '';
  }

  getFullNameErrorMessage() {
    if (this.registrationForm.controls.fullName.hasError('required')) return ''
    if (this.registrationForm.controls.fullName.hasError('minlength')) return 'Минимальная длина поля: 4';
    if (this.registrationForm.controls.fullName.hasError('maxlength')) return 'Максимальная длина поля: 20';
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

import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registrationErrors = '';
  hidePassword = true;
  hidePasswordNew = true;
  isLoading = false;
  userForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("(\\+7 \\(7)[0-9]{2}(\\)\\-)[0-9]{3}(\\-)[0-9]{2}(\\-)[0-9]{2}")]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$")]),
    passwordNew: new FormControl('', [Validators.minLength(8), Validators.pattern("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$")]),
  })

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    if (!this.authService.isLogged()) {
      this.router.navigate(['survey'])
    }

  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(curUser => {
      this.userForm.controls.phoneNumber.setValue(curUser.phoneNumber);
      this.userForm.controls.fullName.setValue(curUser.fullName);
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['survey'])
  }

  onSubmit() {
    var phoneNumber = this.userForm.value.phoneNumber;
    var fullName = this.userForm.value.fullName;
    var password = this.userForm.value.password;
    var newPasswrod = this.userForm.value.passwordNew;
    if (phoneNumber == null || fullName == null || password == null || newPasswrod == null) {
      alert("Введенные данные не верны")
      return;
    }
    this.authService.editProfile(phoneNumber, fullName, password, newPasswrod).subscribe(
      res => {
        this.isLoading = true;
        this.userForm.controls.password.setValue('');
        this.userForm.controls.passwordNew.setValue('');
        this.snackBar.open('Изменения внесены')
      }, error => {
        console.log(error);
        if (error.error.message == 'Error: PhoneNumber is already taken!') {
          this.registrationErrors = 'phoneNumberTaken';
          console.warn("phone number already used error");
        }
        if (error.error.message == 'password incorrect') {
          this.userForm.controls.password.setErrors({'passwordIncorrect': true})
        }
        else {
          this.registrationErrors = 'unknown';
          console.warn("another error");
        }
      }
    )
  }

  getPhoneNumberErrorMessage() {
    if (this.userForm.controls.phoneNumber.hasError('required')) {
      return '';//'Введите номер телефона';
    }
    return this.userForm.controls.phoneNumber.hasError('pattern') ? 'Некоректный номер телефона' : '';
  }

  getPasswordErrorMessage() {
    if (this.userForm.controls.password.hasError('required')) {
      return ''//Введите пароль';
    }
    if (this.userForm.controls.password.hasError('passwordIncorrect')) return 'Неверный пароль';
    if (this.userForm.controls.password.hasError('minlength')) return 'Минимальная длина пароля: 8';
    if (this.userForm.controls.password.hasError('pattern')) return 'Используите хотя бы одну букву и одну цифру в пароле';
    return '';
  }

  getPasswordNewErrorMessage() {
    if (this.userForm.controls.passwordNew.hasError('required')) {
      return 're'//Введите пароль';
    }
    if (this.userForm.controls.passwordNew.hasError('minlength')) return 'Минимальная длина пароля: 8';
    if (this.userForm.controls.passwordNew.hasError('pattern')) return 'Используите хотя бы одну букву и одну цифру в пароле';
    return 'other';
  }

  getFullNameErrorMessage() {
    if (this.userForm.controls.fullName.hasError('required')) return ''
    if (this.userForm.controls.fullName.hasError('minlength')) return 'Минимальная длина поля: 4';
    if (this.userForm.controls.fullName.hasError('maxlength')) return 'Максимальная длина поля: 20';
    return '';
  }

  fillingPhone(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    var newNum = charCode - 48;
    var prevState = this.userForm.controls.phoneNumber.getRawValue();
    if (prevState == null || prevState.length < 6) prevState = '+7 (7';
    else if (prevState.length == 7) prevState += ')-';
    else if (prevState.length == 8) prevState += '-';
    else if (prevState.length == 12) prevState += '-';
    else if (prevState.length == 15) prevState += '-';
    else if (prevState.length == 18) return false;

    this.userForm.controls.phoneNumber.setValue(prevState);
    return true;
  }
}

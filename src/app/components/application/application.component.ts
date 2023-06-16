import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicationComponent {

  phoneNumber?: string;

  constructor(private dialogRef: MatDialogRef<ApplicationComponent>, private authService: AuthService, private snackBar: MatSnackBar) {
    this.phoneNumber = authService.currentUser?.phoneNumber
    console.log(this.phoneNumber);
  }

  closeDialog() {
    this.dialogRef.close('Closed from inside');
    console.log(this.dialogRef);
  }

  confirmClick() {
    this.closeDialog();
    this.snackBar.open('Отправлено', '', {
      duration: 2000
    })
  }

  closeApplication() {
    this.closeDialog();
  }
}

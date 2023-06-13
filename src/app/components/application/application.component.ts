import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {

  constructor(private dialogRef: MatDialogRef<ApplicationComponent>) {
  }

  closeDialog() {
    this.dialogRef.close('Closed from inside');
    console.log(this.dialogRef);
  }

  cancelClick() {
    this.closeDialog();
  }

  confirmClick() {
    this.closeDialog();
  }
}

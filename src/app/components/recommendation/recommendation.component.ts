import { Component } from '@angular/core';
import {SpecialistService} from "../../services/specialist.service";
import {Specialist} from "../../models/specialist";
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApplicationComponent} from "../application/application.component";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {

  wtText: string = 'Добрый день, мне порекомендовали вас из сервиса \'KOMEK\'. Я бы хотел(а) обсудить ...';
  wtPhone: string = '87072255009'
  dialogRef?: MatDialogRef<ApplicationComponent>

  specialists: Specialist[];

  constructor(private specialistService: SpecialistService, public dialog: MatDialog) {
    this.specialists = specialistService.getSpecialists();
  }

  openDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close('Pizza!')
    }
    this.dialogRef = this.dialog.open(ApplicationComponent, {
        width: '400px',
        height: '600px',
      });
    this.dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   width: '250px',
    //   data: {name: this.name, animal: this.animal}
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

}

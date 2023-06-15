import { Component } from '@angular/core';
import {SpecialistService} from "../../services/specialist.service";
import {Specialist} from "../../models/specialist";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApplicationComponent} from "../application/application.component";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {

  dialogRef?: MatDialogRef<ApplicationComponent>
  isLoading = true;

  specialists: Specialist[];

  constructor(private specialistService: SpecialistService, public dialog: MatDialog, private router: Router, private authService: AuthService) {
    if (!this.authService.isLogged()) {
      this.router.navigate(['survey'])
    }
    this.specialists = specialistService.getSpecialists();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  openDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close('Pizza!')
    }
    this.dialogRef = this.dialog.open(ApplicationComponent, {
        width: '400px',
        height: '300px',
      });
    this.dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

}

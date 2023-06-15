import {NgModule, NgZone} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SurveyComponent } from './components/survey/survey.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RecommendationComponent } from './components/specialists/recommendation.component';
import { LoadingComponent } from './components/loading/loading.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import { ApplicationComponent } from './components/application/application.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    RegistrationComponent,
    RecommendationComponent,
    LoadingComponent,
    ApplicationComponent
  ],
  imports: [
    AppRoutingModule,

    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    // NgZone
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

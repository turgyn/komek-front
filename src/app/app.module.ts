import {NgModule, NgZone} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SurveyComponent } from './components/survey/survey.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { LoadingComponent } from './components/loading/loading.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import { ApplicationComponent } from './components/application/application.component';

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
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    // NgZone
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

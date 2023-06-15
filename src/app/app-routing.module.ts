import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./components/registration/registration.component";
import {SurveyComponent} from "./components/survey/survey.component";
import {RecommendationComponent} from "./components/specialists/recommendation.component";
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  { path: '', redirectTo: '/survey', pathMatch: 'full'},
  { path: 'signin', component: AuthenticationComponent},
  { path: 'signup', component: RegistrationComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'specialists', component: RecommendationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

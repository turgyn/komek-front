import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./components/registration/registration.component";
import {SurveyComponent} from "./components/survey/survey.component";
import {RecommendationComponent} from "./components/specialists/recommendation.component";

const routes: Routes = [
  { path: '', redirectTo: '/survey', pathMatch: 'full'},
  { path: 'survey', component: SurveyComponent},
  { path: 'signup', component: RegistrationComponent},
  { path: 'specialists', component: RecommendationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

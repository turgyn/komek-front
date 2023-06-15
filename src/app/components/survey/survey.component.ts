import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../services/survey.service";
import {Question} from "../../models/question";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit{

  help_yourself = 'Помогите нам подобрать вам подходящего терапевта.'
  questions: Question[] = [{title: 't', options: []}]; //Question[] = []
  curIdx = 0
  feedbacks: string[] = [];

  constructor(private questionService: SurveyService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(q => {
        console.log(q)
        this.questions = q.questions;
      }
    )
  }

  showNextQuestion(f: string): void {
    this.feedbacks.push(f);
    this.curIdx++;
    if (this.curIdx == this.questions.length) {
      console.log(this.feedbacks);
      if (this.authService.isLogged()) {
          this.questionService.postFeedback(this.feedbacks).subscribe(res => {
          console.log(res);
        })
      }
      else {
        localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));
      }
      this.startRegistration()
    }
  }

  startRegistration(): void {
    if (this.authService.isLogged())
      this.router.navigate(['specialists'])
    else
      this.router.navigate(['signup']);
  }

}

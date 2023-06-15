import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../services/question.service";
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

  constructor(private questionService: QuestionService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(q => {
        console.log(q)
        this.questions = q.questions;
      }
    )
  }

  showNextQuestion(): void {
    this.curIdx++;
    if (this.curIdx == this.questions.length) {
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

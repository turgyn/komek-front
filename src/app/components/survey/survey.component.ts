import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/question";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit{

  help_yourself = 'Помогите нам подобрать вам подходящего терапевта.'
  questions: Question[] = [{title: 't', options: []}]; //Question[] = []
  curIdx = 0
  @Output() startRegistrationEvent = new EventEmitter();


  constructor(private questionService: QuestionService) {
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
    this.startRegistrationEvent.emit();
  }


}

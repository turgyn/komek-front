import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  apiUrl = 'http://localhost:8080/api/survey'

  getQuestions() {
    return this.http.get<any>(this.apiUrl)
  }
}


























//   getMockedQuestions() {
//     return [
//       {
//         title: 'Какой тип терапии вы ищете?',
//         options: ['Индивидуальная (для себя)', 'Для пары (вы и ваш партнер)', 'Подростковое']
//       },
//       {
//         title: 'Ваш пол?',
//         options: ['Мужчина', 'Женщина']
//       },
//       {
//         title: 'Ваш возраст?',
//         options: ['18-25', '25-40', '40+']
//       },
//       {
//         title: 'Ваш статус?',
//         options: ['свободен', 'в отношениях', 'женат/замужем', 'разведен', 'вдовец/вдова']
//       },
//       {
//         title: 'Были ли вы до этого в терапии?',
//         options: [ 'Да', 'Нет']
//       },
//       {
//         title: 'Что вас заставило обратится к терапевту?',
//         options: ['Чувствую апатию/депрессию', 'Тревога',  'Эмоциональное выгорание', 'Зависимости', 'Сложность в построении личных границ', 'Проживаю траур']
//       },
//       {
//         title: 'Как бы вы оценили свое физическое состояние?',
//         options: ['Хорошее', 'Среднее',  'Плохое']
//       }
//     ]
//   }
// }

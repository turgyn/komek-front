import { Injectable } from '@angular/core';
import {Specialist} from "../models/specialist";
import {Question} from "../models/question";
import {SurveyService} from "./survey.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // apiUrl = 'http://localhost:8080/api/recommendation';
  apiUrl = 'http://77.243.80.191:8080/api/recommendation';

  getSpecialists() {
    return this.http.get<any>(this.apiUrl, {
      headers: {'Authorization': this.authService.currentUser!.jwt}
    }).pipe(map(res => {
      return res.specialists;
    }))
  }

  scheduleSession(specId: number) {
    return this.http.post<any>(this.apiUrl, {
      specialistId: specId
    }, {
      headers: {"Authorization": this.authService.currentUser!.jwt}
    })
  }

  getSpecialists1(): Specialist[] {
    var arr = [
      {
        id: 2,
        fullname: 'Кульназарова Айнур Жасаганбергеновна',
        image: 'specialists/id2.jpg',
        topics: ['Панические атаки', 'Трудности в отношениях', 'Тревога и страх','депрессия', 'тревога', 'стресс', 'развод', 'подростки'],
        methods: ['КПТ'],
        experience: '20 лет опыта',
        courses: '3 профильных курса',
        diploma: '2 диплома психолога',
        description: 'Для меня психотерапия – это дорога к хорошей жизни: к осознанной, наполненной чувствами жизни, к жизни в резонансе со своими личными ценностями и смыслами. В каждом из нас от природы заложено стремление к хорошей жизни. Моя задача как психолога заключается в том, чтобы через Диалог и Встречу помочь'
      },
      {
        id: 3,
        fullname: 'Аманжан Абдукаримов',
        image: 'specialists/id3.jpg',
        topics: ['аддикция', 'Трудности в отношениях', 'Тревога и страх','депрессия', 'стресс', 'подростки'],
        methods: ['КПТ', 'ДБТ', 'Клинический психолог'],
        experience: '10 лет опыта',
        courses: '10 профильных курса',
        diploma: '2 диплома психолога',
        description: ' Я считаю, что у болезни (зависимость) нет выходных, возраста, социальной, половой, расовой принадлежности, сексуальной ориентации, религии. Моя задача помочь вам, или вашему близкому человеку, бросить навсегда употреблять психоактивные вещества или перестать играть в азартные игры. Полная анонимность.'
      },
      {
        id: 4,
        fullname: 'Манабаев Айдос Кужабекович',
        image: 'specialists/id4.jpg',
        topics: ['аддикция', 'Тревога и страх','депрессия', 'стресс', ],
        methods: [ 'Гештальт', 'Гипноз', 'Клинический психолог'],
        experience: '10 лет опыта',
        courses: '9 профильных курса',
        diploma: '1 диплома психолога',
        description: 'Как разобраться в возникшей проблеме и найти выход из нее? Как пройти путь от осознания до решения сложной жизненной ситуации? Помогаю познать себя. Знайте - Вы не одиноки. Совместно с Вами проживу этот неоднозначный период в Вашей жизни и мы найдем решение проблемы! ' },
      { id: 5,
        fullname: 'Инкарбекова Лейла Асылбековна',
        image: 'specialists/id5.jpg',
        topics: ['Кризис среднего возраста', 'Кризис подросткового возраста', 'Семейное консультирование','Эмоциональное выгорание', 'Развод', 'Подростки'],
        methods: [ 'Интегративный подход', 'Юнгианский анализ'],
        experience: '17 лет опыта',
        courses: '9 профильных курса',
        diploma: '1 диплома психолога',
        description: 'Я поддерживаю этот Ваш шаг в поиске положительных изменений для себя. Я также предполагаю, что намерение обратиться к психологу переживается сейчас Вами волнительно. Ведь это процесс полный тревоги, вопросов и сомнений. С ними сталкивается каждый, кто ищет психолога.'
      },
      {
        id: 6,
        fullname: 'Айгерим Смаилова',
        image: 'specialists/id6.jpg',
        topics: ['Одиночество', 'Эмоциональное выгорание', 'Выстраивание личных границ'],
        methods: ['Гештальт', 'Юнгианский анализ'],
        experience: '17 лет опыта',
        courses: '2 профильных курса',
        diploma: '2 диплома психолога',
        description: 'Я понимаю, сколько разных чувств испытывает человек, решивший обратиться к психологу: страх, сомнения, стыд. Это вполне нормальные ощущения. Сомнения «а будет ли это полезно», «а стоит ли это своих денег», «а кого выбрать, женщину или мужчину». Страх перед неизвестным им.'
      }
    ];
    this.shuffleArray(arr);
    return arr;
  }

  shuffleArray(array: Object[]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}

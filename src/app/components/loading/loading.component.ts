import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  loadText?: string;

  texts = ['...'];
  idx = 0;

  constructor(private router: Router) {
    if (this.router.url == '/signup')
      this.texts = ['Создаем вам новый профиль...']
    else if (this.router.url == '/specialists')
      this.texts = ['Подбираем подходящих специалистов...', 'Еще чуть чуть ...']
    this.recursiveUpdater();
  }

  recursiveUpdater(): void {
    if (this.idx == this.texts.length) {
      this.router.navigate(['specialists'])
      return;
    }
    this.loadText = this.texts[this.idx];
    this.idx++;
    setTimeout(() => {
      this.recursiveUpdater();
    }, 2000);
  }

}

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
    else if (this.router.url == '/signin')
      this.texts = ['Аутентифицируем']
    this.recursiveUpdater();
  }

  recursiveUpdater(): void {
    let list = ['/signup', '/signin', '/specialists'];
    if (list.indexOf(this.router.url) == -1) return;
    if (this.idx == this.texts.length) {
      if (this.router.url != '/specialists')
        this.router.navigate(['specialists'])
      return;
    }
    this.loadText = this.texts[this.idx];
    this.idx++;
    setTimeout(() => {
      console.log('rec')
      this.recursiveUpdater();
    }, 1500);
  }

}

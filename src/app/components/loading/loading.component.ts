import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  loadText?: string;

  texts = ['Создаем вам новый профиль...', 'Подбираем подходящих специалистов...', 'Еще чуть чуть ...'];
  idx = 0;

  @Output() nextStage = new EventEmitter();

  constructor() {
    this.recursiveUpdater();
  }

  recursiveUpdater(): void {
    if (this.idx == this.texts.length) {
      this.nextStageEmit();
      return;
    }
    this.loadText = this.texts[this.idx];
    this.idx++;
    setTimeout(() => {
      this.recursiveUpdater();
    }, 2000);
  }

  nextStageEmit() {
    this.nextStage.emit()
  }

}

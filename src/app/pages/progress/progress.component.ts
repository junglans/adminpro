import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1: number = 20;
  progress2: number = 30;
  constructor() { }

  ngOnInit() {
  }

  public changeProgress1(event: number) {
    this.progress1 = event;
  }
  public changeProgress2(event: number) {
    this.progress2 = event;
  }
}

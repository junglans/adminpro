import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit, OnChanges {

  @Input()
  legend: string = 'Leyenda';
  @Input()
  progress: number = 50;

  constructor() { }

  ngOnInit() {  }

  ngOnChanges(changes: SimpleChanges): void { }
  public changeValue(value: number): void {
    const temp = this.progress + value;
    console.log(temp);
    if (temp >= 0 && temp <= 100) {
      this.progress += value;
    } else if (temp > 100) {
      this.progress = 100;
    } else {
      this.progress = 0;
    }
  }

public onChange(event) {
  const temp: number =  Number(event);
    if (isNumeric(temp)) {
      if (temp >= 0 && temp <= 100) {
        this.progress = temp;
      } else {
        this.progress = 0;
      }
    } else {
      this.progress = 0;
    }
  }
}

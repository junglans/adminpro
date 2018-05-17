import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit, OnChanges {

  @Input()  legend: string = 'Leyenda';
  @Input()  progress: number = 50;

  @Output() changedValue: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;
  constructor() { }

  ngOnInit() {  }

  ngOnChanges(changes: SimpleChanges): void {}

  public changeValue(value: number): void {
    const temp = this.progress + value;

    if (temp >= 0 && temp <= 100) {
      this.progress += value;
    } else if (temp > 100) {
      this.progress = 100;
    } else {
      this.progress = 0;
    }
    this.changedValue.emit(this.progress);
    this.txtProgress.nativeElement.focus();
  }

public onChange(event: number) {

    const temp: number =  event;
    if (temp >= 0 && temp <= 100) {
      this.progress = temp;
    } else if (temp > 100) {
      this.progress = 100;
    } else {
      this.progress = 0;
    }

    this.txtProgress.nativeElement.value = this.progress;

    this.changedValue.emit(this.progress);
  }
}

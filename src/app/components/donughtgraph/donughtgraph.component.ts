import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donughtgraph',
  templateUrl: './donughtgraph.component.html',
  styles: []
})
export class DonughtGraphComponent implements OnInit {

  @Input() data: number[];
  @Input() labels: string[];
  @Input() legend: string;
  constructor() { }

  ngOnInit() {
  }

}

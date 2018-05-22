import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countToThree().
    then((msg) => { console.log(msg); }).
    catch((error: Error) => {console.error(error.message); });
  }

  ngOnInit() {
  }

  public countToThree(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(
        () => { counter += 1;
                console.log(counter);
                if (counter === 3) {
                   resolve('¡Terminó!');
                   reject(new Error('¡¡Se ha producido un error!!'));
                   clearInterval(interval);
              }
      }, 1000);
      });
  }
}

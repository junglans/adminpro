import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private text: string = 'Esto es un texto';
  private sucriber: Subscription;
  constructor() {

    this.sucriber = this.countToThree().subscribe(
      (val: number) => {
        this.receiveNext(val);
      },
      (error) => {
        console.error('Error:' , error);
      }, () => {
        console.log('Termino la observación');
      }

    );
  }

  ngOnInit() {
  }

  private receiveNext(val: number) {
      // console.log('Text', this.text);
      console.log('Valor: ', val);
  }

  private countToThree(): Observable<any> {
    return new Observable<any>(

      (observer) => {
          let counter = 0;
          const interval = setInterval(

              () => {
                counter += 1;
                const salida = {
                  valor: counter
                };
                observer.next(salida);
                /*
                  if ( counter === 2) {
                    // clearInterval(interval);
                      observer.error('El contador es 2');
                  }
                */
                if (counter === 20) {

                    clearInterval(interval);
                    observer.complete();

                }
              }
          , 1000);

      }
    )
    .retry(2)
    // tslint:disable-next-line:arrow-return-shorthand
    .map( (resp: any) => { return resp.valor; })
    // tslint:disable-next-line:arrow-return-shorthand
    .filter( (value: number) => { return value % 2 === 0; });
  }

  ngOnDestroy(): void {
     console.log('La página de va a cerrar.');
     this.sucriber.unsubscribe();
  }
}

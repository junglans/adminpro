import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs/internal/Observable';


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
    ).pipe(
      retry(2),
      map(resp => resp.valor),
      filter( (val, index) => {
        // console.log('Item', val, index);
        return val % 2 === 0; // solamente nos interesan los valores pares.
      })
    );
  }

  ngOnDestroy(): void {
     console.log('La página se va a cerrar.');
     this.sucriber.unsubscribe();
  }
}

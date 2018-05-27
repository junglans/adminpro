import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  label: string = '';
  constructor(private router: Router,
              private title: Title,
              private meta: Meta) {

    this.getDataRoute().subscribe(
      data => {
        this.label = data.title;
        this.title.setTitle(data.title);

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };
        this.meta.updateTag(metaTag);
      }
    );
  }

  ngOnInit() {}

  public getDataRoute() {
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) =>  event.snapshot.firstChild === null ),
      map ((event: ActivationEnd) => event.snapshot.data ));
  }


}

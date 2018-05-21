import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  private menu: any;
  constructor(private _sidebarService: SidebarService) { }

  ngOnInit() {
    this.menu = this._sidebarService.getMenu();
  }

}

import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  constructor() { }

  public getMenu() {
    return JSON.parse(localStorage.getItem('menu'));
  }
}



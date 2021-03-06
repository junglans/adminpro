import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

 private menu: Menu = {
    menuItems: [{
      title: 'PERSONAL',
      icon: 'mdi mdi-gauge',
      url: '',
      submenus: [
        {
          title: 'Dashboard',
          icon: '',
          url: '/dashboard',
          submenus: []
        },
        {
          title: 'Gráficas',
          icon: '',
          url: '/graficas1',
          submenus: []
        },
        {
          title: 'Progress',
          icon: '',
          url: '/progress',
          submenus: []
        },
        {
          title: 'Promesas',
          icon: '',
          url: '/promises',
          submenus: []
        },
        {
          title: 'Rxjs',
          icon: '',
          url: '/rxjs',
          submenus: []
        }
      ]
    }]
  };

  constructor() { }

  public getMenu(): Menu {
    return this.menu;
  }
}

export interface MenuItem {
  title: string;
  icon: string;
  url: string;
  submenus: MenuItem[];
}
export interface Menu {
  menuItems: MenuItem[];
}


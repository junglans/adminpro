import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private _settingsService: SettingsService) { }

  ngOnInit() {
    init_plugins();
    this._settingsService.loadThemeSettings();
  }

}

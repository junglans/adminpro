import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, private _settings: SettingsService) {
  }

  ngOnInit() {
    // loading theme settings from local storage
    this.initCheck();
  }

  public changeColor(theme: string, link: any): void {
    this.setCheck(link);
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    // saving setting into local storage
    this._settings.saveThemeSettings(theme, url);
  }

  public setCheck(link: any): void {
    const selectores: any = this._document.getElementsByClassName('selector');
    for (const item of selectores) {
        item.classList.remove('working');
    }
    link.classList.add('working');
  }

  private initCheck(): void {

    const themeSettings: any = this._settings.loadThemeSettings();
    this._document.getElementById('theme').setAttribute('href', themeSettings.themeUrl);

    const selectores: any = this._document.getElementsByClassName('selector');
    for (const item of selectores) {
        item.classList.remove('working');
        if (item.getAttribute('data-theme') === themeSettings.theme) {
          item.classList.add('working');
          break;
        }
    }
  }
}

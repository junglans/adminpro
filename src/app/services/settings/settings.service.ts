import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  private DEFAULT: Settings = {
    theme: 'default',
    themeUrl: 'assets/css/colors/default.css'
  };

  private settings: Settings = this.DEFAULT;

  constructor(@Inject(DOCUMENT) private _document) {}

  public saveThemeSettings(theme: string, themeUrl: string): void {

      this.settings.themeUrl = themeUrl;
      this.settings.theme = theme;
      localStorage.setItem('theme', JSON.stringify(this.settings));

  }

  public loadThemeSettings(): void {

      if (localStorage.getItem('theme')) {
        this.settings = JSON.parse(localStorage.getItem('theme'));
      } else {
        this.settings = this.DEFAULT;
      }

      this._document.getElementById('theme').setAttribute('href',  this.settings.themeUrl);

      const selectores: any = this._document.getElementsByClassName('selector');
      for (const item of selectores) {
          item.classList.remove('working');
          if (item.getAttribute('data-theme') ===  this.settings.theme) {
            item.classList.add('working');
            break;
          }
      }

  }
}

interface Settings {
  themeUrl: string;
  theme: string;
}

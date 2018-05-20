import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private DEFAULT: Settings = {
    theme: 'default',
    themeUrl: 'assets/css/colors/default.css'
  };

  private settings: Settings = this.DEFAULT;

  constructor() {}

  public saveThemeSettings(theme: string, themeUrl: string): void {

      this.settings.themeUrl = themeUrl;
      this.settings.theme = theme;
      localStorage.setItem('theme', JSON.stringify(this.settings));

  }

  public loadThemeSettings(): any {

      if (localStorage.getItem('theme')) {
        this.settings = JSON.parse(localStorage.getItem('theme'));
      } else {
        this.settings = this.DEFAULT;
      }
      return { theme: this.settings.theme, themeUrl: this.settings.themeUrl};

  }
}

interface Settings {
  themeUrl: string;
  theme: string;
};

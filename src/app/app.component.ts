import { Component, OnInit } from '@angular/core';
import { TranslateService} from './translate/translate.service';
import { LANG_EN_NAME } from './translate/lang-en';
import { LANG_ES_NAME } from './translate/lang-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  public supportedLangs: any[];
  public translatedText: string;

  constructor( private _translate: TranslateService) {}

  ngOnInit(): void {
    this.supportedLangs = [
      { display: 'English', value: LANG_EN_NAME },
      { display: 'Español', value: LANG_ES_NAME }
    ];

    this.selectLang(LANG_ES_NAME);
  }

  isCurrentLang(lang: string): boolean {
    // check if the selected lang is current lang
    return lang === this._translate.currentLang;
  }

  selectLang(lang: string) {
    // set current lang;
    this._translate.use(lang);
    this.refreshText();
  }

  refreshText() {
    // refresh translation when language change
    this.translatedText = this._translate.instant('hello world');
  }
}

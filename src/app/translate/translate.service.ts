import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translation';


@Injectable()
export class TranslateService {
    private _currentLang: string;

    constructor(@Inject(TRANSLATIONS) private _translations: any) {}

    public get currentLang(): string {
        return this._currentLang;
    }

    public use(lang: string) {
        this._currentLang = lang;
    }

    public instant(key: string): string {
        return this.translate(key);
    }

    private translate(key: string): string {
        let translation = key;
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            translation = this._translations[this.currentLang][key];
        }
        return translation;
    }
}

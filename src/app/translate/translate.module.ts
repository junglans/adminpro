import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';
import { TRANSLATION_PROVIDERS } from './translation';


@NgModule({

    declarations: [
        TranslatePipe
    ],
    exports: [
        TranslatePipe
    ],
    providers: [
        TRANSLATION_PROVIDERS,
        TranslateService
    ],
})

export class TranslateModule {}

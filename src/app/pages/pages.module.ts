import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

import { TranslateModule } from '../translate/translate.module';
import { IncrementerComponent } from '../components/incrementer/incrementer.component';
import { DonughtGraphComponent } from '../components/donughtgraph/donughtgraph.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementerComponent,
        DonughtGraphComponent,
        AccountSettingsComponent
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule, PAGES_ROUTES, TranslateModule, FormsModule, ChartsModule
    ]
})

export class PagesModule {}

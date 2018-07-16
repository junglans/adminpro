import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from './admin.guard';
import { LoginGuard } from './login.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AdminGuard, LoginGuard],
  declarations: []
})
export class GuardsModule { }

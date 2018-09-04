import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from './admin.guard';
import { LoginGuard } from './login.guard';
import { VerifyTokenGuard } from './verify-token.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AdminGuard, LoginGuard, VerifyTokenGuard],
  declarations: []
})
export class GuardsModule { }

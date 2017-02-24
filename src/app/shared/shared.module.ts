import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanDeactivateGuard} from "./can-deactivate-guard.service";

@NgModule({
  providers: [CanDeactivateGuard]
})
export class SharedModule { }

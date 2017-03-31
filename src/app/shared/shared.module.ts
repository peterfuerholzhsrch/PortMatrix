import { NgModule } from '@angular/core';
import {CanDeactivateGuard} from './can-deactivate-guard.service';

@NgModule({
  providers: [CanDeactivateGuard]
})
export class SharedModule { }

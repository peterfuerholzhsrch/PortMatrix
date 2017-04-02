import './polyfills.ts';
import {Log} from 'ng2-logger/ng2-logger'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
  Log.setProductionMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

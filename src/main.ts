import { enableProdMode, InjectionToken, StaticProvider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BASE_API_URL } from './tokens';

import 'bootstrap';

const providers: StaticProvider[] = [
  { provide: BASE_API_URL, useValue: environment.baseApiUrl }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));

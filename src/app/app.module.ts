import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './angular-material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,     // Main routes for the application
    CoreModule,           // Singleton objects (services, components that are loaded once)
    SharedModule,         // Shared (multi-instance) objects
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}), BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

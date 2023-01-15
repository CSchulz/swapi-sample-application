import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { WelcomeComponent } from './welcome/welcome.component';
import { API_URL } from './commons/environment';
import {PlanetApiService} from "./planet/planet-api.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, NavigationComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: API_URL,
      useValue: 'https://www.swapi.tech/api/',
    },
    PlanetApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

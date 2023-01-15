import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {PlanetRoutingModule} from './planet-routing.module';
import {PlanetComponent} from './planet.component';
import {PlanetListComponent} from "./planet-list/planet-list.component";
import {PlanetDetailComponent} from "./planet-detail/planet-detail.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {PlanetApiService} from "./planet-api.service";

@NgModule({
  imports: [
    PlanetRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [
    PlanetComponent,
    PlanetListComponent,
    PlanetDetailComponent,
  ],
  providers: [
    PlanetApiService,
  ]
})
export class PlanetModule {}

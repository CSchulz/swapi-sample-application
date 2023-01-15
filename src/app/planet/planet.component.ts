import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-character',
  templateUrl: './planet.component.html',
  imports: [
    RouterOutlet,
  ]
})
export class PlanetComponent {}

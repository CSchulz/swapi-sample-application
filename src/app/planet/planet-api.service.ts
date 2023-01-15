import { inject, Injectable } from '@angular/core';
import { API_URL } from '../commons/environment';
import { AbstractApiService } from '../commons/abstract-api-service';
import { PlanetDetailItem, PlanetListItem } from './model';

@Injectable()
export class PlanetApiService extends AbstractApiService<
  PlanetListItem,
  PlanetDetailItem
> {
  protected readonly apiUrl = `${inject(API_URL)}planets/`;
}

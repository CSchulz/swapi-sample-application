import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ListRecord, SingleRecord } from './rest-api';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export abstract class AbstractApiService<List, Detail> {
  protected httpClient = inject(HttpClient);

  protected abstract readonly apiUrl: string;

  private listCache: Observable<List[]> | undefined;

  private detailCache: Map<number, Observable<Detail>> = new Map();

  public getItemList() {
    if (!this.listCache) {
      // catching all records at once, because the API does not support server side sorting, we do client side sorting
      // setting page to 1, because without page query parameter api returns only the default record size of 10
      this.listCache = this.httpClient
        .get<ListRecord<List>>(this.apiUrl, {
          params: new HttpParams().set('page', 1).set('limit', 1000),
        })
        .pipe(
          tap((result) => {
            if (result.total_pages !== 1 || result.total_records > 1000) {
              console.warn(
                `We have got more results (pages: ${result.total_pages}, records: ${result.total_records}) than expected, actual we can only handle 1000 records on 1 page.`
              );
            }
          }),
          map((response) => response.results),
          shareReplay(1)
        );
    }

    return this.listCache;
  }

  public getItem(uid: number) {
    if (!this.detailCache.has(uid)) {
      this.detailCache.set(
        uid,
        this.httpClient.get<SingleRecord<Detail>>(`${this.apiUrl}${uid}`).pipe(
          map((response) => response.result),
          shareReplay(1)
        )
      );
    }

    // we enforce here not null assertion, because we set it before if not set
    return this.detailCache.get(uid)!;
  }
}

import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../environment";
import {CharacterDetailItem, CharacterListItem} from "./model";
import {Observable, tap} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

interface ListRecord<T> {
  /** api status */
  message: string;
  /** number of total records */
  total_records: number;
  /** number of total pages */
  total_pages: number;
  /** REST hypermedia link for previous result set */
  previous: string | null;
  /** REST hypermedia link for next result set */
  next: string | null;
  /** result list */
  results: Array<T>;
}

interface SingleRecord<T> {
  /** api status */
  message: string;
  /** result entry */
  result: T;
}

@Injectable()
export class CharacterApiService {
  private httpClient = inject(HttpClient);

  private readonly apiUrl = `${inject(API_URL)}people/`;

  private listCache: Observable<CharacterListItem[]> | undefined;

  private detailCache: Map<number, Observable<CharacterDetailItem>> = new Map();

  public getCharacterList() {
    if (!this.listCache) {
      // catching all records at once, because the API does not support server side sorting, we do client side sorting
      // setting page to 1, because without page query parameter api returns only the default record size of 10
      this.listCache = this.httpClient.get<ListRecord<CharacterListItem>>(this.apiUrl, {
        params: new HttpParams().set('page', 1).set('limit', 1000)
      })
        .pipe(
          tap((result) => {
            if (result.total_pages !== 1 || result.total_records > 1000) {
              console.warn(`We have got more results (pages: ${result.total_pages}, records: ${result.total_records}) than expected, actual we can only handle 1000 records on 1 page.`);
            }
          }),
          map((response) => response.results),
          shareReplay(1)
        );
    }

    return this.listCache;
  }

  public getCharacter(uid: number) {
    if (!this.detailCache.has(uid)) {
      this.detailCache.set(uid, this.httpClient.get<SingleRecord<CharacterDetailItem>>(`${this.apiUrl}${uid}`)
        .pipe(
          map((response) => response.result),
          shareReplay(1)
        ));
    }

    // we enforce here not null assertion, because we set it before if not set
    return this.detailCache.get(uid)!;
  }
}

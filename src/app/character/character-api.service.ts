import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../environment";
import {CharacterListItem} from "./model";
import {Observable, tap} from "rxjs";
import {shareReplay} from "rxjs/operators";

interface ListResult<T> {
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

@Injectable()
export class CharacterApiService {
  private httpClient = inject(HttpClient);

  private readonly apiUrl = inject(API_URL);

  private listCache: Observable<ListResult<CharacterListItem>> | undefined;

  public getCharacterList() {
    if (this.listCache) {
      return this.listCache;
    }

    // catching all records at once, because the API does not support server side sorting and we want be able to sort
    // setting page to 1, because without page query parameter api returns only the default record size of 10
    this.listCache = this.httpClient.get<ListResult<CharacterListItem>>(`${this.apiUrl}people`, {
      params: new HttpParams().set('page', 1).set('limit', 1000)
    })
      .pipe(
        tap((result) => {
          if (result.total_pages !== 1 || result.total_records > 1000) {
            console.warn(`We have got more results (pages: ${result.total_pages}, records: ${result.total_records}) than expected, actual we can only handle 1000 records on 1 page.`);
          }
        }),
        shareReplay(1)
      );

    return this.listCache;
  }
}

import {inject, Injectable} from "@angular/core";
import {API_URL} from "../commons/environment";
import {CharacterDetailItem, CharacterListItem} from "./model";
import {AbstractApiService} from "../commons/abstract-api-service";

@Injectable()
export class CharacterApiService extends AbstractApiService<CharacterListItem, CharacterDetailItem> {
  protected readonly apiUrl = `${inject(API_URL)}people/`;
}

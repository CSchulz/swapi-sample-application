import {CharacterApiService} from "./character-api.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ListRecord} from "../commons/rest-api";
import {CharacterListItem} from "./model";
import {API_URL} from "../commons/environment";

const testListResult: ListRecord<CharacterListItem> = {
  message: 'ok',
  next: null,
  previous: null,
  results: [
    {
      uid: '1',
      name: 'earth',
    },
    {
      uid: '2',
      name: 'mars',
    }
  ],
  total_pages: 1,
  total_records: 2,
}

describe(CharacterApiService.name, () => {
  let httpTestingController: HttpTestingController;
  let service: CharacterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CharacterApiService,
        {
          provide: API_URL,
          useValue: '',
        }
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CharacterApiService);
  })

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('return record list', () => {
    service.getItemList().subscribe((result) => {
      expect(result).toEqual(testListResult);
    });

    const request = httpTestingController.expectOne('people/?page=1&limit=1000');
    request.flush(testListResult);
  });
})

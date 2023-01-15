import {CharacterApiService} from "./character-api.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {API_URL} from "../commons/environment";
import {
  mockListRecordCharacterListItem,
  mockSingleRecordCharacterDetailItem,
  mockSingleRecordCharacterDetailItemTwo
} from "./mocks";

const listUrl = 'people/?page=1&limit=1000';
const entryUrl = 'people/1'
const entryUrlTwo = 'people/2'

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

  it('should return record list', () => {
    service.getItemList().subscribe((result) => {
      expect(result).toEqual(mockListRecordCharacterListItem);
    });

    const request = httpTestingController.expectOne(listUrl);
    request.flush(mockListRecordCharacterListItem);
  });

  it('should cache record list', () => {
    service.getItemList().subscribe((result) => {
      expect(result).toEqual(mockListRecordCharacterListItem);
    });

    const request = httpTestingController.expectOne(listUrl);
    request.flush(mockListRecordCharacterListItem);

    service.getItemList().subscribe((result) => {
      expect(result).toEqual(mockListRecordCharacterListItem);
    });
    httpTestingController.expectNone(listUrl);
  });

  it('should return record entry and should cache it', () => {
    service.getItem(1).subscribe((result) => {
      expect(result).toEqual(mockSingleRecordCharacterDetailItem);
    });

    const request = httpTestingController.expectOne(entryUrl);
    request.flush(mockSingleRecordCharacterDetailItem);

    service.getItem(1).subscribe((result) => {
      expect(result).toEqual(mockSingleRecordCharacterDetailItem);
    });
    httpTestingController.expectNone(entryUrl);

    service.getItem(2).subscribe((result) => {
      expect(result).toEqual(mockSingleRecordCharacterDetailItemTwo);
    });

    const requestTwo = httpTestingController.expectOne(entryUrlTwo);
    requestTwo.flush(mockSingleRecordCharacterDetailItemTwo);

    service.getItem(2).subscribe((result) => {
      expect(result).toEqual(mockSingleRecordCharacterDetailItemTwo);
    });
    httpTestingController.expectNone(entryUrl);
  });
})

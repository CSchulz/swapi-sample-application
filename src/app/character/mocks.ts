import { ListRecord, SingleRecord } from '../commons/rest-api';
import { CharacterDetailItem, CharacterListItem } from './model';

export const mockListRecordCharacterListItem: ListRecord<CharacterListItem> = {
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
    },
  ],
  total_pages: 1,
  total_records: 2,
};

export const mockCharacterDetailItem: CharacterDetailItem = {
  uid: '1',
  properties: {
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    name: 'Luke Skywalker',
    homeworld: 'https://www.swapi.tech/api/planets/1',
  },
};

export const mockSingleRecordCharacterDetailItem: SingleRecord<CharacterDetailItem> =
  {
    message: 'ok',
    result: {
      ...mockCharacterDetailItem,
    },
  };
export const mockSingleRecordCharacterDetailItemTwo: SingleRecord<CharacterDetailItem> =
  {
    message: 'ok',
    result: {
      ...mockCharacterDetailItem,
      uid: '2',
    },
  };

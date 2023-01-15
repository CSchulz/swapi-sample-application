export interface CharacterListItem {
  uid: string;
  name: string;
}

export interface CharacterDetailItem {
  uid: string;
  properties: {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    // films array;
    // species array;
    // starships array;
    // vehicles array;
  }
}

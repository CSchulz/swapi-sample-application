export interface PlanetListItem {
  uid: string;
  name: string;
}

export interface PlanetDetailItem {
  uid: string;
  properties: {
    name: string;
    diameter: string;
    rotation_period: string;
    orbital_period: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surface_water: string;
  };
}

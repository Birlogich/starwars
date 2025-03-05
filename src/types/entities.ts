export type LocalEntity = { name?: string; url: string, title?: string };


export type BaseFilmType<T> = {
   title: string;
   episode_id: number;
   opening_crawl: string;
   director: string;
   producer: string;
   release_date: Date;
   species: T[];
   starships: T[];
   vehicles: T[];
   characters: T[];
   planets: T[];
   url: string;
   created: string;
   edited: string;
};
export type FilmType = BaseFilmType<string>;
export type LocalFilmType = BaseFilmType<LocalEntity>;

export type BaseCharacterType<T> = {
   birth_year: string;
   eye_color: string;
   films: T[];
   gender: string;
   hair_color: string;
   height: string;
   homeworld: T;
   mass: string;
   name: string;
   skin_color: string;
   created: string;
   edited: string;
   species: T[];
   starships: T[];
   url: string;
   vehicles: T[];
};
export type CharacterType = BaseCharacterType<string>;
export type LocalCharacterType = BaseCharacterType<LocalEntity>;


export type BasePlanetType<T> = {
   climate: string;
   created: string;
   diameter: string;
   edited: string;
   films: T[];
   gravity: string;
   name: string;
   orbital_period: string;
   population: string;
   residents: T[];
   rotation_period: string;
   surface_water: string;
   terrain: string;
   url: string;
};
export type PlanetType = BasePlanetType<string>;
export type LocalPlanetType = BasePlanetType<LocalEntity>;

export type BaseSpecieType<T> = {
   average_height: string;
   average_lifespan: string;
   classification: string;
   created: string;
   designation: string;
   edited: string;
   eye_colors: string;
   hair_colors: string;
   homeworld: string;
   language: string;
   name: string;
   people: T[];
   films: T[];
   skin_colors: string;
   url: string;
};
export type SpecieType = BaseSpecieType<string>;
export type LocalSpecieType = BaseSpecieType<LocalEntity>;


export type BaseStarshipType<T> = {
   MGLT: string;
   cargo_capacity: string;
   consumables: string;
   cost_in_credits: string;
   created: string;
   crew: string;
   edited: string;
   hyperdrive_rating: string;
   length: string;
   manufacturer: string;
   max_atmosphering_speed: string;
   model: string;
   name: string;
   passengers: string;
   films: T[];
   pilots: T[];
   starship_class: string;
   url: string;
};
export type StarshipType = BaseStarshipType<string>;
export type LocalStarshipType = BaseStarshipType<LocalEntity>;


export type BaseVehicleType<T> = {
   cargo_capacity: string;
   consumables: string;
   cost_in_credits: string;
   created: string;
   crew: string;
   edited: string;
   length: string;
   manufacturer: string;
   max_atmosphering_speed: string;
   model: string;
   name: string;
   passengers: string;
   pilots: T[];
   films: T[];
   url: string;
   vehicle_class: string;
};

export type VehicleType = BaseVehicleType<string>;
export type LocalVehicleType = BaseVehicleType<LocalEntity>;
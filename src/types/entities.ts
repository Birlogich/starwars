export type Entities =
  | FilmType | LocalFilmType
  | CharacterType | LocalCharacterType
  | PlanetType | LocalPlanetType
  | SpecieType | LocalSpecieType
  | StarshipType | LocalStarshipType
  | VehicleType | LocalVehicleType;

export type LocalEntity = { name?: string; url: string, title?: string };

export type BaseEntity<T> = {
   url: string;
   created: string;
   edited: string;
   films?: T[];
   species?: T[];
   starships?: T[];
   vehicles?: T[];
   characters?: T[];
   planets?: T[];
   pilots?: T[];
   residents?: T[];
   homeworld?: T;
   people?: T[];
 };

 export type FilmType = BaseEntity<string> & {
   title: string;
   episode_id: number;
   opening_crawl: string;
   director: string;
   producer: string;
   release_date: Date;
 };
 
 export type LocalFilmType = BaseEntity<LocalEntity> & {
   title: string;
   episode_id: number;
   opening_crawl: string;
   director: string;
   producer: string;
   release_date: Date;
 };

 export type CharacterType = BaseEntity<string> & {
   birth_year: string;
   eye_color: string;
   gender: string;
   hair_color: string;
   height: string;
   mass: string;
   name: string;
   skin_color: string;
 };
 
 export type LocalCharacterType = BaseEntity<LocalEntity> & {
   birth_year: string;
   eye_color: string;
   gender: string;
   hair_color: string;
   height: string;
   mass: string;
   name: string;
   skin_color: string;
 };



 export type PlanetType = BaseEntity<string> & {
   climate: string;
   diameter: string;
   gravity: string;
   name: string;
   orbital_period: string;
   population: string;
   rotation_period: string;
   surface_water: string;
   terrain: string;
 };
 
 export type LocalPlanetType = BaseEntity<LocalEntity> & {
   climate: string;
   diameter: string;
   gravity: string;
   name: string;
   orbital_period: string;
   population: string;
   rotation_period: string;
   surface_water: string;
   terrain: string;
 };

export type SpecieType = BaseEntity<string> & {
  average_height: string;
  average_lifespan: string;
  classification: string;
  designation: string;
  eye_colors: string;
  hair_colors: string;
  language: string;
  name: string;
  skin_colors: string;
};

export type LocalSpecieType = BaseEntity<LocalEntity> & {
  average_height: string;
  average_lifespan: string;
  classification: string;
  designation: string;
  eye_colors: string;
  hair_colors: string;
  language: string;
  name: string;
  skin_colors: string;
};



export type StarshipType = BaseEntity<string> & {
   MGLT: string;
   cargo_capacity: string;
   consumables: string;
   cost_in_credits: string;
   crew: string;
   hyperdrive_rating: string;
   length: string;
   manufacturer: string;
   max_atmosphering_speed: string;
   model: string;
   name: string;
   passengers: string;
   starship_class: string;
 };
 
 export type LocalStarshipType = BaseEntity<LocalEntity> & {
   MGLT: string;
   cargo_capacity: string;
   consumables: string;
   cost_in_credits: string;
   crew: string;
   hyperdrive_rating: string;
   length: string;
   manufacturer: string;
   max_atmosphering_speed: string;
   model: string;
   name: string;
   passengers: string;
   starship_class: string;
 };
 


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
export type VehicleType = BaseEntity<string> & {
   cargo_capacity: string;
   consumables: string;
   cost_in_credits: string;
   crew: string;
   length: string;
   manufacturer: string;
   max_atmosphering_speed: string;
   model: string;
   name: string;
   passengers: string;
   vehicle_class: string;
 };
 
 export type LocalVehicleType = BaseEntity<LocalEntity> & {
   cargo_capacity: string;
   consumables: string;
   cost_in_credits: string;
   crew: string;
   length: string;
   manufacturer: string;
   max_atmosphering_speed: string;
   model: string;
   name: string;
   passengers: string;
   vehicle_class: string;
 };
 
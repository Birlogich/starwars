
export type FilmType = {
   title: string ,
   episode_id: number ,
   opening_crawl: string ,
   director: string ,
   producer: string ,
   release_date: Date ,
   species: string[] ,
   starships: string[] ,
   vehicles: string[] ,
   characters: string[] ,
   planets: string[] ,
   url: string ,
   created :string,
   edited: string,
}

export type LocalFilmType = {
   title: string ,
   episode_id: number ,
   opening_crawl: string ,
   director: string ,
   producer: string ,
   release_date: Date ,
   species: { name: string; url: string }[] ,
   starships: { name: string; url: string }[] ,
   vehicles: { name: string; url: string }[] ,
   characters: { name: string; url: string }[] ,
   planets: { name: string; url: string }[] ,
   url: string ,
   created :string,
   edited: string,
}

export type CharacterType = {
   birth_year: string,
   eye_color: string,
   films: string[],
   gender: string,
   hair_color: string,
   height: string,
   homeworld: string,
   mass: string,
   name: string,
   skin_color: string,
   created: string,
   edited: string,
   species: string[],
   starships: string[],
   url: string,
   vehicles: string[]
}

export type LocalCharacterType = {
   birth_year: string,
   eye_color: string,
   films: { title: string; url: string }[],
   gender: string,
   hair_color: string,
   height: string,
   homeworld: { name: string; url: string },
   mass: string,
   name: string,
   skin_color: string,
   created: string,
   edited: string,
   species: { name: string; url: string }[],
   starships: { name: string; url: string }[],
   url: string,
   vehicles: { name: string; url: string }[]
}

export type PlanetType = {
      climate: string,
      created: string,
      diameter: string,
      edited: string,
      films: string[],
      gravity: string,
      name: string,
      orbital_period: string,
      population: string,
      residents: string[],
      rotation_period: string,
      surface_water: string,
      terrain: string,
      url: string
}

export type LocalPlanetType = {
   climate: string,
   created: string,
   diameter: string,
   edited: string,
   films: { title: string; url: string }[],
   gravity: string,
   name: string,
   orbital_period: string,
   population: string,
   residents: { name: string; url: string }[],
   rotation_period: string,
   surface_water: string,
   terrain: string,
   url: string
}

export type SpecieType = {
   average_height: string,
   average_lifespan: string,
   classification: string,
   created: string,
   designation: string,
   edited: string,
   eye_colors: string,
   hair_colors: string,
   homeworld: string,
   language: string,
   name: string,
   people: string[],
   films: string[],
   skin_colors: string,
   url: string
}

export type LocalSpecieType = {
   average_height: string,
   average_lifespan: string,
   classification: string,
   created: string,
   designation: string,
   edited: string,
   eye_colors: string,
   hair_colors: string,
   homeworld: string,
   language: string,
   name: string,
   people: { name: string; url: string }[],
   films: { title: string; url: string }[],
   skin_colors: string,
   url: string
}

export type StarshipType = {
   MGLT: string,
   cargo_capacity: string
   consumables: string,
   cost_in_credits: string,
   created: string,
   crew: string,
   edited: string,
   hyperdrive_rating: string,
   length: string,
   manufacturer: string,
   max_atmosphering_speed: string,
   model: string,
   name: string,
   passengers: string,
   films: string[],
   pilots: string[],
   starship_class: string,
   url: string
}

export type LocalStarshipType = {
   MGLT: string,
   cargo_capacity: string
   consumables: string,
   cost_in_credits: string,
   created: string,
   crew: string,
   edited: string,
   hyperdrive_rating: string,
   length: string,
   manufacturer: string,
   max_atmosphering_speed: string,
   model: string,
   name: string,
   passengers: string,
   films: { title: string; url: string }[],
   pilots: { name: string; url: string }[],
   starship_class: string,
   url: string
}

export type VehicleType = {
   cargo_capacity: string,
   consumables: string,
   cost_in_credits: string,
   created: string,
   crew: string,
   edited: string,
   length: string,
   manufacturer: string,
   max_atmosphering_speed: string,
   model: string,
   name: string,
   passengers: string,
   pilots: string[],
   films: string[],
   url: string,
   vehicle_class: string
}

export type LocalVehicleType = {
   cargo_capacity: string,
   consumables: string,
   cost_in_credits: string,
   created: string,
   crew: string,
   edited: string,
   length: string,
   manufacturer: string,
   max_atmosphering_speed: string,
   model: string,
   name: string,
   passengers: string,
   pilots: { name: string; url: string }[],
   films: { title: string; url: string }[],
   url: string,
   vehicle_class: string
}
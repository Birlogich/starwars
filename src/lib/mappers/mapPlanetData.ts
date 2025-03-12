import { PlanetType, LocalPlanetType } from "../../types";
import { mapResources } from "./mapCharacterData";

export const mapPlanetData = (planet: PlanetType): LocalPlanetType => {
  if (!planet) return planet;

  return {
    ...planet,
    films: mapResources(planet.films, "films"),
    residents: mapResources(planet.residents, "characters"),
    species: mapResources(planet.species, "species"), 
    starships: mapResources(planet.starships, "starships"), 
    vehicles: mapResources(planet.vehicles, "vehicles"),
    characters: mapResources(planet.characters, "characters"), 
    planets: mapResources(planet.planets, "planets"),
    pilots: mapResources(planet.pilots, "pilots"),
    people: mapResources(planet.people, "people"),
    homeworld: planet.homeworld ? { name: "", url: `/planets/${planet.homeworld.split("/").filter(Boolean).pop()}` } : undefined,
  };
};
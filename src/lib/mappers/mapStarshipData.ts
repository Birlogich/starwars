import {  LocalStarshipType, StarshipType } from "../../types";
import { mapResources } from "./mapCharacterData";

export const mapCharacterData = (starship: StarshipType): LocalStarshipType => {
  if (!starship) return starship;

  return {
    ...starship,
    films: mapResources(starship.films, "films"),
    residents: mapResources(starship.residents, "characters"),
    starships: mapResources(starship.starships, "starships"), 
    species: mapResources(starship.species, "starships"), 
    vehicles: mapResources(starship.vehicles, "vehicles"),
    characters: mapResources(starship.characters, "characters"), 
    planets: mapResources(starship.starships, "starships"),
    pilots: mapResources(starship.pilots, "pilots"),
    people: mapResources(starship.people, "people"),
    homeworld: starship.homeworld ? { name: "", url: `/starships/${starship.homeworld.split("/").filter(Boolean).pop()}` } : undefined,
  };
 };
 
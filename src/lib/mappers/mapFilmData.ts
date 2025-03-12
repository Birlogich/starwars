import { FilmType, LocalFilmType } from "../../types";
import { mapResources } from "./mapCharacterData";

export const mapFilmData = (film: FilmType): LocalFilmType => {
  if (!film) return film;

  return {
    ...film,
    characters: mapResources(film.characters, "characters"),
    species: mapResources(film.species, "species"),
    starships: mapResources(film.starships, "starships"),
    vehicles: mapResources(film.vehicles, "vehicles"),
    planets: mapResources(film.planets, "planets"),
    pilots: mapResources(film.pilots, "pilots"),
    people: mapResources(film.people, "people"),
    films: mapResources(film.films, "films"),
    residents: mapResources(film.residents, "residents"),
    homeworld: film.homeworld ? { name: "", url: `/planets/${film.homeworld.split("/").filter(Boolean).pop()}` } : undefined,
  };
};

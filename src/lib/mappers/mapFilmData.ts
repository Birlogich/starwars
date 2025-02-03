import {  FilmType, LocalFilmType } from "../../types";

export const mapCharacterData = (film: FilmType): LocalFilmType => {
   if (!film) return film;
 
   const mapResources = (urls: string[], type: string, key: "name" | "title") =>
     urls.map((url) => {
       const id = url.split("/").filter(Boolean).pop();
       return { [key]: "", url: `/${type}/${id}` } as { [K in typeof key]: string } & { url: string };
     });
 
   return {
     ...film,
     characters: mapResources(film.characters, "films", "name"), 
     species: mapResources(film.species, "species", "name"),
     starships: mapResources(film.starships, "starships", "name"),
     vehicles: mapResources(film.vehicles, "vehicles", "name"),
     planets: mapResources(film.planets, "planets", "name"),
   };
 };
 
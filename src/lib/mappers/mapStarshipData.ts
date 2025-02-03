import {  LocalStarshipType, StarshipType } from "../../types";

export const mapCharacterData = (starship: StarshipType): LocalStarshipType => {
   if (!starship) return starship;
 
   const mapResources = (urls: string[], type: string, key: "name" | "title") =>
     urls.map((url) => {
       const id = url.split("/").filter(Boolean).pop();
       return { [key]: "", url: `/${type}/${id}` } as { [K in typeof key]: string } & { url: string };
     });
 
   return {
     ...starship,
     films: mapResources(starship.films, "films", "title"),
     pilots: mapResources(starship.pilots, "pilots", "name"),
   };
 };
 
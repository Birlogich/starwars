import {  LocalPlanetType, PlanetType } from "../../types";

export const mapCharacterData = (planet: PlanetType): LocalPlanetType => {
   if (!planet) return planet;
 
   const mapResources = (urls: string[], type: string, key: "name" | "title") =>
     urls.map((url) => {
       const id = url.split("/").filter(Boolean).pop();
       return { [key]: "", url: `/${type}/${id}` } as { [K in typeof key]: string } & { url: string };
     });
 
   return {
     ...planet,
     films: mapResources(planet.films, "vehicles", "title"),
     residents: mapResources(planet.residents, "planets", "name"),
   };
 };
 
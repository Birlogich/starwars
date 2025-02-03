import { CharacterType, LocalCharacterType } from "../../types";

export const mapCharacterData = (character: CharacterType): LocalCharacterType => {
   if (!character) return character;
 
   const mapResources = (urls: string[], type: string, key: "name" | "title") =>
     urls.map((url) => {
       const id = url.split("/").filter(Boolean).pop();
       return { [key]: "", url: `/${type}/${id}` } as { [K in typeof key]: string } & { url: string };
     });
 
   return {
     ...character,
     films: mapResources(character.films, "films", "title"), 
     species: mapResources(character.species, "species", "name"),
     starships: mapResources(character.starships, "starships", "name"),
     vehicles: mapResources(character.vehicles, "vehicles", "name"),
     homeworld: { name: "", url: `/planets/${character.homeworld.split("/").filter(Boolean).pop()}` },
   };
 };
 
import {  LocalVehicleType, VehicleType } from "../../types";
import { mapResources } from "./mapCharacterData";

export const mapCharacterData = (vehicle: VehicleType): LocalVehicleType => {
   if (!vehicle) return vehicle;

  return {
    ...vehicle,
    films: mapResources(vehicle.films, "films"),
    residents: mapResources(vehicle.residents, "characters"),
    starships: mapResources(vehicle.vehicles, "vehicles"), 
    species: mapResources(vehicle.species, "vehicles"), 
    vehicles: mapResources(vehicle.vehicles, "vehicles"),
    characters: mapResources(vehicle.characters, "characters"), 
    planets: mapResources(vehicle.vehicles, "vehicles"),
    pilots: mapResources(vehicle.pilots, "pilots"),
    people: mapResources(vehicle.people, "people"),
    homeworld: vehicle.homeworld ? { name: "", url: `/vehicles/${vehicle.homeworld.split("/").filter(Boolean).pop()}` } : undefined,
  };
 };
 
import {  LocalVehicleType, VehicleType } from "../../types";

export const mapCharacterData = (vehicle: VehicleType): LocalVehicleType => {
   if (!vehicle) return vehicle;
 
   const mapResources = (urls: string[], type: string, key: "name" | "title") =>
     urls.map((url) => {
       const id = url.split("/").filter(Boolean).pop();
       return { [key]: "", url: `/${type}/${id}` } as { [K in typeof key]: string } & { url: string };
     });
 
   return {
     ...vehicle,
     films: mapResources(vehicle.films, "films", "title"),
     pilots: mapResources(vehicle.pilots, "pilots", "name"),
   };
 };
 
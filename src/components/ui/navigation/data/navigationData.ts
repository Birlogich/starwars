import Lightsaber from "../../../../assets/images/icons/lightsaber.svg?react";
import Droid from "../../../../assets/images/icons/droid.svg?react";
import Dna from "../../../../assets/images/icons/dna.svg?react";
import Galaxy from "../../../../assets/images/icons/galaxy.svg?react";
import Aircraft from "../../../../assets/images/icons/aircraft.svg?react";
import Battleship from "../../../../assets/images/icons/battleship.svg?react";
import { NavLinkProps } from "../../../../types";

export const navagationData: NavLinkProps[] = [
   {
     title: "FILMS",
     to: "films",
     LogoComponent: Lightsaber,
   },
   {
     title: "CHARACTERS",
     to: "people",
     LogoComponent: Droid,
   },
   {
     title: "PLANETS",
     to: "planets",
     LogoComponent: Galaxy,
   },
   {
    title: "SPECIES",
    to: "species",
    LogoComponent: Dna,
  },
   {
     title: "STARSHIPS",
     to: "starships",
     LogoComponent: Aircraft,
   },
   {
     title: "VEHICLES",
     to: "vehicles",
     LogoComponent: Battleship,
   },
 ];
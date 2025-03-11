import { fetchCharacterById } from "../../features/Character/characterSlice";
import EntityPage from "../entity/EntityPage";
import { CharacterType } from "../../types";

const CharacterPage = () => {
  return (
    <EntityPage<CharacterType>
      entityName="characters"
      fetchByIdAction={fetchCharacterById}
      titleKey="name"
      fields={[
        { label: "Birth Year", key: "birth_year" },
        { label: "Eye Color", key: "eye_color" },
        { label: "Home World", key: "homeworld", isLink: true },
        { label: "Starships", key: "starships", isLink: true },
        { label: "Vehicles", key: "vehicles", isLink: true },
        { label: "Species", key: "species", isLink: true },
      ]}
    />
  );
};

export default CharacterPage;

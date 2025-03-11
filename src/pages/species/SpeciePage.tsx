import { fetchSpecieById } from "../../features/Species/speciesSlice";
import EntityPage from "../entity/EntityPage";
import { SpecieType } from "../../types";

const SpeciePage = () => {
  return (
    <EntityPage<SpecieType>
      entityName="species"
      fetchByIdAction={fetchSpecieById}
      titleKey="name"
      fields={[
        { label: "Average Height", key: "average_height" },
        { label: "Average Life Span", key: "average_lifespan" },
        { label: "Classification", key: "classification" },
        { label: "Language", key: "language" },
        { label: "Skin Colors", key: "skin_colors" },
        { label: "Films", key: "films", isLink: true },
        { label: "People", key: "people", isLink: true },
      ]}
    />
  );
};

export default SpeciePage;

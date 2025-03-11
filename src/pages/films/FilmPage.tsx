import { fetchFilmsById } from "../../features/Film/filmSlice";
import { FilmType } from "../../types";
import EntityPage from "../entity/EntityPage";

const FilmPage: React.FC = () => {
  return (
    <EntityPage<FilmType>
      entityName="characters"
      fetchByIdAction={fetchFilmsById}
      titleKey="title"
      fields={[
        { label: "Opening Crawl", key: "opening_crawl" },
        { label: "Characters", key: "characters", isLink: true },
        { label: "Planets", key: "planets", isLink: true },
        { label: "Vehicles", key: "vehicles", isLink: true },
        { label: "Species", key: "species", isLink: true },
        { label: "Starships", key: "starships", isLink: true },
        { label: "Director", key: "director" },
        { label: "Producer", key: "producer" },
        { label: "Year", key: "release_date" },
      ]}
    />
  );
};

export default FilmPage;

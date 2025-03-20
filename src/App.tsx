import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Main from "./pages/main/Main";
import PageWrapper from "./components/pageWrapper/PageWrapper";
import FilmsPage from "./pages/films/FilmsPage";
import FilmPage from "./pages/films/FilmPage";

import bgMain from "./assets/images/bg-main.jpg";
import bgFilm from "./assets/images/bg-film.jpg";
import bgFilms from "./assets/images/bg-films.jpg";
import bgPlanets from "./assets/images/bg-planets.jpg";
import bgVehicles from "./assets/images/bg-vehicles.jpg";
import bgStarships from "./assets/images/bg-starships.jpg";
import bgTatooin from "./assets/images/bg-tatooin.jpg";
import bgTroopers from "./assets/images/bg-troopers.jpg";
import bgForce from "./assets/images/bg-force.jpg";
import bgMaul from "./assets/images/bg-maul.jpg";

import CharactersPage from "./pages/characters/CharactersPage";
import PlanetsPage from "./pages/planets/PlanetsPage";
import CharacterPage from "./pages/characters/CharacterPage";
import PlanetPage from "./pages/planets/PlanetPage";
import SpeciesPage from "./pages/species/SpeciesPage";
import SpeciePage from "./pages/species/SpeciePage";
import StarshipsPage from "./pages/starships/StarshipsPage";
import StarShipPage from "./pages/starships/StarShipPage";
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import VehiclePage from "./pages/vehicles/VehiclePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <PageWrapper
              children={<Main />}
              style={{
                backgroundImage: `url(${bgMain})`, //мне не нравится как передаю стиль сюда, не придумал как через пропсы это сделать
              }}
            />
          }
        />
        <Route
          path="/films"
          element={
            <PageWrapper
              children={<FilmsPage />}
              style={{
                backgroundImage: `url(${bgFilms})`,
              }}
            />
          }
        />
        <Route
          path="/films/:id"
          element={
            <PageWrapper
              children={<FilmPage />}
              style={{
                backgroundImage: `url(${bgFilm})`,
              }}
            />
          }
        />
        <Route
          path="/people"
          element={
            <PageWrapper
              children={<CharactersPage />}
              style={{
                backgroundImage: `url(${bgForce})`,
              }}
            />
          }
        />
        <Route
          path="/people/:id"
          element={
            <PageWrapper
              children={<CharacterPage />}
              style={{
                backgroundImage: `url(${bgTatooin})`,
              }}
            />
          }
        />
        <Route
          path="/planets"
          element={
            <PageWrapper
              children={<PlanetsPage />}
              style={{
                backgroundImage: `url(${bgPlanets})`,
              }}
            />
          }
        />
        <Route
          path="/planets/:id"
          element={
            <PageWrapper
              children={<PlanetPage />}
              style={{
                backgroundImage: `url(${bgTroopers})`,
              }}
            />
          }
        />
        <Route
          path="/species"
          element={
            <PageWrapper
              children={<SpeciesPage />}
              style={{
                backgroundImage: `url(${bgForce})`,
              }}
            />
          }
        />
        <Route
          path="/species/:id"
          element={
            <PageWrapper
              children={<SpeciePage />}
              style={{
                backgroundImage: `url(${bgTatooin})`,
              }}
            />
          }
        />
        <Route
          path="/starships"
          element={
            <PageWrapper
              children={<StarshipsPage />}
              style={{
                backgroundImage: `url(${bgMaul})`,
              }}
            />
          }
        />
        <Route
          path="/starships/:id"
          element={
            <PageWrapper
              children={<StarShipPage />}
              style={{
                backgroundImage: `url(${bgPlanets})`,
              }}
            />
          }
        />
        <Route
          path="/vehicles"
          element={
            <PageWrapper
              children={<VehiclesPage />}
              style={{
                backgroundImage: `url(${bgVehicles})`,
              }}
            />
          }
        />
        <Route
          path="/vehicles/:id"
          element={
            <PageWrapper
              children={<VehiclePage />}
              style={{
                backgroundImage: `url(${bgStarships})`,
              }}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

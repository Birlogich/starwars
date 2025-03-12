import { createAsyncThunk, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { Entities, LocalEntity } from "../../types";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

type Status = "idle" | "loading" | "completed" | "error";



interface EntityState<T> {
  status: Status;
  list: T[];
  count: number;
  currentPage: number;
  selectedEntity: T | null;
  selectedStatus: Status;
  error: string | null;
  search: string;
}


export const createFetchAllThunk = <T extends Entities>(entityName: string, endpoint: string) =>
  createAsyncThunk<{ count: number; results: T[] }, string, {rejectValue: string}>(
    `@@${entityName}/fetchAll`,
    async ( page : string , { rejectWithValue }) => {
      try {
        let data;
        if(entityName === 'films') {
          data = await client<{ count: number; results: T[] }>(
            `${endpoint}`
          );
        } else {
          data = await client<{ count: number; results: T[] }>(
            `${endpoint}/?page=${page}`
          );
        }
          return {
          count: data?.count ?? 0,
          results: data?.results ?? [],
        };
      }catch {
        return rejectWithValue("Failed to fetch entity data");
      }
    }
  );


  

  export const createFetchByIdThunk = <T extends Entities>(entityName: string, endpoint: string) =>
    createAsyncThunk<T | null, string, { rejectValue: string }>(
      `@@${entityName}/fetchById`,
      async (id: string, { rejectWithValue }) => {
        try {
          const entity = await client<T>(`/${endpoint}/${id}`);
          if (!entity) {
            return rejectWithValue("Entity not found");
          }
  
          const fetchDetails = async (urls?: (string | LocalEntity)[]) => {
            if (!Array.isArray(urls)) return [];
            
            const urlStrings = urls.map((item) =>
              typeof item === "string" ? item : item.url
            );
  
            return Promise.all(
              urlStrings.map(async (url: string) => {
                const { name, url: shortUrl } = await fetchResourceName(url);
                return { name, url: shortUrl };
              })
            );
          };
  
          const speciesData = await fetchDetails(entity.species);
          const charactersData = await fetchDetails(entity.characters);
          const filmsData = await fetchDetails(entity.films);
          const planetsData = await fetchDetails(entity.planets);
          const starshipsData = await fetchDetails(entity.starships);
          const vehiclesData = await fetchDetails(entity.vehicles);
          const residentsData = await fetchDetails(entity.residents);
          const peopleData = await fetchDetails(entity.people);
          const pilotsData = await fetchDetails(entity.pilots);
          const homeworldData = entity.homeworld
            ? await fetchResourceName(
                typeof entity.homeworld === "string" ? entity.homeworld : entity.homeworld.url
              ).then(({ name, url }) => ({
                name,
                url: `/planets/${url}`,
              }))
            : { name: "Unknown", url: "#" };
  
          return {
            ...entity,
            species: speciesData,
            starships: starshipsData,
            vehicles: vehiclesData,
            films: filmsData,
            homeworld: homeworldData,
            characters: charactersData,
            planets: planetsData,
            residents: residentsData,
            people: peopleData,
            pilots: pilotsData
          };
        } catch (error) {
          return rejectWithValue("Failed to fetch entity data");
        }
      }
    );
  

  export const createSearchFetchThunk = <T extends Entities>(
    entityName: string,
    endpoint: string
  ) =>
    createAsyncThunk<{ count: number; results: T[] }, string, { rejectValue: string }>(
      `@@${entityName}/fetchBySearch`,
      async (search: string, { rejectWithValue }) => {
        let data;
        try {
          if(search === "") {
            data = await client<{ count: number; results: T[] }>(`/${endpoint}/?page=1`);
          } else {
            data = await client<{ count: number; results: T[] }>(`/${endpoint}/?search=${search}`);
          }

          return {           
            count: data?.count ?? 0,
            results: data?.results ?? [], 
          };
        } catch {
          return rejectWithValue("Failed to fetch entity data");
        }
      }
    );
  
  


export const createEntitySlice = <T extends Entities>(
  entityName: string,
  fetchAllThunk: ReturnType<typeof createFetchAllThunk<T>>,
  fetchByIdThunk: ReturnType<typeof createFetchByIdThunk<T>>,
  fetchSearchThunk?: ReturnType<typeof createSearchFetchThunk<T>> | null,
) => {
  const initialState: EntityState<T> = {
    status: "idle",
    list: [],
    count: 0,
    currentPage: 1,
    selectedEntity: null,
    selectedStatus: "idle",
    error: null,
    search: "",
  };

  const entitySlice = createSlice({
    name: entityName,
    initialState,
    reducers: {
      setPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
    },
    extraReducers: (builder) => {

      if(fetchAllThunk) {
        builder
        .addCase(fetchAllThunk.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchAllThunk.rejected, (state) => {
          state.status = "error";
        })
        .addCase(fetchAllThunk.fulfilled, (state, action) => {
          state.status = "completed";
          state.list = action.payload.results as Draft<T>[];
          state.count = action.payload.count;
        })
      }

        if(fetchByIdThunk) {
          builder
          .addCase(fetchByIdThunk.pending, (state) => {
            state.selectedStatus = "loading";
          })
          .addCase(fetchByIdThunk.rejected, (state, action) => {
            state.selectedStatus = "error";
            state.error = action.payload as string;
          })
          .addCase(fetchByIdThunk.fulfilled, (state, action) => {
            state.selectedStatus = "completed";
            state.selectedEntity = action.payload as Draft<T> | null;
          })
        }

        if(fetchSearchThunk) {
          builder
          .addCase(fetchSearchThunk.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchSearchThunk.rejected, (state, action) => {
            state.status = "error";
            state.error = action.payload as string;
          })
          .addCase(fetchSearchThunk.fulfilled, (state, action) => {
            state.status = "completed";
            state.list = action.payload.results as Draft<T>[];
            state.count = action.payload.count;
          });
        }
    },
  });

  return entitySlice;
};

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { LocalVehicleType, VehicleType } from "../../types/index";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

type Status = 'idle' | 'loading' | 'completed' | 'error';

export const fetchAllVehicles = createAsyncThunk<{ count: number; results: VehicleType[] }, 
  string
>(
   '@@films/fetchAllVehicles',
  async (page: string) => {
              const data = await client<{ count: number; results: VehicleType[] }>(
                page ? `planets/?page=${page}` : `planets/?page=1`
              );
          
              return {
                count: data?.count ?? 0, 
                results: data?.results ?? [],
              };
            }
)

export const fetchVehicle = createAsyncThunk<LocalVehicleType | null, string, { rejectValue: string }>(
  '@@films/fetchVehicle',
  async (id: string, { rejectWithValue }) => {
    try {
      const vehicle = await client<VehicleType>(`vehicles/${id}`);
      if (!vehicle) {
        return rejectWithValue("Film not found"); 
      }

      const filmsData = await Promise.all(
        vehicle.films.map(async (url) => {
          const { title, url: shortUrl } = await fetchResourceName(url);
          return { title, url: shortUrl };
        })
      );

      const pilotsData = await Promise.all(
        vehicle.pilots.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );


      return {
        ...vehicle,
        films: filmsData,
        pilots: pilotsData,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch planet data");
    }
  }
);

type PlanetSlice = {
   status: Status;
   list: VehicleType[] | undefined;
   count: number,
   currentPage: number,
   selectedVehicle: LocalVehicleType | null;
   selectedStatus: Status;
   error: string | null;
}

const initialState: PlanetSlice = {
   status: "idle",
   list: [],
   count: 0,
   currentPage: 1,
   selectedVehicle: null,
   selectedStatus: "idle",
   error: null,
 };

 const vehicleSlice = createSlice({
   name: "@films",
   initialState,
   reducers: {setPage: (state, action) => {
    state.currentPage = action.payload;
  },},
   extraReducers: (builder) => {
     builder
       .addCase(fetchAllVehicles.pending, (state) => {
         state.status = "loading";
       })
       .addCase(fetchAllVehicles.rejected, (state) => {
         state.status = "error";
       })
       .addCase(fetchAllVehicles.fulfilled, (state, action) => {
         state.status = "completed";
         state.list = action.payload.results;
         state.count = action.payload.count;
       })

       // One Charecter 

       .addCase(fetchVehicle.pending, (state) => {
         state.selectedStatus = "loading";
       })
       .addCase(fetchVehicle.rejected, (state, action) => {
         state.selectedStatus = "error";
         state.error = action.payload as string;
       })
       .addCase(fetchVehicle.fulfilled, (state, action) => {
         state.selectedStatus = "completed";
         state.selectedVehicle = action.payload;
       });
   },

 });
 export const { setPage } = vehicleSlice.actions;
 export const vehiclesSliceReducer = vehicleSlice.reducer;

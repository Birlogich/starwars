import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { LocalVehicleType, VehicleType } from "../../types/index";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

type Status = 'idle' | 'loading' | 'completed' | 'error';

export const fetchAllVehicles = createAsyncThunk(
   '@@films/fetchAllVehicles',
   async () => {
      const data = await client<{ results: VehicleType[] }>("vehicles"); 
      return data?.results ?? [];
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
   selectedVehicle: LocalVehicleType | null;
   selectedStatus: Status;
   error: string | null;
}

const initialState: PlanetSlice = {
   status: "idle",
   list: [],
   selectedVehicle: null,
   selectedStatus: "idle",
   error: null,
 };

 const vehicleSlice = createSlice({
   name: "@films",
   initialState,
   reducers: {},
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
         state.list = action.payload;
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
 
 export const vehiclesSliceReducer = vehicleSlice.reducer;

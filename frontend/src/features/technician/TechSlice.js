
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TechService from "./TechService";

const initialState = {
    techs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

//Display Technicians

export const displayTechs = createAsyncThunk("/tech/displayTech",
        async (user, thunkAPI) => {

            try {

                return TechService.fetchTechnicians();
            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Add Technicians

export const addTechs = createAsyncThunk("/tech/addTech",
        async (user, thunkAPI) => {

            try {

                return await TechService.addTechnician(user);
            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Delete Technicians

export const deleteTech = createAsyncThunk("/tech/deleteTech",
    async (user, thunkAPI) => {

        try {
            return await TechService.deleteTechnician(user);
            
        } catch (error) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)   

export const TechSlice = createSlice({
    name: "tech",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
            builder
                .addCase(displayTechs.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(displayTechs.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.techs = action.payload;
                })
                .addCase(displayTechs.rejected, (state, action) => {
                    state.isError = true;
                    state.isLoading = false;
                    state.message = action.payload;
                })
                .addCase(addTechs.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(addTechs.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.techs = [action.payload, ...state.techs]
                })
                .addCase(addTechs.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(deleteTech.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(deleteTech.fulfilled, (state, action) => {
                    state.isSuccess = true;
                    state.isLoading = false;
                    state.techs = state.techs.filter((tech) => tech._id !== action.payload._id);
                })
                .addCase(deleteTech.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
    }
});

export const {reset} = TechSlice.actions;

export default TechSlice.reducer;

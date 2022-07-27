
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import LogService from "./LogService";

const initialState = {
    logs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: false
};

//Function to display logs

export const displayLogs = createAsyncThunk("/log/displayLogs",
    async (user, thunkAPI) => {

        try {

            return await LogService.fetchLogs();
        } catch (error) {

            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Function to delete log

export const deleteForLog = createAsyncThunk("/log/deleteLog",
    async (user, thunkAPI) => {

        try {
            
            return await LogService.deleteLog(user);
        } catch (error) {

            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Function to add log
export const addForLog = createAsyncThunk("/log/addLog",
        async (user, thunkAPI) => {

            try {

                return await LogService.addLog(user);
            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
)

export const LogSlice = createSlice({
    name: "log",
    initialState,
    reducers: {
        resetFunction: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(displayLogs.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(displayLogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.logs = action.payload
            })
            .addCase(displayLogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteForLog.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteForLog.fulfilled, (state, action) => {
               state.isLoading = false;
               state.isSuccess = true;
               state.logs = state.logs.filter((log) => log._id !== action.payload._id);
            })
            .addCase(deleteForLog.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(addForLog.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addForLog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.logs = [action.payload, ...state.logs]
            })
            .addCase(addForLog.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
    }
});

export const {resetFunction} = LogSlice.actions;

export default LogSlice.reducer;


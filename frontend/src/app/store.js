import { configureStore } from '@reduxjs/toolkit';
import LogReducer from "../features/log/LogSlice";
import TechReducer from "../features/technician/TechSlice";

export const store = configureStore({
  reducer: {
    log: LogReducer,
    tech: TechReducer
  },
});

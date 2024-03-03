import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import videoSlices from "./Slices/videoSlices";

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    video: videoSlices,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

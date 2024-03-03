import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "../../Helpers/AxiosInstance";
import Cookie from "js-cookie";
interface videoState {
  data: Array<Record<string, unknown>>;
}
const getAccessToken = () => Cookie.get("accessToken");
const accessToken = getAccessToken();
const headers = {
  Authorization: `Bearer ${accessToken}`,
};
const initialState: videoState = {
  data: [],
};

export const getAllVideo = createAsyncThunk("/video", async () => {
  try {
    const res = await axiosInstance.get("/video", { headers: headers });
    return res.data;
  } catch (error: any) {
    return error;
  }
});

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVideo.fulfilled, (state, action) => {
      console.log(action.payload);

      state.data = action.payload.data;
    });
  },
});

export const selectVideo = (state: RootState) => state.video;
export default videoSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "../../Helpers/AxiosInstance";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
interface videoState {
  Videodata: Array<Record<string, unknown>>;
}
interface UploadVideoInterface {
  title: string;
  description: string;
  thumbnail: File | "";
  videoFile: File | "";
}
const getAccessToken = () => Cookie.get("accessToken");
const accessToken = getAccessToken();
const headers = {
  Authorization: `Bearer ${accessToken}`,
};
const initialState: videoState = {
  Videodata: [],
};

export const AllVideos = createAsyncThunk("/video", async () => {
  try {
    const res = await axiosInstance.get("/video", { headers: headers });
    return res.data;
  } catch (error: any) {
    return error;
  }
});

export const UploadVideoThunk = createAsyncThunk(
  "/video",
  async (data: UploadVideoInterface, { rejectWithValue }) => {
    try {
      const res = axiosInstance.post("/video", data, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
      toast.promise(res, {
        success: "Video Uploaded Successfully",
        loading: "Wait Video Upoading in Process",
        error: "Error While Uploading Video Please Try again!",
      });
      return (await res).data;
    } catch (error) {
      return error;
    }
  }
);
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AllVideos.fulfilled, (state, action) => {
      console.log(action.payload);

      state.Videodata = action.payload.data;
    });
  },
});

export const selectVideo = (state: RootState) => state.video;
export default videoSlice.reducer;

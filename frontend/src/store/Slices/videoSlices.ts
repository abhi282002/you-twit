import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axiosInstance from "../../Helpers/AxiosInstance";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

interface OneVideoProps {
  _id: string;
  title: string;
  description: string;
  duration: number;
  isLiked: boolean;
  likesCount: number;
  avatar: string;
  isSubscribed: boolean;
  subscriberCount: number;
  username: string;
  thumbnail: string;
  videoFile: string;
  views: number;
}
interface videoState {
  Videodata: Array<Record<string, unknown>>;
  OneVideo: OneVideoProps;
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
  OneVideo: {
    _id: "",
    title: "",
    description: "",
    duration: 0.0,
    isLiked: false,
    likesCount: 0,
    avatar: "",
    isSubscribed: false,
    subscriberCount: 0,
    username: "",
    thumbnail: "",
    videoFile: "",
    views: 0,
  },
};

export const AllVideos = createAsyncThunk("/video", async () => {
  try {
    const res = await axiosInstance.get("/video", { headers: headers });
    return res.data;
  } catch (error: any) {
    return error;
  }
});
interface GetVideoByIdProps {
  id: string | "";
}

export const GetVideoById = createAsyncThunk(
  "video/getVideoById",
  async (id: GetVideoByIdProps, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/video/v/${id.id}`, { headers });

      return res?.data?.data;
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching video by ID:", error);
      throw error; // Rethrow the error to propagate it
    }
  }
);

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
    builder
      .addCase(AllVideos.fulfilled, (state, action) => {
        console.log(action.payload);

        state.Videodata = action.payload.data;
      })
      .addCase(GetVideoById.fulfilled, (state, action) => {
        state.OneVideo._id = action.payload._id;
        state.OneVideo.title = action.payload.title;
        state.OneVideo.description = action.payload.description;
        state.OneVideo.duration = action.payload.duration;
        state.OneVideo.isLiked = action.payload.isLiked;
        state.OneVideo.likesCount = action.payload.likesCount;
        state.OneVideo.avatar = action.payload.owner.avatar;
        state.OneVideo.username = action.payload.owner.username;
        state.OneVideo.likesCount = action.payload.likesCount;
        state.OneVideo.isSubscribed = action.payload.owner.isSubscribed;
        state.OneVideo.subscriberCount = action.payload.owner.subscriberCount;
        state.OneVideo.views = action.payload.views;
        state.OneVideo.thumbnail = action.payload.thumbnail.url;
        state.OneVideo.videoFile = action.payload.videoFile.url;
      });
  },
});

export const selectVideo = (state: RootState) => state.video;
export default videoSlice.reducer;

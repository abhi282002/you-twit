import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";
import { RootState } from "../store";
import axios from "axios";

interface AuthState {
  isLoggedIn: boolean;
  data: Record<string, unknown>;
}
interface SignUpUserData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  avatar: File | null;
}
interface LoginUserData {
  email: string;
  username?: string;
  password: string;
}
interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}
const initialData = localStorage.getItem("data");
const initialIsLoggedIn = localStorage.getItem("isLoggedIn");
const initialState: AuthState = {
  isLoggedIn: initialIsLoggedIn ? JSON.parse(initialIsLoggedIn) : false,
  data: initialData ? JSON.parse(initialData) : {},
};
export const createAccount = createAsyncThunk(
  "users/signup",
  async (data: SignUpUserData, { rejectWithValue }) => {
    try {
      console.log(data);

      const response = axiosInstance.post("/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.promise(response, {
        loading: "Wait! Creating Your Account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed To Create Account! Please Try Again",
      });
      return (await response).data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed To Create Account");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const LoginAccount = createAsyncThunk(
  "/users/login",
  async (data: LoginUserData, { rejectWithValue }) => {
    try {
      console.log(data);
      const res = axiosInstance.post("/users/login", data);
      toast.promise(res, {
        loading: "Wait! Login Your Account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed To Login Account! Please Try Again",
      });
      return (await res).data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const logoutAccount = createAsyncThunk("/users/logout", async () => {
  try {
    const res = await axiosInstance.get("/users/logout");
    return res.data;
  } catch (error: any) {
    return error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAccount.fulfilled, (state, action) => {
        const localStorage = window.localStorage as Storage;
        localStorage.setItem(
          "data",
          JSON.stringify(action?.payload?.data?.user)
        );
        localStorage.setItem("isLoggedIn", "true");
        state.data = action?.payload?.user;
        state.isLoggedIn = true;
      })
      .addCase(logoutAccount.fulfilled, (state, action) => {
        const localStorage = window.localStorage as Storage;
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;

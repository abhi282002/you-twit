import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";
import { RootState } from "@reduxjs/toolkit/query";

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

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  data: JSON.parse(localStorage.getItem("data") || "{}"),
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
        error: "Failed To Create Account",
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
        error: "Failed To Login Account",
      });
      return (await res).data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed To Create Account");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;

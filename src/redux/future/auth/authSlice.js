import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLogin: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getMe = createAsyncThunk("/auth/getMe", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLogin = false;
      state.status = null;
    },
  },
  extraReducers: {
    //Registor
    [registerUser.pending]: (state) => {
      state.isLogin = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLogin = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLogin = false;
    },
    //Login
    [loginUser.pending]: (state) => {
      state.isLogin = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLogin = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLogin = false;
    },
    //Me
    [getMe.pending]: (state) => {
      state.isLogin = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLogin = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLogin = false;
    },
  },
});
export const checkIsAuth = (state) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;
export default authSlice.reducer;

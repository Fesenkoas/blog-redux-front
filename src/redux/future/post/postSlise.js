import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  isLogin: false,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPost = createAsyncThunk("post/getAllPost", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removePost = createAsyncThunk("post/removePost", async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const editPost = createAsyncThunk(
  "post/editPost",
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.params.id}`, updatedPost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    //createPost
    [createPost.pending]: (state) => {
      state.isLogin = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLogin = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.isLogin = false;
    },
    //getAll
    [getAllPost.pending]: (state) => {
      state.isLogin = true;
    },
    [getAllPost.fulfilled]: (state, action) => {
      state.isLogin = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPost.rejected]: (state) => {
      state.isLogin = false;
    },
    //removePost
    [removePost.pending]: (state) => {
      state.isLogin = true;
    },
    [removePost.fulfilled]: (state, action) => {
      state.isLogin = false;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [removePost.rejected]: (state) => {
      state.isLogin = false;
    },
    //editPost
    [editPost.pending]: (state) => {
      state.isLogin = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      state.posts[index] = action.payload;
    },
    [editPost.rejected]: (state) => {
      state.isLogin = false;
    },
  },
});

export default postSlice.reducer;

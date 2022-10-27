import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    comments: [],
    isLogin: false,
  };
  
  export const createComment = createAsyncThunk(
    "comment/createComment",
    async ({postId, comment}) => {
      try {
        const { data } = await axios.post(`/comments/${postId}`, {
            postId,
            comment,
        })
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const getPostComment = createAsyncThunk(
    "comment/getPostComment",
    async (postId) => {
      try {
        const { data } = await axios.get(`/posts/comments/${postId}`)
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );


  export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: {
      //createPost
      [createComment.pending]: (state) => {
        state.isLogin = true;
      },
      [createComment.fulfilled]: (state, action) => {
        state.isLogin = false;
        state.comments.push(action.payload);
      },
      [createComment.rejected]: (state) => {
        state.isLogin = false;
      },
      //getPostComment
      [getPostComment.pending]: (state) => {
        state.isLogin = true;
      },
      [getPostComment.fulfilled]: (state, action) => {
        state.isLogin = false;
        state.comments = action.payload
      },
      [getPostComment.rejected]: (state) => {
        state.isLogin = false;
      },
    },
  });
  
  export default commentSlice.reducer;
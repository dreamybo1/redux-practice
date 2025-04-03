import { RootState } from "@/app/store";
import { postsApi } from "@/shared/api/postsApi";
import { Post } from "@/shared/types/jsonplaceholder";
import { createSlice } from "@reduxjs/toolkit";

interface IState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  posts: [],
  loading: false,
  error: null
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(postsApi.endpoints.getPosts.matchFulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addMatcher(postsApi.endpoints.getPosts.matchPending, state => {
        state.loading = true;
      })
      .addMatcher(postsApi.endpoints.getPosts.matchRejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addMatcher(postsApi.endpoints.editPost.matchFulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addMatcher(postsApi.endpoints.editPost.matchPending, state => {
        state.loading = true;
      })
      .addMatcher(postsApi.endpoints.editPost.matchRejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addMatcher(postsApi.endpoints.deletePost.matchFulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg.originalArgs;
        state.posts = state.posts.filter(post => post.id !== id);
      })
      .addMatcher(postsApi.endpoints.deletePost.matchPending, state => {
        state.loading = true;
      })
      .addMatcher(postsApi.endpoints.deletePost.matchRejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  }
});

export const postsSelector = (state: RootState) => state.posts;
export default postsSlice.reducer;

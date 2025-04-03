import { postsApi } from "@/shared/api/postsApi";
import userReducer from "@/shared/slices/posts/postsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    posts: userReducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

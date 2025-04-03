import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../types/jsonplaceholder";

export const postsApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts"
    }),
    editPost: builder.mutation<Post, Partial<Post>>({
      query: post => ({
        url: `posts/${post.id}`,
        method: "PUT",
        body: post
      })
    }),
    deletePost: builder.mutation<string, string>({
      query: id => ({
        url: `posts/${id}`,
        method: "DELETE"
      })
    }),
    createPost: builder.mutation<Post, Post>({
        query: post => ({
          url: "posts",
          method: "POST",
          body: post
        }),
    })
  })
});

export const { useGetPostsQuery } = postsApi;
export const { useEditPostMutation } = postsApi;
export const { useDeletePostMutation } = postsApi;
export const { useCreatePostMutation } = postsApi;
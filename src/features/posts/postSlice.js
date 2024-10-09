
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const res = await axios.get(`${BASE_URL}/posts`)
    return res.data;
})

export const removePost = createAsyncThunk("posts/removePost", async (id) => {
    const res = await axios.delete(`${BASE_URL}/posts/${id}`)
    return id;
})

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
    const res = await axios.post(`${BASE_URL}/posts/`, post)
    return res.data;
})

export const updatePost = createAsyncThunk("posts/updatePost", async ({id, post}) => {
    const res = await axios.put(`${BASE_URL}/posts/${id}`, post)
    return res.data;
})

const postSlice = createSlice({
    name: "posts",
    initialState: {
        isLoading: false,
        posts: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
            // Get post
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.posts = action.payload,
                    state.error = null
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false,
                    state.error = action.error.message
            })
            // Remove Post
            .addCase(removePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((post) => {
                    return post.id !== action.payload
                })
            })
            // Create Post
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
        // Update Post
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex((post)=> {
                    return post.id === action.payload.id
                })
                state.posts[index] = action.payload
            })

    }
});

export default postSlice.reducer;
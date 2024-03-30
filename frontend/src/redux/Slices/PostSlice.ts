import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, User } from "../../utils/GlobalInterfaces";
import axios from "axios";




export interface PostSliceState {
    loading: boolean;
    error: boolean;
    currentPost: Post | undefined;
    posts: Post[]
}


interface UpdatePostPayload {
    name:string;
    value:string|number|boolean
}

interface CreatePostBody{
    content:string;
    author:User;
    replies: Post[];
    scheduled: boolean;
    scheduledDate: Date | undefined;
    audience: 'EVERYONE' | 'CIRCLE';
    replyRestriction: 'EVERYONE' | 'FOLLOW' |'CIRCLE' | 'MENTION';
    token: string

}

const initialState: PostSliceState = {
    loading: false,
    error: false,
    currentPost: undefined,
    posts: []
}


export const createPost = createAsyncThunk("post/create", async function(body:CreatePostBody, thunkAPI) {

    try {

        let post = {
            content: body.content,
            author: body.author,
            replies: body.replies,
            scheduled: body.scheduled,
            scheduledDate: body.scheduledDate,
            audience: body.audience,
            replyRestriction: body.replyRestriction,
        }

        console.log(post);

        const req = await axios.post('http://localhost:8000/posts/', post, {
            headers: {
                "Authorization": `Bearer ${body.token}`
            }
        });

        return req.data;
        
    } catch (error) {
        
        return thunkAPI.rejectWithValue(error);
    }

})


export const PostSlice = createSlice({
    name: "post",
    initialState:initialState,
    
    reducers:{
        initializeCurrentPost: (state, action: PayloadAction<Post>) => {

            if(!state.currentPost) {
                state.currentPost = action.payload;
            } else{

                state = {
                    ...state,
                    currentPost: action.payload
                }
            }

            return state;
    },

    updateCurrentPost: (state, action: PayloadAction<UpdatePostPayload>) => {

        if (state.currentPost) {

            state.currentPost = {
                ...state.currentPost,
                [action.payload.name]: action.payload.value
            }
            
        }

        return state;

        }
    
},

extraReducers: (builder) => {

    builder.addCase(createPost.pending, (state, action) => {

        state = {
            ...state,
            loading: true
        }

        return state;
    })

    builder.addCase(createPost.fulfilled, (state, action) => {

        let post:Post = action.payload

        console.log(action.payload);

        state = {
            ...state,
            posts: [post, ...state.posts],
            loading: false,
            error: false,
            currentPost: undefined
        }

        return state;
    })

    builder.addCase(createPost.rejected, (state, action) => {

        state = {
            ...state,
            error: true,
        }

        return state;
    })

}



});


export const {initializeCurrentPost, updateCurrentPost} = PostSlice.actions;
export default PostSlice.reducer;
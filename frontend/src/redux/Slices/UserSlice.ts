import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/GlobalInterfaces";
import axios from "axios";


interface UserSliceState {
    loggedIn: User | undefined;
    fromRegister: boolean;
    error: boolean;
}

interface LoginBody{
    username: string;
    password: string;
}

const initialState: UserSliceState = {
    loggedIn: undefined,
    fromRegister: false,
    error: false,
};


export const loginUser = createAsyncThunk("user/login", async function(body: LoginBody, thunkAPI){

    try {

        const req = await axios.post('http://localhost:8000/auth/login', body);
        return req.data;
        
    } catch (error) {
        
        thunkAPI.rejectWithValue(error);
    }
})

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setFromRegister(state, action: PayloadAction<boolean>) {

            state = {
                ...state,
                fromRegister: action.payload
            }

            return state;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(loginUser.pending, (state, action) => {

    });

        builder.addCase(loginUser.fulfilled, (state, action) => {
        
            state = {
                ...state,
                loggedIn: {
                    userId: action.payload.user.userId,
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    email: action.payload.user.email,
                    username: action.payload.user.username,
                    phone: action.payload.user.phone,
                    dateOfBirth: action.payload.user.dateOfBirth,
                    bio: action.payload.user.bio,
                    nickname: action.payload.user.nickname,
                    profilePicture: action.payload.user.profilePicture,
                    bannerPicture: action.payload.user.bannerPicture
                }
            }

            return state;
    });

        builder.addCase(loginUser.rejected, (state, action) => {
        
    });

}

});






export const {setFromRegister} = UserSlice.actions;

export default UserSlice.reducer
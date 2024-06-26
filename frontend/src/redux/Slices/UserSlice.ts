import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/GlobalInterfaces";
import axios from "axios";


interface UserSliceState {
    loggedIn: User | undefined;
    username: string;
    token: string;
    fromRegister: boolean;
    error: boolean;
}

interface LoginBody{
    username: string;
    password: string;
}

interface VerifyUserBody {
    email: string;
    phone: string;
    username: string;
}

const initialState: UserSliceState = {
    loggedIn: undefined,
    username:"",
    token:"",
    fromRegister: false,
    error: false,
};


export const loginUser = createAsyncThunk("user/login", async function(body: LoginBody, thunkAPI){

    try {

        const req = await axios.post('http://localhost:8000/auth/login', body);
        return req.data;
        
    } catch (error) {
        
       return thunkAPI.rejectWithValue(error);
    }
});

export const verifyUsername = createAsyncThunk("user/username", async function(body: VerifyUserBody, thunkAPI){

    try{

        const req = await axios.post('http://localhost:8000/auth/find', body);

        return req.data;

    } catch(error){

       return thunkAPI.rejectWithValue(error);
    }
    
})

export const getUserByToken = createAsyncThunk("user/get", async function(token: string, thunkAPI){

    try{
        const req = await axios.get(`http://localhost:8000/user/verify`,
        {headers:{
            'Authorization': `Bearer ${token}`
        }
    });

    return req.data;

    }catch(error){

        return thunkAPI.rejectWithValue(error);
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
        },

        resetUsername(state, action: PayloadAction<void>) {
            
            state ={
                ...state,
                username: ""
            };

            return state;
        },

        setToken(state, action: PayloadAction<string>) {
            
            state = {
                ...state,
                token: action.payload
            }

            return state;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(loginUser.pending, (state, action) => {

            state = {
                ...state,
                error: false
            };

            return state;
         });

        builder.addCase(verifyUsername.pending, (state, action) => {
            
            state = {
                ...state,
                error: false
            };
            return state;
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
                },
                token: action.payload.token
            }

            return state;
         });

         builder.addCase(verifyUsername.fulfilled, (state, action) => {

            state = {
                ...state,
                username: action.payload
            };
            
            return state;
        });


        builder.addCase(loginUser.rejected, (state, action) => {

            state = {
                ...state,
                error: true
            };

            return state;
        });

        builder.addCase(verifyUsername.rejected, (state, action) => {

            state = {
                ...state,
                error: true
            };

            return state;
        });

        builder.addCase(getUserByToken.pending, (state, action) => {
            state = {
                ...state,
                error: false
            }

            return state;
        })

        builder.addCase(getUserByToken.fulfilled, (state, action) => {

            console.log(action.payload);

            state = {
                ...state,
                loggedIn: action.payload,
                username: action.payload.username
            }

            return state;
            
        })

        builder.addCase(getUserByToken.rejected, (state, action) => {

            state = { 
                ...state,
                error: true
              }

            return state;
        })

}

});






export const {setFromRegister,resetUsername, setToken} = UserSlice.actions;

export default UserSlice.reducer
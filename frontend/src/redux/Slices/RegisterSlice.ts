import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dob } from "../../utils/GlobalInterfaces";
import axios from "axios";




interface RegisterSliceState {
    loading: boolean;
    error: boolean;
    firstName: string;
    firstNameValid: boolean;
    lastName: string;
    lastNameValid:boolean;
    email: string;
    emailValid: boolean;
    dob: Dob;
    dobValid: boolean;
    step: number;

}

interface UpdatePayload {
    name: string;
    value: string | number | boolean;
}

const initialState:RegisterSliceState = {
    loading: false,
    error: false,
    firstName: '',
    firstNameValid: false,
    lastName: '',
    lastNameValid: false,
    email: '',
    emailValid: false,
    dob: {
        month: 0,
        day: 0,
        year: 0
    },
    dobValid: false,
    step: 1,
   
}

interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
}


export const registerUser = createAsyncThunk( "register/register", async(user:RegisterUser, thunkAPI) => {

    try {
        
        const req = await axios.post("http://localhost:8000/auth/register", user);

        return await req.data;

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }
    
})





export const RegisterSlice =  createSlice({
    name: 'register',
    initialState,

    reducers: {
        updateRegister: (state, action: PayloadAction<UpdatePayload>) => {

            const {name, value} = action.payload
            
            if (name === "month" || name === "day" || name === "year") {
                let dob = state.dob;  

                dob = {
                    ...dob,
                    [name]: value
                }

                state = {
                    ...state,
                    dob
                }
             } else {
                state = {
                    ...state,
                    [name]: value
                }
             }
             
             console.log("Updating the global register state: ", state)
             
             return state;
        },

        incrementStep(state){
            state.step = state.step + 1;
            return state;
        },
        decremetnStep(state){
            if (state.step === 1 || state.step === 4 || state.step >= 6) {
                return state;

            } else {
                state.step = state.step - 1;
                return state;
            }
        }

    },
    
    extraReducers: (builder) => {

        builder.addCase(registerUser.pending, (state, action) => {
            
            state.loading = true;
            return state;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            
            state.loading = false;
            state.error = false;
            state.step++;

            return state;
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            
            state.loading = false;
            state.error = true;

            return state;
        });

    }
});


export const {updateRegister, incrementStep, decremetnStep} = RegisterSlice.actions;
export default RegisterSlice.reducer;
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
    username: string;
    phoneNumber: string;
}

interface UpdatePayload {
    name: string;
    value: string | number | boolean;
}
interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
}


interface UpdatePhone {
    username: string;
    phone: string;
}

interface verifyCode {
    username: string;
    code: string;
}

interface uppdatePassword {
    username: string;
    password: string;
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
    username: '',
    phoneNumber: ''
}






export const registerUser = createAsyncThunk( "register/register", async function (user:RegisterUser, thunkAPI){

    try {

        
        
        const req = await axios.post("http://localhost:8000/auth/register", user);
        
        console.log("the returned user object from the thunk: ", await req.data);
        
        return await req.data;

    } catch (error) {

        return thunkAPI.rejectWithValue(error);
    }
    
});


export const updateUserPhone = createAsyncThunk( "register/phone", async function(body:UpdatePhone, thunkAPI){

    try {
        
        const req = await axios.put("http://localhost:8000/auth/update/phone", body);
        
        const email = await axios.post('http://localhost:8000/auth/email/code', {username:body.username});

    }catch (error) {
        
        return thunkAPI.rejectWithValue(error);
    }
    
});


export const resendEmail = createAsyncThunk( "register/resend", async function(username:string, thunkAPI){
    try {
        
        const req = await axios.post('http://localhost:8000/auth/email/code', {username});
        
    }catch (error) {
        
        return thunkAPI.rejectWithValue(error);
    } 
});

export const sendVerificationCode = createAsyncThunk( "register/verify", async function(body:verifyCode, thunkAPI){

    try {
        
        const req = await axios.post('http://localhost:8000/auth/email/verify', body);

        return req.data;

    }catch (error) {
        
        return thunkAPI.rejectWithValue(error);
    }
});


export const updateUserPassword = createAsyncThunk( "register/password", async function(body:uppdatePassword, thunkAPI){
    
    try {
        
        const req = await axios.put("http://localhost:8000/auth/update/password", body);
        
    }catch (error) {
        
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
            
            state = {
                ...state,
                loading: true,
                error: false
            }

            return state;
        });

        builder.addCase(updateUserPhone.pending, (state, action) => {
            
            state ={
                ...state,
                loading: true,
                error: false
            }

            return state;
        });

        builder.addCase(resendEmail.pending, (state, action) => {
            
            state = {
                ...state,
                loading: true,
                error: false,
            }

            return state;
        });

        builder.addCase(sendVerificationCode.pending, (state, action) => {
            
            state = {
                ...state,
                loading: true,
                error: false,
            }

            return state;
        });


        builder.addCase(updateUserPassword.pending, (state, action) => {
            
            state = {
                ...state,
                loading: true,
                error: false,
            }

            return state;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {

            let nextStep = state.step + 1;

            state = {
                ...state,
                username: action.payload.username,
                loading: false,
                error: false,
                step: nextStep
            }

            return state;
        });

        builder.addCase(updateUserPhone.fulfilled, (state, action) => {
            
            let nextStep = state.step + 1;

            state = {
                ...state,
                loading: false,
                error: false,
                step: nextStep
            }

            return state;
        });

        builder.addCase(resendEmail.fulfilled, (state, action) => {
            
            let nextStep = state.step + 1;

            state = {
                ...state,
                loading: false,
                error: false,
            }

            return state;
        }); 

        builder.addCase(sendVerificationCode.fulfilled, (state, action) => {
         
            let nextStep = state.step + 1;

            state = {
                ...state,
                loading: false,
                error: false,
                step: nextStep
            }

            return state;
        });


        builder.addCase(updateUserPassword.fulfilled, (state, action) => {
            
            let nextStep = state.step + 1;

            state = {
                ...state,
                loading: false,
                error: false
            }

            return state;
        }); {}

        builder.addCase(registerUser.rejected, (state, action) => {
            
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });


        builder.addCase(updateUserPhone.rejected, (state, action) => {
            
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });

        builder.addCase(resendEmail.rejected, (state, action) => {

            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
            
        });


        builder.addCase(sendVerificationCode.rejected, (state, action) => {
            
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });

        builder.addCase(updateUserPassword.rejected, (state, action) => {
            
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });

    }
});


export const {updateRegister, incrementStep, decremetnStep} = RegisterSlice.actions;
export default RegisterSlice.reducer;
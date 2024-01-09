import React, { useState } from 'react'
import {VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material'

import ValidatedTextInput from '../../../../components/ValidatedInput/ValidatedTextInput';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';

import "./RegisterFormSix.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { updateUserPassword } from '../../../../redux/Slices/RegisterSlice';

export function RegisterFormSix(): React.ReactElement {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const[active, setActive] = useState<boolean>(false);
    const[password, setPassword] = useState<string>("");


    function handleChange(e: React.ChangeEvent<HTMLInputElement>):void {

        setPassword(e.target.value);
    }

    function toggleView():void {

        setActive(!active);
    }

    function sendPassword():void {

        dispatch(updateUserPassword({username: state.username, password}));
    }

  return (
    <div className='reg-step-six-container'>
        <div className='reg-step-six-content'>

            <h1>You need a password</h1>
            <p>Make sure it's 8 characters or more.</p>

            <div className='reg-step-six-password'>

                <ValidatedTextInput
                 valid={true} 
                 name={"password"}
                 label={"Password" }
                 changeValue={handleChange}
                 attributes={{
                    minLength: 8,
                    type: active ? "text" : "password"
                 }} />

                 <div className='reg-step-six-icon' onClick={toggleView}>

                    {active ? <VisibilityOffOutlined sx={{fontSize: "24px",}} /> : 
                    <VisibilityOutlined sx={{fontSize: "24px"}}/>}

                 </div>

        

            </div>
            
        </div>

        <StyledNextButton active={password.length >= 8} 
        disabled={!(password.length >= 8)} 
        onClick={sendPassword} color={'black'}>
                 Next
        </StyledNextButton>

    </div>
  )
}

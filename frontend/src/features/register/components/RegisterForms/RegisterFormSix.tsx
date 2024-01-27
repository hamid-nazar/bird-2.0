import React, { useEffect, useState } from 'react'

import {VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import ValidatedTextInput from '../../../../components/ValidatedInput/ValidatedTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { updateRegister } from '../../../../redux/Slices/RegisterSlice';
import { useNavigate } from 'react-router-dom';

import "./RegisterForm.css"
import '../../../../assets/global.css'
import { loginUser, setFromRegister } from '../../../../redux/Slices/UserSlice';

export function RegisterFormSix(): React.ReactElement {

    const state = useSelector((state:RootState) => state);
    const dispatch:AppDispatch = useDispatch();

    const[active, setActive] = useState<boolean>(false);


    const navigate = useNavigate();


    function handleChange(e: React.ChangeEvent<HTMLInputElement>):void {

        dispatch(updateRegister({ name: "password", value: e.target.value }));
    }

    function toggleView():void {

        setActive(!active);
    }

    useEffect(function(){

        if (state.user.loggedIn) {
            
            navigate("/home");

            return function(){  }
        }

        if (state.user.fromRegister) {
            
            // we are ready to dispatch the login

            dispatch(loginUser({username: state.register.username, password: state.register.password}));
            
            return;
        }

        if (state.register.login) {

            // store user info into the local storage, that way we can load the user into user slice when hit 
            // the feed page
            //navigate("/home");
            // set the dispatch to set user.fromRegister 
            
            dispatch(setFromRegister(true))
            
        }

    }, [state.register.login, state.user.loggedIn, state.user.fromRegister]);


  return (
    <div className='register-container'>
        <div className='register-content'>

            <h1 className='register-header-2'>You need a password</h1>
            <p className='register-text color-gray'>Make sure it's 8 characters or more.</p>

            <div className='register-six-password'>

                <ValidatedTextInput
                 valid={true} 
                 name={"password"}
                 label={"Password" }
                 changeValue={handleChange}
                 attributes={{
                    minLength: 8,
                    type: active ? "text" : "password"
                 }} />

                 <div className='register-six-icon' onClick={toggleView}>

                    {active ? <VisibilityOffOutlined sx={{fontSize: "24px",}} /> : 
                    <VisibilityOutlined sx={{fontSize: "24px"}}/>}

                 </div>

        

            </div>
            
        </div>
    </div>
  )
}

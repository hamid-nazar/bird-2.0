import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';

import { VisibilityOffOutlined } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';


import { DisabledValidatedInput } from '../../../components/ValidatedInput/DisabledValidatedInput';
import ValidatedTextInput from '../../../components/ValidatedInput/ValidatedTextInput';

import './LoginForms.css';

interface LoginFromTwoProps {
    setPassword(e: React.ChangeEvent<HTMLInputElement>):void;
}



export function LoginFromTwo({setPassword}:LoginFromTwoProps): React.ReactElement {

    const state = useSelector((state:RootState) => state.user);

    const[active, setActive] = useState<boolean>(false);
    

    function toggleView(){

        setActive(!active);
    }

  return (
    <div className='login-form-two-container'>

        <div className='login-form-content'>

            <h1 className='login-form-header'> Enter your password </h1>

            <DisabledValidatedInput label={"Username"} value={state.username}/>

            <div className='login-form-two-password'>

                <ValidatedTextInput
                    valid={!state.error}
                    label={"Password"}
                    name={"password"}
                    changeValue={setPassword}
                    attributes={{minLength:8, type: active ? "text" :"password"}}
                />

                <div className='login-form-two-password-icon' onClick={toggleView}>

                    {active ? <VisibilityOff sx={{fontSize: "24px"}} /> : <VisibilityOffOutlined sx={{fontSize: "24px"}}/>}

                </div>

                {state.error? <p className='login-form-error color-red'> Password is incorrect </p> : <></>}

                <p className='login-form-forgot color-blue'> Forgot Password? </p>

            </div>
        </div>
    </div>
  )
}

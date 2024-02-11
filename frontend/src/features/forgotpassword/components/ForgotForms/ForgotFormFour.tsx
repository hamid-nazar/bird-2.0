import React, { useState } from 'react'

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlineIcon from '@mui/icons-material/VisibilityOffOutlined';

import "./ForgotForm.css";
import "./../../../../assets/global.css";
import ValidatedTextInput from '../../../../components/ValidatedInput/ValidatedTextInput';


interface ForgotFormFourProps {
    updatePassword(e: React.ChangeEvent<HTMLInputElement>): void;
    matching: boolean;
}



export function ForgotFormFour({updatePassword, matching}: ForgotFormFourProps): React.ReactElement {

    const[passwordToggle, passwordToggleSet] = useState<boolean>(false);
    const[confirmToggle, setConfirmToggle] = useState<boolean>(false);


    function togglePasswrod(): void {

        passwordToggleSet(!passwordToggle);
    }

    function toggleConfirm(): void {

        setConfirmToggle(!confirmToggle);
    }

  return (
    <div className='forgot-form-container'>

        <h1 className='forgot-form-header'> Choose a new password</h1>

        <p className="forgot-form-text color-gray">
                Make sure your new password is 8 characters or more. Try including numbers, letters, and punctuation marks for a <span className='link color-blue'>strong password</span>.
        </p>

        <p className="forgot-form-text color-gray">
                You'll be logged out of all active Fwitter sessions after your password is changed.
        </p>

        <div className='forgot-form-four-password-wrapper'>

            <ValidatedTextInput
                valid={true}
                name={'password'}
                label={'Password'}
                attributes={{
                    minLength: 8,
                    type:passwordToggle ? "text" : "password"}}
                changeValue={updatePassword}
                />

                <div className='forgot-form-four-password-icon' onClick={togglePasswrod}>
                    {passwordToggle ? <VisibilityOutlinedIcon sx={{fontSize: "24px"}} /> : <VisibilityOffOutlineIcon sx={{fontSize: "24px"}} />}
                </div>

        </div>

        <div className='forgot-form-four-password-wrapper'>

        <ValidatedTextInput
            valid={matching}
            name={'confirm'}
            label={'Password'}
            attributes={{
                minLength: 8,
                type:confirmToggle ? "text" : "password"}}
            changeValue={updatePassword}
            />

            <div className='forgot-form-four-password-icon' onClick={toggleConfirm}>
                {confirmToggle ? <VisibilityOutlinedIcon sx={{fontSize: "24px"}} /> : <VisibilityOffOutlineIcon sx={{fontSize: "24px"}} />}
            </div>

        </div>

        {!matching ? <p className='login-form-error color-red'>Passwords must match</p> : <></>}

    </div>
  )
}

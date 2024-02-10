import React from 'react'

import "./ForgotForm.css";
import "./../../../../assets/global.css";
import ValidatedTextInput from '../../../../components/ValidatedInput/ValidatedTextInput';


interface ForgotFormOneProps {
    setCredential(name: string): void;
    error: boolean;
}

export function ForgotFormOne({ setCredential, error}:ForgotFormOneProps): React.ReactElement {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        setCredential(e.target.value);
    }

  return (
    <div className='forgot-form-container'>
        <h1 className='forgot-form-header'>
            Find your Fwitter account
        </h1>

        <p className='forgot-form-text color-gray'>
            Enter you email, phone number, or username assocaited with you account to change your password.
        </p>

        <ValidatedTextInput
        valid={true}
        name={'forgot'}
        label={'Email, phone number, or username'}
        changeValue={handleChange}
        />

        {error ? <p className=' color-red forgot-error'>User not found</p> : <></>}

    </div>
  )
}
 
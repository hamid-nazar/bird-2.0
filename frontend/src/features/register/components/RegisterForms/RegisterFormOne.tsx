import React from 'react'

import {RegisterDateInput} from '../RegisterDateInput/RegisterDateInput';
import RegisterNameInputs from '../RegisterNameInput/RegisterNameInputs';
import RegisterEmailInput from '../RegisterEmailInput/RegisterEmailInput';
import { RootState } from '../../../../redux/Store';
import { useSelector } from 'react-redux';

import "./RegisterForm.css"
import '../../../../assets/global.css'

export function RegisterFormOne(): React.ReactElement {

  const registerState = useSelector((state:RootState) => state.register);

  return (
    <div className='register-container'>
        
        <div className='register-content'>

          <h1 className='register-header'>Create your account</h1>

          <RegisterNameInputs firstName={registerState.firstName} lastName={registerState.lastName}/>

          <RegisterEmailInput email={registerState.email}/>

          <div className='register-one-dob-wrapper'>
              <h4 className='register-h4'>Date of Birth</h4>
              <span className='register-text-sm color-gray'>
              This will not be shown publicly.
              Confirm your own age, even if this account is for a business, pet, or something else.
              </span>
          </div>

          <RegisterDateInput date={registerState.dob}/>

        </div>

        </div>
  )
}

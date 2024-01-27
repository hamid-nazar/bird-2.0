import React from 'react'

import { ValidatedDisplay } from '../../../../components/ValidatedInput/ValidatedDisplay'
import { RootState } from '../../../../redux/Store'
import { useSelector } from 'react-redux';
import { stringifyDate } from '../../../../utils/DateUtils';

import "./RegisterForm.css"
import '../../../../assets/global.css'


export  function RegisterFormThree() {

    const state = useSelector((state:RootState) => state.register);
  

  return (
    <div className='register-container'>
        <div className='register-content'>

            <h1 className='register-header'>Create your account</h1>

            <div className='register-three-value-wrapper'>
              <ValidatedDisplay label={"Name"} value={`${state.firstName} ${state.lastName}`}/>
            </div>

            <div className='register-three-value-wrapper'>
                <ValidatedDisplay label={"Email"} value={state.email}/>
                
                {state.error === true? 
                <p className='register-error color-red'>
                   The email you specified is in use, please use a different one.
                </p>: <></>}
                
            </div>

            <div className={ state.error?'register-three-value-wrapper': 'register-three-bottom'}>
              <ValidatedDisplay label={"Birthday"} value={stringifyDate(state.dob)}/>
            </div>
            
            <p className='register-text-sm'>
                By signing up you agree to our <span className='register-link color-blue'>Terms of Service</span> and
                <span className='register-link color-blue'> Privacy Policy</span>, inluding 
                <span className='register-link color-blue'> Cookie Use</span>. Fwitter may use 
                your contact information, including your email address and phone number
                for purposes outlined in our Privacy Policy, like keeping your account 
                secure and personalizing our services inlcuding ads.
                <span className='register-link color-blue'> Learn more</span>.
                Others you will be able to find you by email or phone number unless you choose otherwise
                <span className='register-link color-blue'> here</span>.
            </p>
        </div>

    </div>
  )
}

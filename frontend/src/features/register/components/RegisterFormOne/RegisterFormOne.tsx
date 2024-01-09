import React, { useEffect, useState } from 'react'

import "./RegisterFormOne.css"
import {RegisterDateInput} from '../RegisterDateInput/RegisterDateInput';
import RegisterNameInputs from '../RegisterNameInput/RegisterNameInputs';
import RegisterEmailInput from '../RegisterEmailInput/RegisterEmailInput';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { incrementStep, updateRegister } from '../../../../redux/Slices/RegisterSlice' ;



export function RegisterFormOne(): React.ReactElement {

  const registerState = useSelector((state:RootState) => state.register);
  const dispatch:AppDispatch = useDispatch();

  const[buttonActive, setButtonActive] = useState<boolean>(false);

 function nextPage() {
  
    dispatch(updateRegister({name:"error", value:"false"}));

   dispatch(incrementStep());
 }

  useEffect(function(){

    if (registerState.dobValid && 
      registerState.emailValid &&
       registerState.firstNameValid && 
       registerState.lastNameValid) {
      console.log("Date state valid: ", registerState.dobValid);
      console.log("Button abled: ", buttonActive);
      setButtonActive(true);
      
    } else {
      
      setButtonActive(false);
    }
   
  },[registerState])



  return (
    <div className='reg-step-one-container'>
        
        <div className='reg-step-one-content'>

          <h1 className='reg-step-one-header'>Create your account</h1>

          <RegisterNameInputs firstName={registerState.firstName} lastName={registerState.lastName}/>

          <RegisterEmailInput email={registerState.email}/>

          <div className='reg-step-one-dob-disclaimer'>
              <p className='reg-step-one-dob-header'>Date of Birth</p>
              <span className='reg-step-one-dob-text'>
              This will not be shown publicly.
              Confirm your own age, even if this account is for a business, pet, or something else.
              </span>
          </div>

          <RegisterDateInput date={registerState.dob}/>

        </div>

        <StyledNextButton 
          disabled={!buttonActive}
          color={"black" }
          active={buttonActive}
          onClick={nextPage}>
            Next
        </StyledNextButton>

        </div>
  )
}

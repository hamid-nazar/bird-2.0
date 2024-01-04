import React, { ChangeEvent, useEffect, useState } from 'react'

import "./RegisterFormOne.css"
import {RegisterDateInput} from '../RegisterDateInput/RegisterDateInput';
import RegisterNameInputs from '../RegisterNameInput/RegisterNameInputs';
import RegisterEmailInput from '../RegisterEmailInput/RegisterEmailInput';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { incrementStep } from '../../../../redux/Slices/RegisterSlice';


interface FormOneState{
  firstName:string;
  lastName: string;
  email: string;
  dateOfBirth: string;

}

export function RegisterFormOne(): React.ReactElement {

  const registerState = useSelector((state:RootState) => state.register);
  const dispatch:AppDispatch = useDispatch();

  const[buttonActive, setButtonActive] = useState<boolean>(false);

 function nextPage() {
   dispatch(incrementStep());
 }

  useEffect(function(){

    if (registerState.dobValid && 
      registerState.emailValid &&
       registerState.firstNameValid && 
       registerState.lastNameValid) {
      
      setButtonActive(true);
      
    } else {
      
      setButtonActive(false);
    }
   
  },[registerState])



  return (
    <div className='reg-step-one-container'>
        
        <div className='reg-step-one-content'>

          <RegisterNameInputs firstName={registerState.firstName} lastName={registerState.lastName}/>

          <RegisterEmailInput email={registerState.email}/>

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

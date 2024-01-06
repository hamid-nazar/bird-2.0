import React from 'react'

import "./RegisterFormTwo.css"
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/Store';
import { incrementStep } from '../../../../redux/Slices/RegisterSlice';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';
import {Checkbox} from '../../../../components/Checkbox/Checkbox';

export function RegisterFormTwo():React.ReactElement {

    const dispatch:AppDispatch = useDispatch();

    function nextStep(){
        dispatch(incrementStep());
    }



  return (
    <div className='reg-step-two-container'>

            <div className='reg-step-two-content'>

                    <h1 className='reg-step-two-header'> 
                         Customize your experience
                    </h1>

                    <h3 className='regstep-two-sub-header'>
                        Track where you see Fwitter content across the web.
                    </h3>

                <div className='reg-step-two-toggle-group'>

                    <p className="reg-step-two-privacy">
                        Fwitter uses this data to personalize your experience. 
                        This web browsing history will never be stored with your name, email, or phone number.
                    </p>
                    
                    <Checkbox/>

                </div>

                    <p className='reg-step-two-policy'>
                        By signing up, you agree to our 
                        <span className="reg-step-two-link"> Terms</span>, 
                        <span className="reg-step-two-link">Privacy Policy</span> and 
                        <span className="reg-step-two-link"> Cookie use</span>. 
                        Fwitter may use your contact information, including your
                        email address and phone number for the purpose outline in our Privay Policy. 
                        <span className="reg-step-two-link"> Learn more</span>.
                    </p>

        </div>

        <StyledNextButton active={true} color={"black"} onClick={nextStep}>
            Next
        </StyledNextButton>

    </div>
  )
}

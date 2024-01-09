import React, { useEffect, useState } from 'react'
import { Checkbox } from '../../../../components/Checkbox/Checkbox'
import { DropDown } from '../../../../components/DropDown/DropDown'
import ValidatedTextInput from '../../../../components/ValidatedInput/ValidatedTextInput'
import { countryCodeDropDown } from '../../utils/RegisterModalUtils'
import { validatePhone } from '../../../../services/validators'
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/Store'
import { updateRegister, updateUserPhone } from '../../../../redux/Slices/RegisterSlice'

import "./RegisterFormFour.css"



export function RegisterFormFour(): React.ReactElement {

    const state = useSelector((state:RootState) => state.register);
 

    const[phoneCode, setPhoneCode] = useState<string>("+1");
    const[phoneNumber, setPhoneNumber] = useState<string>("");
    const[validNumber, setValidNumber] = useState<boolean>(true);

    const dispatch:AppDispatch = useDispatch();


    function changeCode(e:React.ChangeEvent<HTMLSelectElement>):void {

        setPhoneCode(e.target.value.split(" ")[0]);
    }

    function changePhoneNumber(e:React.ChangeEvent<HTMLInputElement>):void {

        setPhoneNumber(e.target.value);

        updateRegister({name: "phoneNumberValid", value: e.target.value});
    }

    function sendPhoneNumber():void {
        
        dispatch(updateUserPhone({username: state.username, phone: `${phoneCode}${phoneNumber}`}));
    }

    useEffect(function(){
        
        if (phoneNumber) {

            setValidNumber(validatePhone(phoneNumber));
        } 

    },[phoneCode, phoneNumber]);


  return (
    <div className='reg-step-four-container'>

        <div className='reg-step-four-content'>
            
            <h1>Add a phone number</h1>
            <p className='reg-step-four-subhead'>
                Enter a phone number you would like to associate with Fwitter your account.
                You won't get a verification code sendt here.
            </p>

            <div className='reg-step-four-input'>
                <DropDown 
                content={countryCodeDropDown} 
                change={changeCode} 
                label={'Country Code'}
                defaultValue={"United States +1"}
                />

                <ValidatedTextInput
                valid={true}
                name={'phoneNumber'}
                label={'Your Phone Number'}
                changeValue={changePhoneNumber}
                />
                
                {validNumber ? <></> : <p className='reg-step-four-invalid'>Please enter a valid 10 digit number.</p>}

            </div>

            <div className='reg-step-four-check-group'>
                <p>Let People who have your phone number find and connect with on Fwitter.
                    <span className='reg-step-four-link'> Learn more</span>.
                </p>
                <Checkbox/>
            </div>

            <div className="reg-step-four-check-group">

                    <p>

                        Let Fwitter use your phone number to personalize our services, 
                        including ads (if permitted by your Ads preferences). 
                        If you don't enable this, Fwitter will still use your phone number for purposes 
                        including account security, spam, fraud, and abuse prevention. 
                        <span className="register-link color-blue"> See our Privacy Policy for more information.</span>

                    </p>

                    <Checkbox />
            </div>
 

        </div>

        <StyledNextButton disabled={(phoneNumber && validNumber)? false : true} 
            color={'black'} active={(phoneNumber && validNumber)? true : false}
            onClick={sendPhoneNumber}>
                Update Number
        </StyledNextButton>
        
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Checkbox } from '../../../../components/Checkbox/Checkbox'
import { DropDown } from '../../../../components/DropDown/DropDown'
import ValidatedTextInput from '../../../../components/ValidatedInput/ValidatedTextInput'
import { countryCodeDropDown } from '../../utils/RegisterModalUtils'
import { validatePhone } from '../../../../services/validators'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/Store'
import { updateRegister } from '../../../../redux/Slices/RegisterSlice'

import "./RegisterForm.css"
import '../../../../assets/global.css'



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

        dispatch(updateRegister({name: e.target.name, value:phoneCode + e.target.value}));
        
    }


    useEffect(function(){
        
        if (phoneNumber) {
            setValidNumber(validatePhone(phoneNumber));
            dispatch(updateRegister({name: "phoneNumberValid", value: validatePhone(phoneNumber)}));
        } 

    },[phoneCode, phoneNumber]);


  return (
    <div className='register-container'>

        <div className='register-content'>
            
            <h1 className='register-header-2'>Add a phone number</h1>
            <p className='register-text color-gray'>
                Enter a phone number you would like to associate with Fwitter your account.
                You won't get a verification code sendt here.
            </p>

            <div className={validNumber ? 'register-four-input-wrapper' : 'register-four-input-wrapper-condensed'}>
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
                
                {validNumber ? <></> : <p className='register-error color-red'>Please enter a valid 10 digit number.</p>}

            </div>

            <div className='register-four-checkbox-wrapper'>

                <p className='register-text color-gray'>
                    Let people who have your phone number find and connect with you on Fwitter.
                    <span className='register-link color-blue'> Learn more</span>.
                </p>
                <Checkbox/>

            </div>

            <div className="register-four-checkbox-wrapper">

                    <p className='register-text color-gray'>

                        Let Fwitter use your phone number to personalize our services, 
                        including ads (if permitted by your Ads preferences). 
                        If you don't enable this, Fwitter will still use your phone number for purposes 
                        including account security, spam, fraud, and abuse prevention. 
                        <span className="register-link color-blue"> See our Privacy Policy for more information.</span>

                    </p>

                    <Checkbox />
            </div>
 

        </div>

    </div>
  )
}

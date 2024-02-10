import React from 'react'

import { ForgotRadioButton } from '../ForgotRadioButton/ForgotRadioButton';

import "./ForgotForm.css";
import "./../../../../assets/global.css";


interface ForgotFormTwoProps {
  email: string;
  phone: string;
}

export  function ForgotFormTwo({email, phone}: ForgotFormTwoProps): React.ReactElement {

  const[emailActive, setEmailActive] = React.useState(false);
  const[phoneActive, setPhoneActive] = React.useState(false);

  function handleEmailClick(): void {
    setEmailActive(true);
    setPhoneActive(false);
  }

  function handlePhoneClick(): void {
    setPhoneActive(true);
    setEmailActive(false);
  }

  function transformEmail(email: string): string {
    let transformed = "";
    let domain = false;

    for (let i = 0; i < email.length; i++) {
      if (i < 2) {
        transformed += email.charAt(i);

      } else if (email.charAt(i) === "@") {
         transformed += email.charAt(i++);
         transformed += email.charAt(i);

         domain = true;
      } else if (email.charAt(i) === "." && domain) {

        transformed += email.charAt(i);

      } else{
        transformed += "*";
      }
      
    }

    return transformed;
  }

  return (
    <div className='forgot-form-container'>

        <h1 className='forgot-form-header'>
           Where should we send a confirmation code?
        </h1>

        <p className='forgot-form-text color-gray'>
            Before you can change your password, we need to make sure it's really you.
        </p>

        <p className='forgot-form-text color-gray'>
             Start by choosing where to send the confirmation code.
        </p>

        <div className='forgot-form-two-select-group'>

            <p className='forgot-form-two-select-text'>Send an email to {transformEmail(email)} </p>

            <ForgotRadioButton clicked={emailActive} handleClick={handleEmailClick} />

        </div>

        <div className='forgot-form-two-select-group'>

            <p className='forgot-form-two-select-text'> Text a code to the number ending in {phone.substring(phone.length-2, phone.length)} </p>

            <ForgotRadioButton clicked={phoneActive} handleClick={ handlePhoneClick} />

        </div>

    </div>
  )
}

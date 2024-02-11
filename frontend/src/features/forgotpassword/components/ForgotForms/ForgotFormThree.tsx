import React from 'react'


import "./ForgotForm.css";
import "./../../../../assets/global.css";
import ValidatedTextInput from '../../../../components/ValidatedInput/ValidatedTextInput';


interface ForgotFormThreeProps {
    updatacode(value: number): void;
    valid: boolean;
}
    

export function ForgotFormThree({updatacode, valid}: ForgotFormThreeProps): React.ReactElement {


    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        updatacode(+ e.target.value);
    }

  return (
    <div className='forgot-form-container'>

        <h1 className='forgot-form-header'> We sendt you a code </h1>
        <p className="forgot-form-text color-gray">Check you email to get your confirmation code. If you need to request a new code, go back and reselect to a confirmation.</p>

        <ValidatedTextInput 
        valid={valid}
        name={'code'}
        label={'Enter your code'}
        changeValue={handleChange}
        />
        
    </div>
  )
}

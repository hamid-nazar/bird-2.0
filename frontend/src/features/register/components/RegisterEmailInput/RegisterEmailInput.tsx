import React, { useState } from 'react'
import ValidatedTextInput from '../../../../components/ValidatedInput/ValidatedTextInput';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/Store';
import { updateRegister } from '../../../../redux/Slices/RegisterSlice';
import { validateEmail } from '../../../../services/validators';



interface EmailInputProps{
  email: string
}

export default function RegisterEmailInput({email}:EmailInputProps):React.ReactElement {

  const[validEmail, setValidEmail] = useState<boolean>(true);

  const dispatch:AppDispatch = useDispatch();

  function updateEmail(e: React.ChangeEvent<HTMLInputElement>):void{

    dispatch(updateRegister({name: e.target.name, value: e.target.value}))

    let valid = validateEmail(e.target.value);
    
    setValidEmail(valid);

    dispatch(updateRegister({name: "emailValid", value: valid}))
  }


  return (
    <div className='register-email-input'>

      <ValidatedTextInput valid={validEmail} name="email" label="Email" changeValue={updateEmail} data={email}/>
    </div>
  )
}

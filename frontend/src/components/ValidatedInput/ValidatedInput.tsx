import React, { useState } from 'react'

import { StyledInputBox, StyledInputLabel } from './StyledInput';

import "./ValidatedInput.css"
import { ValidatedInputState } from '../../utils/GlobalInterfaces';




interface ValidatedUserInputProps {
  name: string;
  label: string;  
  errorMessage: string;
  validator(value: string):boolean;
  changeValue(e:React.ChangeEvent<HTMLInputElement>):void
  attributes?: Record<string, string|number|boolean>;
}




export function ValidatedInput({name, label, errorMessage, 
  validator, changeValue, attributes}: ValidatedUserInputProps) {
  
  const[validiatedState, setValidatedState] = useState<ValidatedInputState>({
    valid: false,
    active: true,
    typedIn: false,
    labelActive: false,
    labelColor: "gray",
    value: ""
  });


  function focus(e:React.ChangeEvent<HTMLInputElement>): void{

    setValidatedState({...validiatedState, active: !validiatedState?.active});
  }

  function updateValue(e:React.ChangeEvent<HTMLInputElement>): void{

    setValidatedState({...validiatedState,typedIn:true, value: e.target.value});

    changeValue(e);
  }
  

  
  
  
  return (
    <div className='validated-input'>
      <StyledInputBox active={validiatedState.active} valid={validiatedState.valid}>

        <StyledInputLabel color={validiatedState.labelColor} active={validiatedState.labelActive} 
        valid={validiatedState.valid}>
          {label}
        </StyledInputLabel>

        <input className='validated-input-value'
         onFocus={focus}
         onBlur={focus}
         onChange={updateValue}
         {...attributes}

         />

      </StyledInputBox>

      <span>{errorMessage}</span>

    </div>
  )
}

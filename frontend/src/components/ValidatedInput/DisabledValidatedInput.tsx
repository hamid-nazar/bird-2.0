import React from 'react'

import './ValidatedInput.css'
import { StyledInputBox, StyledInputLabel } from './StyledInput';

interface DisabledValidatedInputProps {
    label: string;
    value: string;
}




export function DisabledValidatedInput({label, value}:DisabledValidatedInputProps):React.ReactElement {
    


  return (
    <div className='disabled-validated-input'>

        <StyledInputBox active={false} valid={true}>

            <StyledInputLabel active={true} valid={true} color={'gray'}>{label}</StyledInputLabel>
            
            <input className='validated-input-value validated-input-text-transparent ' value={value} disabled/>

        </StyledInputBox>
    </div>
  )
}

import React, { useState } from 'react'

import './ValidatedInput.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/Store';
import { StyledInputBox, StyledInputLabel } from './StyledInput';
import { updateRegister } from '../../redux/Slices/RegisterSlice';

interface ValidatedDisplayProps {
    label:string;
    value:string;
    valid?:boolean;
    
}

export function ValidatedDisplay({label,value, valid}:ValidatedDisplayProps):React.ReactElement {

    const[focused, setFocused] = useState<boolean>(false);

    const dispatch:AppDispatch = useDispatch();


    function focus ():void {
        setFocused(!focused);

        dispatch(updateRegister({name: "step", value: 1}));
    }


  return (
    <div className='validated-input'>
        <StyledInputBox active={false} valid={true}>

            <StyledInputLabel color={focused ? 'blue' : 'gray'} active={!focused} valid={valid?(!valid? true : false) : true}>
                {label}
            </StyledInputLabel>

            <input className='validated-input-value' onFocus={focus} value={value}/>

        </StyledInputBox>

    </div>
  )
}

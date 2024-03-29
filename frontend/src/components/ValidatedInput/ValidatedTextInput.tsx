import React, { useEffect, useState } from 'react'
import { StyledInputBox, StyledInputLabel } from './StyledInput';
import { determineValidedSelectStyle } from '../../utils/DetermineStylesUtil';

import "./ValidatedInput.css"


interface ValidatedTextInputProps {
    valid:boolean;
    name:string;
    label:string;
    changeValue(e:React.ChangeEvent<HTMLInputElement>):void;
    data?:string;
    attributes?: Record<string, string | number | boolean>
}



export default function ValidatedTextInput({valid, name, label, changeValue, data, attributes}:ValidatedTextInputProps):React.ReactElement {

    const [value, setValue] = useState<string>(data? data: "");
    const[borderActive, setBorderActive] = useState<boolean>(false);
    const[labelActive, setLabelActive] = useState<boolean>(false);
    const[color, setColor] = useState<string>('gray');

    function focus ():void {
        setBorderActive(!borderActive);

        if (value) {
            setLabelActive(!labelActive);
        }
    }

    function update(e:React.ChangeEvent<HTMLInputElement>):void {
        setValue(e.target.value);
       
        changeValue(e);
    }


    useEffect(function(){

        if (value && !labelActive) {
            setLabelActive(true);
        }

        setColor(determineValidedSelectStyle(borderActive, valid));
        
    },[ valid, value, borderActive, labelActive,color]);

  return (
    <div className='validated-input'>
        <StyledInputBox active={borderActive} valid={valid}>

            <StyledInputLabel color={color} active={labelActive} valid={valid}>
                {label}
            </StyledInputLabel>

            <input 
                className='validated-input-value'
                name={name}
                onFocus={focus}
                onBlur={focus}
                onChange={update} 
                value={data}
                {...attributes}
            />
            {attributes && attributes.maxLength && (borderActive || !valid)?
             <span className='validated-input-remainder'>{value.length}/{attributes.maxLength}</span> : <></>}
        </StyledInputBox>

    </div>
  )
}

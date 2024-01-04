import React, { useEffect, useState } from 'react'
import { StyledInputBox, StyledInputLabel } from './StyledInput';
import { determineValidedSelectStyle } from '../../utils/DetermineStylesUtil';




interface ValidatedTextInputProps {
    valid:boolean;
    name:string;
    label:string;
    changeValue(e:React.ChangeEvent<HTMLInputElement>):void;
    data?:string;
    attributes?: Record<string, string | number | boolean>
}



export default function ValidatedTextInput({valid, name, label, changeValue,data}:ValidatedTextInputProps):React.ReactElement {

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
        console.log("Value: ", e.target.value);

        changeValue(e);
    }


    useEffect(function(){

        if (value && !labelActive) {
            setLabelActive(true);
        }

        setColor(determineValidedSelectStyle(borderActive, valid));
        
    },[ valid, value, borderActive, labelActive,color]);

  return (
    <div className='validated-text-input'>
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
            />

        </StyledInputBox>

    </div>
  )
}

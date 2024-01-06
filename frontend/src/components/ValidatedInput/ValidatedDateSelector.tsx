import React, { useEffect, useState } from 'react'
import { StyledInputBox, StyledInputLabel } from './StyledInput';
import { determineValidedSelectStyle } from '../../utils/DetermineStylesUtil';

import "./ValidatedInput.css"
import { ExpandMoreRounded } from '@mui/icons-material';


interface ValidatedDateSelectorProps{
    style?:string;
    valid:boolean;
    name:string;
    dropDown():React.ReactElement[],
    dispatcher(name:string, value:string|number|boolean):void;
    data?:number | string;
}




export default function ValidatedDateSelector({style, valid, name, dropDown, dispatcher, data}:
    ValidatedDateSelectorProps):React.ReactElement {

    const [active, setActive] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);
    const [color, setColor] = useState<string>('gray'); 


    function changeValue(e:React.ChangeEvent<HTMLSelectElement>):void {

        setValue(+e.target.value); 

        console.log("Dispatch this change to a reducer");
        console.log("Value: ", e.target.value);

       dispatcher(name.toLowerCase(), e.target.value);
    
    }

    function toggleActive(e: React.FocusEvent<HTMLSelectElement>):void {

        setActive(!active);
    }


    useEffect(function(){

        setColor(determineValidedSelectStyle(active, valid));
        
    },[active, valid, value]);

  return (
    <div className="validated-input">

        <StyledInputBox active={active} valid={valid}>

            <StyledInputLabel color={color} active={active} valid={valid}>
                {name}
                
                <ExpandMoreRounded sx={{
                    fontSize: 34,
                    color: active ? '#1DA1F2' : '#657786',
                    position: 'absolute',
                    right: '15px',
                    top: '35%',
                }}/>

            </StyledInputLabel>

            <select className='validated-input-value validated-date-selector' onChange={changeValue} onFocus={toggleActive} onBlur={toggleActive} value={data}>

             { dropDown()}

            </select>

        </StyledInputBox>

    </div>
  )
}

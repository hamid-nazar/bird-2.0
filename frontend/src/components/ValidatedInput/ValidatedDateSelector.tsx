import React, { useEffect, useState } from 'react'
import { StyledInputBox, StyledInputLabel } from './StyledInput';
import { determineValidedSelectStyle } from '../../utils/DetermineStylesUtil';
import { useDispatch } from 'react-redux';
import { updateRegister } from '../../redux/Slices/RegisterSlice';




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

        setValue(parseInt(e.target.value)); 

        console.log("Dispatch this change to a reducer");
        console.log("Value: ", e.target.value);

       dispatcher(name.toLowerCase(), e.target.value);
    
    }

    function toggleActive(e: React.FocusEvent<HTMLSelectElement>):void {

        setActive(!active);
    }


    useEffect(function(){

        setColor(determineValidedSelectStyle(active, valid));
        
    },[value, active, valid]);

  return (
    <div className={style}>

        <StyledInputBox active={active} valid={valid}>

            <StyledInputLabel color={color} active={active} valid={valid}>
                {name}
            </StyledInputLabel>

            <select onChange={changeValue} onFocus={toggleActive} onBlur={toggleActive} value={data}>

             { dropDown()}

            </select>

        </StyledInputBox>

    </div>
  )
}

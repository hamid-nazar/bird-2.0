import React, { useState } from 'react'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { StyledInputBox, StyledInputLabel } from '../ValidatedInput/StyledInput';



import "../ValidatedInput/ValidatedInput.css";


interface DropDownProps {
    content(): React.ReactElement[];
    change(e: React.ChangeEvent<HTMLSelectElement>): void;
    label: string;
    defaultValue: string | number;
}

export function DropDown({content, change, label, defaultValue}:DropDownProps):React.ReactElement {

    const[active, setActive] = useState<boolean>(false);
    const[data, setData] = useState<string>("");


    function toggleSelect():void {
        setActive(!active);
    }

    function changeValue(e:React.ChangeEvent<HTMLSelectElement>):void {
        setData(e.target.value);
        change(e);
    }



  return (
    <div className='dropdown-container'>

        <StyledInputBox active={active} valid={true}>

            <StyledInputLabel color={active ? 'blue' : 'gray'} active={true} valid={true}>

                {label}

                <ExpandMoreRoundedIcon  sx={{
                    fontSize: 34,
                    color: active ? '#1DA1F2' : '#657786',
                    position: 'absolute',
                    right: 15,
                    top: '35%',
                }}/>

            </StyledInputLabel>

            <select className='validated-input-value validated-date-selector' onChange={changeValue} onFocus={toggleSelect} onBlur={toggleSelect} value={data? data: defaultValue}>
                {content()}
            </select>

        </StyledInputBox>

    </div>
  )
}

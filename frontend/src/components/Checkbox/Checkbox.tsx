import React, { useState } from 'react'
import { StyledCheckbox, StyledCheckboxBackground } from './StyledChecknbox';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import "./Checkbox.css"

export function Checkbox():React.ReactElement {

    const[clicked, setClicked] = useState<boolean>(false);

    function toggleCheckbox():void {
        setClicked(!clicked);
    }


  return (

    <div className='checkbox-container'>
  
    <StyledCheckboxBackground active={clicked} onClick={toggleCheckbox}>
        <StyledCheckbox active={clicked} >

            {clicked? <CheckRoundedIcon sx={{
                fontSize: 18,
                color: 'white',
            }}/> : <></>}
            
        </StyledCheckbox>
    </StyledCheckboxBackground>
    </div>
  )
}

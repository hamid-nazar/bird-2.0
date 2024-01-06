import React, { useState } from 'react'
import { StyledCheckbox, StyledCheckboxBackground } from './StyledChecknbox';
import { CheckBoxRounded } from '@mui/icons-material';



export function Checkbox():React.ReactElement {

    const[clicked, setClicked] = useState<boolean>(false);

    function toggleCheckbox():void {
        setClicked(!clicked);
    }


  return (
  
    <StyledCheckboxBackground active={clicked} onClick={toggleCheckbox}>
        <StyledCheckbox active={clicked} >

            {clicked? <CheckBoxRounded sx={{
                fontSize: 18,
                color: 'white',
            }}/> : <></>}
            
        </StyledCheckbox>
    </StyledCheckboxBackground>

  )
}

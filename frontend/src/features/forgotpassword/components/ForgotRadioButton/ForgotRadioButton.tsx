import React,{useEffect, useRef} from 'react';
import styled from 'styled-components'
import CheckIcon from '@mui/icons-material/Check';
import './ForgotRadioButton.css';

interface StyledRadioButonProps{
    clicked: boolean;
}

export const StyledRadio = styled.input<StyledRadioButonProps>`
    -webkit-appearance: none;
    appearance: none;
    background-color: #ffffff;
    margin: 0;
    color: white;
    width: 20px;
    height: 20px;
    border: ${(props) => props.clicked ? 'none' : `2px solid ${props.theme.colors.darkGray}`};
    border-radius: 50%;
    &:checked{
        background-color: ${(props) => props.theme.colors.blue}
    }
`

export const StyledRadioDiv = styled.div<StyledRadioButonProps>`
    height: 36px;
    width: 36px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    &:hover{
        background-color: ${(props) => props.clicked ? 'rgba(29, 155, 249, 0.1)' : 'rgba(83, 100, 113, 0.1)'};
    }
`

interface ForgotRadioButtonProps {
    clicked: boolean;
    handleClick(): void;
}


export function ForgotRadioButton({clicked, handleClick}: ForgotRadioButtonProps):React.ReactElement {
    
    const radio = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(function() {

        if(radio.current){

         radio.current.checked = clicked;

        }

    }, [clicked])

  return (
    <StyledRadioDiv clicked = {clicked} onClick={handleClick}>
        
        <StyledRadio type="radio" clicked={clicked} ref={radio} />

        <div className='forgot-radio-checkmark'>

            {
            
            clicked ? <CheckIcon sx={{
                color: 'white', 
                fontSize: "14px", 
                fontWeight: 300
                }} /> : 
                <></>
                
            }
        </div>

    </StyledRadioDiv>
  )

}

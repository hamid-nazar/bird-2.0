import React from 'react'


import "./ForgotButtonFour.css";
import { ModalButton } from '../../../../components/ModalButton/ModalButton';

interface ForgotButtonFourProps {
    submitNewPassword(): void;
    active: boolean;
}



export function ForgotButtonFour({submitNewPassword, active}: ForgotButtonFourProps): React.ReactElement {
  return (
    <div className='forgot-button-four'>
        <ModalButton
        active={active}
        height={50}
        fontColor={'white'}
        backgroundColor={active ? "black" : "rgba(0,0,0,.7)"}
        fontSize={17}
        fontWeight={700}
        hoverBackground={{r:0,g: 0,b: 0,a: 0.8}}
        onClick={submitNewPassword}>
            Change Password
        </ModalButton>

    </div>
  )
}

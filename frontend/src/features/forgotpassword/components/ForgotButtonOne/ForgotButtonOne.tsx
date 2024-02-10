import React from 'react'

import "./ForgotButtonOne.css";
import { ModalButton } from '../../../../components/ModalButton/ModalButton';



interface ForgotButtonOneProps {
    value: string;
    handleClick(): void;
}

export function ForgotButtonOne({value, handleClick}: ForgotButtonOneProps): React.ReactElement {


  return (
    <div className='forgot-button-one'>

        <ModalButton
        active={value ? true : false}
        height={50}
        value={value}
        fontColor={'white'}
        backgroundColor={value ? "black" : "rgba(0,0,0,.8)"}
        fontSize={17}
        fontWeight={700}
        hoverBackground={{r:0,g: 0,b: 0,a: 0.8}}
        onClick={handleClick}>
            Next
        </ModalButton>

    </div>
  )
}

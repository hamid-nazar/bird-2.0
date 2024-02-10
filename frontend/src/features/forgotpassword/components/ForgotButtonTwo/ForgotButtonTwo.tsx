import React from 'react'
import { ModalButton } from '../../../../components/ModalButton/ModalButton';



import './ForgotButtonTwo.css';


interface ForgotFormTwoProps {
   onConcel():void;
   sendCode():void;
}

export function ForgotButtonTwo({onConcel, sendCode}:ForgotFormTwoProps): React.ReactElement {

  return (
    <div className='forgot-button-two'>
        <ModalButton
            active={true }
            height={50}
            fontColor={'white'}
            backgroundColor={ "black"}
            fontSize={17}
            fontWeight={700}
            hoverBackground={{r:0,g: 0,b: 0,a: 0.9}}
            onClick={sendCode}>

            Next
        </ModalButton>


        <ModalButton
            active={true }
            height={50}
            fontColor={'white'}
            backgroundColor={ "black"}
            borderColor={'#536471'}
            fontSize={17}
            fontWeight={600}
            hoverBorder={{r:83,g: 100,b: 113,a: 1}}
            hoverBackground={{r:83,g: 100,b: 113,a: 0.1}}
            onClick={onConcel}>

            Concel
        </ModalButton>
   
    </div>
  )

  
}

import React, { useEffect } from 'react'
import {Modal} from '../../../../components/Modal/Modal'
import "./RegisterModal.css"
import {RegisterationStepCounter} from '../RegisterStepCounter/RegisterationStepCounter'
import { determineModalContent } from '../../utils/RegisterModalUtils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/Store'
import { cleanRegisterState, decremetnStep } from '../../../../redux/Slices/RegisterSlice'
import { RegisterNextButton } from '../RegisterNextButton/RegisterNextButton'


interface RegisterModalProps {
  toggleModal(): void;
}


export function RegisterModal({toggleModal}:RegisterModalProps):React.ReactElement {

  const state = useSelector((state:RootState) => state.register);

  const dispatch:AppDispatch = useDispatch();


  function stepButtonClicked() {
    
    if (state.step === 1) {

      toggleModal();

      return;
    }
    dispatch(decremetnStep());
  }

  useEffect(function(){
    
    return function(){

      dispatch(cleanRegisterState());
      
    }
  },[])


  return (
  
        <Modal 
          topContent={<RegisterationStepCounter step={state.step} changeStep={stepButtonClicked}/>} 
          content={determineModalContent(state.step)} 
          bottomContent={<RegisterNextButton step={state.step}/>}/>

  )       
}

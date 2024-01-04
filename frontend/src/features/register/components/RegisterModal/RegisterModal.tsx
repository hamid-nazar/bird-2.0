import React, { useState } from 'react'
import {Modal} from '../../../../components/Modal/Modal'
import "./RegisterModal.css"
import {RegisterationStepCounter} from '../RegisterStepCounter/RegisterationStepCounter'
import { determineModalContent } from '../../utils/RegisterModalUtils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/Store'
import { decremetnStep } from '../../../../redux/Slices/RegisterSlice'

export function RegisterModal():React.ReactElement {

  const state = useSelector((state:RootState) => state.register);

  const dispatch:AppDispatch = useDispatch();


function stepButtonClicked() {
  dispatch(decremetnStep());
}

  return (
      
      <Modal>
       <div className='register-modal'>
        <RegisterationStepCounter step={state.step} changeStep={stepButtonClicked}/>
        <div className='register-modal-content'>
        {determineModalContent(state.step)}
        </div>
     
       </div>
      </Modal>
      
  )
}

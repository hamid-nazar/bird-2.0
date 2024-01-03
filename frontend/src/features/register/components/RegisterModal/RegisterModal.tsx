import React, { useState } from 'react'
import {Modal} from '../../../../components/Modal/Modal'
import "./RegisterModal.css"
import {RegisterationStepCounter} from '../RegisterStepCounter/RegisterationStepCounter'
import { determineModalContent } from '../../utils/RegisterModalUtils'

export function RegisterModal():React.ReactElement {
  const [step, setStep] = useState<number>(1)

function stepButtonClicked() {
 step ===1 || step === 4 || step >= 6 ? setStep(step) : setStep(step - 1)
}

  return (
      
      <Modal>
       <div className='register-modal'>
        <RegisterationStepCounter step={step} changeStep={stepButtonClicked}/>
        <div className='register-modal-content'>
        {determineModalContent(step)}
        </div>
     
       </div>
      </Modal>
      
  )
}

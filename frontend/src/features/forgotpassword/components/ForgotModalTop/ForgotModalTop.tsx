import React from 'react'

import blueLogo from "./../../../../assets/fwitter-logo-large-blue.png";

import "./ForgotModalTop.css";
import "./../../../../assets/global.css";

interface ForgotModalTopProps {

  closeModal(): void;
}

export function ForgotModalTop({closeModal}:ForgotModalTopProps):React.ReactElement {


  return (
    <div className='forgot-modal-top'>

      <div className='forgot-modal-top-left'>

        <div className='forgot-modal-top-shadow'>
            x
        </div>

      </div>

      <div className='forgot-modal-top-middle'>

        <img className='forgot-modal-top-logo' src={blueLogo} alt="logo" />

      </div>

    <div className='fogot-modal-top-right'></div>
    
    </div>
  )
}

import React from 'react';

import blueLogo from '../../../assets/fwitter-logo-large-blue.png';
import './LoginModalTop.css';

interface LoginModalTopProps {
    closeModal():void;
}

export function LoginModalTop({closeModal}:LoginModalTopProps):React.ReactElement {

  return (
    <div className='login-modal-top'> 
        <div className='login-modal-top-left'>
            <div className='login-modal-top-shadow' onClick={closeModal}>
                x
            </div>
       
        </div>
        <div className='login-modal-top-middle'>
            <img src={blueLogo} className='login-modal-top-logo' alt="fwitter" />
        </div>

        <div className='login-modal-top-right'></div>
    </div>
  )
}

import React from 'react'

import './Buttons.css';

interface SignUpBottonProps {
    handleClick():void;
}
export function SignUpBotton({handleClick}: SignUpBottonProps): React.ReactElement {


  return (
    <div className='landing-button sign-up' onClick={handleClick}>

        <p className='sign-up-text'> Sign up wtih Email </p>

    </div>
  )
}

import React from 'react'


import '../../../../assets/global.css';
import './Buttons.css';


interface SignInButtonProps {
  handleClick():void;
}

export function SignInButton({handleClick}:SignInButtonProps): React.ReactElement {

  return (
    <div className='landing-button sign-in' onClick={handleClick}>
        <p className='sign-in-text color-blue'> Sign in </p>
    </div>
  )
}

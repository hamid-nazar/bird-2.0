import React from 'react'


import '../../../../assets/global.css';
import './Buttons.css';


interface SignInButtonProps {
  handleClici():void;
}

export function SignInButton({handleClici}:SignInButtonProps): React.ReactElement {

  return (
    <div className='landing-button sign-in' onClick={handleClici}>
        <p className='sign-in-text color-blue'> Sign in </p>
    </div>
  )
}

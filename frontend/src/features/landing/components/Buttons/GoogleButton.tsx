import React from 'react'

import google from '../../../../assets/google.png';
import '../../../../assets/global.css';
import './Buttons.css';



export function GoogleButton() {
  return (
    <div className='landing-button color-gray google'>
        <img src={google} className='landing-button-logo' />
        <p className='google-text'> Sign up wiht Google </p>
    </div>
  )
}

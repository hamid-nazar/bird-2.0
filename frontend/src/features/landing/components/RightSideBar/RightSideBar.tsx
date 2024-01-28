
import React from 'react';

import './RightSideBar.css';
import '../../../../assets/global.css';
import logoBlue from '../../../../assets/fwitter-logo-large-blue.png';
import { GoogleButton } from '../Buttons/GoogleButton';
import { AppleButton } from '../Buttons/AppleButton';
import { SignUpBotton } from '../Buttons/SignUpBotton';
import { SignInButton } from '../Buttons/SignInButton';


interface RightSideBarProps {
    toggleRegister():void;
    toggleLogin():void;
}




export function RightSideBar({toggleRegister, toggleLogin}: RightSideBarProps) {

  return (
    <div className='right-side-bar'>
         <img src={logoBlue} className='right-side-bar-logo' alt='Fwitter' />

         <h1 className='right-side-bar-h1'> Hapening now </h1>
         <h2 className='right-side-bar-h2'> Join Fwitter today. </h2>

         <div className='right-side-bar-signup-wrapper'>

            <GoogleButton/>
            <AppleButton/>
            <div className='right-side-bar-divider'>

                <div className='right-side-bar-line'></div>
                <p className='right-side-bar-or'>Or</p>
                <div className='right-side-bar-line'></div>

            </div>

            <SignUpBotton handleClick={toggleRegister}/>

            <p className="right-side-bar-legal color-gray"> 

                By signing up, you agree to the <span className="link color-blue">Terms of Service</span> and 
                <span className="link color-blue">Privacy Policy</span>, including
                <span className="link color-blue"> Cookie Use.</span>

            </p>
         </div>

         <div className='right-side-bar-login-wrapper'>

            <h3 className='right-side-bar-h3'> Already have an account?</h3>
            <SignInButton handleClick={toggleLogin}/>

         </div>


    </div>
  )
}

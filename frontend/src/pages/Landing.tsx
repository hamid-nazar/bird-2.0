import React, { useState } from 'react';

import RegisterModal from '../features/register';
import { RightSideBar } from '../features/landing';
import { LandingFooter } from '../features/landing';

import whiteLogo from '../assets/fwitter-logo-large-white.png';
import './Landing.css';
import "../assets/global.css";
import LogingModal from '../features/login';



export function Landing():React.ReactElement {

  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  function toggleRegister():void {
    setRegister(!register);
  }

  function toggleLogin():void {
    setLogin(!login);
  }

  return (
    <div className='home-container bg-color'>

      {register ? <RegisterModal toggleModal={toggleRegister}/> : <></> }

      {login ? <LogingModal toggleModal={toggleLogin}/> : <></>}

        <div className='landing-layout'>

          <div className='landing-top-left bg-blue'>
            <img src={whiteLogo} className='landing-top-left-logo' alt='white logo' />
          </div>

          <div className='landing-top-right'>
            <RightSideBar toggleRegister={toggleRegister} toggleLogin={toggleLogin}/>
          </div>

          <div className='landing-bottom'>
            <LandingFooter/>
          </div>

        </div>
      
    </div>
  )
}

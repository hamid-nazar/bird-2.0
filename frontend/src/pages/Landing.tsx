import React, { useState } from 'react';

import RegisterModal from '../features/register';
import { RightSideBar } from '../features/landing';
import { LandingFooter } from '../features/landing';


import './Landing.css';
import "../assets/global.css";



export function Landing():React.ReactElement {

  const [register, setRegister] = useState<boolean>(false);

  function toggleRegister():void {
    setRegister(!register);
  }

  return (
    <div className='home-container bg-color'>

      {register ? <RegisterModal toggleModal={toggleRegister}/> : <></> }

        <div className='landing-layout'>

          <div className='landing-top-left bg-blue'>

          </div>

          <div className='landing-top-right'>
            <RightSideBar toggleRegister={toggleRegister} toggleLogin={toggleRegister}/>
          </div>

          <div className='landing-bottom'>
            <LandingFooter/>
          </div>

        </div>
      
    </div>
  )
}

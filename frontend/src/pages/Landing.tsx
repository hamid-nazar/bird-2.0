import React from 'react'
import './Landing.css'
import "../assets/global.css"
import { RegisterModal } from '../features/register/components/RegisterModal/RegisterModal'


export function Landing():React.ReactElement {
  return (
    <div className='home-container bg-color'>
     <RegisterModal/>
        </div>
  )
}

import React from 'react'

import "./Modal.css"
import "../../assets/global.css"


interface ModalProps {
    children: React.ReactNode
}

export function Modal(props:ModalProps):React.ReactElement {
  return (
    <div className='modal-overlay'>
        <div className='modal-container bg-color'>
            {props.children}
            </div>
    </div>
  )
}



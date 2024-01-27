import React from 'react'


import "./Modal.css"
import "../../assets/global.css"


interface ModalProps {
  topContent: React.ReactElement;
  content: React.ReactElement;
  bottomContent: React.ReactElement;
}

export function Modal({topContent, content, bottomContent}:ModalProps): React.ReactElement {


  return (
    <div className='modal'>
        <div className='modal-box bg-color'>

            <div className='modal-top'>
                {topContent}
            </div>

            <div className='modal-content'>
                {content}
            </div>

            <div className='modal-bottom'>
                {bottomContent}
            </div>

        </div>

    </div>
  )
}

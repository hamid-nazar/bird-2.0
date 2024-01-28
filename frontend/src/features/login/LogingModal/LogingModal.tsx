import React, { useState } from 'react'
import { Modal } from '../../../components/Modal/Modal';
import { LoginModalTop } from '../LoginModalTop/LoginModalTop';
import { LoginFormOne } from '../LoginForms/LoginFormOne';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { LoginFromTwo } from '../LoginForms/LoginFromTwo';



interface LogingModalProps {
    toggleModal(): void;
}
export function LogingModal({toggleModal}:LogingModalProps): React.ReactElement {

  const state = useSelector((state:RootState) => state.user);
  const[password, setPassword] = useState<string>("");

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>){
     setPassword(e.target.value);
  }

  return (
    <Modal topContent={<LoginModalTop closeModal={toggleModal}/>}
            content={state.username ? <LoginFromTwo setPassword={handlePassword}/>:<LoginFormOne/>} 
            bottomContent={state.username ? <div>login form button </div>: <></>}/>
  )
}

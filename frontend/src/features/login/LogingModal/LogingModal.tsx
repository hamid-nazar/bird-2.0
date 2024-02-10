import React, { useEffect, useState } from 'react'
import { Modal } from '../../../components/Modal/Modal';
import { LoginModalTop } from '../LoginModalTop/LoginModalTop';
import { LoginFormOne } from '../LoginForms/LoginFormOne';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { LoginFromTwo } from '../LoginForms/LoginFromTwo';
import { LoginButton } from '../LoginButton/LoginButton';
import { useNavigate } from 'react-router-dom';



interface LogingModalProps {
    toggleModal(): void;
    toggleRegister(): void;
}



export function LogingModal({toggleModal, toggleRegister}:LogingModalProps): React.ReactElement {


  const navigate = useNavigate();

  const state = useSelector((state:RootState) => state.user);
  
  const[password, setPassword] = useState<string>("");


  function handlePassword(e: React.ChangeEvent<HTMLInputElement>){
     setPassword(e.target.value);
  }

  function openRegister():void{
    toggleModal();
    toggleRegister();
  }

  useEffect(function(){
    
    if (state.loggedIn) {
      
      navigate("/home");

      return function(){  }
    }

  },[state.loggedIn])

  return (
    <Modal topContent={<LoginModalTop closeModal={toggleModal}/>}
            content={state.username ? <LoginFromTwo setPassword={handlePassword}/>:<LoginFormOne noAccount={openRegister}/>} 
            bottomContent={state.username ? <LoginButton username={state.username} password={password}/>: <></>}/>
  )
}

import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/Store';
import { loginUser } from '../../../redux/Slices/UserSlice';
import { ModalButton } from '../../../components/ModalButton/ModalButton';


import '../../../assets/global.css';
import './LoginButton.css';


interface LoginButtonProps {
    username: string;
    password: string;
}
export function LoginButton({username,password}:LoginButtonProps): React.ReactElement {

    const dispatch:AppDispatch = useDispatch();


    function handleLogin():void {
        
        dispatch(loginUser({username, password}));
    }

  return (
    <div className='login-button'>
        
        <ModalButton 
         onClick={handleLogin}
         active = {password !== "" ? true : false} 
         disabled = {password !== "" ? false : true}
        height={50}
        fontColor={'white'}
        backgroundColor={password !== "" ? 'black' : 'rgba(0, 0, 0, 0.5)'}
        fontSize={17}
        fontWeight={700}
        hoverBackground={{r:0,g:0,b:0,a:0.8}}>
            Log in
       </ModalButton>

       <div className='login-button-text color-gray'>
            Don't have an account? <span className='link color-blue'> Sign up </span>
       </div>
    </div>
  )
}

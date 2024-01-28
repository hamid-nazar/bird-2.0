import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/Store';

import ValidatedTextInput from '../../../components/ValidatedInput/ValidatedTextInput';
import { ModalButton } from '../../../components/ModalButton/ModalButton';
import { validateEmail, validatePhone } from '../../../services/validators';
import { verifyUsername } from '../../../redux/Slices/UserSlice';

import google from '../../../assets/google.png';
import apple from '../../../assets/apple.png';

import '../../../assets/global.css';
import './LoginForms.css';




export function LoginFormOne(): React.ReactElement {

    const state = useSelector((state:RootState) => state.user);
    const dispatch:AppDispatch = useDispatch();

    const [credential, setCredential] = useState<string>("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>):void {
        setCredential(e.target.value);
    }

    function findUsername():void {

        let body = {
            email:"",
            phone:"",
            username:""
        }

        if (validateEmail(credential)) {
            body.email = credential;
        } 
        else if(validatePhone(credential)) {

            body.phone = credential;
        } else {
            body.username = credential;
        }
     
        dispatch(verifyUsername(body));
    }


  return (
    <div className='login-form-one-container'>
        <h1 className='login-form-header'> Sign in to Fwitter </h1>

        <ModalButton 
            fontColor={'#536471'}
            borderColor={'#536471'}
            backgroundColor={'white'}
            fontSize={15}
            fontWeight={600}
            hoverBackground={{ r: 128, g: 170, b: 2255, a: 0.05}}
            hoverBorder={{r: 179, g: 204, b: 2255, a: 0.5}}>
            <img src={google} className='login-form-one-buttons-logo' alt="Fwitter" />
            Sign in with Google
        </ModalButton>
        
        <ModalButton 
            fontColor={'black'}
            borderColor={'#536471'}
            backgroundColor={'white'}
            fontSize={16}
            fontWeight={700}
            hoverBackground={{r: 87, g: 187, b: 87, a: 0.1}}
            hoverBorder={{r: 87, g: 187, b: 87, a: 1}}>

                <img src={apple} className='login-form-one-buttons-logo' alt="Fwitter" />
                
                Sign in with Apple

            </ModalButton>


        <div className='login-form-one-divider'>

            <div className='login-form-one-line'></div>
            <p className='login-form-one-or'>Or</p>
            <div className='login-form-one-line'></div>
        </div>

        <ValidatedTextInput
                valid={!state.error}
                name={'identifier'}
                label={'Phone, email, or username'}
                changeValue={handleChange}
            />

        {state.error? <p className='login-form-error color-red'> Unable to find user </p>: <></>}

        <ModalButton
            fontColor={'white'}
            backgroundColor={'black'} 
            fontSize={16}
            fontWeight={700}
            hoverBackground={{r: 0, g: 0, b: 0, a: 0.9}}
            onClick={findUsername}>
            Next
        </ModalButton>

        <ModalButton
            fontColor={'black'}
            borderColor={'#d3d3d3'}
            backgroundColor={'white'} 
            fontSize={16}
            fontWeight={700}
            hoverBackground={{r: 83, g: 100, b: 113, a: 0.2}}
            hoverBorder={{r: 211, g: 211, b: 211, a: 1.0}}>
                
            Forgot password?
        </ModalButton>

        <p className='login-form-text color-gray'> Don't have an account? <span className='link color-blue'>Sign up</span></p>
    </div>
  )
}


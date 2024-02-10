import React, { useState } from 'react'
import { Modal } from '../../../../components/Modal/Modal';
import { ForgotModalTop } from '../ForgotModalTop/ForgotModalTop';
import { ForgotFormOne } from '../ForgotForms/ForgotFormOne';
import { validateEmail, validatePhone } from '../../../../services/validators';
import axios from 'axios';
import { ForgotButtonOne } from '../ForgotButtonOne/ForgotButtonOne';
import { ForgotFormTwo } from '../ForgotForms/ForgotFormTwo';
import { ForgotButtonTwo } from '../ForgotButtonTwo/ForgotButtonTwo';




interface ForgotPasswordModalProps {
    toggleModal():void;
}

interface UserInfo {
    email: string;
    phone: string;
    username: string;
}


export function ForgotPasswordModal({toggleModal}:ForgotPasswordModalProps):React.ReactElement {

    const[credential, setCredential] = useState<string>('');
    const[userInfo, setUserInfo] = useState<UserInfo>({
        email: "",
        phone: "",
        username: ""
    });

    const[error, setError] = useState<boolean>(false);
    const[step, setStep] = useState<number>(1);
    const[resetCode, setResetCode] = useState<number>(0);

    function changeCredential(credential: string):void {

        setCredential(credential);
    }

    async function searchUser():Promise<void> {

        let findUserDTO = {
            email: "",
            phone: "",
            username: ""
        }

        if (validateEmail(credential)) {

            findUserDTO = {
                ...findUserDTO,
                email: credential
            } 
        } else if (validatePhone(credential)) {
            findUserDTO = {
                ...findUserDTO,
                phone: credential
            }
        } else {

            findUserDTO = {
                ...findUserDTO,
                username: credential
            }
        }

        try {
            setError(false);

            let res = await axios.post('http://localhost:8000/auth/identifiers', findUserDTO);

            let data = await res.data;

            setUserInfo({
                email: data.email,
                phone: data.phone,
                username: data.username
            });

            setStep(2);
            
        } catch (error) {

            setError(true);
        }
    }

  async function sendResetPasswordCode():Promise<void> {

        const code = Math.floor(1000 + Math.random() * 900000);
        setResetCode(code);

        try {

            let req = await axios.post('http://localhost:8000/auth/password/code', {email: userInfo.email, code: code});

            let data = await req.data;

            setStep(3);
            
        } catch (error) {
            console.log(error);
        }
    }

  return ( 
    <Modal 
    topContent={<ForgotModalTop closeModal={toggleModal} />} 
    content={step === 1 ? <ForgotFormOne setCredential={changeCredential} error ={error}/>: <ForgotFormTwo email={userInfo.email} phone={userInfo.phone}/>}
     bottomContent={step === 1 ? <ForgotButtonOne value={credential } handleClick={searchUser} /> : <ForgotButtonTwo onConcel={toggleModal} sendCode={sendResetPasswordCode} />}
     />
  )
}

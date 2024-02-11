import React, { useEffect, useState } from 'react'
import { Modal } from '../../../../components/Modal/Modal';
import { ForgotModalTop } from '../ForgotModalTop/ForgotModalTop';
import { validateEmail, validatePhone } from '../../../../services/validators';
import axios from 'axios';
import { determineForgotButton, determineForgotFormContent } from '../../utils/ForgotPasswordUtils';




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
    const[userInputCode, setUserInputCode] = useState<number>(0);
    const[password, setPassword] = useState<Record<string, string>>({
        password: "",
        confirmPassword: ""
    });
    const[matching, setMatching] = useState<boolean>(true);



    function changeCredential(credential: string): void {

        setCredential(credential);
    }

    function changeUserInputCode(value: number):void {

        setUserInputCode(value);
     }

     function updatePassword(e: React.ChangeEvent<HTMLInputElement>): void {

        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
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

    function checkCode(): void {

        if (userInputCode === resetCode) {

            setStep(4);

        } else{

            setError(true);
        }
    }


    const sendPassword = async () => {
        let body = {
            username: userInfo.username,
            password: password.password
        }

        try{
            let req = await axios.put("http://localhost:8000/auth/update/password", body);
            let res = await req.data;
            toggleModal();
        } catch(e){
            console.log(e);
        }
    }

    useEffect(function() {

        if (password.password && password.confirm) {

            setMatching(password.password === password.confirm);
        }

    }, [password.password, password.confirm])

  return ( 
    <Modal 
    topContent={<ForgotModalTop closeModal={toggleModal} />} 

    content={determineForgotFormContent({
        step: step,
        setCredential: 
        changeCredential, 
        errro: error, 
        email: userInfo.email, 
        phone: userInfo.phone, 
        updateCode: changeUserInputCode, 
        valid:!error,
        updatePassword: updatePassword,
        matching: matching
     })}

    bottomContent={determineForgotButton({
        step: step, 
        credential:
        credential, 
        searchUser:
        searchUser, 
        concel:toggleModal,
        sendCode: sendResetPasswordCode,
        formThreeActive: userInputCode? true: false, 
        checkCode: checkCode,
        back: ()=> setStep(2),
        submitNewPassword: sendPassword,
        formFourActive: password.password && matching ? true: false
    })}
     />
  )
}

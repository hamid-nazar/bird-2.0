import React from 'react'
import { ForgotFormOne } from '../components/ForgotForms/ForgotFormOne'
import { ForgotFormTwo } from '../components/ForgotForms/ForgotFormTwo'
import { ForgotButtonOne } from '../components/ForgotButtonOne/ForgotButtonOne';
import { ForgotButtonTwo } from '../components/ForgotButtonTwo/ForgotButtonTwo';
import { ForgotFormThree } from '../components/ForgotForms/ForgotFormThree';
import { ForgotButtonThree } from '../components/ForgotButtonThree/ForgotButtonThree';
import { ForgotFormFour } from '../components/ForgotForms/ForgotFormFour';
import { ForgotButtonFour } from '../components/ForgotButtonFour/ForgotButtonFour';





interface DetermineForgotFormContentProps {
    step: number;
    setCredential(value: string): void;
    errro: boolean;
    email: string;
    phone: string;
    updateCode(value: number): void;
    valid: boolean;
    updatePassword(e: React.ChangeEvent<HTMLInputElement>): void;
    matching: boolean;
}


export function determineForgotFormContent({step, setCredential, errro, email, phone, updateCode, valid, updatePassword, matching}: DetermineForgotFormContentProps ):React.ReactElement {




    switch(step){

        case 1:
            return <ForgotFormOne setCredential={setCredential} error={errro} />;

        case 2:

            return <ForgotFormTwo email={email} phone={phone} />;
        case 3:

            return <ForgotFormThree updatacode={updateCode} valid={valid} />
        case 4:
            return <ForgotFormFour updatePassword={updatePassword} matching={matching} />

    }
    
    return <></>
  
}


interface DetermineForgotButtonProps {
    step: number;
    credential: string;
    searchUser(): Promise<void>;
    concel(): void;
    sendCode(): Promise<void>;
    formThreeActive: boolean;
    checkCode(): void;
    back(): void;
    submitNewPassword(): void;
    formFourActive: boolean;
    
}

export function determineForgotButton({step, credential, searchUser, concel, sendCode, formThreeActive, checkCode, back, submitNewPassword, formFourActive}: DetermineForgotButtonProps):React.ReactElement {

    switch(step){

        case 1:

            return <ForgotButtonOne value={credential} handleClick={searchUser} />;
        case 2:

            return <ForgotButtonTwo onConcel={concel} sendCode={sendCode} />;
        case 3:

            return <ForgotButtonThree active={formThreeActive} checkCode={checkCode} back={back} />
        case 4:
            return <ForgotButtonFour submitNewPassword={submitNewPassword} active={formFourActive} />
            
    }

    return  <></>
}
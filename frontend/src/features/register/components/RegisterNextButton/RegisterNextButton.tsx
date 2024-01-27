import React, { useState } from 'react'
import { styled } from 'styled-components'
import { StyledNextButtonProps } from '../../../../utils/GlobalInterfaces'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/Store'
import { incrementStep, registerUser, sendVerificationCode, updateUserPassword, updateUserPhone } from '../../../../redux/Slices/RegisterSlice'



export const StyledNextButton = styled.button<StyledNextButtonProps>`
    width: 75%;
    height: 52px;
    font-size: 17px;
    color: white;
    background-color: ${(props) => props.color === 'blue' ? props.theme.colors.blue : props.theme.colors.black};
    opacity: ${(props) => props.active ? 1.0 : .5};
    border-radius: 50px;
    border: none;
    cursor: ${(props) => props.active ? "pointer" : "auto"};
`



interface RegisterNextButtonProps {
    step: number
}


export function  RegisterNextButton({step}:RegisterNextButtonProps): React.ReactElement {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();


    function nextStep(){
        dispatch(incrementStep());
    }

    function sendUserInfo(){

        const user ={
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          dob: `${state.dob.year}-${state.dob.month}-${state.dob.day}`,
        }
  
        dispatch(registerUser(user));
  
      }

      function sendPhoneNumber():void {
        
        dispatch(updateUserPhone({username: state.username, phone: state.phoneNumber}));
    }

    function verifyEmail(): void {

        dispatch(sendVerificationCode({username: state.username, code: state.code}));

      }

   function sendPassword(): void {

        dispatch(updateUserPassword({username: state.username, password: state.password}));

    }


    function determineButtonContent(step:number):React.ReactElement{

        switch(step){
            case 1:

                 let stepOneActive = state.dobValid && state.emailValid && state.firstNameValid &&  state.lastNameValid; 

                return <StyledNextButton disabled={!stepOneActive} color={'black'} active={stepOneActive} onClick={nextStep}> Next </StyledNextButton>

            case 2:
                    return <StyledNextButton color={'black'} active={true} onClick={nextStep}> Next </StyledNextButton>;

            case 3:
                return <StyledNextButton onClick={sendUserInfo} color={'blue'} active={true}> Sign Up </StyledNextButton>;
            
            case 4:
                
                let stepFourActive = (state.phoneNumber && state.phoneNumberValid) ? true : false;

                return <StyledNextButton disabled={!stepFourActive} color={'black'} active={stepFourActive} onClick={sendPhoneNumber}> Update Number</StyledNextButton>;

            case 5:
                
                let stepFiveActive = state.code ? true : false;

                return <StyledNextButton active={stepFiveActive} disabled={!stepFiveActive} color={"black"} onClick={verifyEmail}> Next </StyledNextButton>;

            case 6:

                let stepSixActive = state.password.length >= 8 ? true : false;

                return <StyledNextButton active={stepSixActive} disabled={!stepSixActive} onClick={sendPassword} color={'black'}> Next </StyledNextButton>;

            default:
                return <StyledNextButton disabled={true} color={'black'} active={false} onClick={nextStep}> Next </StyledNextButton>;
        }
    }

    return determineButtonContent(step);
}
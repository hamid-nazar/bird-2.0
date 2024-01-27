import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import ValidatedTextInput from "../../../../components/ValidatedInput/ValidatedTextInput";
import {resendEmail,updateRegister,} from "../../../../redux/Slices/RegisterSlice";

import "./RegisterForm.css"
import '../../../../assets/global.css'



export function RegisterFormFive(): React.ReactElement {

  const state = useSelector((state: RootState) => state.register);

  const dispatch: AppDispatch = useDispatch();
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {

    dispatch(updateRegister({ name: "code", value: e.target.value }));
  }

  function resend(): void {
    dispatch(resendEmail(state.username));
  }

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-header-2">We sent you a code</h1>
        <p className="register-text color-gray">Enter it below to verify {state.email}</p>

        <div className="register-five-input-wrapper">

            <ValidatedTextInput
              valid={true}
              name={"code"}
              label={"Verification Code"}
              changeValue={handleChange}/>

            <p className="register-five-message color-blue" onClick={resend}> Didn't receive an email? </p>

        </div>

      </div>

    </div>
  );
}

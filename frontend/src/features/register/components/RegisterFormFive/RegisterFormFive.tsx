import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import ValidatedTextInput from "../../../../components/ValidatedInput/ValidatedTextInput";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";

import "./RegisterFormFive.css";
import {
  incrementStep,
  resendEmail,
  sendVerificationCode,
} from "../../../../redux/Slices/RegisterSlice";

export function RegisterFormFive(): React.ReactElement {
  const state = useSelector((state: RootState) => state.register);

  const dispatch: AppDispatch = useDispatch();

  const [code, setCode] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setCode(e.target.value);
  }

  function resend(): void {
    dispatch(resendEmail(state.username));
  }

  function verify(): void {
    dispatch(sendVerificationCode({ code, username: state.username }));
  }

  return (
    <div className="reg-step-five-container">
      <div className="reg-step-five-content">
        <h1>We sent you a code</h1>
        <p>Enter it below to verify {state.email}</p>

        <ValidatedTextInput
          valid={true}
          name={"code"}
          label={"Verification Code"}
          changeValue={handleChange}
        />

        <p className="reg-step-five-message" onClick={resend}>

          Didn't receive an email?
        </p>
      </div>

      <StyledNextButton
        active={code ? true : false}
        color={"black"}
        onClick={verify}>
        Next
      </StyledNextButton>
    </div>
  );
}

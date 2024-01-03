import React, { ChangeEvent, useEffect, useState } from 'react'

import "./RegisterFormOne.css"
import {ValidatedInput} from '../../../../components/ValidatedInput/ValidatedInput';


interface FormOneState{
  firstName:string;
  lastName: string;
  email: string;
  dateOfBirth: string;

}

export function RegisterFormOne(): React.ReactElement {

  const[stepOneState, setStepOneState] = useState<FormOneState>({
    firstName:"",
    lastName:"",
    email:"",
    dateOfBirth:""
  })

  function updateUser(e: ChangeEvent<HTMLInputElement>):void{
    setStepOneState({...stepOneState, [e.target.name]: e.target.value})
  }


  useEffect(function(){
    console.log("State change: ", stepOneState)
  },[stepOneState])

  return (
    <div className='reg-step-one-container'>
        
        <div className='reg-step-one-content'>

          
           <ValidatedInput name="firstName" label="First"
            errorMessage="Whats your name?" 
             changeValue={updateUser}
             validator={() => true}
             />
        

       
           <ValidatedInput name="lastName" label="Last"
            errorMessage="Whats your name?" 
             changeValue={updateUser}
             validator={() => true}
             />
        
       
           <ValidatedInput name="email" label="Email"
            errorMessage="Please enter a valid email." 
             changeValue={updateUser}
             validator={() => true}
             />



        </div>

        </div>
  )
}

import React, { useEffect, useState } from 'react'
import ValidatedDateSelector from '../../../../components/ValidatedInput/ValidatedDateSelector'
import { getDays, getMonths, getYears } from '../../../../utils/DateUtils'
import { useDispatch, useSelector } from 'react-redux';
import { updateRegister } from '../../../../redux/Slices/RegisterSlice';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { validateDob } from '../../../../services/validators';
import { Dob } from '../../../../utils/GlobalInterfaces';



interface RegisterDateInputProps {
 date:Dob
}


export function RegisterDateInput({date}:RegisterDateInputProps):React.ReactElement {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const[valid, setValid] = useState<boolean>(true);
    

    function updateState(name:string, value:string|number|boolean):void{
        
        dispatch(updateRegister({name, value}))
    }


    useEffect(function(){
      
      let {month, day, year} = state.dob;

      if (month && day && year) {

        setValid(validateDob({month, day, year}));

      } else {

        setValid(false);
        
      }

      dispatch(updateRegister({name: "dobValid", value: valid}));

    },[state.dob.day, state.dob.month, state.dob.year, state.dobValid, valid])

  return (
    <div className='register-date'>
        <ValidatedDateSelector
        style={"validated-month" }
        valid={valid} 
        name="Month"
        dropDown={getMonths}
        dispatcher={updateState}
        data={date.month}
         />

    <ValidatedDateSelector
        style={"validated-day" }
        valid={valid} 
        name="Day"
        dropDown={getDays}
        dispatcher={updateState}
        data={date.day}
         />

    <ValidatedDateSelector
        style={"validated-year" }
        valid={valid} 
        name="Year"
        dropDown={getYears}
        dispatcher={updateState}
        data={date.year}
         />
    </div>
  )
}

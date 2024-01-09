import React from "react";
import {RegisterFormOne} from "../components/RegisterFormOne/RegisterFormOne";
import { RegisterFormTwo } from "../components/RegisterFormTwo/RegisterFormTwo";
import { RegisterFormThree } from "../components/RegisterFormThree/RegisterFormThree";
import { RegisterFormFour } from "../components/RegisterFormFour/RegisterFormFour";

import data from '../../../data/codes.json';
import { RegisterFormFive } from "../components/RegisterFormFive/RegisterFormFive";
import { RegisterFormSix } from "../components/RegisterFormSix/RegisterFormSix";

export function determineModalContent(step:number):React.ReactElement {

    switch(step){
        
        case 1:
            return <RegisterFormOne/>

        case 2:
            return <RegisterFormTwo/>
        case 3:
            return <RegisterFormThree/>

        case 4:
            return <RegisterFormFour/>

        case 5:
            return <RegisterFormFive/>

        case 6:
            return <RegisterFormSix/>

        default:
            return <></>
    }
}



export function countryCodeDropDown():React.ReactElement[] {

    let options = data.filter(function(country){
         
        if (country.code !== "US") {
            return country
        }
    }).map(function(country){

        return <option  value={`${country.dial_code} ${country.name}`} key={country.dial_code}>
            
                {country.dial_code}  {country.name}
            </option>
    });

    options.unshift(<option value="+1 United States" key="US"> +1 United States </option>);

    return options;
}
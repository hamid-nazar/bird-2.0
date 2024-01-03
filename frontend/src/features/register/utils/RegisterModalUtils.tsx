import React from "react";
import {RegisterFormOne} from "../components/RegisterFormOne/RegisterFormOne";



export function determineModalContent(step:number):React.ReactElement {

    switch(step){
        
        case 1:
            return <RegisterFormOne/>

        case 2:
            return <span>Registration step 2</span>

        case 3:
            return <span>Registration step 3</span>

        case 4:
            return <span>Registration step 4</span>

        case 5:
            return <span>Registration step 5</span>

        case 6:
            return <span>Registration step 6</span>

        default:
            return <></>
    }
}
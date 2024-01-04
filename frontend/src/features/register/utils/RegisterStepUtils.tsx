import React from 'react'

import { ClearRounded, ArrowBackRounded } from '@mui/icons-material'


export function displayIcon(step:number):React.ReactElement {

    switch(step){

        case 1:
            return <ClearRounded sx={{fontSize:25}} />
        case 2:
            return <ArrowBackRounded sx={{fontSize:25}} />
        case 3:
            return <ArrowBackRounded sx={{fontSize:25}} />
        case 4:
            return <></>
        case 5:
            return <ArrowBackRounded sx={{fontSize:25}} />
        case 6:
            return <></>
        default:
            return <></>
    }
}

export function iconClass(step:number):string {

    if(step === 4 || step === 6){
        return "reg-step-counter-btn-disabled";
    }
    return "reg-step-counter-btn"
}


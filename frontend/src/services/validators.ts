import { Dob } from "../utils/GlobalInterfaces";

export function validateName(name: string): boolean {

    return name !== "";
}


  export function validateDob(dob: Dob): boolean {
    
    let {month, day, year} = dob;

    let leapYears:number[] = [];

    for(let i=2022; i>1902; i-=4){
        leapYears.push(i);
    }

    if(!month || !day || !year){
        return false;
    } else if(month === 2 && day > 29){
        return false;
    } else if (month === 2 && day === 29 && !leapYears.includes(year)){
        return false;
    } else if((month === 4 || month === 6 ||  month === 9 || month === 11) && day > 30){
        return false;
    }

    return checkAge(dob);

  }

  function checkAge(dob: Dob): boolean {

    let {month, day, year} = dob;

    let today = new Date();
    let todaysYear = today.getFullYear();
    let todaysMonth = today.getMonth();
    let todaysDay = today.getDate();

    if(todaysYear - year > 13){
        return true;
    }
    
    else if(todaysYear - year === 13){

        if(todaysMonth > month){
            return true;
        }

        else if(todaysMonth === month){
            if(todaysDay >= day){
                return true;
            }else {
                return false;
            }
        }

    }
    
    return false;
  }
    

  export function validateEmail(value:string): boolean{

    if(!value.toLocaleLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        return false;
    }

    return true;
}


export function validatePhone(phone:string): boolean{

    let stripped = phone.replace(/[^0-9]/ig, "");
    
    return stripped.length === 10;
}
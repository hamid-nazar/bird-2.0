import { Dob } from "./GlobalInterfaces";



export const MONTHS: string[] = [
    '',
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];


export function getMonths(): React.ReactElement[] {

    return MONTHS.map((month, index) => {

        if (index === 0) {
            return <option key={index} value={index}></option>
        } else {
            return <option key={index} value={index}>{month}</option>
        }
    })
}


export function getDays(): React.ReactElement[] {


    let options: React.ReactElement[] = [];

    for (let i = 0; i < 32; i++) {
        
        if (i === 0) {
            options.push(<option key={i} value={i}></option>)
        } else {
            options.push(<option key={i} value={i}>{i}</option>)  
        }
        
    }

    return options;
}

export function getYears(): React.ReactElement[] {

    let options: React.ReactElement[] = [];

    for (let i = 2024; i > 1901   ; i--) {

        if (i === 2024) {
            options.push(<option key={i} value={i}></option>)
        } else {
            options.push(<option key={i} value={i}>{i}</option>)
            
        }
    }

    return options;
}


export function stringifyDate(date: Dob): string {
    
    return `${MONTHS[date.month].substring(0, 3)} ${date.day}, ${date.year}`
}
import { useEffect, useState } from "react";




export function useLocalStorage(key:string, property:string) {


    const[value, setValue] = useState<string>(function(){
        const getValue = localStorage.getItem(key);

        if (getValue != null) {
            return getValue;
        } 

        return property;
    });


    function removeValue():void {
        
        localStorage.removeItem(key);
    }


    useEffect(function(){

        localStorage.setItem(key, value);

    }, [value]);


    return [value, setValue, removeValue] as const;
}
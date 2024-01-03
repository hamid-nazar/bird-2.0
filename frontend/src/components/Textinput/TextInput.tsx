import React, { useState } from 'react'


interface TextInputProps{
    name:string
    label:string
    errorMessage:string
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
    maxLength?:number
    validator?(value:string):boolean
}


export function TextInput({name,label,errorMessage,onChange,maxLength,validator}:TextInputProps):React.ReactElement {
  
    const[inputValue, setInputValue] = useState<string>("");

    function updateValue(e: React.ChangeEvent<HTMLInputElement>){
      onChange(e);
      setInputValue(e.target.value);
    }
  
  
    return (
    <div className='text-input'>
      <span>{label}</span>
      <input type="text" name={name}  onChange={updateValue}/>
    </div>
  )
}

 import {useEffect, useMemo, useState} from 'react';
/* uso este hook para formularios simples. No para el del expediente, por ej */
const useFormu = (formData={},formValidations={}) => {
    const[formState,setFormState]=useState(formData);
 
    const[formValidation,setFormValidation]=useState({});   
    useEffect(()=>{
        createValidators();
    },[formState])
   
  const isFormValid = useMemo(()=>{
       for (const formValue of Object.keys(formValidation)){
        console.log("formValid del hook",formValidation[formValue]);
         if(formValidation[formValue]!=null)  return false;
       }
    return true;
   },[formState])  
   
    const onInputChange = ({target})=> {    /* le estoy pasando el objeto del evento desestructurado */
          const {name,value}=target ;  /* me traigo las variables name y value */
          setFormState({
            ...formState,
            [name]:value       /* nombre de la prop , una variable y le asigno el valor */
          })  ; 
     
         }
    const onResetForm= ()=>{
        setFormState(formData) ;

        }

   const createValidators = ()=>{
         const formCheckedValues = {};
         for (const formField of Object.keys(formValidations)){
            console.log(formField,"(formField")
            const [fn,errorMessage]=formValidations[formField];
            formCheckedValues[`${formField}Valid`]=fn(formState[formField])?null:errorMessage;
            console.log("fn",fn(formState[formField]))
         }
         setFormValidation(formCheckedValues);
       
     }  
 
  return  {
      formState,
       onInputChange,
       onResetForm,
        formValidations,
        isFormValid  
  }
     /* en lugar de retornar un trozo de jsx va a retornar un objeto */
}

export default useFormu

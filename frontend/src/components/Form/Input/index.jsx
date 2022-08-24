/* Modules */
import React, { useState, useEffect } from 'react'

export default function Input({ input, label, sublabel, type, required, pattern, defaultValue, register, update, isTextarea= false, accept=null, placeholder }) {
    const [value, setValue] = useState(defaultValue ?? "");
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        register(input, setErrorMessage, handleValidation);
        update(input, defaultValue, defaultValue !== "");
    }, []);
    

    function handleValidation(val) {
        /* Vérification de chaque champ du formulaire (rempli + conforme) */
        let RegEx = RegExp(pattern);
        let isRegExOk = RegEx.test(val);
        let isRequired = required;
        /* si champ vide */
        if(isRequired === true && !val)  { 
            setErrorMessage("le champ est requis");
            update(input, val, false);
        /* si champ non conforme */
        } else if (isRegExOk === false) { 
            setErrorMessage("le champ n'est pas sous le format souhaité");
            update(input, val, false);
        /* si tout va bien */
        } else { 
            setErrorMessage("");
            update(input, val, true);
        }
    }

    return (
    <div className="form-group">
    <label htmlFor="{input}">{label}</label>
    {sublabel && <span className='sublabel'>({sublabel})</span>}
    <br />
    { !isTextarea ? (
        <input 
        type={type} 
        className="form-control" 
        id={input}
        onChange={(e) => {
            const valFile= type === "file" ? e.target.files[0] : e.target.value;
            update(input, valFile, false);
            setValue(e.target.value);
        }}
        onBlur={(e) => {handleValidation(type === "file" ? e.target.files[0] : e.target.value)}}
        maxLength={60}
        value= {value}
        required= {required}
        pattern= {pattern}
        accept={accept} />
    ) : (
        <textarea
        className="form-textarea-control"
        id={input} 
        rows={5}
        onChange={(e) => {
            update(input, e.target.value, false);
            setValue(e.target.value);
        }}
        onBlur={(e) => {handleValidation(e.target.value)}}
        maxLength={1000}
        value= {value}
        placeholder= {placeholder}
        required= {required}
        />
    )}
    <p className="input-error">{errorMessage}</p>
    </div>
    )
};
/* Modules */
import React from "react";

/* Dépendances */
import Input from '../Input'
import { accountService } from "../../../_services/account.service"

export default function SignupForm() {

    let inputs = {};
    let inputsErrorFunction = {};

    function registerInput(name, errorFunction, handleValidation) {
        inputs[name] = {value : null, isValid : false};
        inputsErrorFunction[name] = {errorFunction, handleValidation};
    }

    function updateInput(name, value, isValid) {
        inputs[name] = {value, isValid};
    }

    async function handleSignup(e) {
        e.preventDefault();

        let allInputsValid = true;

        for(const input in inputsErrorFunction) {
            inputsErrorFunction[input].handleValidation(inputs[input].value);
        }

        if (inputs.password.value !== inputs.controlPassword.value) {
            allInputsValid = false;
            inputsErrorFunction.controlPassword.errorFunction("Les mots de passe ne correspondent pas"); 
        }
        
        for(const input in inputs) {
            allInputsValid = allInputsValid && inputs[input].isValid;
        }
        
        if (allInputsValid) {

            let data = new FormData();
            data.append('name', inputs.name.value);
            data.append('firstname', inputs.firstname.value);
            data.append('job', inputs.job.value);
            data.append('email', inputs.email.value);
            data.append('image', inputs.photoUrl.value);
            data.append('password', inputs.password.value);
            
            accountService.signup(data)
            .then((res) => {
                if (res.data.errors) {
                    console.log(res.data.errors)
                } else {
                    alert("Enregistrement réussi, veuillez-vous connecter")
                    window.location = "/login"
                }
            })
            .catch((error) => 
                inputsErrorFunction.email.errorFunction(error.response.data.message)
            );
        } else {
            console.log("champs non valides");
        }
    }

    return (
        <form action="" onSubmit={handleSignup} id="signup-form" noValidate>
            <span className="signup-form-requirements">* Les champs sont requis</span>
            <br />
            <Input input={"name"} label={"* Nom"} sublabel={"entre 2 et 40 caractères"} type={"text"} required= {true} pattern= {"[a-zA-Z]{2,40}"} register={registerInput} update={updateInput} />
            <Input input={"firstname"} label={"* Prénom"} sublabel={"entre 2 et 40 caractères"} type={"text"} required= {true} pattern= {"[a-zA-Z]{2,40}"} register={registerInput} update={updateInput} />
            <Input input={"job"} label={"* Poste"} sublabel={"entre 2 et 40 caractères"} type={"text"} required= {true} pattern= {"[a-zA-Z]{2,40}"} register={registerInput} update={updateInput} />
            <Input input={"email"} label={"* Adresse Email "} sublabel={"ex: exemple@exemple.fr"} type={"email"} required= {true} pattern= {"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"} register={registerInput} update={updateInput} />
            <Input input={"photoUrl"} label={"Photo"} type={"file"} sublabel={"formats acceptés : .png, .jpg, .jpeg"} required={false} pattern= {".*"} register={registerInput} update={updateInput} accept="image/jpg, image/jpeg, image/png" />
            <Input input={"password"} label={"* Mot de Passe"} sublabel={"entre 6 et 40 caractères"} type={"password"} required= {true} pattern= {"[a-zA-Z0-9._%+-]{6,40}"} register={registerInput} update={updateInput} />
            <Input input={"controlPassword"} label={"* Confirmez votre Mot de Passe"} sublabel={"entre 6 et 40 caractères"} type={"password"} required= {true} pattern= {"[a-zA-Z0-9._%+-]{6,40}"} register={registerInput} update={updateInput} />
            <input type="submit" id="signupButton" value="S'inscrire" />
        </form>
    )
};
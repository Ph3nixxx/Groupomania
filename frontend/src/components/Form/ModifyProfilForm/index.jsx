/* Modules */
import React, { useState, useEffect } from 'react';

/* Dépendances */
import Input from '../Input'
import { accountService } from "../../../_services/account.service"

export default function ModifyProfilForm() {

    let [user, setUser] = useState(null);

    let id = localStorage.getItem("id");
    
    function getOneUser(){
        accountService.getOneUser(id)
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            console.log(err.data)
        });
    };

    useEffect(() => {
        getOneUser();
    }, []);

    let inputs = {};
    let inputsErrorFunction = {};
  
    function registerInput(name, errorFunction, handleValidation) {
        inputs[name] = {value : null, isValid : false};
        inputsErrorFunction[name] = {errorFunction, handleValidation};
    }

    function updateInput(name, value, isValid) {
        inputs[name] = {value, isValid};
    }

    async function handleModifyProfil(e) {
        e.preventDefault();

        let allInputsValid = true;

        for(const input in inputsErrorFunction) {
            inputsErrorFunction[input].handleValidation(inputs[input].value);
        }

        if(inputs.password.value !== inputs.controlPassword.value) {
            allInputsValid = false;
            inputsErrorFunction.controlPassword.errorFunction("Les mots de passe ne correspondent pas"); 
        }

        if(inputs.imageUrl && inputs.imageUrl.value && ((inputs.imageUrl.value.type !== "image/png") && (inputs.imageUrl.value.type !== "image/jpg") && (inputs.imageUrl.value.type !== "image/jpeg"))){
            allInputsValid = false;
            inputsErrorFunction.imageUrl.errorFunction("Le fichier n'est pas sous un format accepté");
        }

        for(const input in inputs) {
            allInputsValid = allInputsValid && inputs[input].isValid;
        }

        if(allInputsValid) {

            let data = new FormData();
            data.append('name', inputs.name.value);
            data.append('firstname', inputs.firstname.value);
            data.append('job', inputs.job.value);
            data.append('email', inputs.email.value);
            data.append('image', inputs.photoUrl.value);
            data.append('password', inputs.password.value);

            accountService.updateProfil(id, data)
            .then(() => {
                alert("Votre profil a bien été modifié !")
                window.location = "/home"
                }
            )
            .catch((err) => {
                console.log(err)
            });
        }
    }

    return (
        <form action="" onSubmit={handleModifyProfil} id="signup-form" noValidate>
            { user && <div>
            <span className="signup-form-requirements">* Les champs sont requis</span>
            <br /><br />
            <Input input={"name"} label={"* Nom"} sublabel={"entre 2 et 40 caractères"} type={"text"} required= {false} pattern= {"[a-zA-Z]{2,40}"} register={registerInput} update={updateInput} defaultValue={user.name} />
            <Input input={"firstname"} label={"* Prénom"} sublabel={"entre 2 et 40 caractères"} type={"text"} required= {false} pattern= {"[a-zA-Z]{2,40}"} register={registerInput} update={updateInput} defaultValue={user.firstname} />
            <Input input={"job"} label={"* Poste"} sublabel={"entre 2 et 40 caractères"} type={"text"} required= {false} pattern= {"[a-zA-Z]{2,40}"} register={registerInput} update={updateInput} defaultValue={user.job} />
            <Input input={"email"} label={"* Adresse Email"} sublabel={"ex: exemple@exemple.fr"} type={"email"} required= {false} pattern= {"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"} register={registerInput} update={updateInput} defaultValue={user.email} />
            <Input input={"photoUrl"} label={"Photo"} sublabel={"formats acceptés : .png, .jpg, .jpeg"} type={"file"} required={false} pattern= {".*"} register={registerInput} update={updateInput} accept="image/jpg, image/jpeg, image/png" />
            <Input input={"password"} label={"* Mot de Passe"} sublabel={"entre 6 et 40 caractères"} type={"password"} required= {true} pattern= {"[a-zA-Z0-9._%+-]{6,40}"} register={registerInput} update={updateInput} />
            <Input input={"controlPassword"} label={"* Confirmez votre Mot de Passe"} sublabel={"entre 6 et 40 caractères"} type={"password"} required= {true} pattern= {"[a-zA-Z0-9._%+-]{2,40}"} register={registerInput} update={updateInput} />
            <input type="submit" id="modifyButton" value="Valider les modifications" />
            </div>
            }
        </form>
    )
};
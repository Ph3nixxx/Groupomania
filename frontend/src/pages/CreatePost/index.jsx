/* Modules */
import React from 'react';
import jwt_decode from "jwt-decode";

/* Dépendances */
import Input from '../../components/Form/Input';
import { postsService } from '../../_services/posts.service';

export default function CreatePost() {

    let userId = (jwt_decode(localStorage.getItem("token"))).userId;

    let inputs = {};
    let inputsErrorFunction = {};

    function registerInput(name, errorFunction, handleValidation) {
        inputs[name] = {value : null, isValid : false};
        inputsErrorFunction[name] = {errorFunction, handleValidation};
    }

    function updateInput(name, value, isValid) {
        inputs[name] = {value, isValid};
    }

    async function handleCreatePost(e) {
        e.preventDefault();

        let allInputsValid = true;

        for(const input in inputsErrorFunction) {
            inputsErrorFunction[input].handleValidation(inputs[input].value);
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
            data.append('userId', userId);
            data.append('message', inputs.message.value);
            data.append('image', inputs.imageUrl.value);

            postsService.createPost(data)
            .then(() => {
                alert("Votre post a bien été créé !");
                window.location = "/home";
                }
            )
            .catch((err) => {
                console.log(err)
            });
        }
    }

    return (
        <form action="" onSubmit={handleCreatePost} id="signup-form" noValidate>
                <span className="signup-form-requirements">* Le champ est requis</span>
                <br />
                <Input isTextarea={true} input={"message"} label={"* Message"} sublabel={"1000 caractères maximum acceptés"} type={"text"} required={true} pattern= {".+"} register={registerInput} update={updateInput} placeholder="Insérer votre message ici"/>
                <Input input={"imageUrl"} label={"Image"} sublabel={"formats acceptés : .png, .jpg, .jpeg"} type={"file"} required={false} pattern= {".*"} register={registerInput} update={updateInput} accept="image/jpg, image/jpeg, image/png" />
                <input type="submit" id="modifyButton" value="Créer un Nouveau Post" />
        </form>
    )
};
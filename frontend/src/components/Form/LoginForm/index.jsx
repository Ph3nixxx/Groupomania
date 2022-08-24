/* Modules */
import React from "react";

/* Dépendances */
import Input from '../Input'
import { accountService } from "../../../_services/account.service"

export default function LoginForm() {

  let inputs = {};
  let inputsErrorFunction = {};

  function registerInput(name, errorFunction, handleValidation) {
    inputs[name] = {value : null, isValid : false};
    inputsErrorFunction[name] = {errorFunction, handleValidation};
  }

  function updateInput(name, value, isValid) {
    inputs[name] = {value, isValid};
  }
  
  function handleLogin(e) {
    e.preventDefault();

    let allInputsValid = true;

    for(const input in inputsErrorFunction) {
      inputsErrorFunction[input].handleValidation(inputs[input].value);
    }

    for(const input in inputs) {
      allInputsValid = allInputsValid && inputs[input].isValid;
    }
    
    if(allInputsValid) {
      accountService.login(
      {
        email : inputs.email.value,
        password : inputs.password.value
      }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.userId);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        window.location = "/home";
      } )
      .catch((error) => {
        inputsErrorFunction.email.errorFunction(error.response.data.error.email)
        inputsErrorFunction.password.errorFunction(error.response.data.error.password)
      });
    } else {
      console.log("champs non valides");
    }
  }
    
  return (
      <form action="" onSubmit={handleLogin} id="signup-form" noValidate>
        <span className="signup-form-requirements">* Les champs sont requis</span>
        <br />
        <Input input={"email"} label={"* Adresse Email"} sublabel={"ex: exemple@exemple.fr"} type={"email"}  required= {true} pattern= {"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"} register={registerInput} update={updateInput} />
        <Input input={"password"} label={"* Mot de Passe"} sublabel={"entre 6 et 40 caractères"} type={"password"} required= {true} pattern= {"[a-zA-Z0-9._%+-]{6,40}"} register={registerInput} update={updateInput} />
        <input type="submit" id="loginButton" value="Se Connecter" />
      </form>
  )
};
/* Modules */
import React from "react";
import { Link } from 'react-router-dom';

const token = localStorage.getItem("token");
const isToken = token !== null;

export default function CreateCard() {
  return (
    <div className="createCard">
          { isToken ? (<Link to="/createPost">
            Créer un Nouveau Post
          </Link>) : (
            (<Link to="/login">
            Se Connecter pour créer un Nouveau Post ou Liker un Post
          </Link>)
          )}
    </div>
  )
};
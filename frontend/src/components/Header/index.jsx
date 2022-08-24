/* Modules */
import React from "react";
import { Link } from 'react-router-dom';

/* Dépendances */
import Logo from '../../assets/regular2.png'
import Logout from '../Logout'

const token = localStorage.getItem("token");
const isToken = token !== null;

export default function Header() {

  return(
    <header>
      <nav>
        <div className="left-nav">
          <Link to="/home">
            <img alt="logo de l'entreprise Groupomania" src={Logo} />
          </Link>
        </div>

        <div className="center-nav">
            <h1>
              Réseau Social d'Entreprise
            </h1>
            <h2>
              Réunissons-nous !
            </h2>
        </div>

        {isToken ? (
        <div className="right-nav">
          <ul>
            <li>
              <Link to="/modifyProfil">
                MODIFIER MON PROFIL
              </Link>
            </li>
            <li onClick={Logout}>
              SE DECONNECTER
            </li>
          </ul>
        </div>
        ) : (
        <div className="right-nav">
          <ul>
            <li>
              <Link to="/signup">
                S'INSCRIRE
              </Link>
            </li>
            <li>
              <Link to="/login">
                SE CONNECTER
              </Link>
            </li>
          </ul>
        </div>
        )}
      </nav>
    </header>
  )
}
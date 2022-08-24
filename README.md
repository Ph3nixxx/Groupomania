# Groupomania
---

Ce projet permet à la société Groupomania de disposer d'un réseau social d'entreprise, mis à disposition de ses employés afin d'améliorer la cohésion d'équipe.

Prérequis : VSCode (téléchargement : https://code.visualstudio.com).

## Mise en place

Cloner le projet via le lien suivant : https://github.com/Ph3nixxx/Groupomania.

### Installation backend

- Mise en place d'une base de données MongoDB :

Créez un compte (ou se connecter directement si vous en possédez déjà un) sur le site internet suivant  : https://www.mongodb.com/cloud/atlas/register.
Une fois connecté, créer une base de données via le bouton "+Create".
A partir de la base de données créée, appuyez sur le bouton "Connect" puis "Connect your application". Vous devez ajouter la chaîne de caractères du petit 2, après le @ dans le fichier "config.js" du projet, dans la variable "DB_URL".
Ajoutez enfin votre nom de compte dans la variable "DB_LOGIN" et votre mot de passe dans la variable "DB_PASSWORD" de ce même fichier.

- Démarrage backend :

Dans le terminal VSCode, à partir de la racine du projet, inscrivez :

`cd backend`

`npm install`

`npm run dev`

### Installation frontend

- Rôle admin/modérateur :

Sachez que tout compte que vous créez peut devenir un administrateur.
Pour cela, une fois connectée à votre base de données sur le site MongoDB, appuyez sur le bouton "Browse Collections" de votre base de données.
Sur la gauche de votre écran, accédez à la partie "users", cela vous indiquera tous les comptes créés.
Il suffit ensuite de changer la propriété "isAdmin" du compte choisi, en indiquant la valeur "true" à la place de "false".

- Démarrage frontend :

Dans le terminal VSCode, à partir de la racine du projet, inscrivez :

`cd frontend`

`npm start`
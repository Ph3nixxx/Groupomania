/* Modules */
const express = require('express');
const router = express.Router();

/* Dépendances */
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* Permet de récupérer les informations d'un utilisateur */
router.get('/user/:id', auth, userCtrl.getOneUser);

/* Permet la création d'un compte pour un nouvel utilisateur */
router.post('/signup', multer, userCtrl.signup);

/* Permet la connexion d'un utilisateur après la création de son compte au préalable */
router.post('/login', userCtrl.login);

/* Permet la modification des données d'un utilisateur */
router.put('/update/:id', auth, multer, userCtrl.updateUser);

module.exports = router;
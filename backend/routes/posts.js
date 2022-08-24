/* Modules */
const express = require('express');
const router = express.Router();

/* Dépendances */
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* Renvoie un tableau de tous les posts de la BDD. */
router.get('/', auth, postsCtrl.getAllPosts);

/* Permet de récupérer les informations d'un seul post */
router.get('/:id', auth, postsCtrl.getOnePost);

/* Transforme le post en chaîne de caractères. Enregistre l’image et le texte dans la BDD.
Définit les likes et dislikes du post à 0. Définit les usersLiked et usersDisliked avec des tableaux vides. */
router.post('/', auth, multer, postsCtrl.createPost);

/* Met à jour le post avec l’_id fourni. Si une image est fournise à nouveau, elle est enregistré et l’ancienne est supprimée.
S’il n’y a pas de nouvelle image fournise, seules les informations sont mises à jour. */
router.put('/:id', auth, multer, postsCtrl.updatePost);

/* Supprime le post avec l’_id fourni. */
router.delete('/:id', auth, postsCtrl.deletePost);

/* Définit le statut « Like » pour l’userId fourni. */
router.post('/:id/like', auth, postsCtrl.likePost);

module.exports = router;
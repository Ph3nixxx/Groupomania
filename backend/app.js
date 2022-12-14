/* Modules */
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');

/* Dépendances */
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');

const app = express();

/* configuration de la base de données MongoDB Atlas */

mongoose.connect('mongodb+srv://' + process.env.DB_LOGIN + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !'+ error));

/* Configuration des headers pour le navigateur */

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);

module.exports = app;
/* Modules */
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Dépendances */
const User = require('../models/User');
const serverConfig = require('../config');

function isEmail(email) {
    var emailFormat=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;
    return email !== '' && email.match(emailFormat)
}

function validPassword(password) {
    return password.length >= 6;
}

exports.getOneUser = (req, res, next) => {
    User.findById({ _id: req.params.id })
    .then(user => {
        if (!user) {
            return res.status(403).json({ error: {email: 'Utilisateur non trouvé !'} });
        }

        return res.status(200).json({
                name: user.name,
                firstname: user.firstname,
                job: user.job,
                email: user.email
            });
    })
    .catch(error => res.status(500).json({ error }));
}

exports.signup = (req, res, next) => {
    if (!isEmail(req.body.email)) {
        res.status(400).json({ error : "Email invalide !" }); 
    } else if (!validPassword(req.body.password)) {
        res.status(400).json({ error : "Le mot de passe doit faire au moins 6 caractères !" }); 
    } else {
        let photoPath = "http://localhost:4200/images/default/profile.png"
        if(req.file){
            photoPath = `${req.protocol}://${req.get('host')}/images/download/${req.file.filename}`
        }

        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    name: req.body.name,
                    firstname: req.body.firstname,
                    job: req.body.job,
                    email: req.body.email,
                    photoUrl: photoPath,
                    password: hash,
                    isAdmin: false
                });
                user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ message: 'Utilisateur déjà existant !' }));
            })
            .catch(error => res.status(500).json({ error }));
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(403).json({ error: {email: 'Utilisateur non trouvé !'} });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(403).json({ error: {password: 'Mot de passe incorrect !'} });
            }
            return res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                { userId: user._id },
                serverConfig.JWT_STRING,
                { expiresIn: '1h' }
                ),
                isAdmin: user.isAdmin
            }); 
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.updateUser = (req, res, next) => {
    const userObject = req.file ?
    { ...req.body,
      photoUrl: `${req.protocol}://${req.get('host')}/images/download/${req.file.filename}`
    } : { ...req.body };

    User.findById({ _id: req.params.id })
    .then((user) => {
        if (!user) {
            return res.status(404).json({ error: new Error('Utilisateur non trouvé !') });
        }

        if (user._id != req.decoded) {
            return res.status(403).json({ error: new Error('Requête non autorisée !') });
        } else {
            if (!req.file) {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    User.findByIdAndUpdate( req.params.id, { ...userObject, password: hash }, { new : true })
                    .then((editedUser) => { return res.status(200).json( editedUser )})
                    .catch(error => { return res.status(400).json({ error })});   
                })
                .catch(error => { return res.status(500).json({ error })}); 
            } else {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const filename = user.photoUrl.split('/images/download/')[1];
                    fs.unlink(`images/download/${filename}`, () => {
                        User.findByIdAndUpdate( req.params.id, { ...userObject, password: hash }, { new : true })
                        .then((editedUser) => { return res.status(200).json( editedUser )})
                        .catch(error => { return res.status(400).json({ error })});                    
                    });
                })
            .catch(error => { return res.status(500).json({ error })});  
            }          
        }
    })
    .catch(error => res.status(500).json({ error }));
};
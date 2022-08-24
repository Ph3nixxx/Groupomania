/* Modules */
const fs = require('fs');

/* Dépendances */
const Posts = require('../models/Posts');
const User = require('../models/User');

exports.getAllPosts = (req, res, next) => {
    Posts.find().populate('userId')
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Posts.findById({ _id: req.params.id })
    .then(post => {
        if (!post) {
            return res.status(401).json({ error: {email: 'Poste non trouvé !'} });
        }

        return res.status(200).json({
            message: post.message,
            imageUrl: post.imageUrl
        });
    })
    .catch(error => res.status(500).json({ error }));
}

exports.createPost = (req, res, next) => {
    let imgPath = null;
    if(req.file){
        imgPath = `${req.protocol}://${req.get('host')}/images/download/${req.file.filename}`
    }
    const post = new Posts({
        userId: req.body.userId,
        message: req.body.message,
        imageUrl: imgPath,
        likes: 0,
        usersLiked: []
    });
    post.save()
        .then(() => res.status(201).json( post ))
        .catch(error => res.status(400).json ({ error }));
};

exports.updatePost = (req, res, next) => {
    const postObject = req.file ?
    { ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/download/${req.file.filename}`
    } : { ...req.body };
    
    User.findById({ _id: req.decoded})
    .then((user) => {
        Posts.findById({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                res.status(404).json({ error: new Error('Poste non existant !') });
            }
            if ((post.userId != req.decoded) && (user.isAdmin != true)) {
                res.status(403).json({ error: new Error('Requête non autorisée !') });
            } else {
                if (!req.file) {
                    Posts.findByIdAndUpdate( req.params.id, { ...postObject}, { new : true })
                    .then(() => res.status(200).json( post ))
                    .catch(error => res.status(400).json({ error }));                
                } else {
                    if (post.imageUrl) {
                        const filename = post.imageUrl.split('/images/download/')[1];
                        fs.unlinkSync(`images/download/${filename}`)
                    }
                        Posts.findByIdAndUpdate( req.params.id, { ...postObject}, { new : true })
                        .then(() => res.status(200).json( post ))
                        .catch(error => res.status(400).json({ error }));                         
                }
        }})
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
    User.findById({ _id: req.decoded})
    .then((user) => {
        Posts.findOne({ _id: req.params.id })
        .then((post) => {
            if(!post) {
                res.status(404).json({ error: new Error('No such Thing !') });
            }
            if((post.userId != req.decoded) && (user.isAdmin != true)) {
                res.status(403).json({ error: new Error('Unauthorized request !') });
            } else {
            if(post.imageUrl) {
                const filename = post.imageUrl.split('/images/download/')[1];
                fs.unlinkSync(`images/download/${filename}`)
            }
            Posts.deleteOne({ _id: req.params.id })
                .then(() => res.status(204).json())
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
};

exports.likePost = (req, res, next) => {
    Posts.findOne({ _id: req.params.id })
    .then((post) => {
        if(!post.usersLiked.includes(req.body.userId)){
            Posts.updateOne(
                { _id: req.params.id },
                { $push: {usersLiked: req.body.userId}}
            )
            .then((editedUser) => { return res.status(200).json( editedUser )})
            .catch(error => res.status(404).json({ error }));
        } else {
            Posts.updateOne(
                { _id: req.params.id },
                { $pull: {usersLiked: req.body.userId}}
            )
            .then((editedUser) => { return res.status(200).json( editedUser )})
            .catch(error => res.status(404).json({ error }));
        }})
    .catch(error => res.status(404).json({ error }));
};
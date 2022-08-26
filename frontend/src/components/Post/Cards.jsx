/* Modules */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

/* Dépendances */
import deletePost from "./DeleteCard";
import LikeButton from "./LikeButton";
import { postsService } from "../../_services/posts.service";

export default function Cards() {

  let [posts, setPosts] = useState(null);

/* Fonction "intermédiaire" pour eviter l'enchainement total avec le useEffect */
  function deleteCard(e) {
    deletePost(e.target.dataset.pid)
    .then(() => {
      setPosts(posts => {
        return posts.filter(post => post._id !== e.target.dataset.pid)
      })
    })
    .catch(err => console.log(err))
  }

  function getAllPosts(){
    postsService.getAllPosts()
    .then((res) => {
      console.log(res.data)
      setPosts(res.data);
    })
    .catch((err) => {
      console.log(err.data)
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="cards">
    { posts && posts.map((post) => {

      let id = (jwt_decode(localStorage.getItem("token"))).userId;
      let sameId = false;
      if (id === post.userId._id) {
        sameId = true
      }

      let isAdmin = (jwt_decode(localStorage.getItem("token"))).isAdmin;

      return(
        <div className="card" key={post._id}>
          <div className="card-top">
            <div className="card-top-profil-img">
              <img
                src={post.userId.photoUrl}
                alt="profil" 
              />
            </div>
            <div className="card-top-profil-text">
              {post.userId.firstname[0].toUpperCase() + post.userId.firstname.slice(1)} {post.userId.name.toUpperCase()}
            </div>
          </div>

          <div className="card-middle">
            <div className="card-middle-text">
              {post.message}
            </div>
            {post.imageUrl && <div className="card-middle-img">
              <img src={post.imageUrl} alt="test" />
            </div>}
          </div>

          <div className="card-bottom">
            <div className="card-bottom-like">
              <LikeButton post={post} />
            </div>
            { (sameId === true || isAdmin === true) &&
            <>
            <div className="card-bottom-edit">
              <Link to={`/modifyPost/${post._id}`}><i className="fa-regular fa-pen-to-square color fa-2x"></i></Link>
              <span>Modifier</span>
            </div>
            <div className="card-bottom-delete">
              <i className="fa-regular fa-trash-can color available-like fa-2x" data-pid={post._id} onClick={deleteCard}></i>
              <span>Supprimer</span> 
            </div> 
            </> }

          </div>
        </div> 
      )})
    }
    </div>
  )
};
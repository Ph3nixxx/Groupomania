/* Modules */
import React, { useEffect, useState } from "react";

/* Dépendances */
import { postsService } from "../../_services/posts.service";

export default function LikeButton({ post }) {

  let [liked, setLiked] = useState(false);
  let id = post._id;
  let userId = localStorage.getItem("id");

  useEffect(() => {
    if (post.usersLiked.includes(userId)){
      setLiked(true);
    }
  }, [userId, post.usersLiked, liked])

  function like(){
    postsService.likePost(id, { userId : userId })
    .then(() => {
        window.location.reload();
    })
    .catch((err) => {
        console.log(err.data)
    });
  };

  return (
    <div className="card-bottom-like">
      { (!userId || userId === post.userId._id) &&
        <i className="fa-regular fa-thumbs-up color blocked-like fa-2x" ></i>
      }
      { userId && userId !== post.userId._id && liked === false && 
        <i className="fa-regular fa-thumbs-up color available-like fa-2x" onClick={like}></i>
      }
      { userId && userId !== post.userId._id && liked === true &&
        <i className="fa-solid fa-thumbs-up color-like available-like fa-2x" onClick={like}></i>
      }
      <span>{post.usersLiked.length}</span>
    </div>
  )
};
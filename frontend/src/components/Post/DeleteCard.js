/* Dépendances */
import { postsService } from "../../_services/posts.service";

export default function deletePost(_id){
  return postsService.deletePost(_id)
};
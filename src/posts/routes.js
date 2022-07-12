import express from "express";
import { authorize } from "../utils/middlewares.js";
import { newPost, retrievePost, retrievePosts, retrievePostsByUserId,editPost } from "./controllers.js";
const router = express.Router();

router.post('/',authorize,newPost);
router.get('/',retrievePosts);
router.get('/:postId',retrievePost);
router.put('/',editPost);

export default router;


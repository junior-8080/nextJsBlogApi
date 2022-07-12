import express from "express";
import { retrievePostsByUserId } from "../posts/controllers.js";
import { authorize } from "../utils/middlewares.js";
const router = express.Router();

router.get('/:userId/posts',authorize,retrievePostsByUserId);


export default router;
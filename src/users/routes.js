import express from "express";
import { retrievePostsByUserId } from "../posts/controllers.js";
import { authorize } from "../utils/middlewares.js";
import { updateUser } from "./controllers.js";
const router = express.Router();

router.get('/:userId/posts',authorize,retrievePostsByUserId);
router.put('/',authorize,updateUser)


export default router;
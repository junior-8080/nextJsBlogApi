import mongoose from "mongoose";
import { BlogSchema } from "./schemas.js";

const Post = mongoose.model("Blog", BlogSchema);
export default Post;

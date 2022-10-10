import { createPost, fetchPosts, fetchPost, updatePost } from "./services.js";
import * as api from "../utils/api.js";

export const newPost = (req, res) => {
  const data = req.body;
  data.userId = req.user.userId;

  createPost(data)
    .then((response) => {
      return api.success(res, response);
    })
    .catch((err) => api.serverErrors(res, response));
};

export const retrievePosts = (req, res) => {
  fetchPosts()
    .then((response) => {
      return api.success(res, response);
    })
    .catch((err) => api.serverErrors(err, response));
};
export const retrievePostsByUserId = (req, res) => {
  const data = req.body;
  data.userId = req.user.userId;
  fetchPosts(data)
    .then((response) => {
      return api.success(res, response);
    })
    .catch((err) => api.serverErrors(err, response));
};

export const retrievePost = (req, res) => {
  const data = {};
  data.postId = req.params.postId;
  fetchPost(data)
    .then((response) => {
      return api.success(res, response);
    })
    .catch((err) => api.serverErrors(err, response));
};


export const editPost = (req, res) => {
  const data = req.body;
  updatePost(data)
    .then((response) =>{ api.success(res, response);console.log(response)})
    .catch((err) => api.serverErrors(res,err));
};

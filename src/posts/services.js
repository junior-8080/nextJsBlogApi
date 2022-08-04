import { resolve } from "path";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = (data) => {
  return new Promise((resolve, reject) => {
    User.findById(data.userId)
      .then((userDetails) => {
        const post = new Post({
          title: data.title,
          description: data.description,
          body: data.body,
          userId: data.userId,
          author: {
            name: userDetails.name,
            twitter: userDetails.twitter,
            instagram: userDetails.instagram,
          },
        });
        return post.save();
      })
      .then((result) => {
        let payload = {
          code: "RESOURCE_CREATED",
          message: "Post Created Successfully",
          data: {
            id: result._id,
          },
        };
        return resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const fetchPosts = (data = null) => {
  return new Promise((resolve, reject) => {
    let params = data ? { userId: data.userId } : {};
    Post.find(params)
      .then((result) => {
        let payload = {
          code: "FETCH_SUCCESS",
          message: "Post fetched successfully",
          data: result,
        };
        return resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const fetchPost = (data) => {
  return new Promise((resolve, reject) => {
    Post.findById(data.postId)
      .then((result) => {
        let payload = {
          code: "FETCH_SUCCESS",
          message: "Post fetched successfully",
          data: result,
        };
        return resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

export const updatePost = (data) => {
  return new Promise((resolve, reject) => {
    Post.updateOne({ _id: data.id }, { $set: { body: data.body } })
      .then((result) => {
        let payload = {
          code: "RESOURCE_CREATED",
          message: "Post Updated Successfully",
          data: {
            postId: data.postId,
          },
        };
        return resolve(payload);
      })
      .catch((err) => reject(err));
  });
};

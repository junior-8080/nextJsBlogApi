import User from "../models/User.js";
import { hashPassword, comparePassword, generateToken } from "../utils/utils.js";

export const newUser = (data)  => {
  return new Promise((resolve, reject) => {
    User.find({ username: data.username, email: data.email })
      .then((result) => {
        if (result[0]) {
          let payload = {
            code: "INVALID_PARAMS",
            message: "User Name or Email Already Exists",
          };
          return reject(payload);
        }
        return hashPassword(data.password);
      })
      .then((hashedPassword) => {
        const user = new User({
          username: data.username,
          password: hashedPassword,
          twitter: data.twitter,
          instagram: data.instagram,
          email: data.email,
        });
        return user.save();
      })
      .then((userData) => {
        return resolve({
          code: "RESOURCE_CREATED",
          message: "User Created Successfully",
          data: {
            postId: userData._id,
          },
        });
      })
      .catch((err) => reject(err));
  });
}

export const login = (data) => {
  return new Promise((resolve, reject) => {
     User.find({ username: data.username })
      .then((result) => {
        let user = result[0];
        if (!user) {
          let payload = {
            code: "UNAUTHORIZED",
            message: "Invalid Username or Password",
          };
          return reject(payload);
        }
        data.user = result;
        return comparePassword(data.password, user.password);
      })
      .then((result) => {
        if (!result) {
          let payload = {
            code: "UNAUTHORIZED",
            message: "Invalid Username or Password ",
          };
          return reject(payload);
        }
        let { user } = data;
        user = user[0];
         let userPayload = {
          userId : user._id,
          name: user.username,
          email: user.email,
          twitter: user.twitter,
          instagram: user.instagram,
        };
        let payload = {
          code: "FETCH_SUCCESS",
          message: "Login Successfully",
          data: {
            token: generateToken(userPayload),
            user: userPayload,
          },
        };
        return resolve(payload);
      }).catch(err => {console.log(err);reject(err)})
  });
};



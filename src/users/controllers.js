import * as api from "../utils/api.js";
import { newUser, login,updateUserDetails } from "./services.js";

export const createUser = (req, res) => {
  const data = req.body;
  newUser(data)
    .then((response) => api.success(res, response))
    .catch((err) => {
      return api.serverErrors(res, err);
    });
};

export const signin = (req, res) => {
  const data = req.body;
  login(data)
    .then((response) => {
      api.success(res, response);
    })
    .catch((err) => {
      console.log(err)
      api.serverErrors(res, err);
    });
};

export const updateUser = (req,res) => {
  const data = {
    ...req.body,
    userId:req.user.userId

  }
  updateUserDetails(data)
    .then((response) => {
      api.success(res, response);
    })
    .catch((err) => {
      console.log(err)
      api.serverErrors(res, err);
    });
}

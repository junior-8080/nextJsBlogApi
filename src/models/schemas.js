import mongoose from "mongoose";

export const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: "A",
  }
});

const Creator = mongoose.Schema({
  name: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  }
});

export const BlogSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: "String",
  },
  body: {
    type: String,
  },
  status: {
    type: String,
    default: "A",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
  },
  author: {
    type: Creator,
  }
});



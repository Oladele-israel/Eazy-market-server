import mongoose from "mongoose";

const user = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    username: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
    },
    photo: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: true,
    },
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model("Users", user);
export default users;

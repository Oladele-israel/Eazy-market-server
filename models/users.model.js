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
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const users = mongoose.model("Users", user);
export default users;

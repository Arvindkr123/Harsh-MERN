import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw Error("not valid email address");
        }
      },
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
    },

    gender: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

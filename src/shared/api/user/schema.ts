import { isEmail } from "@/shared/lib";
import mongoose, { model, Model, Schema } from "mongoose";
import { IUser } from "./models";

const UserSchema: Schema = new Schema<IUser>({
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function (v: string) {
        return isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    trim: true,
    minLength: 6,
    required: [true, "Password is required"],
  },
  timezone: {
    type: String,
  },
});

export const User: Model<IUser> =
  mongoose?.models?.User || model("User", UserSchema);

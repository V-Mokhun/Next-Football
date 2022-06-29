import { isEmail } from "@/shared/lib";
import mongoose, { model, Model, Schema } from "mongoose";
import { IViewer } from "./models";

const ViewerSchema: Schema = new Schema<IViewer>({
  email: {
    type: String,
    unique: true,
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

export const Viewer: Model<IViewer> =
  mongoose?.models?.Viewer || model("Viewer", ViewerSchema);

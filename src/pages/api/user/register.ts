import { IClientUser, User } from "@/shared/api";
import {
  connectDb,
  hashPassword,
  isEmail,
  withSessionRoute,
} from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(registerRoute);

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { method, body },
  } = req;

  if (method !== "POST") {
    return res
      .status(405)
      .json({ success: false, data: "Method is not allowed" });
  }

  try {
    await connectDb();

    if (!isEmail(body.email) || body.password.trim().length < 6) {
      return res
        .status(400)
        .json({ data: "Provide valid data", success: false });
    }

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, data: "User already exists" });
    }

    const hashedPassword = hashPassword(body.password);
    const userData: IClientUser = {
      email: body.email,
      timezone: "",
    };

    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });

    req.session.user = userData;
    await req.session.save();

    return res.status(201).json({ success: true, data: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

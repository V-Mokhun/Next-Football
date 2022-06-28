import { IClientUser, User } from "@/shared/api";
import {
  comparePasswords,
  connectDb,
  isEmail,
  withSessionRoute,
} from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

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

    const existingUser = await User.findOne({ email: body.email }).exec();
    if (!existingUser) {
      return res.status(400).json({ success: false, data: "No user found" });
    }

    const isPasswordValid = comparePasswords(
      body.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, data: "Wrong email or password" });
    }

    const userData: IClientUser = {
      email: existingUser.email,
      timezone: existingUser.timezone,
    };

    req.session.user = userData;
    await req.session.save();

    return res.status(201).json({ success: true, data: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

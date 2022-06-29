import { IClientViewer, Viewer } from "@/shared/api";
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

    const existingViewer = await Viewer.findOne({ email: body.email }).exec();
    if (!existingViewer) {
      return res.status(400).json({ success: false, data: "No user found" });
    }

    const isPasswordValid = comparePasswords(
      body.password,
      existingViewer.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, data: "Wrong email or password" });
    }

    const viewerData: IClientViewer = {
      email: existingViewer.email,
      timezone: existingViewer.timezone,
    };

    req.session.viewer = viewerData;
    await req.session.save();

    return res.status(201).json({ success: true, data: viewerData });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

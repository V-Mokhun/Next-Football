import { IClientViewer, Viewer } from "@/shared/api";
import {
  connectDb,
  hashPassword,
  isEmail,
  withSessionRoute,
} from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(registerRoute);

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
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
    if (existingViewer) {
      return res
        .status(400)
        .json({ success: false, data: "User already exists" });
    }

    const hashedPassword = hashPassword(body.password);
    const viewerData: IClientViewer = {
      email: body.email,
      timezone: "",
      favoriteLeagues: [],
      favoriteTeams: [],
    };

    const viewer = await Viewer.create({
      ...viewerData,
      password: hashedPassword,
    });

    req.session.viewer = { _id: viewer._id.toString() };
    await req.session.save();

    return res.status(201).json({ success: true, data: viewerData });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      data: error || "Something went wrong..",
      success: false,
    });
  }
}

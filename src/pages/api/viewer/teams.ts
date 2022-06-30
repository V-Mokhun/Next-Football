import { Viewer } from "@/shared/api";
import { connectDb, withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(teamsRoute);

async function teamsRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== "GET") {
    return res
      .status(405)
      .json({ success: false, data: "Method is not allowed" });
  }

  if (!req.session.viewer) {
    return res.status(401).json({
      success: false,
      data: "Not authenticated",
    });
  }

  try {
    await connectDb();

    const viewer = await Viewer.findOne({ email: req.session.viewer.email }).exec();
    if (!viewer) {
      throw new Error();
    }

    res.status(201).json({
      success: true,
      data: viewer.favoriteTeams,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

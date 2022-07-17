import { Viewer } from "@/shared/api";
import { connectDb, withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(addTeamRoute);

async function addTeamRoute(req: NextApiRequest, res: NextApiResponse) {
  const { body: team, method } = req;

  if (method !== "PATCH") {
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

  if (!team) {
    return res.status(400).json({
      success: false,
      data: "No team provided",
    });
  }

  try {
    await connectDb();

    const viewer = await Viewer.findOneAndUpdate(
      { email: req.session.viewer.email },
      { $push: { favoriteTeams: team } },
      {
        new: true,
      }
    ).exec();
    if (!viewer) {
      throw new Error();
    }

    req.session.viewer = {
      ...req.session.viewer,
      favoriteTeams: viewer.favoriteTeams,
    };
    await req.session.save();

    res.status(201).json({
      success: true,
      data: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

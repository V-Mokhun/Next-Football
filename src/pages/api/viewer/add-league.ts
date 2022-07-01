import { Viewer } from "@/shared/api";
import { connectDb, withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(addLeagueRoute);

async function addLeagueRoute(req: NextApiRequest, res: NextApiResponse) {
  const { body: league, method } = req;

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

  if (!league) {
    return res.status(400).json({
      success: false,
      data: "No league provided",
    });
  }

  try {
    await connectDb();

    const viewer = await Viewer.findOneAndUpdate(
      { email: req.session.viewer.email },
      { $push: { favoriteLeagues: league } },
      {
        new: true,
      }
    ).exec();

    if (!viewer) {
      throw new Error();
    }

    req.session.viewer = {
      ...req.session.viewer,
      favoriteLeagues: viewer.favoriteLeagues,
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

import { Viewer } from "@/shared/api";
import { connectDb, withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(removeLeagueRoute);

async function removeLeagueRoute(req: NextApiRequest, res: NextApiResponse) {
  const { body: id, method } = req;

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

  if (!id) {
    return res.status(400).json({
      success: false,
      data: "No id provided",
    });
  }

  try {
    await connectDb();

    const viewer = await Viewer.findOne({
      email: req.session.viewer.email,
    }).exec();
    if (!viewer) {
      throw new Error();
    }

    const filteredLeagues = viewer.favoriteLeagues.filter(
      (league) => league.id !== id
    );

    await viewer
      .updateOne({
        $set: {
          favoriteLeagues: filteredLeagues,
        },
      })
      .exec();

    req.session.viewer = {
      ...req.session.viewer,
      favoriteLeagues: filteredLeagues,
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

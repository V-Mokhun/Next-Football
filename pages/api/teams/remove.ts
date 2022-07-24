import { Viewer } from "@/shared/api";
import { connectDb, withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(removeTeamRoute);

async function removeTeamRoute(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { id },
    method,
  } = req;

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

    const viewer = await Viewer.findById(req.session.viewer._id);
    if (!viewer) {
      throw new Error();
    }

    const filteredTeams = viewer.favoriteTeams.filter((team) => team.id !== id);

    await viewer.updateOne({
      $set: {
        favoriteTeams: filteredTeams,
      },
    });

    res.status(201).json({
      success: true,
      data: filteredTeams,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

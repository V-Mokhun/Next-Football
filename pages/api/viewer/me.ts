import { IClientViewer, Viewer } from "@/shared/api";
import { connectDb, withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(meRoute);

async function meRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== "GET") {
    return res
      .status(405)
      .json({ success: false, data: "Method is not allowed" });
  }

  if (!req.session.viewer?._id) {
    return res.status(201).json({
      success: true,
      data: null,
    });
  }

  try {
    await connectDb();

    const viewer = await Viewer.findById(req.session.viewer._id);
    if (!viewer) {
      return res.status(400).json({ success: false, data: null });
    }

    const viewerData: IClientViewer = {
      email: viewer.email,
      timezone: viewer.timezone,
      favoriteLeagues: viewer.favoriteLeagues,
      favoriteTeams: viewer.favoriteTeams,
    };

    return res.status(201).json({
      success: true,
      data: viewerData,
    });
  } catch (error) {
    console.log(error);
    
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

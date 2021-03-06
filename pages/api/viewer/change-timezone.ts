import { Viewer } from "@/shared/api";
import { connectDb, withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(changeTimezoneRoute);

async function changeTimezoneRoute(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

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

  if (!body.timezone) {
    return res.status(400).json({
      success: false,
      data: "No timezone provided",
    });
  }

  try {
    await connectDb();

    const viewer = await Viewer.findByIdAndUpdate(req.session.viewer._id, {
      $set: { timezone: body.timezone },
    }).exec();

    if (!viewer) {
      throw new Error();
    }

    return res.status(201).json({ success: true, data: body.timezone });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

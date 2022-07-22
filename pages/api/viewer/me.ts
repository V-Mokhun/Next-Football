import { withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(meRoute);

async function meRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== "GET") {
    return res
      .status(405)
      .json({ success: false, data: "Method is not allowed" });
  }

  try {
    return res.status(201).json({
      success: true,
      data: req.session.viewer || null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

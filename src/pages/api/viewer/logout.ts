import { connectDb, withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(logoutRoute);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== "POST") {
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
    req.session.destroy();
    res.status(201).json({ success: true, data: null });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

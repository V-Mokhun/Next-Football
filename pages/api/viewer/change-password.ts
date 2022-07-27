import { Viewer } from "@/shared/api";
import {
  comparePasswords,
  connectDb,
  hashPassword,
  withSessionRoute,
} from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(changePasswordRoute);

async function changePasswordRoute(req: NextApiRequest, res: NextApiResponse) {
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

  if (
    !body.oldPassword ||
    !body.newPassword ||
    body.oldPassword.trim().length < 6 ||
    body.newPassword.trim().length < 6
  ) {
    return res.status(400).json({
      success: false,
      data: "Invalid passwords",
    });
  }

  if (body.oldPassword === body.newPassword) {
    return res.status(400).json({
      success: false,
      data: "Provided same passwords",
    });
  }

  try {
    await connectDb();

    const viewer = await Viewer.findById(req.session.viewer._id).exec();
    if (!viewer) {
      throw new Error();
    }

    const isValidPassword = comparePasswords(body.oldPassword, viewer.password);
    if (!isValidPassword) {
      res.status(400).json({
        success: false,
        data: "Provided password doesn't match your current password",
      });
    }

    const hashedNewPassword = hashPassword(body.newPassword);
    await viewer.updateOne({ $set: { password: hashedNewPassword } });

    res.status(201).json({ success: true, data: null });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

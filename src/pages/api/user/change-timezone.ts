import { User } from "@/shared/api";
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

  if (!req.session.user) {
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

    const user = await User.findOneAndUpdate(
      { email: req.session.user.email },
      { $set: { timezone: body.timezone } },
      { new: true }
    );

    if (!user) {
      throw new Error();
    }

    const userData = {
      email: user.email,
      timezone: user.timezone,
    };

    req.session.user = userData;
    await req.session.save();

    return res.status(201).json({ success: true, data: body.timezone });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Something went wrong..", success: false });
  }
}

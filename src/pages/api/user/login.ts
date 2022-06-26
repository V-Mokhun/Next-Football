import { withSessionRoute } from "@/shared/lib";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:

  // req.session.user = {
		
  // };

  await req.session.save();
  res.send("Logged in");
}

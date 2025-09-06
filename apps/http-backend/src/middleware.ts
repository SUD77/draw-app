// import { NextFunction, Request, Response } from "express";
// import { JWT_SECRET } from "./config";

// const jwt = require("jsonwebtoken");


// export function middleware(req: Request, res: Response, next: NextFunction){

//   const token=req.headers("authorization") ?? "";

//   const decoded=jwt.verify(token,JWT_SECRET);

//   if(decoded.userId){
//     //@ts-ignore: TODO: Fix this
//     req.userId=decoded.userId;
//     next();
//   }else{
//     res.status(403).json({
//       message: "Unauthorized"
//     })
//   }
// }


import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

// Add userId to Express.Request (no more ts-ignore)
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function middleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.get("authorization"); // or req.header("authorization")
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = auth.slice(7); // strip "Bearer "
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as string | JwtPayload;

    // decoded could be a string (if the token was signed with a string payload)
    if (typeof decoded !== "string" && decoded.userId) {
      req.userId = String(decoded.userId);
      return next();
    }

    return res.status(401).json({ message: "Unauthorized" });
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

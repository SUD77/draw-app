import express from "express";
import { Jwt } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema } from "@repo/common/types";

const app = express();
const jwt = require("jsonwebtoken");

app.post("/signup", (req, res) => {
  //db call

  const data = CreateUserSchema.safeParse(req.body);

  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  res.json({
    userId: "123",
  });
});

app.post("/singin", (req, res) => {
  const userId = 1;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});

app.post("/room", middleware, (req, res) => {
  res.json({
    roomId: 123,
  });
});

app.listen(3001);

import express from "express";
import { Jwt } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";

const app = express();
const jwt = require("jsonwebtoken");

app.post("/singup", (req, res) => {
  //db call
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

import express from "express";
import helmet from "helmet";
import noCache from "nocache";
import cors from "cors";
import * as dotenv from "dotenv";

import db from "../src/models";
import { json } from "stream/consumers";

dotenv.config();

const app = express();

app.use(cors());
app.use(noCache());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/hook", (req, res) => {
  const { event, data } = req.body;
  const email = data.customer.email;
  let authorization = data.authorization;

  authorization = JSON.stringify(authorization);

  if (event === "charge.success") {
    const user = db.User.create({
      email,
      authorization,
    });
  }
  res.status(200).json({ msg: "success" });
});
app.get("/", (_req, res) => {
  res.end("Works!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚨 Server is listening at http://localhost:${PORT}`);
});

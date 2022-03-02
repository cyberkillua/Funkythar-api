import express from "express";
import helmet from "helmet";
import noCache from "nocache";
import cors from "cors";
import * as dotenv from "dotenv";

import db from "../src/models";

import {
  chargeCustomers,
  createCustomerInfo,
} from "./controllers/customerInfo";

dotenv.config();

const app = express();

app.use(cors());
app.use(noCache());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/customerInfo", createCustomerInfo);
app.post("/chargeCustomers", chargeCustomers);

app.post("/hook", async (req, res) => {
  const { event, data } = req.body;
  const email = data.customer?.email;
  let authorization = data.authorization;

  authorization = JSON.stringify(authorization);
  try {
    await db.Customer.create({
      email,
      authorization,
    });

    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
});
app.get("/", (_req, res) => {
  res.end("Works!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚨 Server is listening at http://localhost:${PORT}`);
});

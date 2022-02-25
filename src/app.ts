import express from "express";
import helmet from "helmet";
import noCache from "nocache";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(noCache());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/hook", (req, res) => {
  var event = req.body;
  console.log(event);
  res.status(200).json({ msg: "success", event });
});
app.get("/", (_req, res) => {
  res.end("Works!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚨 Server is listening at http://localhost:${PORT}`);
});

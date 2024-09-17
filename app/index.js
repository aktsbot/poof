import express from "express";
import morgan from "morgan";

import config from "./config.js";

const app = express();

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  return res.json({});
});

app.listen(config.port, () => {
  console.log(`[${config.appName}] server listening on port ${config.port}`);
  console.log(`base path: ${config.basePath}`);
});

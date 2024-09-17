import { Router } from "express";

import db from "./db.js";
import config from "./config.js";

import { makePoofId, pageHtml } from "./utils.js";

const router = Router();

// home page where the user can create a poof message
router.get("/", (req, res) => {
  return res.send(pageHtml.home());
});

// after creating a poof, they see this page
router.get("/done/:id", (req, res) => {
  const fullUrl =
    req.protocol +
    "://" +
    req.get("host") +
    `${config.basePath}/p/${req.params.id}`;
  return res.send(pageHtml.done({ fullUrl }));
});

// the actual page where the user can see the poof
router.get("/p/:id", (req, res) => {
  let poof = "";
  let html = pageHtml.view({ poof: "", showWarning: true });
  if (req.query.view == 1) {
    const result = db.get(`SELECT id, poof FROM poofs WHERE id = ?`, [
      req.params.id,
    ]);
    if (result && result.poof) {
      poof = result.poof;
      // delete after view
      db.run(`DELETE FROM poofs where id = @id`, { id: req.params.id });
    }
    html = pageHtml.view({ poof, showWarning: false });
  }
  return res.send(html);
});

// creating a poof
router.post("/", (req, res, next) => {
  if (!req.body.poof) {
    let error = new Error("poof not provided");
    error.statusCode = 400;
    throw error;
  }

  const poof = {
    id: makePoofId(),
    poof: req.body.poof,
  };

  const result = db.run(
    "INSERT INTO poofs (id, poof) VALUES (@id, @poof)",
    poof,
  );
  return res.redirect(`${config.basePath}/done/${poof.id}`);
});

export default router;

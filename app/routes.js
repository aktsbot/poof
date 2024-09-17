import { Router } from "express";

const router = Router();

// home page where the user can create a poof message
router.get("/", (req, res) => {
  return res.send("home page");
});

// after creating a poof, they see this page
router.get("/done/:id", (req, res) => {
  return res.send("done page");
});

// the actual page where the user can see the poof
router.get("/p/:id", (req, res) => {
  return res.send("view one page");
});

export default router;

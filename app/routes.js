import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("home page");
});

export default router;

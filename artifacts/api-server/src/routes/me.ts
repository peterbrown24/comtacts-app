import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/me", (_req, res) => {
  res.json({
    id: 1,
    name: "Alex Johnson",
    email: "alex@comtacts.inc",
    avatarInitials: "AJ",
    title: "Product Manager",
  });
});

export default router;

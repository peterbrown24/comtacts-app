import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/security/status", async (req, res) => {
  res.json({
    encryption: {
      algorithm: "AES-256-GCM",
      messagesEncrypted: true,
      atRest: true,
      inTransit: true,
    },
    headers: {
      hsts: true,
      xssProtection: true,
      contentTypeOptions: true,
      frameOptions: true,
    },
    rateLimit: {
      enabled: true,
      maxRequests: 120,
      windowMs: 60000,
    },
    inputSanitization: true,
  });
});

export default router;

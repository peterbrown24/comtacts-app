import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactsRouter from "./contacts";
import conversationsRouter from "./conversations";
import channelsRouter from "./channels";
import meRouter from "./me";
import referralsRouter from "./referrals";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactsRouter);
router.use(conversationsRouter);
router.use(channelsRouter);
router.use(meRouter);
router.use(referralsRouter);

export default router;

import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactsRouter from "./contacts";
import conversationsRouter from "./conversations";
import channelsRouter from "./channels";
import meRouter from "./me";
import referralsRouter from "./referrals";
import companiesRouter from "./companies";
import securityRouter from "./security";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactsRouter);
router.use(conversationsRouter);
router.use(channelsRouter);
router.use(meRouter);
router.use(referralsRouter);
router.use(companiesRouter);
router.use(securityRouter);

export default router;

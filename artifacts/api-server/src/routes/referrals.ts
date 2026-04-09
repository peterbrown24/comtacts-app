import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable, referralsTable } from "@workspace/db/schema";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

const REWARD_TIERS = [
  { count: 1, rewardDays: 7, label: "1 referral → 1 free week" },
  { count: 3, rewardDays: 30, label: "3 referrals → 1 free month" },
  { count: 5, rewardDays: 90, label: "5 referrals → 3 free months" },
  { count: 10, rewardDays: 365, label: "10 referrals → 1 free year" },
];

router.get("/me/referrals", async (_req, res) => {
  const [user] = await db
    .select({
      id: contactsTable.id,
      name: contactsTable.name,
      handle: contactsTable.handle,
    })
    .from(contactsTable)
    .where(eq(contactsTable.id, 1));

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const handle = user.handle ?? `@user${user.id}`;
  const referralCode = handle.replace("@", "").toUpperCase();

  const referrals = await db
    .select()
    .from(referralsTable)
    .where(eq(referralsTable.referrerId, 1));

  const completedCount = referrals.filter(
    (r) => r.status === "completed" || r.status === "rewarded"
  ).length;

  const totalRewardDays = referrals.reduce((sum, r) => sum + r.rewardDays, 0);

  const currentTier = REWARD_TIERS.filter((t) => completedCount >= t.count).pop() ?? null;
  const nextTier = REWARD_TIERS.find((t) => completedCount < t.count) ?? null;

  res.json({
    referralCode,
    totalReferrals: referrals.length,
    completedReferrals: completedCount,
    totalRewardDays,
    currentTier: currentTier ? currentTier.label : null,
    nextTier: nextTier ? { ...nextTier, remaining: nextTier.count - completedCount } : null,
    tiers: REWARD_TIERS,
    referrals: referrals.map((r) => ({
      id: r.id,
      referredName: r.referredName,
      status: r.status,
      rewardDays: r.rewardDays,
      createdAt: r.createdAt?.toISOString(),
      completedAt: r.completedAt?.toISOString() ?? null,
    })),
  });
});

router.post("/referrals/redeem", async (req, res) => {
  const { code, name } = req.body;

  if (!code || typeof code !== "string") {
    res.status(400).json({ error: "Referral code is required" });
    return;
  }

  const normalizedCode = code.trim().toUpperCase();

  const [referrer] = await db
    .select({ id: contactsTable.id, handle: contactsTable.handle })
    .from(contactsTable)
    .where(
      eq(
        sql`UPPER(REPLACE(${contactsTable.handle}, '@', ''))`,
        normalizedCode
      )
    );

  if (!referrer) {
    res.status(404).json({ error: "Invalid referral code" });
    return;
  }

  if (referrer.id === 1) {
    res.status(400).json({ error: "You cannot use your own referral code" });
    return;
  }

  const completedCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(referralsTable)
    .where(eq(referralsTable.referrerId, referrer.id));

  const count = Number(completedCount[0].count) + 1;
  const tier = REWARD_TIERS.filter((t) => count >= t.count).pop();
  const rewardDays = tier ? tier.rewardDays : 0;

  const [referral] = await db
    .insert(referralsTable)
    .values({
      referrerId: referrer.id,
      referredId: null,
      referredName: name || "New User",
      status: "completed",
      rewardDays,
      completedAt: new Date(),
    })
    .returning();

  res.json({ success: true, referral });
});

export default router;

import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/me", async (_req, res) => {
  const [alex] = await db.select().from(contactsTable).where(eq(contactsTable.id, 1));
  if (!alex) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json({
    id: alex.id,
    name: alex.name,
    handle: alex.handle ?? undefined,
    email: alex.email,
    phone: alex.phone ?? undefined,
    company: alex.company ?? undefined,
    title: alex.title ?? undefined,
    mobilePhone: alex.mobilePhone ?? undefined,
    personalEmail: alex.personalEmail ?? undefined,
    avatarInitials: alex.avatarInitials,
    status: alex.status,
  });
});

export default router;

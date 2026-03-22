import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/contacts", async (req, res) => {
  const contacts = await db.select().from(contactsTable).orderBy(contactsTable.name);
  res.json(contacts.map(c => ({
    ...c,
    phone: c.phone ?? undefined,
    company: c.company ?? undefined,
    title: c.title ?? undefined,
  })));
});

router.post("/contacts", async (req, res) => {
  const { name, email, phone, company, title } = req.body;
  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }
  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const [contact] = await db.insert(contactsTable).values({
    name, email,
    phone: phone || null,
    company: company || null,
    title: title || null,
    avatarInitials: initials,
    status: "offline",
  }).returning();
  res.status(201).json({
    ...contact,
    phone: contact.phone ?? undefined,
    company: contact.company ?? undefined,
    title: contact.title ?? undefined,
  });
});

router.delete("/contacts/:contactId", async (req, res) => {
  const id = parseInt(req.params.contactId);
  await db.delete(contactsTable).where(eq(contactsTable.id, id));
  res.json({ success: true });
});

export default router;

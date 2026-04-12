import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/contacts", async (req, res) => {
  const contacts = await db.select().from(contactsTable).orderBy(contactsTable.name);
  res.json(contacts.map(c => ({
    id: c.id,
    name: c.name,
    handle: c.handle ?? undefined,
    contactType: c.contactType ?? undefined,
    email: c.email,
    phone: c.phone ?? undefined,
    company: c.company ?? undefined,
    companyId: c.companyId ?? undefined,
    title: c.title ?? undefined,
    mobilePhone: c.mobilePhone ?? undefined,
    personalEmail: c.personalEmail ?? undefined,
    avatarInitials: c.avatarInitials,
    status: c.status,
    linkedIn: c.linkedIn ?? undefined,
    twitter: c.twitter ?? undefined,
    instagram: c.instagram ?? undefined,
    facebook: c.facebook ?? undefined,
    createdAt: c.createdAt,
  })));
});

router.post("/contacts", async (req, res) => {
  const { name, email, phone, company, title, mobilePhone, personalEmail, handle, contactType, linkedIn, twitter, instagram, facebook } = req.body;
  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }
  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const [contact] = await db.insert(contactsTable).values({
    name,
    handle: handle || null,
    contactType: contactType || null,
    email,
    phone: phone || null,
    company: company || null,
    title: title || null,
    mobilePhone: mobilePhone || null,
    personalEmail: personalEmail || null,
    avatarInitials: initials,
    status: "offline",
    linkedIn: linkedIn || null,
    twitter: twitter || null,
    instagram: instagram || null,
    facebook: facebook || null,
  }).returning();
  res.status(201).json({
    id: contact.id,
    name: contact.name,
    handle: contact.handle ?? undefined,
    contactType: contact.contactType ?? undefined,
    email: contact.email,
    phone: contact.phone ?? undefined,
    company: contact.company ?? undefined,
    title: contact.title ?? undefined,
    avatarInitials: contact.avatarInitials,
    status: contact.status,
    linkedIn: contact.linkedIn ?? undefined,
    twitter: contact.twitter ?? undefined,
    instagram: contact.instagram ?? undefined,
    facebook: contact.facebook ?? undefined,
    createdAt: contact.createdAt,
  });
});

router.delete("/contacts/:contactId", async (req, res) => {
  const id = parseInt(req.params.contactId);
  await db.delete(contactsTable).where(eq(contactsTable.id, id));
  res.json({ success: true });
});

export default router;

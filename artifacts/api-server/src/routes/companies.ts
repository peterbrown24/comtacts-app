import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { companiesTable, contactsTable } from "@workspace/db/schema";
import { eq, ilike, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/companies", async (req, res) => {
  const search = req.query.search as string | undefined;
  let companies;
  if (search && search.trim()) {
    companies = await db.select().from(companiesTable).where(ilike(companiesTable.name, `%${search.trim()}%`)).orderBy(companiesTable.name);
  } else {
    companies = await db.select().from(companiesTable).orderBy(companiesTable.name);
  }

  const results = await Promise.all(companies.map(async (c) => {
    const members = await db.select({ count: sql<number>`count(*)` }).from(contactsTable).where(eq(contactsTable.companyId, c.id));
    return {
      id: c.id,
      name: c.name,
      industry: c.industry ?? undefined,
      location: c.location ?? undefined,
      website: c.website ?? undefined,
      logoInitials: c.logoInitials,
      memberCount: Number(members[0].count),
      createdAt: c.createdAt,
    };
  }));

  res.json(results);
});

router.get("/companies/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [company] = await db.select().from(companiesTable).where(eq(companiesTable.id, id));
  if (!company) {
    res.status(404).json({ error: "Company not found" });
    return;
  }

  const members = await db.select().from(contactsTable).where(eq(contactsTable.companyId, id)).orderBy(contactsTable.name);

  res.json({
    id: company.id,
    name: company.name,
    industry: company.industry ?? undefined,
    location: company.location ?? undefined,
    website: company.website ?? undefined,
    logoInitials: company.logoInitials,
    createdAt: company.createdAt,
    members: members.map(m => ({
      id: m.id,
      name: m.name,
      handle: m.handle ?? undefined,
      email: m.email,
      title: m.title ?? undefined,
      avatarInitials: m.avatarInitials,
      status: m.status,
    })),
  });
});

router.post("/companies", async (req, res) => {
  const { name, industry, location, website } = req.body;
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  const initials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
  const [company] = await db.insert(companiesTable).values({
    name,
    industry: industry || null,
    location: location || null,
    website: website || null,
    logoInitials: initials,
  }).returning();
  res.status(201).json({
    id: company.id,
    name: company.name,
    industry: company.industry ?? undefined,
    location: company.location ?? undefined,
    website: company.website ?? undefined,
    logoInitials: company.logoInitials,
    createdAt: company.createdAt,
  });
});

router.post("/register", async (req, res) => {
  const { name, email, handle, companyId, companyName, companyIndustry, companyLocation, companyWebsite, title, phone, mobilePhone, personalEmail, linkedIn, twitter, instagram, facebook } = req.body;
  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }

  let finalCompanyId = companyId;
  let companyDisplayName = "";

  if (!finalCompanyId && companyName) {
    const initials = companyName.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
    const [newCompany] = await db.insert(companiesTable).values({
      name: companyName,
      industry: companyIndustry || null,
      location: companyLocation || null,
      website: companyWebsite || null,
      logoInitials: initials,
    }).returning();
    finalCompanyId = newCompany.id;
    companyDisplayName = newCompany.name;
  } else if (finalCompanyId) {
    const [existing] = await db.select().from(companiesTable).where(eq(companiesTable.id, finalCompanyId));
    companyDisplayName = existing?.name || "";
  }

  const avatarInitials = name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);

  const [contact] = await db.insert(contactsTable).values({
    name,
    email,
    handle: handle || null,
    company: companyDisplayName || null,
    companyId: finalCompanyId || null,
    title: title || null,
    phone: phone || null,
    mobilePhone: mobilePhone || null,
    personalEmail: personalEmail || null,
    avatarInitials,
    status: "online",
    linkedIn: linkedIn || null,
    twitter: twitter || null,
    instagram: instagram || null,
    facebook: facebook || null,
  }).returning();

  res.status(201).json({
    id: contact.id,
    name: contact.name,
    handle: contact.handle ?? undefined,
    email: contact.email,
    company: contact.company ?? undefined,
    companyId: contact.companyId ?? undefined,
    title: contact.title ?? undefined,
    avatarInitials: contact.avatarInitials,
    status: contact.status,
  });
});

export default router;

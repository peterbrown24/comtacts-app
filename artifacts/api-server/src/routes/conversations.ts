import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable, conversationsTable, messagesTable } from "@workspace/db/schema";
import { eq, and, desc } from "drizzle-orm";

const router: IRouter = Router();

const ME = { name: "Alex Johnson", initials: "AJ" };

router.get("/conversations", async (req, res) => {
  const convos = await db.select().from(conversationsTable).orderBy(desc(conversationsTable.createdAt));
  const result = await Promise.all(convos.map(async (c) => {
    const contact = await db.select().from(contactsTable).where(eq(contactsTable.id, c.contactId)).limit(1);
    const lastMsgs = await db.select().from(messagesTable)
      .where(eq(messagesTable.conversationId, c.id))
      .orderBy(desc(messagesTable.createdAt)).limit(1);
    const unread = await db.select().from(messagesTable)
      .where(and(eq(messagesTable.conversationId, c.id), eq(messagesTable.isMine, "false")));
    const ct = contact[0];
    if (!ct) return null;
    return {
      id: c.id,
      contactId: ct.id,
      contactName: ct.name,
      contactAvatarInitials: ct.avatarInitials,
      contactStatus: ct.status,
      lastMessage: lastMsgs[0]?.body ?? null,
      lastMessageAt: lastMsgs[0]?.createdAt?.toISOString() ?? null,
      unreadCount: unread.length,
    };
  }));
  res.json(result.filter(Boolean));
});

router.post("/conversations", async (req, res) => {
  const { contactId } = req.body;
  if (!contactId) {
    res.status(400).json({ error: "contactId is required" });
    return;
  }
  const existing = await db.select().from(conversationsTable).where(eq(conversationsTable.contactId, contactId)).limit(1);
  if (existing[0]) {
    const contact = await db.select().from(contactsTable).where(eq(contactsTable.id, contactId)).limit(1);
    const ct = contact[0];
    res.status(201).json({
      id: existing[0].id,
      contactId: ct!.id,
      contactName: ct!.name,
      contactAvatarInitials: ct!.avatarInitials,
      contactStatus: ct!.status,
      lastMessage: null,
      lastMessageAt: null,
      unreadCount: 0,
    });
    return;
  }
  const [convo] = await db.insert(conversationsTable).values({ contactId }).returning();
  const contact = await db.select().from(contactsTable).where(eq(contactsTable.id, contactId)).limit(1);
  const ct = contact[0];
  res.status(201).json({
    id: convo.id,
    contactId: ct!.id,
    contactName: ct!.name,
    contactAvatarInitials: ct!.avatarInitials,
    contactStatus: ct!.status,
    lastMessage: null,
    lastMessageAt: null,
    unreadCount: 0,
  });
});

router.get("/conversations/:conversationId/messages", async (req, res) => {
  const id = parseInt(req.params.conversationId);
  const msgs = await db.select().from(messagesTable)
    .where(eq(messagesTable.conversationId, id))
    .orderBy(messagesTable.createdAt);
  res.json(msgs.map(m => ({
    id: m.id,
    body: m.body,
    senderName: m.senderName,
    senderInitials: m.senderInitials,
    isMine: m.isMine === "true",
    createdAt: m.createdAt.toISOString(),
  })));
});

router.post("/conversations/:conversationId/messages", async (req, res) => {
  const id = parseInt(req.params.conversationId);
  const { body } = req.body;
  if (!body) {
    res.status(400).json({ error: "body is required" });
    return;
  }
  const [msg] = await db.insert(messagesTable).values({
    body,
    senderName: ME.name,
    senderInitials: ME.initials,
    isMine: "true",
    conversationId: id,
    channelId: 0,
  }).returning();
  res.status(201).json({
    id: msg.id,
    body: msg.body,
    senderName: msg.senderName,
    senderInitials: msg.senderInitials,
    isMine: true,
    createdAt: msg.createdAt.toISOString(),
  });
});

export default router;

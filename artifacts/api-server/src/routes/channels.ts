import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { channelsTable, messagesTable } from "@workspace/db/schema";
import { eq, and, desc, isNull } from "drizzle-orm";

const router: IRouter = Router();

const ME = { name: "Alex Johnson", initials: "AJ" };

router.get("/channels", async (req, res) => {
  const channels = await db.select().from(channelsTable).orderBy(channelsTable.name);
  const result = await Promise.all(channels.map(async (ch) => {
    const lastMsgs = await db.select().from(messagesTable)
      .where(eq(messagesTable.channelId, ch.id))
      .orderBy(desc(messagesTable.createdAt)).limit(1);
    const allMsgs = await db.select().from(messagesTable).where(eq(messagesTable.channelId, ch.id));
    return {
      id: ch.id,
      name: ch.name,
      description: ch.description ?? undefined,
      memberCount: ch.memberCount,
      lastMessage: lastMsgs[0]?.body ?? null,
      lastMessageAt: lastMsgs[0]?.createdAt?.toISOString() ?? null,
      unreadCount: allMsgs.filter(m => m.isMine === "false").length,
    };
  }));
  res.json(result);
});

router.post("/channels", async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  const [channel] = await db.insert(channelsTable).values({
    name,
    description: description || null,
  }).returning();
  res.status(201).json({
    id: channel.id,
    name: channel.name,
    description: channel.description ?? undefined,
    memberCount: channel.memberCount,
    lastMessage: null,
    lastMessageAt: null,
    unreadCount: 0,
  });
});

router.get("/channels/:channelId/messages", async (req, res) => {
  const id = parseInt(req.params.channelId);
  const msgs = await db.select().from(messagesTable)
    .where(eq(messagesTable.channelId, id))
    .orderBy(messagesTable.createdAt);
  res.json(msgs.map(m => ({
    id: m.id,
    body: m.body,
    senderName: m.senderName,
    senderInitials: m.senderInitials,
    isMine: m.isMine === "true",
    readAt: m.readAt?.toISOString() ?? null,
    createdAt: m.createdAt.toISOString(),
  })));
});

router.post("/channels/:channelId/messages", async (req, res) => {
  const id = parseInt(req.params.channelId);
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
    conversationId: 0,
    channelId: id,
  }).returning();
  res.status(201).json({
    id: msg.id,
    body: msg.body,
    senderName: msg.senderName,
    senderInitials: msg.senderInitials,
    isMine: true,
    readAt: null,
    createdAt: msg.createdAt.toISOString(),
  });
});

router.patch("/channels/:channelId/messages/read", async (req, res) => {
  const channelId = parseInt(req.params.channelId);
  const now = new Date();
  await db.update(messagesTable)
    .set({ readAt: now })
    .where(
      and(
        eq(messagesTable.channelId, channelId),
        eq(messagesTable.isMine, "true"),
        isNull(messagesTable.readAt),
      )
    );
  res.json({ success: true, readAt: now.toISOString() });
});

export default router;

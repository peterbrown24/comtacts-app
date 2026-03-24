import { pgTable, text, serial, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const statusEnum = pgEnum("status", ["online", "away", "offline"]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  title: text("title").notNull().default(""),
  avatarInitials: text("avatar_initials").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactsTable = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  title: text("title"),
  mobilePhone: text("mobile_phone"),
  personalEmail: text("personal_email"),
  avatarInitials: text("avatar_initials").notNull(),
  status: statusEnum("status").notNull().default("offline"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const conversationsTable = pgTable("conversations", {
  id: serial("id").primaryKey(),
  contactId: serial("contact_id").references(() => contactsTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const channelsTable = pgTable("channels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  memberCount: serial("member_count"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  body: text("body").notNull(),
  senderName: text("sender_name").notNull(),
  senderInitials: text("sender_initials").notNull(),
  isMine: text("is_mine").notNull().default("false"),
  conversationId: serial("conversation_id"),
  channelId: serial("channel_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactsTable).omit({ id: true, createdAt: true });
export const insertChannelSchema = createInsertSchema(channelsTable).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messagesTable).omit({ id: true, createdAt: true });

export type Contact = typeof contactsTable.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Channel = typeof channelsTable.$inferSelect;
export type Message = typeof messagesTable.$inferSelect;

import { pgTable, text, serial, timestamp, pgEnum, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const statusEnum = pgEnum("status", ["online", "away", "offline"]);
export const contactTypeEnum = pgEnum("contact_type", ["vendor", "merchant"]);
export const referralStatusEnum = pgEnum("referral_status", ["pending", "completed", "rewarded"]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  title: text("title").notNull().default(""),
  avatarInitials: text("avatar_initials").notNull(),
  referralCode: text("referral_code").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactsTable = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  handle: text("handle"),
  contactType: contactTypeEnum("contact_type"),
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
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const referralsTable = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrer_id").notNull().references(() => contactsTable.id),
  referredId: integer("referred_id").references(() => contactsTable.id),
  referredName: text("referred_name"),
  status: referralStatusEnum("status").notNull().default("pending"),
  rewardDays: integer("reward_days").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertContactSchema = createInsertSchema(contactsTable).omit({ id: true, createdAt: true });
export const insertChannelSchema = createInsertSchema(channelsTable).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messagesTable).omit({ id: true, createdAt: true });

export type Contact = typeof contactsTable.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Channel = typeof channelsTable.$inferSelect;
export type Message = typeof messagesTable.$inferSelect;
export type Referral = typeof referralsTable.$inferSelect;

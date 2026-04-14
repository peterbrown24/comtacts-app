import type { Contact } from "@workspace/api-client-react";

export interface OfflineChannel {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

export interface OfflineConversation {
  id: number;
  contactId: number;
  contactName: string;
  contactInitials: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

export interface OfflineMessage {
  id: number;
  body: string;
  senderName: string;
  senderInitials: string;
  isMine: boolean;
  createdAt: string;
}

const now = Date.now();
const ago = (minutes: number) => new Date(now - minutes * 60000).toISOString();

export const SEED_CONTACTS: Contact[] = [
  { id: 1, name: "Alex Johnson", handle: "@alexjohnson", email: "alex.johnson@comtacts.inc", phone: "+1 (555) 800-0100", company: "Comt@cts, Inc.", title: "Chief Executive Officer", mobilePhone: "+1 (555) 800-0199", personalEmail: "alex.j@personal.com", avatarInitials: "AJ", status: "online", contactType: undefined, linkedIn: "alexjohnson", twitter: "alexjceo", instagram: "alexjohnson.ceo", facebook: "alex.johnson.comtacts" },
  { id: 2, name: "Maria Santos", handle: "@mariasantos", email: "maria.santos@comtacts.inc", phone: "+1 (555) 210-0301", company: "Comt@cts, Inc.", title: "Shipping Coordinator", avatarInitials: "MS", status: "online", contactType: undefined },
  { id: 3, name: "Derek Walsh", handle: "@derekwalsh", email: "derek.walsh@comtacts.inc", phone: "+1 (555) 210-0302", company: "Comt@cts, Inc.", title: "Shipping Supervisor", avatarInitials: "DW", status: "away", contactType: undefined },
  { id: 4, name: "Priya Patel", handle: "@priyapatel", email: "priya.patel@comtacts.inc", phone: "+1 (555) 210-0401", company: "Comt@cts, Inc.", title: "Receiving Manager", avatarInitials: "PP", status: "online", contactType: undefined },
  { id: 5, name: "James Okafor", handle: "@jamesokafor", email: "james.okafor@comtacts.inc", phone: "+1 (555) 210-0402", company: "Comt@cts, Inc.", title: "Receiving Associate", avatarInitials: "JO", status: "offline", contactType: undefined },
  { id: 6, name: "Rachel Kim", handle: "@rachelkim", email: "rachel.kim@comtacts.inc", phone: "+1 (555) 800-0210", company: "Comt@cts, Inc.", title: "Controller", avatarInitials: "RK", status: "online", contactType: undefined },
  { id: 7, name: "Samuel Osei", handle: "@samuosei", email: "samuel.osei@comtacts.inc", phone: "+1 (555) 800-0320", company: "Comt@cts, Inc.", title: "Grower", avatarInitials: "SO", status: "online", contactType: undefined },
  { id: 8, name: "Claire Donovan", handle: "@clairedonovan", email: "claire.donovan@comtacts.inc", phone: "+1 (555) 800-0410", company: "Comt@cts, Inc.", title: "Health & Safety Officer", avatarInitials: "CD", status: "online", contactType: undefined },
  { id: 9, name: "Marcus Webb", handle: "@marcuswebb", email: "marcus.webb@comtacts.inc", phone: "+1 (555) 800-0510", company: "Comt@cts, Inc.", title: "HR Manager", avatarInitials: "MW", status: "away", contactType: undefined },
  { id: 10, name: "Nina Castillo", handle: "@ninacastillo", email: "nina.castillo@comtacts.inc", phone: "+1 (555) 800-0610", company: "Comt@cts, Inc.", title: "Logistics Coordinator", avatarInitials: "NC", status: "online", contactType: undefined },
  { id: 11, name: "Troy Hensley", handle: "@troyhensley", email: "troy.hensley@comtacts.inc", phone: "+1 (555) 800-0620", company: "Comt@cts, Inc.", title: "Fleet Supervisor", avatarInitials: "TH", status: "away", contactType: "vendor" },
];

export const SEED_CHANNELS: OfflineChannel[] = [
  { id: 1, name: "Shipping", description: "Logistics, dispatch, and outbound delivery coordination", memberCount: 6, lastMessage: "Excellent. Close out the PO and notify the client.", lastMessageAt: ago(35), unreadCount: 2 },
  { id: 2, name: "Receiving", description: "Inbound deliveries, inspection, and inventory intake", memberCount: 5, lastMessage: "Stock moved and ledger updated. Bay 6 is now at 60% capacity.", lastMessageAt: ago(20), unreadCount: 0 },
  { id: 3, name: "Maintenance", description: "Equipment upkeep, repairs, and safety checks", memberCount: 5, lastMessage: "Full audit is scheduled for the 15th of next month.", lastMessageAt: ago(35), unreadCount: 1 },
  { id: 4, name: "Packing", description: "Packing schedules, output targets, and quality control", memberCount: 6, lastMessage: "Let us keep it going into the afternoon.", lastMessageAt: ago(25), unreadCount: 0 },
  { id: 5, name: "Crop Production", description: "Cultivation schedules and harvest planning", memberCount: 5, lastMessage: "Keep monitoring through end of shift.", lastMessageAt: ago(40), unreadCount: 3 },
  { id: 6, name: "Sales", description: "Lead pipeline, client communications, and deals", memberCount: 5, lastMessage: "Good work today team.", lastMessageAt: ago(15), unreadCount: 0 },
  { id: 7, name: "Purchasing", description: "Supplier orders and procurement approvals", memberCount: 5, lastMessage: null, lastMessageAt: null, unreadCount: 0 },
  { id: 8, name: "Payroll", description: "Confidential payroll processing — Alex Johnson & Rachel Kim only", memberCount: 2, lastMessage: null, lastMessageAt: null, unreadCount: 0 },
  { id: 9, name: "Health & Safety", description: "Safety audits and incident reporting", memberCount: 5, lastMessage: null, lastMessageAt: null, unreadCount: 0 },
  { id: 10, name: "Human Resources", description: "Recruitment, onboarding, and employee relations", memberCount: 5, lastMessage: null, lastMessageAt: null, unreadCount: 0 },
  { id: 11, name: "Logistics", description: "Fleet management and route planning", memberCount: 6, lastMessage: null, lastMessageAt: null, unreadCount: 0 },
];

export const SEED_CONVERSATIONS: OfflineConversation[] = [
  { id: 1, contactId: 2, contactName: "Maria Santos", contactInitials: "MS", lastMessage: "On it. I will have it staged and labeled by 3 PM.", lastMessageAt: ago(325), unreadCount: 1 },
  { id: 2, contactId: 4, contactName: "Priya Patel", contactInitials: "PP", lastMessage: "Will do. Vendor response expected by end of day.", lastMessageAt: ago(365), unreadCount: 0 },
];

export const SEED_CHANNEL_MESSAGES: Record<number, OfflineMessage[]> = {
  1: [
    { id: 1, body: "Good morning team. PO-4471 is loaded and ready to go — truck departs at 08:30.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, createdAt: ago(400) },
    { id: 2, body: "Copy that. Packing slips are confirmed and the carrier has checked in.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, createdAt: ago(395) },
    { id: 3, body: "Sounds good. Can someone verify the pallet count before the doors close?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, createdAt: ago(390) },
    { id: 4, body: "All 18 pallets accounted for. BOL is signed and in the system.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, createdAt: ago(380) },
    { id: 5, body: "Confirmed delivery on PO-4471. Signed POD received and uploaded.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, createdAt: ago(40) },
    { id: 6, body: "Excellent. Close out the PO and notify the client. Good work today.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, createdAt: ago(35) },
  ],
  2: [
    { id: 7, body: "Vendor B delivery arriving at Dock 1 in approximately 20 minutes.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, createdAt: ago(85) },
    { id: 8, body: "Dock 1 is clear. James will be there to receive.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, createdAt: ago(80) },
    { id: 9, body: "Delivery received. All three pallets intact, SKUs scanned. No discrepancies.", senderName: "James Okafor", senderInitials: "JO", isMine: false, createdAt: ago(50) },
    { id: 10, body: "Stock moved and ledger updated. Bay 6 is now at 60% capacity.", senderName: "James Okafor", senderInitials: "JO", isMine: false, createdAt: ago(20) },
  ],
};

export const SEED_CONVERSATION_MESSAGES: Record<number, OfflineMessage[]> = {
  1: [
    { id: 100, body: "Hi Maria, can you prioritize PO-4502 for staging?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, createdAt: ago(330) },
    { id: 101, body: "On it. I will have it staged and labeled by 3 PM.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, createdAt: ago(325) },
  ],
  2: [
    { id: 102, body: "Priya, update on the vendor discrepancy from this morning?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, createdAt: ago(370) },
    { id: 103, body: "Will do. Vendor response expected by end of day.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, createdAt: ago(365) },
  ],
};

let _offlineContacts = [...SEED_CONTACTS];
let _nextId = 100;

export function getOfflineContacts(): Contact[] {
  return [..._offlineContacts];
}

export function addOfflineContact(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  contactType?: string;
}): Contact {
  const initials = data.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const contact: Contact = {
    id: _nextId++,
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    company: data.company || null,
    title: data.title || null,
    contactType: (data.contactType as any) || null,
    handle: `@${data.name.toLowerCase().replace(/\s+/g, "")}`,
    avatarInitials: initials,
    status: "online",
    mobilePhone: null,
    personalEmail: null,
    linkedIn: null,
    twitter: null,
    instagram: null,
    facebook: null,
  };

  _offlineContacts.push(contact);
  return contact;
}

export function deleteOfflineContact(id: number): void {
  _offlineContacts = _offlineContacts.filter((c) => c.id !== id);
}

let _offlineConversations = [...SEED_CONVERSATIONS];
let _nextConvId = 100;

export function getOfflineConversations(): OfflineConversation[] {
  return [..._offlineConversations];
}

export function createOfflineConversation(contactId: number): OfflineConversation {
  const existing = _offlineConversations.find((c) => c.contactId === contactId);
  if (existing) return existing;

  const contact = _offlineContacts.find((c) => c.id === contactId);
  const conv: OfflineConversation = {
    id: _nextConvId++,
    contactId,
    contactName: contact?.name || "Unknown",
    contactInitials: contact?.avatarInitials || "??",
    lastMessage: null,
    lastMessageAt: null,
    unreadCount: 0,
  };

  _offlineConversations.push(conv);
  return conv;
}

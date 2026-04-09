import { db } from "@workspace/db";
import { contactsTable, channelsTable, conversationsTable, messagesTable, referralsTable } from "@workspace/db/schema";
import { sql } from "drizzle-orm";

export async function seedIfEmpty() {
  const existing = await db.select({ count: sql<number>`count(*)` }).from(contactsTable);
  if (Number(existing[0].count) > 0) return;

  console.log("[seed] Empty database detected — seeding data...");

  await db.insert(contactsTable).values([
    { id: 1, name: "Alex Johnson", handle: "@alexjohnson", email: "alex.johnson@comtacts.inc", phone: "+1 (555) 800-0100", company: "Comt@cts, Inc.", title: "Chief Executive Officer", mobilePhone: "+1 (555) 800-0199", personalEmail: "alex.j@personal.com", avatarInitials: "AJ", status: "online" },
    { id: 2, name: "Maria Santos", handle: "@mariasantos", email: "maria.santos@comtacts.inc", phone: "+1 (555) 210-0301", company: "Comt@cts, Inc.", title: "Shipping Coordinator", avatarInitials: "MS", status: "online" },
    { id: 3, name: "Derek Walsh", handle: "@derekwalsh", email: "derek.walsh@comtacts.inc", phone: "+1 (555) 210-0302", company: "Comt@cts, Inc.", title: "Shipping Supervisor", avatarInitials: "DW", status: "away" },
    { id: 4, name: "Priya Patel", handle: "@priyapatel", email: "priya.patel@comtacts.inc", phone: "+1 (555) 210-0401", company: "Comt@cts, Inc.", title: "Receiving Manager", avatarInitials: "PP", status: "online" },
    { id: 5, name: "James Okafor", handle: "@jamesokafor", email: "james.okafor@comtacts.inc", phone: "+1 (555) 210-0402", company: "Comt@cts, Inc.", title: "Receiving Associate", avatarInitials: "JO", status: "offline" },
    { id: 6, name: "Rachel Kim", handle: "@rachelkim", email: "rachel.kim@comtacts.inc", phone: "+1 (555) 800-0210", company: "Comt@cts, Inc.", title: "Controller", avatarInitials: "RK", status: "online" },
    { id: 7, name: "Samuel Osei", handle: "@samuosei", email: "samuel.osei@comtacts.inc", phone: "+1 (555) 800-0320", company: "Comt@cts, Inc.", title: "Grower", avatarInitials: "SO", status: "online" },
    { id: 8, name: "Claire Donovan", handle: "@clairedonovan", email: "claire.donovan@comtacts.inc", phone: "+1 (555) 800-0410", company: "Comt@cts, Inc.", title: "Health & Safety Officer", avatarInitials: "CD", status: "online" },
    { id: 9, name: "Marcus Webb", handle: "@marcuswebb", email: "marcus.webb@comtacts.inc", phone: "+1 (555) 800-0510", company: "Comt@cts, Inc.", title: "HR Manager", avatarInitials: "MW", status: "away" },
    { id: 10, name: "Nina Castillo", handle: "@ninacastillo", email: "nina.castillo@comtacts.inc", phone: "+1 (555) 800-0610", company: "Comt@cts, Inc.", title: "Logistics Coordinator", avatarInitials: "NC", status: "online" },
    { id: 11, name: "Troy Hensley", handle: "@troyhensley", email: "troy.hensley@comtacts.inc", phone: "+1 (555) 800-0620", company: "Comt@cts, Inc.", title: "Fleet Supervisor", avatarInitials: "TH", status: "away" },
  ]);

  await db.execute(sql`SELECT setval('contacts_id_seq', (SELECT MAX(id) FROM contacts))`);

  await db.insert(channelsTable).values([
    { id: 1, name: "Shipping", description: "Logistics, dispatch, and outbound delivery coordination", memberCount: 6 },
    { id: 2, name: "Receiving", description: "Inbound deliveries, inspection, and inventory intake", memberCount: 5 },
    { id: 3, name: "Maintenance", description: "Equipment upkeep, repairs, facility work orders, and safety checks", memberCount: 5 },
    { id: 4, name: "Packing", description: "Packing schedules, output targets, quality control, and floor updates", memberCount: 6 },
    { id: 5, name: "Crop Production", description: "Cultivation schedules, growth tracking, nutrient management, and harvest planning", memberCount: 5 },
    { id: 6, name: "Sales", description: "Lead pipeline, client communications, deals, and revenue targets", memberCount: 5 },
    { id: 7, name: "Purchasing", description: "Supplier orders, procurement approvals, budgets, and vendor management", memberCount: 5 },
    { id: 8, name: "Payroll", description: "Confidential payroll processing, salary reviews, and compensation approvals — Alex Johnson & Rachel Kim only", memberCount: 2 },
    { id: 9, name: "Health & Safety", description: "Safety audits, incident reporting, PPE compliance, and workplace hazard management", memberCount: 5 },
    { id: 10, name: "Human Resources", description: "Recruitment, onboarding, employee relations, HR policies, and staff development", memberCount: 5 },
    { id: 11, name: "Logistics", description: "Fleet management, route planning, driver coordination, and transport operations", memberCount: 6 },
  ]);

  await db.execute(sql`SELECT setval('channels_id_seq', (SELECT MAX(id) FROM channels))`);

  await db.insert(conversationsTable).values([
    { id: 1, contactId: 2 },
    { id: 2, contactId: 4 },
  ]);

  await db.execute(sql`SELECT setval('conversations_id_seq', (SELECT MAX(id) FROM conversations))`);

  const now = new Date();
  const ago = (minutes: number) => new Date(now.getTime() - minutes * 60000);

  const channelMessages: { body: string; senderName: string; senderInitials: string; isMine: boolean; conversationId: number; channelId: number; createdAt: Date }[] = [
    // Shipping (channel 1)
    { body: "Good morning team. PO-4471 is loaded and ready to go — truck departs at 08:30.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(400) },
    { body: "Copy that. Packing slips are confirmed and the carrier has checked in.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(395) },
    { body: "Sounds good. Can someone verify the pallet count before the doors close?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 1, createdAt: ago(390) },
    { body: "All 18 pallets accounted for. BOL is signed and in the system.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(380) },
    { body: "Great. Tracking number for PO-4471: 1Z999AA10123456784. Sharing with the client now.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(370) },
    { body: "Perfect. What is the ETA on the Chicago run?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 1, createdAt: ago(350) },
    { body: "Estimated delivery Friday by noon, barring any weather delays on I-80.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(345) },
    { body: "Friday works. Maria, can you also flag PO-4502 for priority staging by EOD today?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 1, createdAt: ago(330) },
    { body: "On it. I will have it staged and labeled by 3 PM.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(325) },
    { body: "Thanks everyone. Smooth morning so far. Let us keep it up.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(315) },
    { body: "Friday dispatch schedule is confirmed. Four routes, all carriers checked in. Dock assignments sent to drivers.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(90) },
    { body: "Any word on the Chicago ETA? Client is asking for an update.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 1, createdAt: ago(80) },
    { body: "Carrier just checked in — truck is outside Chicago. Estimated arrival at client dock is 11:45 AM.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(75) },
    { body: "Confirmed delivery on PO-4471. Signed POD received and uploaded to the system.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 1, createdAt: ago(40) },
    { body: "Excellent. Close out the PO and notify the client. Good work today everyone.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 1, createdAt: ago(35) },

    // Receiving (channel 2)
    { body: "Heads up — Vendor A delivery is arriving between 09:00 and 10:00 this morning. Two pallets, fragile.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(485) },
    { body: "Dock 3 is clear and ready. I will have James handle the unloading.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 2, createdAt: ago(480) },
    { body: "Understood. I will be at Dock 3 at 08:50 to receive.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(475) },
    { body: "Delivery is here. 2 pallets confirmed, shrink wrap intact, no visible damage.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(415) },
    { body: "Great. Please scan all SKUs into the system and flag any discrepancies.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(410) },
    { body: "Scanning now. One item count looks off — PO line 7 shows qty 24 but we received 22.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(395) },
    { body: "Good catch James. I will raise a discrepancy note with the vendor and copy accounting.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(390) },
    { body: "Appreciate it Priya. Everything else checks out. Pallets moved to Bay 4 storage.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(380) },
    { body: "Good work both of you. Priya, once the vendor confirms, please update the PO in the system.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 2, createdAt: ago(370) },
    { body: "Will do. Vendor response expected by end of day.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(365) },
    { body: "Vendor B delivery arriving at Dock 1 in approximately 20 minutes. Three pallets, ambient goods.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(85) },
    { body: "Dock 1 is clear. James will be there to receive.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 2, createdAt: ago(80) },
    { body: "Delivery received. All three pallets intact, SKUs scanned. No discrepancies this time.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(50) },
    { body: "Good. Move stock to Bay 6 and update the inventory ledger by end of shift.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(45) },
    { body: "Stock moved and ledger updated. Bay 6 is now at 60 percent capacity.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 2, createdAt: ago(20) },

    // Maintenance (channel 3)
    { body: "Good morning. Work order WO-1142 is open — Conveyor B motor is making an irregular noise on Line 2. Needs inspection today.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 3, createdAt: ago(490) },
    { body: "Received. I will head to Line 2 first thing. Likely the belt tensioner based on the last service log.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(485) },
    { body: "Confirmed — belt tensioner is worn. Replacing now. Estimated downtime 45 minutes.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(470) },
    { body: "Copy. Please flag any parts used against WO-1142 so accounting can close it out.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 3, createdAt: ago(465) },
    { body: "Will do. Also noticed the pressure gauge on Compressor 3 is reading low. Logging a follow-up work order.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(450) },
    { body: "Good catch. Log it as WO-1143 and flag it medium priority. No rush today but get to it before end of week.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 3, createdAt: ago(445) },
    { body: "Conveyor B is back online. Total downtime was 40 minutes. Parts log submitted against WO-1142.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(410) },
    { body: "Great work. Thanks for the fast turnaround. Production should be relieved.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(405) },
    { body: "WO-1143 has been logged. Scheduling compressor inspection for Thursday morning before the shift starts.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(390) },
    { body: "Perfect. Add it to the maintenance calendar and send a heads-up to the production lead.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 3, createdAt: ago(380) },
    { body: "WO-1143 compressor inspection completed. Pressure gauge replaced. Compressor 3 is back to full operating pressure.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(95) },
    { body: "Great. Close out WO-1143 and log the parts used.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 3, createdAt: ago(90) },
    { body: "Done. Also completed the lubrication schedule on Lines 1 and 3 as part of the weekly preventive maintenance round.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(70) },
    { body: "Preventive log updated. Everything is green across all lines for now.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(50) },
    { body: "Good to hear. Derek, remind me — when is the next full equipment audit due?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 3, createdAt: ago(40) },
    { body: "Full audit is scheduled for the 15th of next month. I will circulate the checklist to all supervisors next week.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 3, createdAt: ago(35) },

    // Packing (channel 4)
    { body: "Morning team. Target for today is 1,200 units on Line 1 and 800 on Line 2. Line 2 had a short maintenance window this morning — back online now.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 4, createdAt: ago(475) },
    { body: "Understood. Line 1 is running at full capacity. We are already 200 units in.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(470) },
    { body: "Line 2 is spooling back up. Should hit normal output within the next 20 minutes.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(460) },
    { body: "Good. Priya, can you confirm QC sampling is running on both lines?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 4, createdAt: ago(450) },
    { body: "QC is active on Line 1. First batch passed. Line 2 sampling will start once output stabilises.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(445) },
    { body: "Line 2 output is stable. QC sampling now active.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(415) },
    { body: "Mid-morning check — Line 1 at 540 units, Line 2 at 290 units. Both on track.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(330) },
    { body: "Solid progress. Keep the pace. Any quality flags so far?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 4, createdAt: ago(325) },
    { body: "One minor defect batch on Line 1 — 12 units pulled and set aside for re-inspection. Everything else clean.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(315) },
    { body: "Noted. Document the batch and loop in QC once the re-inspection is done. Good work keeping on top of it everyone.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 4, createdAt: ago(310) },
    { body: "End of morning update — Line 1 is at 780 units, Line 2 at 430 units. Both on target for the day.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(88) },
    { body: "Solid progress. Any further quality flags after this morning?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 4, createdAt: ago(83) },
    { body: "Re-inspection on the 12-unit batch from Line 1 is complete. 10 units passed, 2 scrapped. All documented.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(65) },
    { body: "Understood. Net loss of 2 is acceptable. Keep the line running clean.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 4, createdAt: ago(60) },
    { body: "Line 1 has now hit 1,000 units. On pace to exceed today's target by around 3 percent.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 4, createdAt: ago(30) },
    { body: "Strong finish. Let us keep it going into the afternoon.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 4, createdAt: ago(25) },

    // Crop Production (channel 5)
    { body: "Good morning team. Week 6 growth report is in — Batch A tomatoes are at 68% of target height, Batch B peppers are ahead of schedule at 82%.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(500) },
    { body: "Great numbers. What is driving the pepper growth ahead of schedule?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 5, createdAt: ago(495) },
    { body: "We adjusted the light cycle to 16 hours last week and increased potassium levels in the nutrient mix. Both seem to be having a positive effect.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(490) },
    { body: "Noted. Can we apply the same nutrient adjustment to Batch A and monitor the response?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 5, createdAt: ago(480) },
    { body: "I can have that done by end of day today. Will log the change in the growth tracker.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(475) },
    { body: "Heads up — the humidity sensors in Zone 3 were reading 4% above target overnight. I recalibrated this morning and it is back in range.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(450) },
    { body: "Good catch Maria. Please add a sensor check to the daily morning checklist for Zone 3 going forward.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 5, createdAt: ago(445) },
    { body: "Already added. Also — Batch C seedlings are ready for transplant. Recommend moving them to the main grow floor by Thursday.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(435) },
    { body: "Thursday works. James, can you prep the grow trays and irrigation lines in Bay 2 by Wednesday EOD?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 5, createdAt: ago(430) },
    { body: "On it. Bay 2 will be ready by Wednesday afternoon. I will do a full flush of the irrigation lines before the transplant.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(420) },
    { body: "Perfect. Priya, projected harvest date for Batch B?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 5, createdAt: ago(405) },
    { body: "At current pace, Batch B peppers should be harvest-ready in 18 to 22 days. I will update the harvest schedule in the tracker today.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(400) },
    { body: "Nutrient adjustment applied to Batch A as planned. Logged in the growth tracker with timestamp.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(92) },
    { body: "Bay 2 irrigation lines flushed and grow trays prepped. Ready for Thursday transplant.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(78) },
    { body: "Excellent. Batch C transplant is confirmed for Thursday at 09:00. Samuel, please lead the transplant team.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 5, createdAt: ago(70) },
    { body: "Confirmed. I will have the team briefed Wednesday afternoon. Spacing plan is already prepared.", senderName: "Samuel Osei", senderInitials: "SO", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(65) },
    { body: "Zone 3 humidity has been stable all morning following this morning's recalibration. Sensor is holding steady.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(45) },
    { body: "Good. Keep monitoring through end of shift and log the readings.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 5, createdAt: ago(40) },

    // Sales (channel 6)
    { body: "Morning team. Quick pipeline update — we have three deals in final negotiation this week. Greenfield Foods, Apex Logistics, and Northland Co-op.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 6, createdAt: ago(470) },
    { body: "Greenfield called this morning. They are happy with the proposal and want to schedule a closing call for Thursday.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(465) },
    { body: "Excellent. Lock that in for Thursday at 10 AM and send them a calendar invite. Copy me on it.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 6, createdAt: ago(460) },
    { body: "Done. Invite is out. Greenfield confirmed.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(450) },
    { body: "Apex Logistics is asking for a revised pricing sheet — they want volume discount tiers added. Can someone pull that together today?", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(435) },
    { body: "I can have a revised sheet ready by 2 PM. What volume bands are we offering?", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(430) },
    { body: "Use the standard tiers: 5% at 500 units, 10% at 1000, 15% at 2500. Run it by me before sending.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 6, createdAt: ago(425) },
    { body: "Understood. Will send you a draft at 2 PM.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(420) },
    { body: "Update on Northland Co-op — they have pushed their decision to next Monday. Budget sign-off is delayed on their end.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(330) },
    { body: "Noted. Follow up with them Friday to keep the momentum. In the meantime, solid progress this week everyone — three closing conversations is a strong position to be in.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 6, createdAt: ago(325) },
    { body: "Revised pricing sheet for Apex Logistics is ready. Sent it to Alex for review.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(87) },
    { body: "Reviewed and approved. Send it to the Apex Logistics contact now.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 6, createdAt: ago(82) },
    { body: "Sent. Their procurement lead acknowledged receipt and said they will review with the team by end of week.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(75) },
    { body: "Greenfield closing call is confirmed for Thursday 10 AM. Prep notes are ready.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(55) },
    { body: "Good. Let us aim to have the contract draft ready to share on the call if they are ready to move.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 6, createdAt: ago(50) },
    { body: "New inbound inquiry from a company called Harlow Distribution. Asking about our logistics coordination services.", senderName: "Derek Walsh", senderInitials: "DW", isMine: false, conversationId: 0, channelId: 6, createdAt: ago(22) },
    { body: "Add them to the pipeline and schedule a discovery call for next week. Good to see inbound interest picking up.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 6, createdAt: ago(18) },

    // Purchasing (channel 7)
    { body: "Morning. PO-5501 for packaging materials has been submitted to Vendor A. Awaiting confirmation.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(485) },
    { body: "Good. What is the expected delivery lead time on that one?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 7, createdAt: ago(480) },
    { body: "Vendor A quoted 5 to 7 business days. Should arrive by next Wednesday at the latest.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(475) },
    { body: "That works. Please chase a written confirmation and attach it to the PO in the system.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 7, createdAt: ago(470) },
    { body: "Will do. Also — I have been reviewing our fertiliser supplier contract. It is up for renewal in 30 days. We should request updated pricing before then.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(450) },
    { body: "Good timing. Request quotes from at least two alternative suppliers as well so we have leverage going into the renewal.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 7, createdAt: ago(445) },
    { body: "Already have one quote from Supplier B. I will reach out to Supplier C today.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(435) },
    { body: "Vendor A confirmed PO-5501. Confirmation document uploaded to the system.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(380) },
    { body: "Great. One more item — the Q2 procurement budget is sitting at 73% utilised with three weeks left in the quarter. Please flag any non-essential orders before raising new POs.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 7, createdAt: ago(345) },
    { body: "Understood. I will hold off on the secondary tool order until Q3 unless it becomes urgent. Supplier C quote expected back by end of day.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(340) },
    { body: "Supplier C quote is in. 8 percent lower than our current fertiliser supplier on the base rate.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(93) },
    { body: "That is a useful benchmark. Compile both quotes and I will review ahead of the renewal meeting.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 7, createdAt: ago(88) },
    { body: "Compiled and shared to your inbox. Supplier C also offers a 3 percent loyalty discount from year two onward.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(80) },
    { body: "PO-5502 raised for cleaning supplies — routine restock, low value, within budget.", senderName: "James Okafor", senderInitials: "JO", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(60) },
    { body: "Approved. Process it and log against the facilities budget line.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 7, createdAt: ago(55) },
    { body: "Q2 budget now at 76 percent utilised. Remaining headroom is sufficient for planned orders through month end.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 0, channelId: 7, createdAt: ago(28) },

    // Payroll (channel 8)
    { body: "Rachel — the March payroll run is scheduled for the 28th. Can you confirm all timesheets have been approved by the 26th?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 8, createdAt: ago(460) },
    { body: "Confirmed. I have already chased the outstanding approvals. Three team leads still need to sign off — expecting those by end of day tomorrow.", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(455) },
    { body: "Good. Please flag me if any are still outstanding by Wednesday morning so I can step in directly.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 8, createdAt: ago(450) },
    { body: "Will do. Separately — I have the Q1 compensation review summary ready for your sign-off. Two salary adjustment recommendations based on the performance assessments.", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(440) },
    { body: "Please send it through to my private email and I will review tonight.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 8, createdAt: ago(435) },
    { body: "Sent. The two adjustments are modest — both within the approved band. I have included the supporting rationale for each.", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(430) },
    { body: "Reviewed. Both are approved. Please process them effective April 1st and update the payroll records accordingly.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 8, createdAt: ago(315) },
    { body: "Understood. I will update the records and issue the adjustment letters by Friday.", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(310) },
    { body: "One more item — the payroll tax filing deadline for Q1 is April 15th. Are we on track?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 8, createdAt: ago(270) },
    { body: "Yes, fully on track. Draft filing is prepared. I will have it ready for your review by April 10th, well ahead of the deadline.", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(265) },
    { body: "All outstanding timesheet approvals are now in — received the final three sign-offs this morning.", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(86) },
    { body: "Good. Everything on track for the 28th run then?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 8, createdAt: ago(82) },
    { body: "Yes, fully on track. Payroll file will be prepared and ready for your final sign-off by the 27th.", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(78) },
    { body: "The two salary adjustment letters are drafted. Shall I send them directly to the individuals or route through you first?", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(45) },
    { body: "Route through me first. I would like to hand them over personally.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 8, createdAt: ago(40) },
    { body: "Understood. Letters are in your inbox now.", senderName: "Rachel Kim", senderInitials: "RK", isMine: false, conversationId: 0, channelId: 8, createdAt: ago(36) },

    // Health & Safety (channel 9)
    { body: "Morning team. Monthly safety walkthrough is scheduled for Thursday at 08:00. All supervisors are required to attend.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(490) },
    { body: "Confirmed on my end. Should I arrange cover for the Receiving dock while the supervisors are in the walkthrough?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 9, createdAt: ago(485) },
    { body: "Good thinking — yes, please arrange at least one person on the dock. The walkthrough should take no more than 45 minutes.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(480) },
    { body: "Heads up — a minor slip incident was reported in Bay 2 yesterday afternoon. No injury, but I have logged it as INC-0047 and conducted a spot inspection.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(450) },
    { body: "Thanks for the prompt response Claire. What corrective action has been taken?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 9, createdAt: ago(445) },
    { body: "Anti-slip matting has been extended across the wet zone and a wet floor sign has been placed permanently in that area. Staff briefed.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(440) },
    { body: "Good. Please make sure INC-0047 is included in the monthly safety report and shared with me before the end of the week.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 9, createdAt: ago(430) },
    { body: "Will do. Also — Q2 fire evacuation drill is due. I recommend scheduling it for the first week of April. I can coordinate with all team leads.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(330) },
    { body: "First week of April works. Lock it in and send a company-wide notice at least five days in advance.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 9, createdAt: ago(325) },
    { body: "Understood. Notice will go out Monday. I will confirm the date and time with you before it is sent.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(320) },
    { body: "Walkthrough prep complete. Route map and sign-off sheets printed for Thursday.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(91) },
    { body: "INC-0047 report is finalised. Sending to you now for review before end of week submission.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(72) },
    { body: "Received. Reviewed and approved. Submit it.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 9, createdAt: ago(68) },
    { body: "PPE stock check completed. Hard hats and hi-vis vests are running low in the Receiving area. Reorder raised.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(48) },
    { body: "Good catch. Make sure new stock arrives before the Thursday walkthrough.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 9, createdAt: ago(43) },
    { body: "Order placed — delivery confirmed for Wednesday. We will be fully stocked in time.", senderName: "Claire Donovan", senderInitials: "CD", isMine: false, conversationId: 0, channelId: 9, createdAt: ago(38) },

    // Human Resources (channel 10)
    { body: "Morning. Quick update — we have two open roles posted: Warehouse Associate and Junior Grower. Both ads are live as of this morning.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(500) },
    { body: "Good. What is the application volume looking like so far?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 10, createdAt: ago(495) },
    { body: "Six applications for the Warehouse role and two for the Junior Grower position. I will begin screening CVs this afternoon.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(490) },
    { body: "For the Grower role, loop in Samuel Osei on the shortlisting — he will know what technical skills to look for.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 10, createdAt: ago(485) },
    { body: "Good call. I will reach out to Samuel today and copy him on any shortlisted candidates.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(480) },
    { body: "Also — the new Receiving Associate starts Monday. Onboarding schedule is prepared. Claire from H&S will do the safety induction at 09:00.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(435) },
    { body: "Perfect. Make sure their system access is set up by Friday and their uniform is ready for day one.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 10, createdAt: ago(430) },
    { body: "On it. IT access request has been submitted. Uniform sizing was confirmed yesterday.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(425) },
    { body: "One more item — the annual staff survey results are in. Overall engagement score is 78%, up 4 points from last year. Full report is in the shared drive.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(320) },
    { body: "That is encouraging progress. Let us schedule a brief team debrief next week to share the highlights. Can you prepare a one-page summary I can present?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 10, createdAt: ago(315) },
    { body: "Absolutely. I will have the summary ready by Thursday.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(310) },
    { body: "Great. Book a slot for next Tuesday at 11 AM and send the team a calendar invite.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 10, createdAt: ago(305) },
    { body: "Samuel has reviewed the Junior Grower CVs. Two candidates shortlisted for interview — forwarding to you for approval.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(89) },
    { body: "Approved. Schedule interviews for next week and let me know the times so I can attend the final stage.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 10, createdAt: ago(85) },
    { body: "Interviews booked for Tuesday and Wednesday afternoon. Calendar invites sent to all parties.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(80) },
    { body: "New starter IT access and uniform are confirmed ready for Monday. Onboarding pack has been emailed.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(52) },
    { body: "Staff survey summary one-pager is drafted. Sharing it with you now for review ahead of Tuesday's debrief.", senderName: "Marcus Webb", senderInitials: "MW", isMine: false, conversationId: 0, channelId: 10, createdAt: ago(31) },
    { body: "Reviewed — well put together. This will land well with the team. See you Tuesday.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 10, createdAt: ago(26) },

    // Logistics (channel 11)
    { body: "Morning team. Today we have five active routes. Drivers checked in at 07:00 — all vehicles cleared pre-trip inspection.", senderName: "Troy Hensley", senderInitials: "TH", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(495) },
    { body: "Good start. Nina, what does the route load look like for the afternoon window?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 11, createdAt: ago(490) },
    { body: "Three afternoon deliveries confirmed — Westfield at 13:00, Briar Co at 14:30, and Northland at 16:00. All loads are staged and ready.", senderName: "Nina Castillo", senderInitials: "NC", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(485) },
    { body: "Troy — Vehicle 3 is flagged for a tyre pressure warning on the dashboard. Please pull it from today's rotation and arrange a check.", senderName: "Nina Castillo", senderInitials: "NC", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(465) },
    { body: "Already on it. Swapped Vehicle 3 out for the reserve unit. Tyre check booked with the service bay for this afternoon.", senderName: "Troy Hensley", senderInitials: "TH", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(460) },
    { body: "Good call pulling it early. No point risking a roadside issue.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 11, createdAt: ago(455) },
    { body: "Westfield delivery completed — signed POD received, no issues.", senderName: "Nina Castillo", senderInitials: "NC", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(380) },
    { body: "Briar Co delivery confirmed. Driver reports a 10 minute delay at the gate but delivery accepted without issue.", senderName: "Troy Hensley", senderInitials: "TH", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(310) },
    { body: "Noted. Nina, please log the gate delay against the Briar Co route record for pattern tracking.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 11, createdAt: ago(305) },
    { body: "Logged. That is the second delay at that site this month — I will flag it to their logistics contact so they can address it on their end.", senderName: "Nina Castillo", senderInitials: "NC", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(300) },
    { body: "Good initiative. Keep me posted on their response.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 11, createdAt: ago(290) },
    { body: "Vehicle 3 tyre check complete — nail in the rear offside. Replaced under warranty. Vehicle back in service tomorrow morning.", senderName: "Troy Hensley", senderInitials: "TH", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(200) },
    { body: "Good outcome. Update the fleet maintenance log and note it in the pre-trip inspection sheet for tomorrow.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 0, channelId: 11, createdAt: ago(195) },
    { body: "Northland delivery confirmed — last route of the day completed. All five drivers back at base by 17:15.", senderName: "Nina Castillo", senderInitials: "NC", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(38) },
    { body: "Clean day overall. Well done team — vehicles secured, logs submitted, and tomorrow's schedule is already loaded.", senderName: "Troy Hensley", senderInitials: "TH", isMine: false, conversationId: 0, channelId: 11, createdAt: ago(30) },
  ];

  // DM messages (conversation 1 = Maria, conversation 2 = Priya)
  const dmMessages: typeof channelMessages = [
    { body: "Hi Alex, just confirming — PO-4502 is staged and ready for your sign-off whenever you have a moment.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 1, channelId: 0, createdAt: ago(285) },
    { body: "Thanks Maria. I will swing by before the afternoon stand-up.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 1, channelId: 0, createdAt: ago(280) },
    { body: "Perfect. Also, the carrier for Friday's Chicago run confirmed the pickup window is 07:00 to 09:00.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 1, channelId: 0, createdAt: ago(270) },
    { body: "Good to know. Can you make sure Derek has the dock assignment by Thursday EOD?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 1, channelId: 0, createdAt: ago(260) },
    { body: "Already on my list. I will send him a reminder this afternoon.", senderName: "Maria Santos", senderInitials: "MS", isMine: false, conversationId: 1, channelId: 0, createdAt: ago(250) },
    { body: "Great, thanks for staying on top of it.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 1, channelId: 0, createdAt: ago(245) },

    { body: "Alex, we got the vendor response on the PO line 7 discrepancy. They are crediting us for the 2 units.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 2, channelId: 0, createdAt: ago(235) },
    { body: "That is good news. Please make sure the credit memo is forwarded to accounting.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 2, channelId: 0, createdAt: ago(230) },
    { body: "Already sent. I also updated the PO in the system with the correct received quantity.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 2, channelId: 0, createdAt: ago(225) },
    { body: "Excellent. How is the Bay 4 stock looking overall? Any capacity concerns?", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 2, channelId: 0, createdAt: ago(220) },
    { body: "We are at about 70 percent capacity. Should be fine through next week barring any large inbounds.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 2, channelId: 0, createdAt: ago(215) },
    { body: "Good. Keep me posted if anything changes. Appreciate the quick turnaround today.", senderName: "Alex Johnson", senderInitials: "AJ", isMine: true, conversationId: 2, channelId: 0, createdAt: ago(210) },
    { body: "Will do. Have a good afternoon, Alex.", senderName: "Priya Patel", senderInitials: "PP", isMine: false, conversationId: 2, channelId: 0, createdAt: ago(205) },
  ];

  const allMessages = [...channelMessages, ...dmMessages];

  for (let i = 0; i < allMessages.length; i += 50) {
    const batch = allMessages.slice(i, i + 50);
    await db.insert(messagesTable).values(batch as any);
  }

  console.log(`[seed] Seeded ${allMessages.length} messages, 11 contacts, 11 channels, 2 conversations`);
}

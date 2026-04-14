import {
  getContacts as apiGetContacts,
  createContact as apiCreateContact,
  deleteContact as apiDeleteContact,
  getChannels as apiGetChannels,
  getConversations as apiGetConversations,
  createConversation as apiCreateConversation,
  getChannelMessages as apiGetChannelMessages,
  sendChannelMessage as apiSendChannelMessage,
  getConversationMessages as apiGetConversationMessages,
  sendConversationMessage as apiSendConversationMessage,
  getMe as apiGetMe,
  createChannel as apiCreateChannel,
} from "@workspace/api-client-react";
import type { Contact } from "@workspace/api-client-react";
import {
  getOfflineContacts,
  addOfflineContact,
  deleteOfflineContact,
  SEED_CHANNELS,
  SEED_CHANNEL_MESSAGES,
  SEED_CONVERSATION_MESSAGES,
  getOfflineConversations,
  createOfflineConversation,
} from "./offlineData";

let _isOffline = false;

export function isOfflineMode(): boolean {
  return _isOffline;
}

async function tryApi<T>(apiFn: () => Promise<T>, fallbackFn: () => T): Promise<T> {
  if (_isOffline) {
    return fallbackFn();
  }

  try {
    const result = await apiFn();
    return result;
  } catch (error: any) {
    if (
      error?.message?.includes("Network request failed") ||
      error?.message?.includes("fetch") ||
      error?.name === "TypeError" ||
      error?.status === 0 ||
      error?.code === "ECONNREFUSED" ||
      !error?.status
    ) {
      console.log("[Comt@cts] API unreachable — switching to offline mode");
      _isOffline = true;
      return fallbackFn();
    }
    throw error;
  }
}

export async function getContacts(): Promise<Contact[]> {
  return tryApi(
    () => apiGetContacts(),
    () => getOfflineContacts()
  );
}

export async function createContact(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  contactType?: string;
}): Promise<Contact> {
  return tryApi(
    () => apiCreateContact(data),
    () => addOfflineContact(data)
  );
}

export async function deleteContact(id: number): Promise<void> {
  return tryApi(
    () => apiDeleteContact(id) as Promise<void>,
    () => deleteOfflineContact(id)
  );
}

export async function getChannels() {
  return tryApi(
    () => apiGetChannels(),
    () => SEED_CHANNELS as any
  );
}

export async function getConversations() {
  return tryApi(
    () => apiGetConversations(),
    () => getOfflineConversations() as any
  );
}

export async function createConversation(data: { contactId: number }) {
  return tryApi(
    () => apiCreateConversation(data),
    () => createOfflineConversation(data.contactId) as any
  );
}

export async function getChannelMessages(channelId: number) {
  return tryApi(
    () => apiGetChannelMessages(channelId),
    () => (SEED_CHANNEL_MESSAGES[channelId] || []) as any
  );
}

let _nextMsgId = 1000;

export async function sendChannelMessage(channelId: number, data: { body: string }) {
  return tryApi(
    () => apiSendChannelMessage(channelId, data),
    () => {
      const msg = {
        id: _nextMsgId++,
        body: data.body,
        senderName: "Alex Johnson",
        senderInitials: "AJ",
        isMine: true,
        createdAt: new Date().toISOString(),
      };
      const arr = SEED_CHANNEL_MESSAGES[channelId];
      if (arr) arr.push(msg);
      else SEED_CHANNEL_MESSAGES[channelId] = [msg];
      return msg as any;
    }
  );
}

export async function getConversationMessages(conversationId: number) {
  return tryApi(
    () => apiGetConversationMessages(conversationId),
    () => (SEED_CONVERSATION_MESSAGES[conversationId] || []) as any
  );
}

export async function sendConversationMessage(conversationId: number, data: { body: string }) {
  return tryApi(
    () => apiSendConversationMessage(conversationId, data),
    () => {
      const msg = {
        id: _nextMsgId++,
        body: data.body,
        senderName: "Alex Johnson",
        senderInitials: "AJ",
        isMine: true,
        createdAt: new Date().toISOString(),
      };
      const arr = SEED_CONVERSATION_MESSAGES[conversationId];
      if (arr) arr.push(msg);
      else SEED_CONVERSATION_MESSAGES[conversationId] = [msg];
      return msg as any;
    }
  );
}

const OFFLINE_PROFILE = {
  id: 1,
  name: "Alex Johnson",
  handle: "@alexjohnson",
  email: "alex.johnson@comtacts.inc",
  phone: "+1 (555) 800-0100",
  company: "Comt@cts, Inc.",
  title: "Chief Executive Officer",
  mobilePhone: "+1 (555) 800-0199",
  personalEmail: "alex.j@personal.com",
  avatarInitials: "AJ",
  status: "online",
  linkedIn: "alexjohnson",
  twitter: "alexjceo",
  instagram: "alexjohnson.ceo",
  facebook: "alex.johnson.comtacts",
};

export async function getMe() {
  return tryApi(
    () => apiGetMe(),
    () => OFFLINE_PROFILE as any
  );
}

let _nextChannelId = 100;

export async function createChannel(data: { name: string; description?: string }) {
  return tryApi(
    () => apiCreateChannel(data),
    () => {
      const ch = {
        id: _nextChannelId++,
        name: data.name,
        description: data.description || "",
        memberCount: 1,
        lastMessage: null,
        lastMessageAt: null,
        unreadCount: 0,
      };
      SEED_CHANNELS.push(ch as any);
      return ch as any;
    }
  );
}

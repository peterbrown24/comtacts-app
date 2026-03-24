import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContacts, createContact, deleteContact, createConversation } from "@workspace/api-client-react";
import type { Contact } from "@workspace/api-client-react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";
import { useSubscription } from "@/lib/revenuecat";
import { PaywallModal } from "@/components/PaywallModal";

const ROYAL_BLUE = "#4169E1";

function StatusDot({ status }: { status: string }) {
  const color = status === "online" ? Colors.online : status === "away" ? Colors.away : Colors.offline;
  return <View style={[styles.statusDot, { backgroundColor: color }]} />;
}

function Avatar({ initials, size = 44 }: { initials: string; size?: number }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

function PremiumField({
  icon,
  label,
  value,
  isSubscribed,
  onUpgrade,
}: {
  icon: string;
  label: string;
  value?: string;
  isSubscribed: boolean;
  onUpgrade: () => void;
}) {
  if (isSubscribed && value) {
    return (
      <View style={styles.detailRow}>
        <Feather name={icon as any} size={14} color={ROYAL_BLUE} style={styles.detailIcon} />
        <View>
          <Text style={styles.detailLabel}>{label}</Text>
          <Text style={styles.detailValue}>{value}</Text>
        </View>
      </View>
    );
  }

  if (!isSubscribed) {
    return (
      <TouchableOpacity style={styles.detailRowLocked} onPress={onUpgrade} activeOpacity={0.7}>
        <Feather name="lock" size={14} color={ROYAL_BLUE} style={styles.detailIcon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.detailLabel}>{label}</Text>
          <Text style={styles.detailValueLocked}>Upgrade to Premium</Text>
        </View>
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>PRO</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return null;
}

function ContactDetailModal({
  contact,
  visible,
  onClose,
  onMessage,
  onDelete,
  onUpgrade,
  isSubscribed,
}: {
  contact: Contact | null;
  visible: boolean;
  onClose: () => void;
  onMessage: (id: number) => void;
  onDelete: (id: number, name: string) => void;
  onUpgrade: () => void;
  isSubscribed: boolean;
}) {
  if (!contact) return null;
  const hasPremiumInfo = !!(contact.mobilePhone || contact.personalEmail);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.detailModal}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.detailContent}>
          <View style={styles.detailAvatarWrap}>
            <Avatar initials={contact.avatarInitials} size={72} />
            <StatusDot status={contact.status} />
          </View>
          <Text style={styles.detailName}>{contact.name}</Text>
          {contact.title ? (
            <Text style={styles.detailTitle}>
              {contact.title}{contact.company ? ` · ${contact.company}` : ""}
            </Text>
          ) : contact.company ? (
            <Text style={styles.detailTitle}>{contact.company}</Text>
          ) : null}

          <View style={styles.detailActions}>
            <TouchableOpacity style={styles.detailActionBtn} onPress={() => { onClose(); onMessage(contact.id); }}>
              <Ionicons name="chatbubble" size={20} color="#fff" />
              <Text style={styles.detailActionText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.detailActionBtn, styles.detailActionBtnGhost]}
              onPress={() => { onClose(); onDelete(contact.id, contact.name); }}
            >
              <Feather name="trash-2" size={18} color={Colors.textDim} />
              <Text style={[styles.detailActionText, { color: Colors.textDim }]}>Remove</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>PUBLIC CONTACT INFO</Text>
            <View style={styles.detailRow}>
              <Feather name="mail" size={14} color={Colors.accent} style={styles.detailIcon} />
              <View>
                <Text style={styles.detailLabel}>Work Email</Text>
                <Text style={styles.detailValue}>{contact.email}</Text>
              </View>
            </View>
            {contact.phone ? (
              <View style={styles.detailRow}>
                <Feather name="phone" size={14} color={Colors.accent} style={styles.detailIcon} />
                <View>
                  <Text style={styles.detailLabel}>Work Phone</Text>
                  <Text style={styles.detailValue}>{contact.phone}</Text>
                </View>
              </View>
            ) : null}
          </View>

          {hasPremiumInfo && (
            <View style={styles.detailSection}>
              <View style={styles.premiumSectionHeader}>
                <Text style={styles.detailSectionTitle}>PREMIUM CONTACT INFO</Text>
                {!isSubscribed && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>PRO</Text>
                  </View>
                )}
              </View>
              <PremiumField
                icon="smartphone"
                label="Mobile Direct"
                value={contact.mobilePhone}
                isSubscribed={isSubscribed}
                onUpgrade={onUpgrade}
              />
              <PremiumField
                icon="mail"
                label="Personal Email"
                value={contact.personalEmail}
                isSubscribed={isSubscribed}
                onUpgrade={onUpgrade}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const qc = useQueryClient();
  const { isSubscribed } = useSubscription();
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
    refetchInterval: 5000,
  });

  const createMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contacts"] });
      setShowAdd(false);
      setName(""); setEmail(""); setPhone(""); setCompany(""); setTitle("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteContact({ contactId: id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });

  const messageMutation = useMutation({
    mutationFn: (contactId: number) => createConversation({ body: { contactId } }),
    onSuccess: (conv) => {
      qc.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`/conversation/${conv.id}`);
    },
  });

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.company ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number, name: string) => {
    Alert.alert("Remove Contact", `Remove ${name}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => deleteMutation.mutate(id) },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "web" ? insets.top + 67 : 0 }]}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Feather name="search" size={16} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            placeholderTextColor={Colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
          <Feather name="user-plus" size={20} color={Colors.accent} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator color={Colors.accent} style={{ marginTop: 40 }} />
      ) : filtered.length === 0 ? (
        <View style={styles.empty}>
          <Feather name="users" size={48} color={Colors.textDim} />
          <Text style={styles.emptyTitle}>No contacts yet</Text>
          <Text style={styles.emptyText}>Add your first business contact</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          contentInsetAdjustmentBehavior="automatic"
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => setSelectedContact(item)} activeOpacity={0.7}>
              <View style={styles.avatarWrap}>
                <Avatar initials={item.avatarInitials} />
                <StatusDot status={item.status} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                {item.title ? (
                  <Text style={styles.cardSub}>
                    {item.title}{item.company ? ` · ${item.company}` : ""}
                  </Text>
                ) : item.company ? (
                  <Text style={styles.cardSub}>{item.company}</Text>
                ) : null}
                <Text style={styles.cardEmail}>{item.email}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => messageMutation.mutate(item.id)}
                >
                  <Ionicons name="chatbubble-outline" size={20} color={Colors.accent} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleDelete(item.id, item.name)}
                >
                  <Feather name="trash-2" size={18} color={Colors.textDim} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      <ContactDetailModal
        contact={selectedContact}
        visible={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        onMessage={(id) => messageMutation.mutate(id)}
        onDelete={handleDelete}
        onUpgrade={() => { setSelectedContact(null); setShowPaywall(true); }}
        isSubscribed={isSubscribed}
      />

      <PaywallModal visible={showPaywall} onClose={() => setShowPaywall(false)} />

      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Contact</Text>
              <TouchableOpacity onPress={() => { setShowAdd(false); setName(""); setEmail(""); setPhone(""); setCompany(""); setTitle(""); }}>
                <Feather name="x" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            {[
              { label: "Full Name *", value: name, setter: setName, placeholder: "Jane Smith" },
              { label: "Email *", value: email, setter: setEmail, placeholder: "jane@company.com", keyboard: "email-address" as const },
              { label: "Phone", value: phone, setter: setPhone, placeholder: "+1 (555) 000-0000", keyboard: "phone-pad" as const },
              { label: "Company", value: company, setter: setCompany, placeholder: "Acme Corp" },
              { label: "Job Title", value: title, setter: setTitle, placeholder: "Senior Engineer" },
            ].map(({ label, value, setter, placeholder, keyboard }) => (
              <View key={label} style={styles.field}>
                <Text style={styles.fieldLabel}>{label}</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={value}
                  onChangeText={setter}
                  placeholder={placeholder}
                  placeholderTextColor={Colors.textDim}
                  keyboardType={keyboard}
                  autoCapitalize={keyboard === "email-address" ? "none" : "words"}
                />
              </View>
            ))}
            <TouchableOpacity
              style={[styles.saveBtn, (!name || !email) && styles.saveBtnDisabled]}
              disabled={!name || !email || createMutation.isPending}
              onPress={() => createMutation.mutate({ body: { name, email, phone: phone || undefined, company: company || undefined, title: title || undefined } })}
            >
              {createMutation.isPending
                ? <ActivityIndicator color="#000" />
                : <Text style={styles.saveBtnText}>Add Contact</Text>
              }
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  searchRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  searchBox: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: Colors.bgCard, borderRadius: 12, paddingHorizontal: 12, height: 40 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: Colors.text, fontFamily: "Inter_400Regular", fontSize: 15 },
  addBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.bgCard, alignItems: "center", justifyContent: "center" },
  card: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  avatarWrap: { position: "relative", marginRight: 14 },
  avatar: { backgroundColor: Colors.accent + "30", alignItems: "center", justifyContent: "center" },
  avatarText: { color: Colors.accent, fontFamily: "Inter_700Bold" },
  statusDot: { position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: Colors.bg },
  cardInfo: { flex: 1 },
  cardName: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 15, marginBottom: 2 },
  cardSub: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 13, marginBottom: 2 },
  cardEmail: { color: Colors.textDim, fontFamily: "Inter_400Regular", fontSize: 12 },
  cardActions: { flexDirection: "row", gap: 4 },
  actionBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  separator: { height: 1, backgroundColor: Colors.border, marginLeft: 74 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  emptyTitle: { color: Colors.text, fontFamily: "Inter_600SemiBold", fontSize: 18 },
  emptyText: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 15 },
  modal: { flex: 1, backgroundColor: Colors.bg, paddingTop: 20 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingBottom: 24 },
  modalTitle: { color: Colors.text, fontFamily: "Inter_700Bold", fontSize: 20 },
  field: { paddingHorizontal: 20, marginBottom: 16 },
  fieldLabel: { color: Colors.textSecondary, fontFamily: "Inter_500Medium", fontSize: 13, marginBottom: 6 },
  fieldInput: { backgroundColor: Colors.bgCard, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: Colors.text, fontFamily: "Inter_400Regular", fontSize: 15, borderWidth: 1, borderColor: Colors.border },
  saveBtn: { marginHorizontal: 20, marginTop: 8, backgroundColor: Colors.accent, borderRadius: 12, paddingVertical: 16, alignItems: "center" },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: { color: "#000", fontFamily: "Inter_700Bold", fontSize: 16 },
  detailModal: { flex: 1, backgroundColor: Colors.bg },
  detailHeader: { flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  detailContent: { paddingHorizontal: 24, paddingBottom: 40, alignItems: "center" },
  detailAvatarWrap: { position: "relative", marginBottom: 16 },
  detailName: { color: Colors.text, fontFamily: "Inter_700Bold", fontSize: 24, marginBottom: 6, textAlign: "center" },
  detailTitle: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 15, marginBottom: 24, textAlign: "center" },
  detailActions: { flexDirection: "row", gap: 12, marginBottom: 32 },
  detailActionBtn: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: Colors.accent, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20 },
  detailActionBtnGhost: { backgroundColor: Colors.bgCard },
  detailActionText: { color: "#000", fontFamily: "Inter_600SemiBold", fontSize: 14 },
  detailSection: { width: "100%", backgroundColor: Colors.bgCard, borderRadius: 14, padding: 16, marginBottom: 16, gap: 14 },
  detailSectionTitle: { color: Colors.textDim, fontFamily: "Inter_600SemiBold", fontSize: 11, letterSpacing: 1.2, marginBottom: 4 },
  detailRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  detailRowLocked: { flexDirection: "row", alignItems: "center", gap: 12 },
  detailIcon: { marginTop: 2 },
  detailLabel: { color: Colors.textSecondary, fontFamily: "Inter_400Regular", fontSize: 12, marginBottom: 2 },
  detailValue: { color: Colors.text, fontFamily: "Inter_500Medium", fontSize: 14 },
  detailValueLocked: { color: ROYAL_BLUE, fontFamily: "Inter_500Medium", fontSize: 14 },
  premiumSectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  premiumBadge: { backgroundColor: ROYAL_BLUE + "22", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  premiumBadgeText: { color: ROYAL_BLUE, fontFamily: "Inter_700Bold", fontSize: 10, letterSpacing: 1 },
});

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
  Vibration,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

const AGORA_APP_ID = "55af1319f1d949c0a820de2ae7ad13db";

const CB_CHANNELS = [
  { id: 1, name: "Channel 1", label: "General" },
  { id: 2, name: "Channel 2", label: "Dispatch" },
  { id: 3, name: "Channel 3", label: "Logistics" },
  { id: 4, name: "Channel 4", label: "Sales" },
  { id: 5, name: "Channel 5", label: "Warehouse" },
  { id: 6, name: "Channel 6", label: "Field Ops" },
  { id: 7, name: "Channel 7", label: "Support" },
  { id: 8, name: "Channel 8", label: "Management" },
  { id: 9, name: "Channel 9", label: "Emergency" },
  { id: 10, name: "Channel 10", label: "Open" },
];

const EMERALD = "#10B981";
const EMERALD_DIM = "#10B98130";
const EMERALD_GLOW = "#10B98150";
const RED_TRANSMIT = "#EF4444";

export default function TwoWayScreen() {
  const insets = useSafeAreaInsets();
  const [currentChannel, setCurrentChannel] = useState(CB_CHANNELS[0]);
  const [isTuned, setIsTuned] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const [showChannelPicker, setShowChannelPicker] = useState(false);
  const [agoraEngine, setAgoraEngine] = useState<any>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const transmitPulse = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") return;

    let engine: any = null;
    const init = async () => {
      try {
        const { createAgoraRtcEngine, ChannelProfileType, ClientRoleType } =
          await import("react-native-agora");
        engine = createAgoraRtcEngine();
        engine.initialize({ appId: AGORA_APP_ID });
        engine.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
        engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
        engine.enableAudio();
        engine.disableVideo();
        engine.muteLocalAudioStream(true);

        engine.registerEventHandler({
          onUserJoined: () => setActiveUsers((prev) => prev + 1),
          onUserOffline: () =>
            setActiveUsers((prev) => Math.max(0, prev - 1)),
          onJoinChannelSuccess: () => {
            setIsTuned(true);
            setIsJoining(false);
          },
          onLeaveChannel: () => {
            setIsTuned(false);
            setActiveUsers(0);
          },
        });

        setAgoraEngine(engine);
      } catch {
        // Agora not available (web/simulator)
      }
    };
    init();

    return () => {
      if (engine) {
        try {
          engine.leaveChannel();
          engine.release();
        } catch {}
      }
    };
  }, []);

  useEffect(() => {
    if (isTransmitting) {
      transmitPulse.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
      transmitPulse.current.start();

      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      transmitPulse.current?.stop();
      pulseAnim.setValue(1);
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isTransmitting]);

  const tuneIn = useCallback(async () => {
    if (Platform.OS === "web") {
      setIsTuned(true);
      setActiveUsers(Math.floor(Math.random() * 5) + 1);
      return;
    }
    if (!agoraEngine) return;
    setIsJoining(true);
    try {
      await agoraEngine.joinChannel("", `twoway_ch_${currentChannel.id}`, 0, {});
    } catch {
      setIsJoining(false);
    }
  }, [agoraEngine, currentChannel]);

  const tuneOut = useCallback(async () => {
    if (Platform.OS === "web") {
      setIsTuned(false);
      setIsTransmitting(false);
      setActiveUsers(0);
      return;
    }
    if (!agoraEngine) return;
    setIsTransmitting(false);
    try {
      agoraEngine.muteLocalAudioStream(true);
      await agoraEngine.leaveChannel();
    } catch {}
  }, [agoraEngine]);

  const switchChannel = useCallback(
    async (channel: (typeof CB_CHANNELS)[number]) => {
      setShowChannelPicker(false);
      if (channel.id === currentChannel.id) return;

      if (isTuned && agoraEngine && Platform.OS !== "web") {
        setIsTransmitting(false);
        agoraEngine.muteLocalAudioStream(true);
        try {
          await agoraEngine.leaveChannel();
        } catch {}
      }
      setCurrentChannel(channel);
      setIsTuned(false);
      setActiveUsers(0);
    },
    [agoraEngine, currentChannel, isTuned]
  );

  const startTransmit = useCallback(() => {
    if (!isTuned) return;
    setIsTransmitting(true);
    if (Platform.OS !== "web") {
      Vibration.vibrate(50);
      agoraEngine?.muteLocalAudioStream(false);
    }
  }, [isTuned, agoraEngine]);

  const stopTransmit = useCallback(() => {
    setIsTransmitting(false);
    if (Platform.OS !== "web") {
      Vibration.vibrate(30);
      agoraEngine?.muteLocalAudioStream(false);
      setTimeout(() => agoraEngine?.muteLocalAudioStream(true), 100);
    }
  }, [agoraEngine]);

  const toggleSpeaker = useCallback(() => {
    const next = !speakerOn;
    setSpeakerOn(next);
    if (Platform.OS !== "web" && agoraEngine) {
      try {
        agoraEngine.setEnableSpeakerphone(next);
      } catch {}
    }
  }, [speakerOn, agoraEngine]);

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", RED_TRANSMIT + "40"],
  });

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.radioBody}>
        <View style={styles.displayPanel}>
          <View style={styles.displayHeader}>
            <View style={styles.signalIndicator}>
              {isTuned ? (
                <>
                  <View style={[styles.signalBar, styles.signalActive]} />
                  <View style={[styles.signalBar, styles.signalBarMed, styles.signalActive]} />
                  <View style={[styles.signalBar, styles.signalBarTall, styles.signalActive]} />
                </>
              ) : (
                <>
                  <View style={styles.signalBar} />
                  <View style={[styles.signalBar, styles.signalBarMed]} />
                  <View style={[styles.signalBar, styles.signalBarTall]} />
                </>
              )}
            </View>
            <Text style={styles.displayLabel}>2W@Y RADIO</Text>
            <View style={[styles.statusDot, isTuned && styles.statusDotActive]} />
          </View>

          <TouchableOpacity
            style={styles.channelDisplay}
            onPress={() => setShowChannelPicker(!showChannelPicker)}
            activeOpacity={0.7}
          >
            <Text style={styles.channelNumber}>CH {String(currentChannel.id).padStart(2, "0")}</Text>
            <Text style={styles.channelLabel}>{currentChannel.label}</Text>
            <Feather name="chevron-down" size={16} color={EMERALD} />
          </TouchableOpacity>

          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <Feather name="users" size={14} color={Colors.textSecondary} />
              <Text style={styles.statusText}>
                {activeUsers} {activeUsers === 1 ? "listener" : "listeners"}
              </Text>
            </View>
            <View style={styles.statusItem}>
              {isTransmitting ? (
                <>
                  <View style={styles.txDot} />
                  <Text style={[styles.statusText, { color: RED_TRANSMIT }]}>TX</Text>
                </>
              ) : isTuned ? (
                <>
                  <View style={styles.rxDot} />
                  <Text style={[styles.statusText, { color: EMERALD }]}>RX</Text>
                </>
              ) : (
                <Text style={styles.statusText}>OFF</Text>
              )}
            </View>
          </View>
        </View>

        {showChannelPicker && (
          <View style={styles.channelPicker}>
            <ScrollView style={styles.channelScroll} showsVerticalScrollIndicator={false}>
              {CB_CHANNELS.map((ch) => (
                <TouchableOpacity
                  key={ch.id}
                  style={[
                    styles.channelOption,
                    ch.id === currentChannel.id && styles.channelOptionActive,
                  ]}
                  onPress={() => switchChannel(ch)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.channelOptionNum,
                      ch.id === currentChannel.id && styles.channelOptionTextActive,
                    ]}
                  >
                    CH {String(ch.id).padStart(2, "0")}
                  </Text>
                  <Text
                    style={[
                      styles.channelOptionLabel,
                      ch.id === currentChannel.id && styles.channelOptionTextActive,
                    ]}
                  >
                    {ch.label}
                  </Text>
                  {ch.id === currentChannel.id && (
                    <Feather name="check" size={16} color={EMERALD} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.controls}>
          {!isTuned ? (
            <TouchableOpacity
              style={[styles.tuneBtn, isJoining && styles.tuneBtnDisabled]}
              onPress={tuneIn}
              disabled={isJoining}
              activeOpacity={0.8}
            >
              <Feather name="radio" size={24} color="#000" />
              <Text style={styles.tuneBtnText}>
                {isJoining ? "Tuning In..." : "Tune In"}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <Animated.View
                style={[
                  styles.pttOuter,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <Animated.View
                  style={[styles.pttGlow, { backgroundColor: glowColor }]}
                />
                <TouchableOpacity
                  style={[
                    styles.pttButton,
                    isTransmitting && styles.pttButtonActive,
                  ]}
                  onPressIn={startTransmit}
                  onPressOut={stopTransmit}
                  activeOpacity={0.9}
                >
                  <Feather
                    name="mic"
                    size={40}
                    color={isTransmitting ? "#FFF" : EMERALD}
                  />
                  <Text
                    style={[
                      styles.pttLabel,
                      isTransmitting && styles.pttLabelActive,
                    ]}
                  >
                    {isTransmitting ? "TRANSMITTING" : "PUSH TO TALK"}
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.bottomControls}>
                <TouchableOpacity
                  style={[styles.speakerBtn, speakerOn && styles.speakerBtnActive]}
                  onPress={toggleSpeaker}
                  activeOpacity={0.8}
                >
                  <Feather
                    name={speakerOn ? "volume-2" : "volume-x"}
                    size={20}
                    color={speakerOn ? EMERALD : Colors.textDim}
                  />
                  <Text style={[styles.speakerText, speakerOn && styles.speakerTextActive]}>
                    {speakerOn ? "Speaker On" : "Speaker Off"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.tuneOutBtn}
                  onPress={tuneOut}
                  activeOpacity={0.8}
                >
                  <Feather name="power" size={18} color={Colors.danger} />
                  <Text style={styles.tuneOutText}>Tune Out</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Hold the button to transmit. Release to listen.
          </Text>
          <Text style={styles.footerSubtext}>
            Everyone on CH {String(currentChannel.id).padStart(2, "0")} can hear you.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  radioBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  displayPanel: {
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: EMERALD_DIM,
  },
  displayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  signalIndicator: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  signalBar: {
    width: 4,
    height: 8,
    borderRadius: 1,
    backgroundColor: Colors.textDim,
  },
  signalBarMed: { height: 12 },
  signalBarTall: { height: 16 },
  signalActive: { backgroundColor: EMERALD },
  displayLabel: {
    color: EMERALD,
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    letterSpacing: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textDim,
  },
  statusDotActive: {
    backgroundColor: EMERALD,
  },
  channelDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  channelNumber: {
    color: Colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    letterSpacing: 1,
  },
  channelLabel: {
    color: Colors.textSecondary,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    flex: 1,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    color: Colors.textSecondary,
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  txDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: RED_TRANSMIT,
  },
  rxDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: EMERALD,
  },
  channelPicker: {
    marginTop: 12,
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    maxHeight: 280,
    overflow: "hidden",
  },
  channelScroll: {
    padding: 8,
  },
  channelOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    gap: 12,
  },
  channelOptionActive: {
    backgroundColor: EMERALD_DIM,
  },
  channelOptionNum: {
    color: Colors.text,
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    width: 50,
  },
  channelOptionLabel: {
    color: Colors.textSecondary,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    flex: 1,
  },
  channelOptionTextActive: {
    color: EMERALD,
  },
  controls: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  tuneBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: EMERALD,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 16,
  },
  tuneBtnDisabled: {
    opacity: 0.6,
  },
  tuneBtnText: {
    color: "#000",
    fontFamily: "Inter_700Bold",
    fontSize: 18,
  },
  pttOuter: {
    alignItems: "center",
    justifyContent: "center",
  },
  pttGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  pttButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.bgCard,
    borderWidth: 3,
    borderColor: EMERALD,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  pttButtonActive: {
    backgroundColor: RED_TRANSMIT,
    borderColor: RED_TRANSMIT,
  },
  pttLabel: {
    color: EMERALD,
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 1.5,
  },
  pttLabelActive: {
    color: "#FFF",
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 32,
  },
  speakerBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.bgCard,
  },
  speakerBtnActive: {
    borderColor: EMERALD_DIM,
    backgroundColor: EMERALD + "10",
  },
  speakerText: {
    color: Colors.textDim,
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  speakerTextActive: {
    color: EMERALD,
  },
  tuneOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.danger + "40",
    backgroundColor: Colors.danger + "10",
  },
  tuneOutText: {
    color: Colors.danger,
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 16,
    gap: 4,
  },
  footerText: {
    color: Colors.textSecondary,
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    textAlign: "center",
  },
  footerSubtext: {
    color: Colors.textDim,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    textAlign: "center",
  },
});

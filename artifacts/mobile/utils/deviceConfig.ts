import { Platform } from "react-native";

export const DEVICE_BUILD = {
  isEnterprise: false,
  isComtactsDevice: false,
  deviceModel: "generic",
};

export function detectComtactsDevice(): boolean {
  if (Platform.OS !== "android") {
    return false;
  }

  const brand = (Platform as any).constants?.Brand?.toLowerCase() || "";
  const model = (Platform as any).constants?.Model?.toLowerCase() || "";
  const manufacturer =
    (Platform as any).constants?.Manufacturer?.toLowerCase() || "";

  const isComtactsHardware =
    brand.includes("comtacts") ||
    model.includes("comtacts") ||
    manufacturer.includes("comtacts");

  if (isComtactsHardware) {
    DEVICE_BUILD.isComtactsDevice = true;
    DEVICE_BUILD.isEnterprise = true;
    DEVICE_BUILD.deviceModel = model || "comtacts-ptt";
  }

  return isComtactsHardware;
}

export function getDeviceFeatures() {
  return {
    hasPTTButton: DEVICE_BUILD.isComtactsDevice,
    hasAlwaysOnRadio: DEVICE_BUILD.isEnterprise,
    hasPriorityAudio: DEVICE_BUILD.isComtactsDevice,
    premiumIncluded: DEVICE_BUILD.isComtactsDevice,
    hasFleetManagement: DEVICE_BUILD.isEnterprise,
    hasBootAutoLaunch: DEVICE_BUILD.isComtactsDevice,
  };
}

export function shouldRequireSubscription(): boolean {
  return !DEVICE_BUILD.isComtactsDevice;
}

export function getAudioConfig() {
  if (DEVICE_BUILD.isComtactsDevice) {
    return {
      defaultSpeakerphone: true,
      pttActivationDelayMs: 30,
      audioStream: "VOICE_CALL",
      noiseCancellation: true,
      priorityRouting: true,
    };
  }

  return {
    defaultSpeakerphone: true,
    pttActivationDelayMs: 80,
    audioStream: "MUSIC",
    noiseCancellation: false,
    priorityRouting: false,
  };
}

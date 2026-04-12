import { Platform } from "react-native";

const PTT_KEY_CODES = [
  79,   // KEYCODE_HEADSETHOOK
  293,  // KEYCODE_PTT (vendor-specific, common on rugged devices)
  294,  // KEYCODE_PTT_ALT (some manufacturers)
];

export type PTTButtonState = "pressed" | "released";

type PTTCallback = (state: PTTButtonState) => void;

let pttCallback: PTTCallback | null = null;

export function registerPTTButton(callback: PTTCallback): () => void {
  if (Platform.OS !== "android") {
    return () => {};
  }

  pttCallback = callback;

  return () => {
    pttCallback = null;
  };
}

export function handleKeyEvent(
  eventType: "keyDown" | "keyUp",
  keyCode: number
): boolean {
  if (!PTT_KEY_CODES.includes(keyCode)) {
    return false;
  }

  if (pttCallback) {
    pttCallback(eventType === "keyDown" ? "pressed" : "released");
  }

  return true;
}

export function isPTTKeyCode(keyCode: number): boolean {
  return PTT_KEY_CODES.includes(keyCode);
}

export const PTT_CONFIG = {
  activationDelay: 50,
  debounceMs: 100,
  wakeLockEnabled: true,
  backgroundPTTEnabled: true,
  supportedKeyCodes: PTT_KEY_CODES,
};

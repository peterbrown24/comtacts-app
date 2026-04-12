# Comt@cts, Inc. — Device Manufacturing Specification

**Document Version:** 1.0  
**Date:** April 2026  
**Prepared by:** Peter Douglas Brown, Founder  
**Contact:** comtacts.ca | support@comtacts.inc

---

## 1. Product Overview

**Product Name:** Comt@cts PTT Device (working title)  
**Purpose:** A rugged, purpose-built push-to-talk communication device running Comt@cts enterprise software.  
**Target Markets:** Logistics, warehousing, construction, field services, hospitality, security teams.  
**Operating System:** Android 13+ (AOSP or manufacturer fork acceptable)

---

## 2. Hardware Requirements

### 2.1 Physical Design

| Specification | Requirement |
|---|---|
| Form factor | Candy bar / rugged smartphone |
| Dimensions | Approximately 150mm x 75mm x 14mm (compact, pocket-friendly) |
| Weight | Under 250g |
| Durability | IP67 water and dust resistance minimum |
| Drop rating | MIL-STD-810H compliant (1.5m drop to concrete) |
| Operating temp | -20C to +55C |
| Color | Matte black with accent options |
| Branding | Comt@cts logo on rear panel and boot screen |

### 2.2 Display

| Specification | Requirement |
|---|---|
| Size | 5.5 to 6.0 inches |
| Resolution | 1080 x 1920 (FHD) minimum |
| Type | IPS LCD or AMOLED |
| Touch | Capacitive, glove-compatible |
| Brightness | 500 nits minimum (outdoor visibility) |
| Protection | Gorilla Glass 5 or equivalent |

### 2.3 Processor and Memory

| Specification | Requirement |
|---|---|
| Chipset | Qualcomm Snapdragon 680 or equivalent (mid-range) |
| RAM | 6 GB minimum |
| Storage | 64 GB minimum (128 GB preferred) |
| Expandable | MicroSD slot up to 256 GB |

### 2.4 Audio (Critical for PTT)

| Specification | Requirement |
|---|---|
| Front speaker | Loud front-facing speaker, 1.5W minimum |
| Speaker output | 100 dB minimum at 10cm |
| Microphone | Dual noise-canceling microphones |
| Audio latency | Under 100ms round-trip for PTT |
| Audio codec | AMR-WB, AAC, Opus support |
| 3.5mm jack | Yes (for external headset/earpiece) |

### 2.5 Dedicated PTT Button

| Specification | Requirement |
|---|---|
| Location | Left side, easily reachable with index finger when held |
| Type | Physical tactile button with distinct click feel |
| Size | Minimum 15mm x 8mm raised surface |
| Texture | Textured/ridged for blind operation |
| Function | Programmable — maps to Comt@cts 2W@y push-to-talk |
| Key event | Must emit Android KeyEvent accessible by apps |
| Secondary function | Configurable long-press for emergency alert |

### 2.6 Connectivity

| Specification | Requirement |
|---|---|
| Cellular | 4G LTE (bands 2, 4, 5, 7, 12, 13, 17, 25, 26, 66) |
| Wi-Fi | 802.11 a/b/g/n/ac (2.4 GHz and 5 GHz) |
| Bluetooth | 5.0+ (for headsets and accessories) |
| GPS | GPS, GLONASS, Galileo |
| NFC | Optional (for future access card features) |
| USB | USB-C with OTG support |
| SIM | Dual nano-SIM or nano-SIM + eSIM |

### 2.7 Camera

| Specification | Requirement |
|---|---|
| Rear camera | 13 MP minimum with autofocus and LED flash |
| Front camera | 8 MP minimum (for F@ce2F@ce video calls) |
| Video | 1080p at 30fps minimum |
| Features | Barcode/QR scanning capability |

### 2.8 Battery

| Specification | Requirement |
|---|---|
| Capacity | 5000 mAh minimum |
| Talk time | 12+ hours of active PTT use |
| Standby | 72+ hours |
| Charging | USB-C fast charging (18W minimum) |
| Battery type | Non-removable Li-Po (or removable if design permits) |

### 2.9 Sensors

| Specification | Requirement |
|---|---|
| Accelerometer | Yes |
| Gyroscope | Yes |
| Proximity | Yes |
| Ambient light | Yes |
| Compass | Yes |

---

## 3. Software Requirements

### 3.1 Operating System

- Android 13 (API level 33) minimum
- Google Play Services not required (app is sideloaded)
- Custom boot animation with Comt@cts branding
- Custom wallpaper with Comt@cts branding

### 3.2 Pre-installed Application

The device ships with **Comt@cts** as the primary communication application:

- **Package name:** com.comtacts.inc
- **Installation:** Pre-installed as system app (cannot be uninstalled)
- **Auto-launch:** App opens automatically on boot
- **Default communication app:** All PTT functions route through Comt@cts

### 3.3 PTT Button Integration

The physical PTT button must:

1. Send a standard Android KeyEvent when pressed and released
2. Be accessible to foreground applications via onKeyDown/onKeyUp listeners
3. Work when the screen is off (wake device and activate PTT)
4. Work when the device is locked (bypass lock screen for PTT only)
5. Emit a distinct key code not shared with volume or power buttons

**Recommended key code:** KeyEvent.KEYCODE_HEADSETHOOK or a custom vendor key code (to be agreed upon)

### 3.4 Audio Configuration

- PTT audio must use the STREAM_VOICE_CALL audio stream
- Speakerphone must be the default audio output for PTT
- Audio focus management must prioritize PTT over media playback
- Microphone must activate within 50ms of PTT button press

### 3.5 Network Priority

- Voice/PTT data packets should be prioritized (QoS marking if supported)
- Background data restrictions must exempt the Comt@cts application

### 3.6 Security

- Full disk encryption enabled by default
- Secure boot chain
- No unnecessary pre-installed bloatware
- OTA update capability for both firmware and Comt@cts application

---

## 4. Comt@cts Software Features (Pre-installed)

The device ships with full access to the Comt@cts communication suite:

| Feature | Description |
|---|---|
| Comch@t | AES-256-GCM encrypted messaging with read receipts |
| Comch@tter | Push-to-talk voice notes and walkie-talkie communication |
| F@ce2F@ce | 1-on-1 encrypted video calling (Agora-powered) |
| F@ceGroup | Multi-participant group video conferencing |
| Comer@ | In-app camera for instant photo/video sharing |
| 2W@y | CB radio-style open channels — 10 preset channels with PTT |

**Premium features** are included with device purchase (no monthly subscription required for device owners).

---

## 5. Branding and Customization

### 5.1 Physical Branding

- Comt@cts logo laser-engraved or printed on device rear
- "Comt@cts" text on bottom bezel (if space permits)
- PTT button labeled with radio wave icon

### 5.2 Software Branding

- Custom boot animation: Comt@cts logo fade-in on dark background (#0D1117)
- Custom lock screen wallpaper
- App icon on home screen: Comt@cts branded icon
- Status bar: Comt@cts accent color (#00C896) for notification indicators

### 5.3 Packaging

- Box design: Matte black with Comt@cts branding
- Included: Device, USB-C cable, charging adapter, quick start guide
- Quick start guide includes QR code linking to comtacts.ca/support

---

## 6. Accessories (Optional)

| Accessory | Description |
|---|---|
| Belt clip holster | Rugged belt-mount with quick release |
| Remote PTT mic | Wired shoulder microphone with PTT button |
| Bluetooth earpiece | Branded single-ear Bluetooth headset with PTT |
| Vehicle mount | Dashboard/windshield mount with charging |
| Charging dock | Desktop charging stand for single or multi-unit |

---

## 7. Compliance and Certification

| Certification | Required |
|---|---|
| FCC | Yes (United States) |
| IC | Yes (Canada) |
| CE | If targeting European market |
| RoHS | Yes |
| IP67 | Yes |
| MIL-STD-810H | Yes |

---

## 8. Order Expectations

| Phase | Quantity |
|---|---|
| Initial samples | 3 to 5 units |
| Pilot batch | 200 to 500 units |
| First production run | 1,000 to 2,000 units |
| Ongoing | Based on demand |

---

## 9. Contact for Discussion

**Peter Douglas Brown**  
Founder, Comt@cts, Inc.  
Website: comtacts.ca  
Email: support@comtacts.inc

---

*This document is confidential and intended for potential manufacturing partners only.*

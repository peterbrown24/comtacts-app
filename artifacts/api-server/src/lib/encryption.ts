import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const TAG_LENGTH = 16;
const SALT_LENGTH = 16;

function getEncryptionKey(): Buffer {
  const key = process.env["ENCRYPTION_KEY"];
  if (key && key.length >= 32) {
    return Buffer.from(key.slice(0, 32), "utf8");
  }
  const dbUrl = process.env["DATABASE_URL"] || "comtacts-default-key-seed-value";
  return crypto.scryptSync(dbUrl, "comtacts-salt-v1", 32);
}

export function encrypt(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const tag = cipher.getAuthTag();

  const combined = Buffer.concat([iv, tag, encrypted]);
  return "enc:" + combined.toString("base64");
}

export function decrypt(ciphertext: string): string {
  if (!ciphertext.startsWith("enc:")) {
    return ciphertext;
  }

  const key = getEncryptionKey();
  const combined = Buffer.from(ciphertext.slice(4), "base64");

  const iv = combined.subarray(0, IV_LENGTH);
  const tag = combined.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const encrypted = combined.subarray(IV_LENGTH + TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf8");
}

export function isEncrypted(value: string): boolean {
  return value.startsWith("enc:");
}

export function hashSensitive(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 12);
}

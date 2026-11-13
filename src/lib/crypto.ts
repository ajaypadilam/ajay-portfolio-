import crypto from "crypto";

export function encryptToken(text: string, pass: string): string {
  const key = crypto.scryptSync(pass, "portfolio_salt_987", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let enc = cipher.update(text, "utf8", "hex");
  enc += cipher.final("hex");
  return iv.toString("hex") + ":" + enc;
}

export function decryptToken(encText: string, pass: string): string | null {
  try {
    const parts = encText.split(":");
    if (parts.length !== 2) return null;
    const [ivHex, enc] = parts;
    const key = crypto.scryptSync(pass, "portfolio_salt_987", 32);
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let dec = decipher.update(enc, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  } catch (e) {
    return null;
  }
}

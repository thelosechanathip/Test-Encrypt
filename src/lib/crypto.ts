// =====================================================
// lib/crypto.ts
// Client-Side Encryption/Decryption ด้วย Web Crypto API
// =====================================================
//
// Algorithm: AES-256-GCM
// Format:    base64( iv[12 bytes] + ciphertext + authTag[16 bytes] )
//
// Format นี้ตรงกับ Go backend:
//   aesGCM.Seal(nonce, nonce, plaintext, nil)
// =====================================================

// --- Helper functions ---

function hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

// --- Key Management ---

let cachedKey: CryptoKey | null = null;

function getHexKey(): string {
    const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    if (!key || key.length !== 64) {
        throw new Error(
            "NEXT_PUBLIC_ENCRYPTION_KEY must be 64 hex characters (32 bytes)"
        );
    }
    return key;
}

async function getKey(): Promise<CryptoKey> {
    if (cachedKey) return cachedKey;

    const keyBytes = hexToBytes(getHexKey());

    cachedKey = await crypto.subtle.importKey(
        "raw",
        keyBytes.buffer as ArrayBuffer,  // ← เพิ่ม .buffer as ArrayBuffer
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );

    return cachedKey;
}

// --- Encrypt / Decrypt ---

/**
 * เข้ารหัสข้อมูลด้วย AES-256-GCM
 *
 * @param plaintext - string ที่ต้องการเข้ารหัส
 * @returns base64( iv + ciphertext + authTag )
 *
 * ตัวอย่าง:
 *   const encrypted = await encrypt(JSON.stringify({ name: "สมหญิง" }));
 */
export async function encrypt(plaintext: string): Promise<string> {
    const key = await getKey();

    // สร้าง IV 12 bytes แบบ random (สำคัญ: ห้ามใช้ซ้ำ!)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encoded = new TextEncoder().encode(plaintext);

    // Web Crypto API จะ append authTag(16 bytes) ต่อท้าย ciphertext อัตโนมัติ
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv, tagLength: 128 },
        key,
        encoded
    );

    // รวม: iv(12) + ciphertext + authTag(16)
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);

    return bytesToBase64(combined);
}

/**
 * ถอดรหัสข้อมูลจาก AES-256-GCM
 *
 * @param encryptedBase64 - base64( iv + ciphertext + authTag )
 * @returns string ที่ถอดรหัสแล้ว
 */
export async function decrypt(encryptedBase64: string): Promise<string> {
    const key = await getKey();

    const combined = base64ToBytes(encryptedBase64);

    const iv = combined.slice(0, 12);
    const ciphertextWithTag = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv, tagLength: 128 },
        key,
        ciphertextWithTag
    );

    return new TextDecoder().decode(decrypted);
}
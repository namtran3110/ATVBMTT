const crypto = require('crypto');

// Cấu hình thuật toán mã hóa đối xứng AES-256 trong chế độ GCM
const ALGORITHM = 'aes-256-gcm';
// Khai báo khóa bí mật 256-bit (32 bytes)
const SECRET_KEY = crypto.randomBytes(32);

// Hàm Mã hóa (Encryption)
function encryptAES(plaintext) {
    // Tạo Vector khởi tạo ngẫu nhiên (IV) 12 bytes
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

    let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
    ciphertext += cipher.final('hex');
    
    // Lấy Mã xác thực toàn vẹn dữ liệu (Authentication Tag)
    const authTag = cipher.getAuthTag().toString('hex');

    return {
        iv: iv.toString('hex'),
        ciphertext: ciphertext,
        authTag: authTag
    };
}

// Hàm Giải mã (Decryption)
function decryptAES(encryptedData) {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const authTag = Buffer.from(encryptedData.authTag, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedData.ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// ================= THỰC THI MÔ PHỎNG =================
const message = "Trần Nhất Nam Lớp K59KMT";

console.log("=== MO PHONG THUAT TOAN MA HOA AES-256-GCM ===");
console.log("[1] Van ban goc (Plaintext):", message);

// 1. Mã hóa
const encryptedResult = encryptAES(message);
console.log("\n[2] Ket qua ma hoa:");
console.log(" - Ciphertext :", encryptedResult.ciphertext);
console.log(" - Vector IV  :", encryptedResult.iv);
console.log(" - Auth Tag   :", encryptedResult.authTag);

// 2. Giải mã
const decryptedMessage = decryptAES(encryptedResult);
console.log("\n[3] Ket qua giai ma (Decrypted Text):");
console.log(" =>", decryptedMessage);
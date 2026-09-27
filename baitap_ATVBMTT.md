# BÀI TẬP 1: THUẬT TOÁN MÃ HÓA ĐỐI XỨNG DES VÀ AES

**Họ và tên:** Trần Nhất Nam  
**Môn học:** An toàn và Bảo mật Thông tin  

---

## I. LÝ THUYẾT VỀ DES VÀ AES

### 1. Thuật toán DES (Data Encryption Standard)

* **Khái niệm:** Là thuật toán mã hóa khối (Block Cipher) đối xứng ra đời năm 1977.
* **Kích thước khối (Block size):** 64-bit (8 bytes).
* **Độ dài khóa (Key length):** 64-bit (chỉ 56-bit dùng cho mã hóa, 8-bit dùng để kiểm tra lỗi chẵn lẻ).
* **Cấu trúc:** Sử dụng **Mạng Feistel** gồm **16 vòng (rounds)** biến đổi.
* **Quy trình mã hóa:**
  1. **Hoán vị ban đầu ($IP$):** Chia khối dữ liệu 64-bit thành 2 nửa 32-bit ($L_0$ và $R_0$).
  2. **16 vòng lặp Feistel:** Tại mỗi vòng $i$:
     $$L_i = R_{i-1}$$
     $$R_i = L_{i-1} \oplus F(R_{i-1}, K_i)$$
     *(Trong đó $F$ là hàm biến đổi sử dụng bảng thế S-Box, $K_i$ là khóa con 48-bit)*.
  3. **Hoán vị kết thúc ($IP^{-1}$):** Đảo ngược quá trình hoán vị ban đầu để thu được khối ciphertext 64-bit.
* **Đánh giá an toàn:** **Không còn an toàn** do không gian khóa $2^{56}$ quá nhỏ, bị bẻ khóa dễ dàng bằng phương pháp Brute-force.

---

### 2. Thuật toán AES (Advanced Encryption Standard)

* **Khái niệm:** Thuật toán mã hóa đối xứng tiêu chuẩn thay thế cho DES từ năm 2001.
* **Kích thước khối (Block size):** Cố định 128-bit (16 bytes).
* **Độ dài khóa:** Hỗ trợ 128-bit (AES-128), 192-bit (AES-192) hoặc 256-bit (AES-256).
* **Cấu trúc:** Sử dụng **Mạng Thế - Hoán vị (SPN - Substitution-Permutation Network)**.
* **Số vòng mã hóa (Rounds):** 10 vòng (AES-128), 12 vòng (AES-192), 14 vòng (AES-256).
* **Quy trình mã hóa (Ví dụ với AES-128):**
  1. **Khởi tạo:** `AddRoundKey` (Trộn ma trận trạng thái dữ liệu với khóa vòng đầu tiên).
  2. **9 vòng lặp chính:** Mỗi vòng thực hiện 4 bước:
     * **SubBytes:** Thế các byte phi tuyến qua bảng S-Box.
     * **ShiftRows:** Dịch chuyển vòng các hàng trong ma trận trạng thái.
     * **MixColumns:** Trộn các cột bằng phép toán trên trường $GF(2^8)$.
     * **AddRoundKey:** Cộng khóa subkey của vòng đó.
  3. **Vòng cuối cùng (Vòng 10):** Thực hiện 3 bước: `SubBytes` $\rightarrow$ `ShiftRows` $\rightarrow$ `AddRoundKey` (Bỏ qua bước `MixColumns`).
* **Đánh giá an toàn:** Rất an toàn, chưa có lỗ hổng lý thuyết nào hiệu quả hơn việc duyệt sạch không gian khóa.

---

### 3. Bảng so sánh DES và AES

| Đặc tính | DES | AES |
| :--- | :--- | :--- |
| **Năm ban hành** | 1977 | 2001 |
| **Kích thước khối** | 64-bit | 128-bit |
| **Độ dài khóa** | 56-bit | 128, 192, 256-bit |
| **Cấu trúc** | Feistel Network | Substitution-Permutation Network (SPN) |
| **Số vòng biến đổi** | 16 vòng | 10, 12, hoặc 14 vòng |
| **Mức độ an toàn** | Đã bị phá vỡ (Brute-force) | An toàn tuyệt đối ở thời điểm hiện tại |

---

## II. CÀI ĐẶT AES-256-CBC VỚI JAVASCRIPT (NODE.JS)

### 1. Mã nguồn chương trình (`aes_demo.js`)

```javascript
const crypto = require('crypto');

// Cấu hình thuật toán AES-256-CBC
const ALGORITHM = 'aes-256-cbc';
// Sinh khóa 256-bit (32 bytes) từ chuỗi mật khẩu
const SECRET_KEY = crypto.scryptSync('mySecretPassword', 'salt', 32);

/**
 * Hàm mã hóa văn bản
 * @param {string} text - Văn bản cần mã hóa
 */
function encrypt(text) {
    const iv = crypto.randomBytes(16); // Vector khởi tạo 16 bytes
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}

/**
 * Hàm giải mã văn bản
 * @param {string} encryptedData - Chuỗi đã mã hóa (Hex)
 * @param {string} ivHex - Vector IV (Hex)
 */
function decrypt(encryptedData, ivHex) {
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}

// --- THỰC THI CHƯƠNG TRÌNH ---
const originalText = "Xin chào, tôi là Trần Nhất Nam. Đây là bài tập mã hóa AES!";

console.log("=== CHƯƠNG TRÌNH MÃ HÓA AES-256-CBC (NODE.JS) ===");
console.log(`Văn bản gốc: "${originalText}"\n`);

// 1. Mã hóa
const result = encrypt(originalText);
console.log("--- BẮT ĐẦU MÃ HÓA ---");
console.log(`> Initialization Vector (IV): ${result.iv}`);
console.log(`> Ciphertext (Hex): ${result.encryptedData}\n`);

// 2. Giải mã
const decryptedText = decrypt(result.encryptedData, result.iv);
console.log("--- BẮT ĐẦU GIẢI MÃ ---");
console.log(`> Văn bản giải mã: "${decryptedText}"\n`);

// 3. Kiểm tra
if (originalText === decryptedText) {
    console.log("=> KẾT QUẢ: Mã hóa và Giải mã THÀNH CÔNG!");
} else {
    console.log("=> KẾT QUẢ: THẤT BẠI!");
}

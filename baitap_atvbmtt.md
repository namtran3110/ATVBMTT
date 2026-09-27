# MÔN HỌC: AN TOÀN VÀ BẢO MẬT THÔNG TIN
## Họ và tên: TRẦN NHẤT NAM
## MSSV: K235480106001
## Lớp: K59KMT

---

### BÀI 1: THUẬT TOÁN DES, AES
TÌM HIỂU VÀ MÔ TẢ THUẬT TOÁN MÃ HÓA HIỆN ĐẠI DES, AES
Mã hóa đối xứng là phương pháp mã hóa mà bên gửi và bên nhận dùng chung một khóa bí mật (Secret Key) để thực hiện cả quá trình mã hóa lẫn giải mã.
1. Thuật toán mã hóa khối DES (Data Encryption Standard)
#### a) Tổng quan và Cấu trúc
* **Kiểu mã hóa:** Mã hóa khối (Block Cipher).
* **Kích thước khối dữ liệu:** 64 bit.
* **Độ dài khóa:** Khóa ban đầu có độ dài 64 bit, nhưng 8 bit dùng làm bit kiểm tra (parity), nên độ dài khóa thực tế chỉ là 56 bit.
* **Mô hình cốt lõi:** Cấu trúc Feistel Network gồm 16 vòng (round) biến đổi lặp lại.
#### b) Quy trình Mã hóa và Giải mã DES
* **Bước 1 (Hoán vị ban đầu - Initial Permutation):** Khối dữ liệu 64 bit ban đầu được xáo trộn vị trí các bit theo một bảng cố định.
* **Bước 2 (Tách đôi):** Khối 64 bit được chia thành 2 nửa bằng nhau: Nửa trái L0 (32 bit) và Nửa phải R0 (32 bit).
* **Bước 3 (16 Vòng biến đổi Feistel):**
  Tại mỗi vòng i (từ vòng 1 đến vòng 16):
  * Khóa con Ki (48 bit) được sinh ra từ khóa chính 56 bit.
  * Nửa phải R_(i-1) được đưa qua Hàm F phối hợp cùng khóa con Ki:
    * **Mở rộng:** Biến đổi 32 bit R_(i-1) thành 48 bit.
    * **Phép XOR:** Cộng XOR kết quả 48 bit vừa tạo với khóa con Ki (48 bit).
    * **Phép Thế (Hộp S-Box):** Đưa qua 8 hộp thế S-Box để nén 48 bit về lại 32 bit (đây là bước quan trọng nhất tạo ra độ phi tuyến và bảo mật cho DES).
    * **Hoán vị (Hộp P-Box):** Hoán vị lại vị trí của 32 bit kết quả.
  * **Cập nhật dữ liệu cho vòng tiếp theo:**
    * Nửa trái mới L_i = Nửa phải cũ R_(i-1)
    * Nửa phải mới R_i = (Nửa trái cũ L_(i-1)) XOR (Kết quả hàm F)
* **Bước 4 (Hoán vị nghịch đảo):** Sau vòng thứ 16, đảo ngược vị trí Nửa trái L16 và Nửa phải R16, ghép lại thành 64 bit rồi đưa qua bảng hoán vị nghịch đảo để tạo ra chuỗi Mã hóa (Ciphertext).
* **Quy trình Giải mã DES:** Tương tự như quy trình mã hóa nhưng các khóa con được sử dụng theo thứ tự ngược lại (từ K16 về K1).
> **Hạn chế của DES:** Khóa 56 bit quá ngắn, hệ thống máy tính hiện đại dễ dàng phá vỡ bằng phương pháp thử toàn bộ khóa (Brute-Force) trong thời gian ngắn.
### 2. Thuật toán mã hóa hiện đại AES (Advanced Encryption Standard)
#### a) Tổng quan và Cấu trúc
AES được chuẩn hóa để thay thế DES nhờ độ bảo mật vượt trội.
* **Kích thước khối dữ liệu:** Cố định 128 bit (16 bytes).
* **Độ dài khóa hỗ trợ:** 128 bit, 192 bit, hoặc 256 bit.
* **Mô hình cốt lõi:** Mạng Thế - Hoán vị (Substitution-Permutation Network - SPN). Xử lý dữ liệu dưới dạng ma trận trạng thái (State Matrix) kích thước 4x4 bytes.
* **Số vòng biến đổi:**
  * **AES-128 bit:** 10 vòng
  * **AES-192 bit:** 12 vòng
  * **AES-256 bit:** 14 vòng
#### b) Quy trình Mã hóa AES
Dữ liệu đầu vào 128 bit được xếp vào Ma trận trạng thái 4x4 bytes. Quá trình mã hóa diễn ra qua các bước:
* **Bước 0 (Khởi động - AddRoundKey):** Cộng XOR ma trận trạng thái ban đầu với Khóa con của vòng 0.
* **Bước 1 (Các vòng chính - Từ vòng 1 đến vòng cận cuối):** Mỗi vòng thực hiện 4 biến đổi lặp lại:
  1. **SubBytes (Thế byte):** Thay thế từng byte trong ma trận bằng bảng thế S-Box phi tuyến.
  2. **ShiftRows (Dịch hàng):** Dịch chuyển vòng các hàng của ma trận trạng thái (Hàng 0 giữ nguyên, Hàng 1 dịch trái 1 byte, Hàng 2 dịch trái 2 bytes, Hàng 3 dịch trái 3 bytes).
  3. **MixColumns (Trộn cột):** Trộn các byte trong cùng một cột bằng phép nhân ma trận trên trường Galois GF(2^8) để xáo trộn dữ liệu giữa các cột.
  4. **AddRoundKey (Thêm khóa vòng):** Cộng XOR ma trận trạng thái hiện tại với khóa con tương ứng của vòng đó.
* **Bước 2 (Vòng cuối cùng):** Bỏ qua bước MixColumns (Trộn cột), chỉ thực hiện 3 bước: SubBytes -> ShiftRows -> AddRoundKey. Xuất ra chuỗi mã hóa (Ciphertext).
#### c) Quy trình Giải mã AES
Quy trình giải mã đi ngược từ vòng cuối cùng về vòng 0 và sử dụng các hàm biến đổi nghịch đảo tương ứng: InvShiftRows, InvSubBytes, AddRoundKey, InvMixColumns.
### 3. Mã nguồn mô phỏng AES-256-GCM bằng Node.js
```
const crypto = require('crypto');

// Cấu hình thuật toán mã hóa đối xứng AES-256 trong chế độ GCM
const ALGORITHM = 'aes-256-gcm';
// Khai báo khóa bí mật 256-bit (32 bytes)
const SECRET_KEY = crypto.randomBytes(32);
```
// Hàm Mã hóa (Encryption)
```
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
```

// Hàm Giải mã (Decryption)
```
function decryptAES(encryptedData) {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const authTag = Buffer.from(encryptedData.authTag, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedData.ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
```

// ================= THỰC THI MÔ PHỎNG =================
```
const message = "Trần Nhất Nam Lớp K59KMT";

console.log("=== MO PHONG THUAT TOAN MA HOA AES-256-GCM ===");
console.log("[1] Van ban goc (Plaintext):", message);
```

// 1. Mã hóa
```
const encryptedResult = encryptAES(message);
console.log("\n[2] Ket qua ma hoa:");
console.log(" - Ciphertext :", encryptedResult.ciphertext);
console.log(" - Vector IV  :", encryptedResult.iv);
console.log(" - Auth Tag   :", encryptedResult.authTag);
```
// 2. Giải mã
```
const decryptedMessage = decryptAES(encryptedResult);
console.log("\n[3] Ket qua giai ma (Decrypted Text):");
console.log(" =>", decryptedMessage);
```

---

### BÀI 2: THUẬT TOÁN MÃ HÓA BẤT ĐỐI XỨNG RSA VÀ NGUYÊN LÝ SINH CẶP KHÓA

### 1. Thuật toán mã hóa bất đối xứng RSA
RSA (đặt theo tên ba nhà khoa học Rivest, Shamir và Adleman) là thuật toán mã hóa bất đối xứng phổ biến nhất hiện nay. Độ bảo mật của RSA dựa trên độ khó của bài toán phân tích một số nguyên cực lớn thành tích của hai số nguyên tố.

Trong hệ thống RSA, mỗi người dùng sở hữu một cặp khóa gồm:
* **Khóa công khai (Public Key - gồm hai tham số e và n):** Được công khai cho tất cả mọi người, dùng để MÃ HÓA dữ liệu hoặc KIỂM TRA CHỮ KÝ.
* **Khóa bí mật (Private Key - gồm hai tham số d và n):** Chỉ duy nhất người sở hữu giữ bí mật, dùng để GIẢI MÃ dữ liệu hoặc TẠO CHỮ KÝ SỐ.

---

### 2. Nguyên lý sinh cặp khóa RSA

Quy trình tạo cặp khóa RSA gồm 5 bước toán học cơ bản:

* **Bước 1 (Chọn số nguyên tố):** Chọn hai số nguyên tố ngẫu nhiên cực lớn là p và q (với p khác q).
* **Bước 2 (Tính Modulus):** Tính tích n = p * q. (n được gọi là Modulus, độ dài bit của n chính là độ dài khóa RSA, ví dụ: 2048 bit hoặc 4096 bit).
* **Bước 3 (Tính giá trị Phi Euler):** Tính giá trị Phi(n) = (p - 1) * (q - 1).
* **Bước 4 (Chọn số mũ công khai e):** Chọn số mũ mã hóa e sao cho e nằm trong khoảng từ 1 đến Phi(n) và e là số nguyên tố cùng nhau với Phi(n) (nghĩa là Ước số chung lớn nhất của e và Phi(n) bằng 1). Thực tế người ta thường chọn e = 65537.
* **Bước 5 (Tính số mũ bí mật d):** Tính số mũ giải mã bí mật d sao cho: (d * e) chia cho Phi(n) có dư là 1 (d là nghịch đảo nhân modular của e theo modulo Phi(n)). Người ta sử dụng thuật toán Euclide mở rộng để tìm d.

**Kết quả thu được:**
* **Khóa công khai (Public Key):** Cặp số (e, n)
* **Khóa bí mật (Private Key):** Cặp số (d, n)

---

### 3. Quy trình Mã hóa và Giải mã RSA

* **Quy trình Mã hóa:** 
  Muốn mã hóa thông điệp M (với M có giá trị nhỏ hơn n), ta tính bản mã C theo công thức: 
  `Bản mã C = (M mũ e) chia lấy dư cho n`

* **Quy trình Giải mã:** 
  Muốn khôi phục lại văn bản gốc M từ bản mã C, ta tính theo công thức: 
  `Văn bản gốc M = (C mũ d) chia lấy dư cho n`


















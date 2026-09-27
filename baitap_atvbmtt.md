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
<img width="1633" height="923" alt="image" src="https://github.com/user-attachments/assets/70cb02c1-63d8-4018-a2a8-12419e207670" />

---

### BÀI 2: THUẬT TOÁN MÃ HÓA BẤT ĐỐI XỨNG RSA VÀ NGUYÊN LÝ SINH CẶP KHÓA
1. Thuật toán mã hóa bất đối xứng RSA
RSA (đặt theo tên ba nhà khoa học Rivest, Shamir và Adleman) là thuật toán mã hóa bất đối xứng phổ biến nhất hiện nay. Độ bảo mật của RSA dựa trên độ khó của bài toán phân tích một số nguyên cực lớn thành tích của hai số nguyên tố.
Trong hệ thống RSA, mỗi người dùng sở hữu một cặp khóa gồm:
* **Khóa công khai (Public Key - gồm hai tham số e và n):** Được công khai cho tất cả mọi người, dùng để MÃ HÓA dữ liệu hoặc KIỂM TRA CHỮ KÝ.
* **Khóa bí mật (Private Key - gồm hai tham số d và n):** Chỉ duy nhất người sở hữu giữ bí mật, dùng để GIẢI MÃ dữ liệu hoặc TẠO CHỮ KÝ SỐ.
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
### 3. Quy trình Mã hóa và Giải mã RSA
* **Quy trình Mã hóa:** 
  Muốn mã hóa thông điệp M (với M có giá trị nhỏ hơn n), ta tính bản mã C theo công thức: 
  `Bản mã C = (M mũ e) chia lấy dư cho n`
* **Quy trình Giải mã:** 
  Muốn khôi phục lại văn bản gốc M từ bản mã C, ta tính theo công thức: 
  `Văn bản gốc M = (C mũ d) chia lấy dư cho n`

---

#### BÀI 3: CÁC MÔ HÌNH ÁP DỤNG RSA, SO SÁNH VỚI AES VÀ MÔ HÌNH KẾT HỢP
1. Các mô hình áp dụng thuật toán RSA
Giả sử người gửi là Alice và người nhận là Bob:
* Khóa công khai của Bob: Public Key Bob
* Khóa bí mật của Bob: Private Key Bob
* Khóa công khai của Alice: Public Key Alice
* Khóa bí mật của Alice: Private Key Alice
##### Mô hình A: Xác thực người nhận (Đảm bảo tính BẢO MẬT / BÍ MẬT)
* **Mục tiêu:** Chỉ duy nhất Bob (người nhận hợp pháp) mới đọc được nội dung thông điệp.
* **Quy trình:**
  1. Alice dùng "Public Key của Bob" để mã hóa thông điệp M thành bản mã C.
  2. Alice gửi C qua mạng cho Bob.
  3. Bob nhận C và dùng "Private Key của Bob" để giải mã thu lại thông điệp M.
* **Kết quả:** Kẻ xấu trên mạng dù chặn lấy được bản mã C cũng không thể giải mã vì không nắm giữ Private Key của Bob.
##### Mô hình B: Xác thực người gửi (Đảm bảo CHỮ KÝ SỐ / TÍNH CHỐNG CHỐI BỎ)
* **Mục tiêu:** Bob xác minh chính xác thông điệp được gửi từ Alice chứ không phải kẻ mạo danh.
* **Quy trình:**
  1. Alice dùng "Private Key của Alice" để mã hóa thông điệp (hoặc mã băm) để tạo ra Chữ ký số S.
  2. Alice gửi thông điệp M cùng Chữ ký S cho Bob.
  3. Bob dùng "Public Key của Alice" để giải mã Chữ ký S thu được M'.
  4. Nếu M' trùng khớp với M, Bob tin tưởng 100% thông điệp này do chính Alice gửi.
##### Mô hình C: Kết hợp Cả Xác thực người gửi VÀ Người nhận (Bảo mật + Chữ ký số)
* **Mục tiêu:** Vừa giữ bí mật nội dung thông điệp, vừa xác nhận chính xác danh tính người gửi.
* **Quy trình gửi (Alice):**
  1. Alice ký thông điệp bằng "Private Key của Alice" để tạo Chữ ký S.
  2. Alice mã hóa tiếp Chữ ký S bằng "Public Key của Bob" thành bản mã C.
  3. Alice gửi C cho Bob.
* **Quy trình nhận (Bob):**
  1. Bob giải mã C bằng "Private Key của Bob" để lấy lại Chữ ký S.
  2. Bob dùng "Public Key của Alice" để giải mã S xác minh danh tính Alice.
 
2. So sánh thời gian mã hóa/giải mã giữa RSA và AES


| Tiêu chí | Mã hóa AES | Mã hóa RSA |
| --- | --- | --- |
| Loại thuật toán | Mã hóa đối xứng | Mã hóa bất đối xứng |
| Cơ chế khóa | Dùng chung 1 khóa bí mật | Dùng cặp khóa công khai và bí mật |
| Bản chất toán học | Dịch bit và thay thế byte | Lũy thừa trên số nguyên lớn |
| Độ dài khóa chuẩn | 128, 192, 256 bit | 2048, 3072, 4096 bit |
| Tốc độ xử lý | Cực kỳ nhanh | Rất chậm (chậm hơn AES 1.000 - 10.000 lần) |
| Giới hạn dữ liệu | Không giới hạn | Phải nhỏ hơn kích thước n (dưới 256/512 bytes) |
| Phân phối khóa | Khó khăn khi gửi khóa qua mạng | Dễ dàng quản lý nhờ khóa công khai |

3. Mô hình kết hợp sức mạnh của RSA và AES (Hệ thống mã hóa lai - Hybrid Cryptosystem)
Do AES mã hóa cực kỳ nhanh nhưng khó truyền khóa bí mật an toàn, còn RSA quản lý khóa rất tốt nhưng mã hóa dữ liệu lớn lại rất chậm, các hệ thống thực tế (HTTPS, PGP, SSH) luôn kết hợp cả hai thuật toán.
##### Sơ đồ quy trình hoạt động:
```text
[ BÊN GỬI: ALICE ]
  |
  +--> 1. Tự động sinh một "Khóa phiên AES" ngẫu nhiên (Session Key K).
  |
  +--> 2. Dùng "Khóa phiên AES (K)" để mã hóa Dữ liệu lớn thành [Dữ liệu đã mã hóa].
  |
  +--> 3. Dùng "Public Key RSA của Bob" để mã hóa [Khóa phiên K] thành [Khóa K đã mã hóa].
  |
  +--> Gửi cả [Dữ liệu đã mã hóa] và [Khóa K đã mã hóa] qua Internet cho Bob.

[ BÊN NHẬN: BOB ]
  |
  +--> 1. Bob dùng "Private Key RSA của Bob" để giải mã [Khóa K đã mã hóa] -> Thu lại Khóa phiên K.
  |
  +--> 2. Bob dùng Khóa phiên K vừa thu được đưa vào thuật toán AES để giải mã [Dữ liệu đã mã hóa] -> Thu lại Dữ liệu gốc ban đầu.


















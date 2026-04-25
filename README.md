# Implementasi Message Queue untuk Sistem Notifikasi Pendaftaran Akun UMUKA

### Deskripsi Proyek
Proyek ini mengimplementasikan Message Queue menggunakan **ActiveMQ** dengan protokol **STOMP** untuk mengelola antrean pendaftaran user secara asinkron.

### Prerequisites
* Laragon / Node.js terinstall
* Apache ActiveMQ Classic (Versi Windows)

### Cara Menjalankan
1. **Jalankan ActiveMQ:**
   Ekstrak ActiveMQ dan jalankan `bin/win64/activemq.bat`. Pastikan dashboard aktif di `http://localhost:8161`.

2. **Jalankan Notification Worker (Consumer):**
   - Masuk ke folder `notification-worker`
   - Jalankan `npm install` (jika pertama kali)
   - Jalankan `node worker.js`

3. **Jalankan User Registration (Producer):**
   - Masuk ke folder `user-registration`
   - Jalankan `npm install` (jika pertama kali)
   - Jalankan `node index.js`

### Skenario Uji (Resilience & Asinkron)
1. Matikan worker.js
2. Kirim 5 data pendaftaran melalui Producer.
3. Cek di Dashboard ActiveMQ (Queues) bahwa ada 5 pesan tertahan.
4. Nyalakan Worker, maka 5 pesan tersebut akan langsung diproses secara berurutan.

### Dokumentasi Implementasi
Video demonstrasi skenario pengujian dapat diakses melalui tautan di bawah ini:

* **Video Demonstrasi Project**: ([Klik di sini untuk menonton Video](https://drive.google.com/file/d/1vQLlLzUNAWcsN5bgeGfrkerIQCL8MCww/view?usp=sharing))


const Stomp = require('stomp-client');

const client = new Stomp('localhost', 61613, 'admin', 'admin');

console.log("--- SERVICE 2: NOTIFICATION WORKER (CONSUMER) ---");

client.connect(function (sessionId) {
    console.log('✅ Worker Aktif & Menunggu Pesan di registration_queue...');

    // Subscribe (Mendengarkan terus menerus)
    client.subscribe('/queue/registration_queue', function (body, headers) {
        const user = JSON.parse(body);

        console.log("\n[LOG] Ada pendaftaran baru!");
        console.log(`[LOG] Mengirim email verifikasi ke: [${user.email}]...`);

        setTimeout(() => {
            console.log(`[LOG] Berhasil! User [${user.nama}] dari prodi [${user.prodi}] telah terdaftar.`);
            console.log("------------------------------------------------");
        }, 1500);
    });

    // Worker tidak boleh pakai process.exit() supaya standby terus
}, function (error) {
    console.log("❌ Worker Error: " + error.message);
});
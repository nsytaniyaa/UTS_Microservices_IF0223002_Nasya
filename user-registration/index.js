const Stomp = require('stomp-client');
const readline = require('readline');

const client = new Stomp('127.0.0.1', 61613, 'admin', 'admin');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("--- SERVICE 1: USER REGISTRATION (PRODUCER) ---");

rl.question('Masukkan Nama Lengkap  : ', (namaLengkap) => {
    rl.question('Masukkan Program Studi : ', (prodiInput) => {

        console.log("\nSedang memproses pendaftaran...");

        // LOGIKA BARU: Mengambil Nama Depan dan Tengah
        const namaArray = namaLengkap.trim().split(/\s+/);
        let username = "";

        if (namaArray.length >= 2) {
            // Ambil kata ke-1 (index 0) dan kata ke-2 (index 1)
            username = (namaArray[0] + namaArray[1]).toLowerCase();
        } else {
            // Kalau cuma 1 kata, pakai kata itu saja
            username = namaArray[0].toLowerCase();
        }

        client.connect(function (sessionId) {
            const dataUser = {
                nama: namaLengkap,
                email: `${username}@student.umuka.ac.id`,
                prodi: prodiInput
            };

            client.publish('/queue/registration_queue', JSON.stringify(dataUser));

            console.log("------------------------------------------------");
            console.log(`✅ DATA BERHASIL DIKIRIM`);
            console.log(`Nama    : ${dataUser.nama}`);
            console.log(`Email   : ${dataUser.email}`);
            console.log(`Prodi   : ${dataUser.prodi}`);
            console.log("------------------------------------------------");

            setTimeout(() => {
                client.disconnect();
                rl.close();
                process.exit(0);
            }, 500);

        }, function (error) {
            console.log("❌ Gagal: " + error.message);
            rl.close();
        });
    });
});
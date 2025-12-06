// Data Misi
const missions = [
    "Selamat datang! Misi pertama: Cari dan potret pion di Area 1 (Pintu Masuk).",
    "Kerja bagus! Sekarang bergeraklah, cari dan potret pion di Area 2 (Tangga Darurat).",
    "Luar biasa! Selanjutnya, temukan pion di Area 3 (Titik Kumpul Tengah).",
    "Hampir selesai! Cari pion di Area 4 (Lorong Evakuasi).",
    "Terakhir! Segera menuju Area 5 (Pintu Keluar) dan potret pionnya!"
];

let currentLevel = 0;

// Fungsi Pindah Layar
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Mulai Game
function startGame() {
    currentLevel = 0;
    document.getElementById('chat-box').innerHTML = ''; // Reset chat
    showScreen('game-screen');
    
    // Bot memberikan instruksi pertama setelah delay sedikit
    setTimeout(() => {
        botType(missions[currentLevel]);
    }, 500);
}

// Fungsi Bot Mengetik/Muncul Chat
function botType(text) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot';
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll ke bawah
    
    // Update teks status
    document.getElementById('instruction-text').innerText = "Silakan upload foto bukti...";
}

// Fungsi User Mengirim Foto (Fake Check)
function handlePhotoUpload() {
    const input = document.getElementById('camera-input');
    
    if (input.files && input.files[0]) {
        // 1. Tampilkan feedback visual bahwa user mengirim foto
        const chatBox = document.getElementById('chat-box');
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.innerText = "📸 [Foto Terkirim]";
        chatBox.appendChild(userMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

        // 2. Proses 'Loading' sebentar agar terasa real
        document.getElementById('instruction-text').innerText = "Memeriksa foto...";
        
        // 3. Fake Feedback Logic (Apapun inputnya dianggap benar)
        setTimeout(() => {
            feedbackCorrect();
        }, 1500); // Delay 1.5 detik
    }
}

// Fungsi Feedback Benar & Lanjut Level
function feedbackCorrect() {
    // Bot bilang benar
    botType("Yeay kamu benar! ✅");
    
    // Reset input file agar bisa upload lagi
    document.getElementById('camera-input').value = '';

    // Naik level
    currentLevel++;

    // Cek apakah game sudah selesai?
    if (currentLevel < missions.length) {
        // Lanjut ke misi berikutnya setelah jeda
        setTimeout(() => {
            botType(missions[currentLevel]);
        }, 1500);
    } else {
        // Game Selesai
        setTimeout(() => {
            showScreen('result-screen');
        }, 2000);
    }
}
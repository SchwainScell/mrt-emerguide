// --- DATA OBJECTIVES ---
const objectives = [
    {
        id: 1,
        title: "Orientasi Lokasi",
        desc: "Lihat peta 3D di papan. Kamu berada di Gerbong 3.",
        instruction: "Geser PION PENGGUNA ke titik 'You Are Here' di peta.",
        img: "https://placehold.co/400x300/e2e8f0/00529C?text=Map+Pawn+Slot" // Replace with Page 127
    },
    {
        id: 2,
        title: "Lapor Darurat",
        desc: "Beritahu masinis tentang asap.",
        instruction: "Tekan TOMBOL INTERKOM pada modul alat darurat.",
        img: "https://placehold.co/400x300/e2e8f0/00529C?text=Intercom+Button" // Replace with Page 29
    },
    {
        id: 3,
        title: "Buka Pintu Darurat",
        desc: "Kereta berhenti. Buka pintu secara manual.",
        instruction: "Tarik TUAS Emergency Door Release pada papan.",
        img: "https://placehold.co/400x300/e2e8f0/00529C?text=Door+Release+Lever" // Replace with Page 29
    },
    {
        id: 4,
        title: "Padamkan Api Kecil",
        desc: "Ada api kecil menghalangi jalan.",
        instruction: "Simulasikan gerakan menekan tuas pada replika APAR.",
        img: "https://placehold.co/400x300/e2e8f0/00529C?text=APAR+Module" // Replace with Page 29
    },
    {
        id: 5,
        title: "Evakuasi",
        desc: "Jalur aman. Menuju titik kumpul.",
        instruction: "Geser PION PENGGUNA mengikuti jalur hijau ke Assembly Point.",
        img: "https://placehold.co/400x300/e2e8f0/00529C?text=Assembly+Point+Map" // Replace with Page 26
    }
];

let currentStep = 0;

// --- NAVIGATION FUNCTIONS ---
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    
    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    } else {
        console.error("Screen not found: " + screenId);
    }
}

function simulateConnection() {
    const btn = document.querySelector('#screen-connect button');
    if (!btn) return;
    
    const originalText = btn.innerHTML;
    btn.innerHTML = "Connecting...";
    btn.disabled = true;
    
    // Fake loading time for NFC connection
    setTimeout(() => {
        showScreen('screen-start');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

function startGame() {
    currentStep = 0;
    loadObjective(currentStep);
    showScreen('screen-game');
}

function loadObjective(index) {
    if (index >= objectives.length) {
        showScreen('screen-success');
        return;
    }

    const data = objectives[index];
    
    // Update DOM elements with objective data
    document.getElementById('objective-title').innerText = `Misi ${index + 1}: ${data.title}`;
    document.getElementById('objective-desc').innerText = data.desc;
    document.getElementById('board-instruction').innerText = data.instruction;
    document.getElementById('objective-img').src = data.img;
    
    // Update progress bar
    const progress = ((index) / objectives.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    
    // Hide previous feedback
    document.getElementById('feedback-area').classList.add('hidden');
}

function resetApp() {
    showScreen('screen-connect');
}

// --- WIZARD OF OZ LOGIC ---
// This function simulates the Board sending a signal to the App
// saying "Pressure sensor activated" or "Magnet moved correctly"
function triggerBoardSensor() {
    // Check if we are in game mode
    if (!document.getElementById('screen-game').classList.contains('active')) return;

    // Show visual feedback that sensor worked
    const feedback = document.getElementById('feedback-area');
    feedback.classList.remove('hidden');

    // Wait a moment then go to next step
    setTimeout(() => {
        currentStep++;
        loadObjective(currentStep);
    }, 1000);
}
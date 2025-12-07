// --- DATA OBJECTIVES ---
// Images are mapped to the filenames provided by the user
const objectives = [
    {
        id: 1,
        title: "Orientasi Lokasi",
        desc: "Lihat peta 3D di papan. Kamu saat ini berada di Gerbong 3.",
        instruction: "Geser PION PENGGUNA ke titik 'You Are Here' di peta.",
        // Using the map image
        img: "map_visual.png" 
    },
    {
        id: 2,
        title: "Lapor Darurat",
        desc: "Beritahu masinis tentang asap yang terlihat.",
        instruction: "Tekan TOMBOL INTERKOM pada modul alat darurat.",
        // Using the intercom image
        img: "intercom.png"
    },
    {
        id: 3,
        title: "Buka Pintu Darurat",
        desc: "Kereta berhenti darurat. Buka pintu secara manual.",
        instruction: "Tarik TUAS Emergency Door Release pada papan.",
        // Using the door release image
        img: "door_release.png"
    },
    {
        id: 4,
        title: "Padamkan Api Kecil",
        desc: "Ada api kecil menghalangi jalan keluar.",
        instruction: "Simulasikan gerakan menekan tuas pada replika APAR.",
        // Using the APAR image
        img: "apar.png"
    },
    {
        id: 5,
        title: "Evakuasi",
        desc: "Jalur sudah aman. Segera menuju titik kumpul.",
        instruction: "Geser PION PENGGUNA mengikuti jalur hijau ke Assembly Point.",
        // Reusing the map visual for evacuation route
        img: "map_visual.png"
    }
];

let currentStep = 0;

// --- NAVIGATION FUNCTIONS ---
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        // Reset scroll position
        targetScreen.scrollTop = 0;
    }
}

function simulateConnection() {
    const btn = document.querySelector('#screen-connect button');
    if (!btn) return;
    
    const originalText = btn.innerHTML;
    btn.innerHTML = "Menghubungkan...";
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
    
    // Handle Image
    const imgElement = document.getElementById('objective-img');
    imgElement.src = data.img;
    imgElement.onerror = function() {
        // Fallback if image fails to load
        this.src = "https://placehold.co/400x300/f3f4f6/9ca3af?text=Image+Not+Found";
    };
    
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
    }, 1500);
}

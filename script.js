// script.js - Romantic Proposal with Heart Burst, Kissing Couple, and Clever No Button

// DOM Elements
const floatingHeartsContainer = document.getElementById('floatingHearts');
const proposalContainer = document.getElementById('proposalContainer');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const heartBurstContainer = document.getElementById('heartBurstContainer');

// Funny Messages Array
const funnyMessages = [
    "Madam ji single rehna hai kya? 😭",
    "Arre No mat dabao 😭",
    "Itna bhi attitude accha nahi 😏",
    "Ek baar soch lo ❤️",
    "No ka option hi galat hai 😤",
    "Aapko Yes hi dabana padega 😌"
];

// Global flag to prevent multiple final screens
let isProposalAccepted = false;

// ---------- Floating Hearts Background (continuous) ----------
function startFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        const heartsList = ['❤️', '💖', '💗', '💘', '💝', '❣️', '❤️‍🔥', '💞'];
        heart.innerHTML = heartsList[Math.floor(Math.random() * heartsList.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 18) + 'px';
        heart.style.animationDuration = Math.random() * 5 + 6 + 's';
        heart.style.opacity = Math.random() * 0.6 + 0.3;
        floatingHeartsContainer.appendChild(heart);
        setTimeout(() => {
            if (heart && heart.remove) heart.remove();
        }, 11000);
    }, 450);
}

// Show funny toast message
function showFunnyMessage() {
    const oldToast = document.querySelector('.funny-toast');
    if (oldToast) oldToast.remove();

    const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    const toast = document.createElement('div');
    toast.className = 'funny-toast';
    toast.innerText = randomMsg;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) toast.remove();
    }, 1700);
}

// Helper: get random safe position for No button
function getRandomPosition(btn) {
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    const margin = 20;
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;
    const minX = 10;
    const minY = 70;
    const randX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
    const randY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
    return { x: randX, y: randY };
}

// Make No button move to random location with rotation & quick wiggle
function evadeNoButton() {
    if (isProposalAccepted) return;
    
    if (!noButton.classList.contains('moving-no')) {
        noButton.classList.add('moving-no');
        const rect = noButton.getBoundingClientRect();
        noButton.style.position = 'fixed';
        noButton.style.top = rect.top + 'px';
        noButton.style.left = rect.left + 'px';
        noButton.style.margin = '0';
        document.body.appendChild(noButton);
    }
    
    // Quick random rotation and micro shift to simulate "moving left, right, up, down"
    const microRotate = (Math.random() * 70) - 35;
    const shiftX = (Math.random() * 40) - 20;
    const shiftY = (Math.random() * 40) - 20;
    noButton.style.transform = `rotate(${microRotate}deg) translate(${shiftX}px, ${shiftY}px)`;
    
    // After tiny delay, teleport to new position with new rotation
    setTimeout(() => {
        const newPos = getRandomPosition(noButton);
        const newRotation = (Math.random() * 80) - 40;
        noButton.style.top = newPos.y + 'px';
        noButton.style.left = newPos.x + 'px';
        noButton.style.transform = `rotate(${newRotation}deg)`;
        showFunnyMessage();
    }, 30);
}

// Proximity detection (mouse & touch)
function handleProximity(event) {
    if (isProposalAccepted) return;
    if (!noButton) return;
    const rect = noButton.getBoundingClientRect();
    let clientX, clientY;
    
    if (event.touches) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(clientX - centerX, clientY - centerY);
    
    if (distance < 90) {
        evadeNoButton();
    }
}

// Force move on click/tap of No button
function onNoClickAttempt(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isProposalAccepted) return;
    evadeNoButton();
    return false;
}

// Attach all evasion events
function attachNoButtonEvents() {
    if (!noButton) return;
    noButton.addEventListener('click', onNoClickAttempt);
    noButton.addEventListener('mouseenter', evadeNoButton);
    document.addEventListener('mousemove', handleProximity);
    document.addEventListener('touchmove', handleProximity);
    noButton.addEventListener('touchstart', onNoClickAttempt);
}

// --- Heart Burst Effect (50-100 hearts) ---
function burstHearts() {
    if (!heartBurstContainer) return;
    heartBurstContainer.innerHTML = '';
    const heartCount = Math.floor(Math.random() * 51) + 50; // 50-100
    for (let i = 0; i < heartCount; i++) {
        const heartEl = document.createElement('div');
        heartEl.className = 'burst-heart';
        const heartSymbols = ['❤️', '💖', '💗', '💘', '💝', '❤️‍🔥', '💞', '❣️'];
        heartEl.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heartEl.style.left = Math.random() * 100 + '%';
        heartEl.style.fontSize = (Math.random() * 28 + 16) + 'px';
        heartEl.style.animationDelay = Math.random() * 0.5 + 's';
        heartEl.style.animationDuration = Math.random() * 1.2 + 0.8 + 's';
        heartBurstContainer.appendChild(heartEl);
    }
}

// Show kissing couple animation
function showKissingCouple() {
    const kissingDiv = document.querySelector('.kissing-couple');
    if (kissingDiv) {
        // reset animation by re-trigger
        kissingDiv.style.animation = 'none';
        kissingDiv.offsetHeight;
        kissingDiv.style.animation = 'couplePop 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)';
    }
}

// Final romantic screen after 1 sec (replace page)
function showFinalRomanticScreen() {
    // Remove proposal UI, celebration overlay, no button, etc.
    if (proposalContainer) proposalContainer.style.display = 'none';
    if (celebrationOverlay) celebrationOverlay.style.display = 'none';
    
    // Remove No button if still floating
    if (noButton && noButton.parentNode) noButton.remove();
    
    // Remove any funny toasts
    const toastMsg = document.querySelector('.funny-toast');
    if (toastMsg) toastMsg.remove();
    
    // Create final screen
    const finalScreen = document.createElement('div');
    finalScreen.className = 'final-screen';
    finalScreen.innerHTML = `
        <div class="final-kissing">
            <div class="final-emoji">👦</div>
            <div class="final-kiss-icon">💋❤️💋</div>
            <div class="final-emoji">👧</div>
        </div>
        <h1>I Love You So Much ❤️</h1>
        <p>
You just made me the happiest person in the world 🥹❤️<br><br>
I don’t know what I did to deserve someone as beautiful, special and amazing as you, but I promise I’ll spend every day making you smile. From today, my heart is yours forever. No matter what happens, I’ll always choose you, care for you, stand by you and love you more than words can ever explain ❤️✨
</p>
    `;
    document.body.appendChild(finalScreen);
}

// YES BUTTON BEHAVIOR
function onYesClick() {
    if (isProposalAccepted) return;
    isProposalAccepted = true;
    
    // Show celebration overlay with kissing couple
    celebrationOverlay.style.display = 'flex';
    
    // Start heart burst (50-100 falling hearts)
    burstHearts();
    
    // Animate kissing couple (move closer + kiss animation)
    showKissingCouple();
    
    // Also add class to make couple move closer via CSS transition (already styled but adding dynamic)
    const couple = document.querySelector('.kissing-couple');
    if (couple) {
        couple.style.gap = '15px';
        setTimeout(() => {
            if (couple) couple.style.gap = '25px';
        }, 200);
        // Add extra kiss effect
        const kissSpark = document.querySelector('.kiss-spark');
        if (kissSpark) {
            kissSpark.style.animation = 'kissBlink 0.3s infinite alternate';
        }
    }
    
    // After 1 second, replace whole page with final romantic screen
    setTimeout(() => {
        showFinalRomanticScreen();
    }, 1000);
}

// Reset No button initial position in case of resize while it's evading
function handleResize() {
    if (noButton && noButton.classList.contains('moving-no') && noButton.parentNode === document.body && !isProposalAccepted) {
        const newPos = getRandomPosition(noButton);
        noButton.style.top = newPos.y + 'px';
        noButton.style.left = newPos.x + 'px';
    }
}

// Initialize everything
function init() {
    startFloatingHearts();
    attachNoButtonEvents();
    yesButton.addEventListener('click', onYesClick);
    window.addEventListener('resize', handleResize);
    // Optional: predefine girl name (Priya) is already in HTML, but easily customizable
}

// Start the proposal magic
init();

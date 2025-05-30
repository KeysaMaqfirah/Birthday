// Global Variables
let currentPage = 0;
const totalPages = 5;
const pages = document.querySelectorAll('.page');
const navDots = document.querySelectorAll('.nav-dot');

// Page Navigation Functions
function nextPage() {
    if (currentPage < totalPages - 1) {
        pages[currentPage].classList.remove('active');
        pages[currentPage].classList.add('prev');
        currentPage++;
        
        setTimeout(() => {
            pages[currentPage].classList.add('active');
            updateNavDots();
            
            // Special actions for specific pages
            if (currentPage === 1) {
                startCountdown();
            } else if (currentPage === 2) {
                createMassiveConfetti();
            }
        }, 200);
    }
}

function goToPage(pageIndex) {
    pages[currentPage].classList.remove('active', 'prev');
    currentPage = pageIndex;
    
    pages.forEach((page, index) => {
        page.classList.remove('active', 'prev');
        if (index < currentPage) {
            page.classList.add('prev');
        } else if (index === currentPage) {
            page.classList.add('active');
        }
    });
    
    updateNavDots();
}

function updateNavDots() {
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
}

// Countdown Function
function startCountdown() {
    const countdownEl = document.getElementById('countdownNumber');
    let count = 3;
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
            countdownEl.style.animation = 'none';
            setTimeout(() => {
                countdownEl.style.animation = 'bounceScale 0.5s ease-out';
            }, 50);
        } else {
            countdownEl.textContent = '🎉';
            countdownEl.style.fontSize = '3rem';
            clearInterval(countdownInterval);
            
            setTimeout(() => {
                nextPage();
            }, 1500);
        }
    }, 1000);
}

// Confetti Functions
function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

function createMassiveConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 50);
    }
}

function createBurst(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = (rect.left + rect.width/2) + 'px';
        confetti.style.top = (rect.top + rect.height/2) + 'px';
        confetti.style.position = 'fixed';
        confetti.style.animationDuration = '2s';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
    
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'bounce 2s infinite';
    }, 100);
}

// Final Surprise Function
function finalSurprise() {
    createMassiveConfetti();
    
    const giftBox = document.querySelector('.gift-box');
    giftBox.innerHTML = '🎊';
    giftBox.style.animation = 'rainbow 2s linear infinite, bounceScale 1s ease-in-out infinite';
    
    setTimeout(() => {
        alert('🎉 SELAMAT ULANG TAHUN SAHABATKU! 🎉\n\n' +
              'Semoga tahun ini membawa kebahagiaan, kesehatan, dan kesuksesan yang berlimpah!\n\n' +
              'Terima kasih sudah menjadi sahabat yang luar biasa!\n\n' +
              'Dengan cinta dan doa terbaik 💖');
    }, 1000);
}

// Restart Function
function restartShow() {
    currentPage = 0;
    pages.forEach((page, index) => {
        page.classList.remove('active', 'prev');
        if (index === 0) {
            page.classList.add('active');
        }
    });
    updateNavDots();
    
    // Reset gift box
    const giftBox = document.querySelector('.gift-box');
    giftBox.innerHTML = '🎁';
    giftBox.style.animation = 'giftShake 2s ease-in-out infinite';
    
    // Reset countdown
    const countdownEl = document.getElementById('countdownNumber');
    countdownEl.textContent = '3';
    countdownEl.style.fontSize = '5rem';
}

// Auto Confetti Generation
function autoConfetti() {
    setInterval(() => {
        if (Math.random() > 0.8) {
            createConfetti();
        }
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Start auto confetti
    autoConfetti();
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft' && currentPage > 0) {
            e.preventDefault();
            goToPage(currentPage - 1);
        } else if (e.key >= '1' && e.key <= '5') {
            // Direct page navigation with number keys
            e.preventDefault();
            goToPage(parseInt(e.key) - 1);
        } else if (e.key === 'Escape') {
            // Restart with Escape key
            e.preventDefault();
            restartShow();
        }
    });
    
    // Touch/Swipe support for mobile
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;
        
        let diffX = startX - endX;
        let diffY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    // Swipe left - next page
                    nextPage();
                } else {
                    // Swipe right - previous page
                    if (currentPage > 0) {
                        goToPage(currentPage - 1);
                    }
                }
            }
        }
        
        // Reset values
        startX = 0;
        startY = 0;
    });
});

// Additional Animation Effects
function addSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    const sparkle = document.createElement('div');
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'fadeInUp 1s ease-out forwards';
    sparkle.style.zIndex = '1000';
    
    // Position relative to the element
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Floating Hearts Effect
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💝', '💞'];
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }
}

// Balloon Pop Effect
function popBalloon(element) {
    // Create pop effect
    const popText = document.createElement('div');
    popText.textContent = 'POP! 🎈';
    popText.style.position = 'fixed';
    popText.style.fontSize = '2rem';
    popText.style.fontWeight = 'bold';
    popText.style.color = '#ff6b6b';
    popText.style.zIndex = '1000';
    popText.style.pointerEvents = 'none';
    
    const rect = element.getBoundingClientRect();
    popText.style.left = (rect.left + rect.width/2 - 50) + 'px';
    popText.style.top = (rect.top + rect.height/2 - 25) + 'px';
    popText.style.animation = 'popEffect 1s ease-out forwards';
    
    document.body.appendChild(popText);
    
    // Remove balloon and pop text
    setTimeout(() => {
        element.style.animation = 'popOut 0.3s ease-in forwards';
        popText.remove();
    }, 300);
    
    setTimeout(() => {
        element.remove();
    }, 600);
}

// Random Celebration Effects
function randomCelebration() {
    const effects = [
        () => createConfetti(),
        () => createFloatingHearts(),
        () => addSparkleEffect(document.body)
    ];
    
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
}

// Background Music Control (if audio element exists)
function playBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.play().catch(e => {
            console.log('Audio play failed:', e);
        });
    }
}

function pauseBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.pause();
    }
}

// Page-specific animations
function pageSpecificAnimations(pageNum) {
    switch(pageNum) {
        case 0:
            // Welcome page - gentle sparkles
            setTimeout(() => addSparkleEffect(document.querySelector('.page.active')), 500);
            break;
        case 1:
            // Countdown page - already handled in startCountdown()
            break;
        case 2:
            // Celebration page - massive effects
            setTimeout(() => createFloatingHearts(), 1000);
            break;
        case 3:
            // Message page - gentle hearts
            setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => addSparkleEffect(document.querySelector('.page.active')), i * 300);
                }
            }, 500);
            break;
        case 4:
            // Final page - all effects
            setTimeout(() => randomCelebration(), 500);
            break;
    }
}

// Enhanced page navigation with animations
function enhancedNextPage() {
    if (currentPage < totalPages - 1) {
        nextPage();
        pageSpecificAnimations(currentPage);
    }
}

// Initialize special effects on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for interactive elements
    document.querySelectorAll('.interactive').forEach(element => {
        element.addEventListener('click', function() {
            addSparkleEffect(this);
            randomCelebration();
        });
    });
    
    // Add hover effects for buttons
    document.querySelectorAll('button, .nav-dot').forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (Math.random() > 0.7) {
                addSparkleEffect(this);
            }
        });
    });
    
    // Initialize first page effects
    pageSpecificAnimations(0);
});
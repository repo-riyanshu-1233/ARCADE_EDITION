// Variable to store selected game URL
let currentActiveGameUrl = '';

// --- 1. Show Game About Section ---
function showAbout(title, desc, imgSrc, gameUrl, score, category) {
  document.getElementById('aboutTitle').innerText = title;
  document.getElementById('aboutDesc').innerText = desc;
  document.getElementById('aboutImg').src = imgSrc;
  document.getElementById('aboutTag').innerText = '[' + category + ']';
  document.getElementById('aboutScore').innerText = 'HI-SCORE: ' + score;
  
  currentActiveGameUrl = gameUrl;

  // Open Modal
  const modal = document.getElementById('gameModal');
  modal.style.display = 'flex';
  setTimeout(() => { modal.classList.add('open'); }, 10);
}

// --- 2. Redirect to Game Link in New Tab ---
function launchGame() {
  if (currentActiveGameUrl) {
    // Direct open game in new tab
    window.open(currentActiveGameUrl, '_blank');
    // Close modal after clicking play
    closeGame();
  }
}

// --- 3. Close Modal ---
function closeGame() {
  const modal = document.getElementById('gameModal');
  modal.classList.remove('open');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// --- 4. Button Shine Effect ---
const shineBtn = document.getElementById('shineBtn');
if (shineBtn) {
  shineBtn.addEventListener('click', function() {
    shineBtn.classList.add('shine-active');
    setTimeout(() => { shineBtn.classList.remove('shine-active'); }, 600);
  });
}

// --- 5. Scroll Fade-In Observer ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });

// Modal Outer Click & Keyboard Close
window.onclick = function(event) {
  const modal = document.getElementById('gameModal');
  if (event.target == modal) { closeGame(); }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeGame(); }
});

// --- 6. Dynamic Pixel Stars Background Animation ---
function createPixelStars() {
  const container = document.body;
  const starCount = 30;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.width = '4px';
    star.style.height = '4px';
    star.style.backgroundColor = Math.random() > 0.5 ? '#ff00de' : '#00f2fe';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.opacity = Math.random();
    star.style.pointerEvents = 'none';
    star.style.zIndex = '1';
    
    // Twinkle animation using JS interval
    setInterval(() => {
      star.style.opacity = Math.random() > 0.3 ? '1' : '0.2';
    }, 500 + Math.random() * 1000);

    container.appendChild(star);
  }
}

createPixelStars();

// --- 7. Custom Native Kitten Cursor ---
const kittenCursor = document.createElement('div');
kittenCursor.innerText = '🐱';
kittenCursor.style.position = 'fixed';
kittenCursor.style.fontSize = '24px';
kittenCursor.style.pointerEvents = 'none';
kittenCursor.style.zIndex = '99999';
kittenCursor.style.transition = 'transform 0.1s ease-out, opacity 0.3s ease';
kittenCursor.style.userSelect = 'none';
kittenCursor.style.opacity = '0';
document.body.appendChild(kittenCursor);

let mouseX = 0, mouseY = 0;
let kittenX = 0, kittenY = 0;
let fadeTimeout;

function updatePosition(x, y) {
  mouseX = x + 12;
  mouseY = y + 12;
  kittenCursor.style.opacity = '1';

  clearTimeout(fadeTimeout);
  fadeTimeout = setTimeout(() => { kittenCursor.style.opacity = '0'; }, 2000);
}

window.addEventListener('mousemove', (e) => { updatePosition(e.clientX, e.clientY); });
window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) { updatePosition(e.touches[0].clientX, e.touches[0].clientY); }
}, { passive: true });
window.addEventListener('touchstart', (e) => {
  if (e.touches.length > 0) { updatePosition(e.touches[0].clientX, e.touches[0].clientY); }
}, { passive: true });

function animateKitten() {
  kittenX += (mouseX - kittenX) * 0.15;
  kittenY += (mouseY - kittenY) * 0.15;
  kittenCursor.style.left = `${kittenX}px`;
  kittenCursor.style.top = `${kittenY}px`;
  requestAnimationFrame(animateKitten);
}

animateKitten();

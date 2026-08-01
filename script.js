// Variable to store selected game URL
let currentActiveGameUrl = '';

// --- General Modal Controls ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('open'); }, 10);
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  }
}

// --- Show Game Details ---
function showAbout(title, desc, imgSrc, gameUrl, score, category) {
  document.getElementById('aboutTitle').innerText = title;
  document.getElementById('aboutDesc').innerText = desc;
  document.getElementById('aboutImg').src = imgSrc;
  document.getElementById('aboutTag').innerText = '[' + category + ']';
  document.getElementById('aboutScore').innerText = 'HI-SCORE: ' + score;
  
  currentActiveGameUrl = gameUrl;

  openModal('gameModal');
}

// --- Redirect to Game ---
function launchGame() {
  if (currentActiveGameUrl) {
    window.open(currentActiveGameUrl, '_blank');
    closeModal('gameModal');
  }
}

// --- Button Shine Effect ---
const shineBtn = document.getElementById('shineBtn');
if (shineBtn) {
  shineBtn.addEventListener('click', function() {
    shineBtn.classList.add('shine-active');
    setTimeout(() => { shineBtn.classList.remove('shine-active'); }, 600);
  });
}

// --- Scroll Fade-In Observer ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });

// Close modal on outer click & Escape key
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target.id);
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { 
    document.querySelectorAll('.modal').forEach(m => closeModal(m.id));
  }
});

// --- Dynamic Pixel Stars Animation ---
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
    
    setInterval(() => {
      star.style.opacity = Math.random() > 0.3 ? '1' : '0.2';
    }, 500 + Math.random() * 1000);

    container.appendChild(star);
  }
}

createPixelStars();

// --- Desktop-Only Custom Arcade Cursor ---
const isDesktop = window.matchMedia('(pointer: fine)').matches;

if (isDesktop) {
  document.body.style.cursor = 'none';

  const cursorDot = document.createElement('div');
  cursorDot.style.position = 'fixed';
  cursorDot.style.width = '8px';
  cursorDot.style.height = '8px';
  cursorDot.style.backgroundColor = '#00f2fe';
  cursorDot.style.boxShadow = '0 0 8px #00f2fe, 0 0 15px #ff00de';
  cursorDot.style.borderRadius = '0px';
  cursorDot.style.pointerEvents = 'none';
  cursorDot.style.zIndex = '999999';
  cursorDot.style.transform = 'translate(-50%, -50%)';
  cursorDot.style.transition = 'transform 0.05s ease-out, background-color 0.2s';
  document.body.appendChild(cursorDot);

  const cursorRing = document.createElement('div');
  cursorRing.style.position = 'fixed';
  cursorRing.style.width = '26px';
  cursorRing.style.height = '26px';
  cursorRing.style.border = '2px solid #ff00de';
  cursorRing.style.boxShadow = '0 0 10px #ff00de';
  cursorRing.style.pointerEvents = 'none';
  cursorRing.style.zIndex = '999998';
  cursorRing.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(cursorRing);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  window.addEventListener('mousedown', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.6)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(0.7)';
  });

  window.addEventListener('mouseup', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

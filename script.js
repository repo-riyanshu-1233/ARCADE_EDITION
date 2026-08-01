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
    setTimeout(() => { modal.style.display = 'none'; }, 250);
  }
}

// --- Show Game Details ---
function showAbout(title, desc, imgSrc, gameUrl, category) {
  document.getElementById('aboutTitle').innerText = title;
  document.getElementById('aboutDesc').innerText = desc;
  document.getElementById('aboutImg').src = imgSrc;
  document.getElementById('aboutTag').innerText = '[' + category + ']';
  
  currentActiveGameUrl = gameUrl;

  openModal('gameModal');
}

// --- Launch Game ---
function launchGame() {
  if (currentActiveGameUrl) {
    window.open(currentActiveGameUrl, '_blank');
    closeModal('gameModal');
  }
}

// --- Share Game Functionality ---
function shareGame() {
  if (navigator.share) {
    navigator.share({
      title: 'ULTRA RETRO ARCADE',
      text: 'Check out these awesome retro games!',
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Game link copied to clipboard!');
  }
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

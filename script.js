// ==========================================
// 🎮 GAMES CONFIGURATION (ADD NEW GAMES HERE)
// Future me naya game add karne ke liye bas niche ek naya object add kar do!
// ==========================================
const gamesList = [
  {
    id: 1,
    title: "PIXEL PHYSICS",
    category: "ACTION",
    description: "Action 8-bit physics simulation game where you solve challenging gravity puzzles.",
    image: "https://via.placeholder.com/300x180/0d0d12/00e5ff?text=PIXEL+PHYSICS",
    gameUrl: "https://example.com/your-game-1"
  },
  {
    id: 2,
    title: "GALACTIC RUN",
    category: "ARCADE",
    description: "High-speed retro runner game set in space. Dodge obstacles and beat the highest score!",
    image: "https://via.placeholder.com/300x180/0d0d12/ffcc00?text=GALACTIC+RUN",
    gameUrl: "https://example.com/your-game-2"
  },
  {
    id: 3,
    title: "CYBER SHOOTER",
    category: "SHOOTER",
    description: "Classic arcade space shooter with retro visuals and intense boss battles.",
    image: "https://via.placeholder.com/300x180/0d0d12/ff0055?text=CYBER+SHOOTER",
    gameUrl: "https://example.com/your-game-3"
  }
];

let currentActiveGameUrl = '';

// --- Render Games Dynamically into Grid ---
function renderGameGrid() {
  const gridContainer = document.getElementById('gameGrid');
  if (!gridContainer) return;

  gridContainer.innerHTML = ''; // Clear existing

  gamesList.forEach(game => {
    const cardHtml = `
      <div class="game-card reveal" onclick="showAbout(${game.id})">
        <div class="card-img">
          <img src="${game.image}" alt="${game.title}">
        </div>
        <div class="card-info">
          <h3>${game.title}</h3>
          <div class="card-meta">
            <span class="tag">[${game.category}]</span>
          </div>
        </div>
      </div>
    `;
    gridContainer.insertAdjacentHTML('beforeend', cardHtml);
  });

  initScrollObserver();
}

// --- Show Game Modal Details ---
function showAbout(gameId) {
  const game = gamesList.find(g => g.id === gameId);
  if (!game) return;

  document.getElementById('aboutTitle').innerText = game.title;
  document.getElementById('aboutDesc').innerText = game.description;
  document.getElementById('aboutImg').src = game.image;
  document.getElementById('aboutTag').innerText = '[' + game.category + ']';
  
  currentActiveGameUrl = game.gameUrl;

  openModal('gameModal');
}

// --- Launch Active Game ---
function launchGame() {
  if (currentActiveGameUrl) {
    window.open(currentActiveGameUrl, '_blank');
    closeModal('gameModal');
  }
}

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
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });
}

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

// Initialize Grid on Page Load
document.addEventListener('DOMContentLoaded', renderGameGrid);

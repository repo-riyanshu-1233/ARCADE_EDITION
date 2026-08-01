const gamesList = [
  {
    id: 1,
    title: "BLOCKADE X",
    category: "strategy",
    description: "strategy board game for 2 player and single player.block your opponent path and be the first to win.",
    image: "Images/blockade.png",
    gameUrl: "https://blockade-x.onrender.com/"
  },
  {
    id: 2,
    title: "GALACTIC RUN",
    category: "ARCADE",
    description: "High-speed retro runner game set in space. Dodge obstacles and beat the highest score!",
    image: "images/.jpg",
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

function renderGameGrid() {
  const gridContainer = document.getElementById('gameGrid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

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

function launchGame() {
  if (currentActiveGameUrl) {
    window.open(currentActiveGameUrl, '_blank');
    closeModal('gameModal');
  }
}

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

function openDonateModal() {
  closeModal('aboutModal');
  setTimeout(() => {
    openModal('donateModal');
  }, 260);
}

function backToAbout() {
  closeModal('donateModal');
  setTimeout(() => {
    openModal('aboutModal');
  }, 260);
}

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

document.addEventListener('DOMContentLoaded', renderGameGrid);

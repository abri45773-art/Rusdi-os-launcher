// Rusdi OS Launcher — Space Edition · Main Entry
document.addEventListener('DOMContentLoaded', () => {
  const boot = document.getElementById('boot-screen');
  const lock = document.getElementById('lock-screen');
  const home = document.getElementById('home-screen');
  const drawer = document.getElementById('app-drawer');
  const controlCenter = document.getElementById('control-center');

  /* ===== STARFIELD ANIMATION ===== */
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 150;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005
      });
    }
  }
  initStars();

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const alpha = 0.5 + Math.sin(s.twinkle) * 0.5;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = s.r * 3;
      ctx.fill();
      // slow drift
      s.y += s.speed;
      if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
    });
    ctx.shadowBlur = 0;
    requestAnimationFrame(drawStars);
  }
  drawStars();

  /* ===== BOOT SEQUENCE ===== */
  const bootHints = ['Menjelajahi galaksi...', 'Menginisialisasi nebula...', 'Memuat bintang...', 'Menyiapkan peluncuran...'];
  let hintIdx = 0;
  const hintEl = document.getElementById('boot-hint');
  const hintInterval = setInterval(() => {
    hintIdx = (hintIdx + 1) % bootHints.length;
    hintEl.textContent = bootHints[hintIdx];
  }, 700);

  setTimeout(() => {
    clearInterval(hintInterval);
    boot.style.transition = 'opacity 0.6s';
    boot.style.opacity = '0';
    setTimeout(() => {
      boot.classList.add('hidden');
      lock.classList.remove('hidden');
      updateLockClock();
    }, 600);
  }, 3000);

  /* ===== CLOCKS ===== */
  function updateLockClock() {
    const d = new Date();
    document.getElementById('lock-time').textContent = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lock-date').textContent = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('cw-time').textContent = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('cw-date').textContent = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('status-time').textContent = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }
  setInterval(updateLockClock, 1000);

  /* ===== LOCK SCREEN UNLOCK ===== */
  const unlockBtn = document.getElementById('lock-unlock');
  let touchStartY = 0;

  const unlock = () => {
    lock.style.transition = 'opacity 0.4s, transform 0.4s';
    lock.style.opacity = '0';
    lock.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      lock.classList.add('hidden');
      home.classList.remove('hidden');
      initHome();
    }, 400);
  };

  unlockBtn.addEventListener('click', unlock);
  lock.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
  lock.addEventListener('touchend', (e) => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (dy > 80) unlock();
  });

  /* ===== HOME SCREEN ===== */
  function initHome() {
    renderAppGrid();
    renderDock();
    setupSearch();
    setupDrawer();
    setupControlCenter();
    setupSwipeGestures();
    loadSettings();
    updateLockClock();
  }

  function appIconHtml(app, key) {
    return `
      <div class="app-icon" data-app="${key}">
        <div class="app-icon-tile ${app.glow||''} ${app.gradient||''}">${app.icon}</div>
        <div class="app-icon-name">${app.name}</div>
      </div>
    `;
  }

  function renderAppGrid(filter = '') {
    const container = document.getElementById('app-grid');
    const apps = HOME_APPS.filter(k => APPS[k].name.toLowerCase().includes(filter.toLowerCase()));
    container.innerHTML = apps.map(k => appIconHtml(APPS[k], k)).join('');
    container.querySelectorAll('.app-icon').forEach(icon => {
      icon.addEventListener('click', () => WM.openApp(APPS[icon.dataset.app]));
    });
  }

  function renderDock() {
    const container = document.getElementById('dock');
    container.innerHTML = DOCK_APPS.map(k => appIconHtml(APPS[k], k)).join('');
    container.querySelectorAll('.app-icon').forEach(icon => {
      icon.addEventListener('click', () => WM.openApp(APPS[icon.dataset.app]));
    });
  }

  /* ===== SEARCH ===== */
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => renderAppGrid(searchInput.value));
    searchInput.addEventListener('focus', () => openDrawer());
  }

  /* ===== APP DRAWER ===== */
  function openDrawer() {
    renderDrawerGrid();
    drawer.classList.remove('hidden');
  }
  function closeDrawer() { drawer.classList.add('hidden'); }

  function renderDrawerGrid(filter = '') {
    const container = document.getElementById('drawer-grid');
    const apps = DRAWER_APPS.filter(k => APPS[k].name.toLowerCase().includes(filter.toLowerCase()));
    container.innerHTML = apps.map(k => appIconHtml(APPS[k], k)).join('');
    container.querySelectorAll('.app-icon').forEach(icon => {
      icon.addEventListener('click', () => {
        WM.openApp(APPS[icon.dataset.app]);
        closeDrawer();
      });
    });
  }

  function setupDrawer() {
    document.getElementById('drawer-search').addEventListener('input', (e) => renderDrawerGrid(e.target.value));
    // tap outside to close
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });
  }

  /* ===== CONTROL CENTER ===== */
  function setupControlCenter() {
    controlCenter.addEventListener('click', (e) => {
      if (e.target === controlCenter) {
        controlCenter.classList.add('hidden');
        return;
      }
      const tile = e.target.closest('.cc-tile');
      if (tile && !tile.querySelector('input')) {
        tile.classList.toggle('active');
      }
    });
  }
  function openControlCenter() { controlCenter.classList.remove('hidden'); }
  function closeControlCenter() { controlCenter.classList.add('hidden'); }

  /* ===== SWIPE GESTURES ===== */
  function setupSwipeGestures() {
    let startX = 0, startY = 0;
    home.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    home.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      const absX = Math.abs(dx), absY = Math.abs(dy);
      if (absY > 80 && absY > absX) {
        if (dy < 0 && startY > window.innerHeight / 2) {
          // swipe up from bottom -> open drawer
          openDrawer();
        } else if (dy > 0 && startY < 100) {
          // swipe down from top -> open control center
          openControlCenter();
        }
      }
    });

    // Swipe down in drawer to close
    let dStartY = 0;
    drawer.addEventListener('touchstart', (e) => { dStartY = e.touches[0].clientY; }, { passive: true });
    drawer.addEventListener('touchend', (e) => {
      if (e.changedTouches[0].clientY - dStartY > 80) closeDrawer();
    });

    // Swipe down in control center to close
    let cStartY = 0;
    controlCenter.addEventListener('touchstart', (e) => { cStartY = e.touches[0].clientY; }, { passive: true });
    controlCenter.addEventListener('touchend', (e) => {
      if (e.changedTouches[0].clientY - cStartY > 80) closeControlCenter();
    });
  }

  /* ===== APP VIEW BACK BUTTON ===== */
  document.getElementById('av-back').addEventListener('click', () => WM.back());

  /* ===== LONG PRESS CONTEXT MENU ===== */
  let pressTimer;
  document.addEventListener('touchstart', (e) => {
    const icon = e.target.closest('.app-icon');
    if (!icon) return;
    pressTimer = setTimeout(() => {
      const ctx = document.getElementById('context-menu');
      const app = APPS[icon.dataset.app];
      ctx.innerHTML = `
        <div class="ctx-item" data-act="open">🚀 Buka ${app.name}</div>
        <div class="ctx-item" data-act="info">ℹ️ Info Aplikasi</div>
      `;
      const touch = e.touches[0];
      ctx.style.left = Math.min(touch.clientX, window.innerWidth - 200) + 'px';
      ctx.style.top = Math.min(touch.clientY, window.innerHeight - 120) + 'px';
      ctx.classList.remove('hidden');
      ctx.querySelectorAll('.ctx-item').forEach(item => {
        item.onclick = () => {
          ctx.classList.add('hidden');
          if (item.dataset.act === 'open') WM.openApp(app);
        };
      });
    }, 600);
  }, { passive: true });
  document.addEventListener('touchend', () => clearTimeout(pressTimer));
  document.addEventListener('touchmove', () => clearTimeout(pressTimer));
  document.addEventListener('click', () => document.getElementById('context-menu').classList.add('hidden'));

  /* ===== LOAD SETTINGS ===== */
  function loadSettings() {
    const saved = JSON.parse(localStorage.getItem('rusdi-settings') || '{}');
    if (saved.wallpaper !== undefined) {
      const wps = [
        'linear-gradient(135deg,#05010f,#1a0a3e,#4c1d95)',
        'linear-gradient(135deg,#0a0524,#064e3b)',
        'linear-gradient(135deg,#1e1b4b,#831843)',
        'linear-gradient(135deg,#0c0a1e,#312e81)',
        'linear-gradient(135deg,#020617,#4c1d95,#831843)',
      ];
      document.body.style.background = wps[saved.wallpaper];
    }
  }

  /* ===== SERVICE WORKER ===== */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});

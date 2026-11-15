// Rusdi jmk48 OS - Main Entry Point
document.addEventListener('DOMContentLoaded', () => {
  const boot = document.getElementById('boot-screen');
  const lock = document.getElementById('lock-screen');
  const desktop = document.getElementById('desktop');

  // Boot sequence
  setTimeout(() => {
    boot.classList.add('hidden');
    lock.classList.remove('hidden');
    updateLockClock();
  }, 2500);

  // Lock screen clock
  function updateLockClock() {
    const d = new Date();
    document.getElementById('lock-time').textContent = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lock-date').textContent = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
  }
  setInterval(updateLockClock, 1000);

  // Unlock
  const unlockBtn = document.getElementById('lock-unlock');
  let touchStartY = 0;

  const unlock = () => {
    lock.classList.add('hidden');
    desktop.classList.remove('hidden');
    initDesktop();
  };

  unlockBtn.addEventListener('click', unlock);
  unlockBtn.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
  unlockBtn.addEventListener('touchend', (e) => {
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (dy > 50) unlock();
  });

  // Taskbar clock
  function updateTaskbarClock() {
    const d = new Date();
    document.getElementById('taskbar-clock').textContent = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }
  setInterval(updateTaskbarClock, 1000);
  updateTaskbarClock();

  // Desktop initialization
  function initDesktop() {
    renderDesktopIcons();
    renderStartMenu();
    setupStartMenu();
    setupContextMenu();
    loadSettings();
  }

  // Desktop icons
  function renderDesktopIcons() {
    const container = document.getElementById('desktop-icons');
    container.innerHTML = DESKTOP_ICONS.map(key => {
      const app = APPS[key];
      return `
        <div class="desktop-icon" data-app="${key}">
          <div class="icon-emoji">${app.icon}</div>
          <div class="icon-label">${app.name}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.desktop-icon').forEach(icon => {
      icon.addEventListener('dblclick', () => WM.open(APPS[icon.dataset.app]));
      icon.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (icon.dataset.lastTap && Date.now() - icon.dataset.lastTap < 300) {
          WM.open(APPS[icon.dataset.app]);
        }
        icon.dataset.lastTap = Date.now();
      });
    });
  }

  // Start menu
  function renderStartMenu(filter = '') {
    const container = document.getElementById('start-apps');
    const filtered = Object.entries(APPS).filter(([key, app]) =>
      app.name.toLowerCase().includes(filter.toLowerCase())
    );
    container.innerHTML = filtered.map(([key, app]) => `
      <div class="start-app" data-app="${key}">
        <div class="icon-emoji">${app.icon}</div>
        <div class="app-name">${app.name}</div>
      </div>
    `).join('');

    container.querySelectorAll('.start-app').forEach(app => {
      app.onclick = () => {
        WM.open(APPS[app.dataset.app]);
        document.getElementById('start-menu').classList.add('hidden');
        document.getElementById('start-btn').classList.remove('active');
      };
    });
  }

  function setupStartMenu() {
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');
    const search = document.getElementById('search-input');

    startBtn.onclick = (e) => {
      e.stopPropagation();
      const isHidden = startMenu.classList.contains('hidden');
      startMenu.classList.toggle('hidden');
      startBtn.classList.toggle('active', isHidden);
      if (isHidden) search.focus();
    };

    search.oninput = () => renderStartMenu(search.value);

    document.addEventListener('click', (e) => {
      if (!startMenu.contains(e.target) && e.target !== startBtn) {
        startMenu.classList.add('hidden');
        startBtn.classList.remove('active');
      }
    });

    // Power button
    document.getElementById('power-btn').onclick = () => {
      if (confirm('Matikan Rusdi jmk48 OS?')) {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;font-size:20px">Sistem telah dimatikan. Refresh untuk menyalakan kembali.</div>';
      }
    };
  }

  // Context menu
  function setupContextMenu() {
    const ctx = document.getElementById('context-menu');
    desktop.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.window') || e.target.closest('#taskbar')) return;
      e.preventDefault();
      ctx.innerHTML = `
        <div class="ctx-item" data-act="refresh">🔄 Refresh</div>
        <div class="ctx-item" data-act="wallpaper">🖼️ Ganti Wallpaper</div>
        <div class="ctx-item" data-act="about">ℹ️ Tentang Rusdi</div>
      `;
      ctx.style.left = Math.min(e.clientX, window.innerWidth - 170) + 'px';
      ctx.style.top = Math.min(e.clientY, window.innerHeight - 140) + 'px';
      ctx.classList.remove('hidden');

      ctx.querySelectorAll('.ctx-item').forEach(item => {
        item.onclick = () => {
          ctx.classList.add('hidden');
          if (item.dataset.act === 'refresh') location.reload();
          else if (item.dataset.act === 'wallpaper') WM.open(APPS.settings);
          else if (item.dataset.act === 'about') WM.open(APPS.about);
        };
      });
    });

    document.addEventListener('click', () => ctx.classList.add('hidden'));
  }

  // Load saved settings
  function loadSettings() {
    const saved = JSON.parse(localStorage.getItem('rusdi-settings') || '{}');
    if (saved.wallpaper !== undefined) {
      const wallpapers = [
        'linear-gradient(135deg, #0f172a, #1e3a5f, #1e1b4b)',
        'linear-gradient(135deg, #134e4a, #0f172a)',
        'linear-gradient(135deg, #7c2d12, #1e1b4b)',
        'linear-gradient(135deg, #1e293b, #334155)',
        'linear-gradient(135deg, #4c1d95, #1e1b4b)',
        'linear-gradient(135deg, #064e3b, #0f172a)',
      ];
      document.getElementById('desktop').style.background = wallpapers[saved.wallpaper];
    }
  }

  // Prevent context menu on long press (mobile)
  let touchTimer;
  document.addEventListener('touchstart', (e) => {
    if (e.target.closest('.window') || e.target.closest('#taskbar')) return;
    touchTimer = setTimeout(() => {
      const touch = e.touches[0];
      const fakeEvent = { clientX: touch.clientX, clientY: touch.clientY, target: e.target, preventDefault: () => {} };
      // Trigger context menu
      const ctx = document.getElementById('context-menu');
      ctx.innerHTML = `
        <div class="ctx-item" data-act="refresh">🔄 Refresh</div>
        <div class="ctx-item" data-act="wallpaper">🖼️ Ganti Wallpaper</div>
        <div class="ctx-item" data-act="about">ℹ️ Tentang Rusdi</div>
      `;
      ctx.style.left = Math.min(touch.clientX, window.innerWidth - 170) + 'px';
      ctx.style.top = Math.min(touch.clientY, window.innerHeight - 140) + 'px';
      ctx.classList.remove('hidden');
      ctx.querySelectorAll('.ctx-item').forEach(item => {
        item.onclick = () => {
          ctx.classList.add('hidden');
          if (item.dataset.act === 'refresh') location.reload();
          else if (item.dataset.act === 'wallpaper') WM.open(APPS.settings);
          else if (item.dataset.act === 'about') WM.open(APPS.about);
        };
      });
    }, 600);
  });
  document.addEventListener('touchend', () => clearTimeout(touchTimer));
  document.addEventListener('touchmove', () => clearTimeout(touchTimer));

  // Register service worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});

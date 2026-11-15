// Rusdi jmk48 OS - Window Manager
class WindowManager {
  constructor() {
    this.windows = [];
    this.zIndex = 100;
    this.container = document.getElementById('windows-container');
  }

  open(app) {
    const id = 'win-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const isMobile = window.innerWidth <= 600;

    const win = document.createElement('div');
    win.className = 'window';
    win.id = id;
    win.style.width = isMobile ? '100%' : (app.width || '480px');
    win.style.height = isMobile ? 'calc(100% - 48px)' : (app.height || '360px');
    win.style.left = isMobile ? '0' : (80 + (this.windows.length * 30) + 'px');
    win.style.top = isMobile ? '0' : (40 + (this.windows.length * 30) + 'px');
    win.style.zIndex = ++this.zIndex;

    win.innerHTML = `
      <div class="window-header">
        <span class="window-title">${app.icon || ''} ${app.name}</span>
        <div class="window-controls">
          <button class="win-btn win-min" data-action="min"></button>
          <button class="win-btn win-max" data-action="max"></button>
          <button class="win-btn win-close" data-action="close"></button>
        </div>
      </div>
      <div class="window-body"></div>
    `;

    const body = win.querySelector('.window-body');
    if (app.render) app.render(body, id);

    this.container.appendChild(win);

    const winObj = { id, el: win, app, minimized: false, maximized: false };
    this.windows.push(winObj);

    // Focus on click
    win.addEventListener('mousedown', () => this.focus(id));
    win.addEventListener('touchstart', () => this.focus(id), { passive: true });

    // Controls
    win.querySelector('[data-action="close"]').onclick = (e) => {
      e.stopPropagation();
      this.close(id);
    };
    win.querySelector('[data-action="min"]').onclick = (e) => {
      e.stopPropagation();
      this.minimize(id);
    };
    win.querySelector('[data-action="max"]').onclick = (e) => {
      e.stopPropagation();
      this.toggleMaximize(id);
    };

    // Dragging
    this.makeDraggable(win);

    this.focus(id);
    this.updateTaskbar();
    return winObj;
  }

  makeDraggable(win) {
    const header = win.querySelector('.window-header');
    let startX, startY, origX, origY, dragging = false;

    const onDown = (e) => {
      if (win.classList.contains('maximized')) return;
      const touch = e.touches ? e.touches[0] : e;
      dragging = true;
      startX = touch.clientX;
      startY = touch.clientY;
      origX = parseInt(win.style.left);
      origY = parseInt(win.style.top);
      e.preventDefault();
    };

    const onMove = (e) => {
      if (!dragging) return;
      const touch = e.touches ? e.touches[0] : e;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const newX = Math.max(0, origX + dx);
      const newY = Math.max(0, Math.min(window.innerHeight - 84, origY + dy));
      win.style.left = newX + 'px';
      win.style.top = newY + 'px';
    };

    const onUp = () => { dragging = false; };

    header.addEventListener('mousedown', onDown);
    header.addEventListener('touchstart', onDown, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
  }

  focus(id) {
    const w = this.windows.find(x => x.id === id);
    if (!w) return;
    w.minimized = false;
    w.el.style.display = 'flex';
    w.el.style.zIndex = ++this.zIndex;
    this.updateTaskbar();
  }

  close(id) {
    const idx = this.windows.findIndex(x => x.id === id);
    if (idx === -1) return;
    this.windows[idx].el.remove();
    this.windows.splice(idx, 1);
    this.updateTaskbar();
  }

  minimize(id) {
    const w = this.windows.find(x => x.id === id);
    if (!w) return;
    w.minimized = true;
    w.el.style.display = 'none';
    this.updateTaskbar();
  }

  toggleMaximize(id) {
    const w = this.windows.find(x => x.id === id);
    if (!w) return;
    w.maximized = !w.maximized;
    w.el.classList.toggle('maximized', w.maximized);
  }

  updateTaskbar() {
    const tb = document.getElementById('taskbar-apps');
    tb.innerHTML = '';
    this.windows.forEach(w => {
      const btn = document.createElement('div');
      btn.className = 'taskbar-app' + (this.isActive(w.id) ? ' active' : '');
      btn.innerHTML = `<span>${w.app.icon || ''}</span><span>${w.app.name}</span>`;
      btn.onclick = () => {
        if (w.minimized) this.focus(w.id);
        else if (this.isActive(w.id)) this.minimize(w.id);
        else this.focus(w.id);
      };
      tb.appendChild(btn);
    });
  }

  isActive(id) {
    const w = this.windows.find(x => x.id === id);
    return w && !w.minimized && parseInt(w.el.style.zIndex) === this.zIndex;
  }
}

const WM = new WindowManager();

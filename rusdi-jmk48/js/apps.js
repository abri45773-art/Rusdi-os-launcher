// Rusdi jmk48 OS - Applications
const APPS = {
  files: {
    name: 'File Manager',
    icon: '📁',
    width: '520px',
    height: '400px',
    render: (el) => {
      const fs = window.RUSDI_FS || {
        '/': { type: 'folder', name: 'Home', children: {
          'Dokumen': { type: 'folder', children: {
            'catatan.txt': { type: 'file', content: 'Selamat datang di Rusdi jmk48 OS!\n\nIni adalah sistem operasi ringan yang berjalan di browser.' },
            'README.md': { type: 'file', content: '# Rusdi jmk48 OS\nSistem operasi ringan berbasis web.' },
          }},
          'Gambar': { type: 'folder', children: {} },
          'Musik': { type: 'folder', children: {} },
          'Unduhan': { type: 'folder', children: {} },
        }}
      };

      let currentPath = '/';

      const getFolder = (path) => {
        if (path === '/') return fs['/'];
        const parts = path.split('/').filter(Boolean);
        let node = fs['/'];
        for (const p of parts) node = node.children[p];
        return node;
      };

      const render = () => {
        const folder = getFolder(currentPath);
        const items = folder.children || {};
        el.innerHTML = `
          <div class="fm-toolbar">
            <button class="fm-btn" id="fm-up">⬆</button>
            <div class="fm-path">${currentPath}</div>
          </div>
          <div class="fm-content">
            ${Object.entries(items).map(([name, item]) => `
              <div class="fm-item" data-name="${name}" data-type="${item.type}">
                <div class="fi-icon">${item.type === 'folder' ? '📁' : '📄'}</div>
                <div class="fi-name">${name}</div>
              </div>
            `).join('') || '<div style="grid-column:1/-1;text-align:center;color:var(--text-dim);padding:40px">Folder kosong</div>'}
          </div>
        `;

        el.querySelector('#fm-up').onclick = () => {
          if (currentPath !== '/') {
            currentPath = currentPath.split('/').slice(0, -2).join('/') + '/';
            if (currentPath === '') currentPath = '/';
            render();
          }
        };

        el.querySelectorAll('.fm-item').forEach(item => {
          item.ondblclick = () => {
            const name = item.dataset.name;
            const node = items[name];
            if (node.type === 'folder') {
              currentPath = currentPath === '/' ? '/' + name + '/' : currentPath + name + '/';
              render();
            } else {
              // Open file in text editor
              WM.open({ ...APPS.editor, render: (e) => APPS.editor.render(e, node.content, name) });
            }
          };
        });
      };

      render();
    }
  },

  editor: {
    name: 'Text Editor',
    icon: '📝',
    width: '500px',
    height: '400px',
    render: (el, content = '', filename = 'tanpa-judul.txt') => {
      el.innerHTML = `
        <div class="te-container">
          <div class="te-toolbar">
            <button class="te-btn" id="te-new">Baru</button>
            <button class="te-btn" id="te-save">Simpan</button>
            <span style="margin-left:auto;color:var(--text-dim);font-size:11px">${filename}</span>
          </div>
          <textarea class="te-textarea" placeholder="Ketik di sini...">${content}</textarea>
        </div>
      `;
      const ta = el.querySelector('.te-textarea');
      el.querySelector('#te-new').onclick = () => { ta.value = ''; };
      el.querySelector('#te-save').onclick = () => {
        const blob = new Blob([ta.value], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
      };
    }
  },

  calculator: {
    name: 'Calculator',
    icon: '🧮',
    width: '300px',
    height: '440px',
    render: (el) => {
      let expr = '';
      el.innerHTML = `
        <div class="calc-container">
          <div class="calc-display">
            <div class="calc-expr" id="calc-expr"></div>
            <div class="calc-result" id="calc-result">0</div>
          </div>
          <div class="calc-grid">
            <button class="calc-btn fn" data-v="C">C</button>
            <button class="calc-btn fn" data-v="(">(</button>
            <button class="calc-btn fn" data-v=")">)</button>
            <button class="calc-btn fn" data-v="/">÷</button>
            <button class="calc-btn" data-v="7">7</button>
            <button class="calc-btn" data-v="8">8</button>
            <button class="calc-btn" data-v="9">9</button>
            <button class="calc-btn op" data-v="*">×</button>
            <button class="calc-btn" data-v="4">4</button>
            <button class="calc-btn" data-v="5">5</button>
            <button class="calc-btn" data-v="6">6</button>
            <button class="calc-btn op" data-v="-">−</button>
            <button class="calc-btn" data-v="1">1</button>
            <button class="calc-btn" data-v="2">2</button>
            <button class="calc-btn" data-v="3">3</button>
            <button class="calc-btn op" data-v="+">+</button>
            <button class="calc-btn" data-v="0">0</button>
            <button class="calc-btn" data-v=".">.</button>
            <button class="calc-btn eq" data-v="=">=</button>
            <button class="calc-btn fn" data-v="back">⌫</button>
          </div>
        </div>
      `;

      const exprEl = el.querySelector('#calc-expr');
      const resultEl = el.querySelector('#calc-result');

      const update = () => {
        exprEl.textContent = expr;
        try {
          if (expr) resultEl.textContent = eval(expr);
          else resultEl.textContent = '0';
        } catch { resultEl.textContent = 'Error'; }
      };

      el.querySelectorAll('.calc-btn').forEach(btn => {
        btn.onclick = () => {
          const v = btn.dataset.v;
          if (v === 'C') expr = '';
          else if (v === 'back') expr = expr.slice(0, -1);
          else if (v === '=') {
            try { expr = String(eval(expr)); } catch { expr = 'Error'; }
          } else expr += v;
          update();
        };
      });
    }
  },

  terminal: {
    name: 'Terminal',
    icon: '⌨️',
    width: '520px',
    height: '360px',
    render: (el) => {
      const history = [
        'Rusdi jmk48 OS Terminal v1.0',
        'Ketik "help" untuk daftar perintah.',
        ''
      ];

      const render = () => {
        el.innerHTML = `
          <div class="term-container" id="term-body">
            ${history.map(l => `<div class="term-line">${l}</div>`).join('')}
            <div class="term-input-line">
              <span class="term-prompt">user@rusdi:~$</span>
              <input class="term-input" id="term-input" autofocus>
            </div>
          </div>
        `;
        const body = el.querySelector('#term-body');
        body.scrollTop = body.scrollHeight;
        const input = el.querySelector('#term-input');
        input.focus();

        input.onkeydown = (e) => {
          if (e.key === 'Enter') {
            const cmd = input.value.trim();
            history.push(`<span class="term-prompt">user@rusdi:~$</span> ${cmd}`);
            process(cmd);
            render();
          }
        };
      };

      const process = (cmd) => {
        const parts = cmd.split(' ');
        const c = parts[0];
        switch (c) {
          case 'help':
            history.push('Perintah tersedia: help, echo, date, whoami, ls, cat, clear, neofetch, apps, exit');
            break;
          case 'echo':
            history.push(parts.slice(1).join(' '));
            break;
          case 'date':
            history.push(new Date().toString());
            break;
          case 'whoami':
            history.push('user');
            break;
          case 'ls':
            history.push('Dokumen  Gambar  Musik  Unduhan');
            break;
          case 'cat':
            if (parts[1]) history.push(`Isi file ${parts[1]}: (gunakan File Manager untuk membuka)`);
            else history.push('usage: cat <file>');
            break;
          case 'clear':
            history.length = 0;
            break;
          case 'neofetch':
            history.push(`
       ◈◈◈◈◈       user@rusdi
     ◈◈◈◈◈◈◈◈     ----------
    ◈◈      ◈◈    OS: Rusdi jmk48 1.0
   ◈◈        ◈◈   Kernel: Web 1.0
   ◈◈        ◈◈   Shell: rsh
    ◈◈      ◈◈    DE: Rusdi Desktop
     ◈◈◈◈◈◈◈◈     WM: Rusdi WM
       ◈◈◈◈◈       CPU: Browser V8
                    RAM: ${Math.round(performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 50)}MB
            `);
            break;
          case 'apps':
            history.push('Apps: files, editor, calculator, terminal, browser, settings, notes, clock, music, about');
            break;
          case 'exit':
            history.push('Tidak bisa keluar dari OS 😄');
            break;
          case '':
            break;
          default:
            history.push(`rsh: perintah tidak ditemukan: ${c}`);
        }
      };

      render();
    }
  },

  browser: {
    name: 'Browser',
    icon: '🌐',
    width: '600px',
    height: '440px',
    render: (el) => {
      const bookmarks = [
        { name: 'Google', url: 'https://www.google.com' },
        { name: 'YouTube', url: 'https://www.youtube.com' },
        { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
        { name: 'GitHub', url: 'https://github.com' },
      ];

      const showHome = () => {
        el.querySelector('.br-content').innerHTML = `
          <h2>🌐 Rusdi Browser</h2>
          <p style="color:var(--text-dim)">Cari atau buka halaman web di bawah ini.</p>
          <div class="br-bookmarks">
            ${bookmarks.map(b => `<div class="br-bookmark" data-url="${b.url}">${b.name}</div>`).join('')}
          </div>
        `;
        el.querySelectorAll('.br-bookmark').forEach(b => {
          b.onclick = () => window.open(b.dataset.url, '_blank');
        });
      };

      el.innerHTML = `
        <div style="display:flex;flex-direction:column;height:100%">
          <div class="br-toolbar">
            <button class="br-btn" id="br-back">←</button>
            <button class="br-btn" id="br-fwd">→</button>
            <input class="br-url" id="br-url" placeholder="Cari atau masukkan URL">
            <button class="br-btn" id="br-go">▶</button>
          </div>
          <div class="br-content"></div>
        </div>
      `;

      showHome();

      const urlInput = el.querySelector('#br-url');
      const go = () => {
        let url = urlInput.value.trim();
        if (!url) return;
        if (!url.startsWith('http')) url = 'https://' + url;
        window.open(url, '_blank');
      };

      el.querySelector('#br-go').onclick = go;
      urlInput.onkeydown = (e) => { if (e.key === 'Enter') go(); };
      el.querySelector('#br-back').onclick = () => history.back();
      el.querySelector('#br-fwd').onclick = () => history.forward();
    }
  },

  settings: {
    name: 'Settings',
    icon: '⚙️',
    width: '440px',
    height: '500px',
    render: (el) => {
      const wallpapers = [
        'linear-gradient(135deg, #0f172a, #1e3a5f, #1e1b4b)',
        'linear-gradient(135deg, #134e4a, #0f172a)',
        'linear-gradient(135deg, #7c2d12, #1e1b4b)',
        'linear-gradient(135deg, #1e293b, #334155)',
        'linear-gradient(135deg, #4c1d95, #1e1b4b)',
        'linear-gradient(135deg, #064e3b, #0f172a)',
      ];

      const saved = JSON.parse(localStorage.getItem('rusdi-settings') || '{}');
      let settings = { wallpaper: 0, dark: true, sound: true, ...saved };

      const render = () => {
        el.innerHTML = `
          <div class="settings-container">
            <div class="settings-section">
              <h3>Tampilan</h3>
              <div class="setting-row">
                <div>
                  <div class="setting-label">Mode Gelap</div>
                  <div class="setting-desc">Gunakan tema gelap</div>
                </div>
                <div class="toggle ${settings.dark ? 'on' : ''}" data-toggle="dark"></div>
              </div>
              <div class="setting-row">
                <div>
                  <div class="setting-label">Wallpaper</div>
                  <div class="setting-desc">Pilih latar belakang</div>
                </div>
              </div>
              <div class="wallpaper-grid">
                ${wallpapers.map((w, i) => `
                  <div class="wallpaper-opt ${settings.wallpaper === i ? 'active' : ''}"
                       style="background:${w}" data-wp="${i}"></div>
                `).join('')}
              </div>
            </div>
            <div class="settings-section">
              <h3>Umum</h3>
              <div class="setting-row">
                <div>
                  <div class="setting-label">Suara</div>
                  <div class="setting-desc">Aktifkan suara sistem</div>
                </div>
                <div class="toggle ${settings.sound ? 'on' : ''}" data-toggle="sound"></div>
              </div>
              <div class="setting-row">
                <div>
                  <div class="setting-label">Tentang</div>
                  <div class="setting-desc">Rusdi jmk48 OS v1.0</div>
                </div>
              </div>
            </div>
          </div>
        `;

        el.querySelectorAll('[data-toggle]').forEach(t => {
          t.onclick = () => {
            const key = t.dataset.toggle;
            settings[key] = !settings[key];
            t.classList.toggle('on', settings[key]);
            save();
          };
        });

        el.querySelectorAll('[data-wp]').forEach(w => {
          w.onclick = () => {
            settings.wallpaper = parseInt(w.dataset.wp);
            document.getElementById('desktop').style.background = wallpapers[settings.wallpaper];
            render();
            save();
          };
        });
      };

      const save = () => localStorage.setItem('rusdi-settings', JSON.stringify(settings));

      render();
    }
  },

  notes: {
    name: 'Notes',
    icon: '🗒️',
    width: '420px',
    height: '400px',
    render: (el) => {
      let notes = JSON.parse(localStorage.getItem('rusdi-notes') || '[]');
      if (notes.length === 0) notes = [{ id: 1, title: 'Catatan Pertama', body: 'Ini adalah catatan pertama Anda.' }];
      let activeId = notes[0].id;

      const save = () => localStorage.setItem('rusdi-notes', JSON.stringify(notes));

      const render = () => {
        const active = notes.find(n => n.id === activeId) || notes[0];
        el.innerHTML = `
          <div class="notes-container">
            <div style="display:flex;border-bottom:1px solid var(--border)">
              <div style="width:140px;border-right:1px solid var(--border)">
                <button class="notes-add" id="notes-add">+ Catatan Baru</button>
                <div class="notes-list">
                  ${notes.map(n => `
                    <div class="note-item ${n.id === activeId ? 'active' : ''}" data-id="${n.id}">
                      <div class="note-title">${n.title || 'Tanpa Judul'}</div>
                      <div class="note-preview">${(n.body || '').slice(0, 30)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="notes-editor">
                <input class="notes-title-input" id="notes-title" value="${active.title}" placeholder="Judul...">
                <textarea class="notes-body" id="notes-body" placeholder="Tulis catatan...">${active.body}</textarea>
              </div>
            </div>
          </div>
        `;

        el.querySelectorAll('.note-item').forEach(item => {
          item.onclick = () => { activeId = parseInt(item.dataset.id); render(); };
        });

        el.querySelector('#notes-add').onclick = () => {
          const newNote = { id: Date.now(), title: 'Catatan Baru', body: '' };
          notes.push(newNote);
          activeId = newNote.id;
          save();
          render();
        };

        const titleInput = el.querySelector('#notes-title');
        const bodyInput = el.querySelector('#notes-body');

        titleInput.oninput = () => {
          const n = notes.find(x => x.id === activeId);
          n.title = titleInput.value;
          save();
        };
        bodyInput.oninput = () => {
          const n = notes.find(x => x.id === activeId);
          n.body = bodyInput.value;
          save();
        };
      };

      render();
    }
  },

  clock: {
    name: 'Clock',
    icon: '🕐',
    width: '320px',
    height: '280px',
    render: (el) => {
      el.innerHTML = `
        <div class="clock-container">
          <div class="clock-time" id="clock-time">00:00:00</div>
          <div class="clock-date" id="clock-date"></div>
        </div>
      `;
      const update = () => {
        const d = new Date();
        el.querySelector('#clock-time').textContent = d.toLocaleTimeString('id-ID');
        el.querySelector('#clock-date').textContent = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      };
      update();
      setInterval(update, 1000);
    }
  },

  music: {
    name: 'Music',
    icon: '🎵',
    width: '300px',
    height: '440px',
    render: (el) => {
      const tracks = [
        { title: 'Melodi Pagi', artist: 'Rusdi' },
        { title: 'Senja di Kota', artist: 'jmk48' },
        { title: 'Bintang Malam', artist: 'Rusdi jmk48' },
      ];
      let idx = 0;
      let playing = false;
      let progress = 0;

      el.innerHTML = `
        <div class="music-container">
          <div class="music-cover">🎵</div>
          <div class="music-info">
            <div class="music-title" id="m-title">${tracks[idx].title}</div>
            <div class="music-artist" id="m-artist">${tracks[idx].artist}</div>
          </div>
          <div class="music-progress"><div class="music-bar" id="m-bar"></div></div>
          <div class="music-controls">
            <button class="music-ctrl" id="m-prev">⏮</button>
            <button class="music-ctrl play" id="m-play">▶</button>
            <button class="music-ctrl" id="m-next">⏭</button>
          </div>
        </div>
      `;

      const updateTrack = () => {
        el.querySelector('#m-title').textContent = tracks[idx].title;
        el.querySelector('#m-artist').textContent = tracks[idx].artist;
      };

      let interval;
      el.querySelector('#m-play').onclick = (e) => {
        playing = !playing;
        e.target.textContent = playing ? '⏸' : '▶';
        if (playing) {
          interval = setInterval(() => {
            progress = (progress + 1) % 100;
            el.querySelector('#m-bar').style.width = progress + '%';
          }, 200);
        } else clearInterval(interval);
      };
      el.querySelector('#m-next').onclick = () => { idx = (idx + 1) % tracks.length; updateTrack(); };
      el.querySelector('#m-prev').onclick = () => { idx = (idx - 1 + tracks.length) % tracks.length; updateTrack(); };
    }
  },

  about: {
    name: 'About',
    icon: 'ℹ️',
    width: '360px',
    height: '440px',
    render: (el) => {
      el.innerHTML = `
        <div class="about-container">
          <div class="about-logo">◈</div>
          <div class="about-name">Rusdi jmk48</div>
          <div class="about-version">Versi 1.0.0 (Lite)</div>
          <p class="about-desc">
            Sistem operasi ringan berbasis web yang berjalan di browser.
            Cocok untuk Android dan iOS sebagai PWA yang dapat diinstal.
          </p>
          <div class="about-specs">
            <div><span>Kernel</span><span>Web 1.0</span></div>
            <div><span>Shell</span><span>rsh</span></div>
            <div><span>Desktop</span><span>Rusdi DE</span></div>
            <div><span>Tipe</span><span>Lightweight PWA</span></div>
            <div><span>Platform</span><span>Android, iOS, Web</span></div>
            <div><span>RAM</span><span>~50MB</span></div>
          </div>
          <p style="color:var(--text-dim);font-size:11px;margin-top:20px">© 2026 Rusdi jmk48</p>
        </div>
      `;
    }
  }
};

// Desktop icon definitions
const DESKTOP_ICONS = ['files', 'browser', 'settings', 'notes', 'about'];

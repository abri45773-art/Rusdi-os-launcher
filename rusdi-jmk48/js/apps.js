// Rusdi OS Launcher — Space Edition · Applications
const APPS = {
  phone: {
    name: 'Telepon', icon: '📞', glow: 'glow-green', gradient: 'gradient-4',
    render: (el) => {
      el.innerHTML = `
        <div class="phone-container">
          <div class="phone-avatar">👨‍🚀</div>
          <div class="phone-name">Kontrol Misi</div>
          <div class="phone-number">+62 8XX-XXXX-XXXX</div>
          <div class="phone-actions">
            <button class="phone-action phone-msg">💬</button>
            <button class="phone-action phone-call">📞</button>
          </div>
        </div>
      `;
    }
  },
  messages: {
    name: 'Pesan', icon: '💬', glow: 'glow-pink', gradient: 'gradient-5',
    render: (el) => {
      const chats = [
        { name: 'Mission Control', last: 'Peluncuran sukses! 🚀', badge: 2 },
        { name: 'Astro Bot', last: 'Cuaca luar angkasa cerah', badge: 0 },
        { name: 'Rusdi', last: 'Coba wallpaper nebula baru!', badge: 5 },
        { name: 'Starlink', last: 'Sinyal stabil ✨', badge: 0 },
      ];
      el.innerHTML = `<div class="msg-list">${chats.map(c => `
        <div class="msg-item">
          <div class="msg-avatar">${c.name[0]}</div>
          <div class="msg-info">
            <div class="msg-name">${c.name}</div>
            <div class="msg-last">${c.last}</div>
          </div>
          ${c.badge ? `<div class="msg-badge">${c.badge}</div>` : ''}
        </div>
      `).join('')}</div>`;
    }
  },
  mail: {
    name: 'Email', icon: '✉️', glow: 'glow-cyan', gradient: 'gradient-6',
    render: (el) => {
      const mails = [
        { from: 'NASA', subj: 'Selamat datang di program astronot', prev: 'Kami mengundang Anda...', time: '09:30', unread: true },
        { from: 'SpaceX', subj: 'Konfirmasi peluncuran Falcon 9', prev: 'Peluncuran dijadwalkan...', time: '08:15', unread: true },
        { from: 'Rusdi OS', subj: 'Update Space Edition tersedia', prev: 'Versi baru dengan tema...', time: 'Kemarin', unread: false },
        { from: 'Galaksi', subj: 'Newsletter mingguan astronomi', prev: 'Penemuan planet baru...', time: 'Sen', unread: false },
      ];
      el.innerHTML = mails.map(m => `
        <div class="mail-item">
          <div class="mail-avatar">${m.from[0]}</div>
          <div class="mail-body">
            <div class="mail-sender">${m.from} ${m.unread ? '🔵' : ''}</div>
            <div class="mail-subject">${m.subj}</div>
            <div class="mail-preview">${m.prev}</div>
          </div>
          <div class="mail-time">${m.time}</div>
        </div>
      `).join('');
    }
  },
  browser: {
    name: 'Browser', icon: '🌐', glow: 'glow-cyan', gradient: 'gradient-1',
    render: (el) => {
      const bookmarks = [
        { name: 'Google', url: 'https://www.google.com' },
        { name: 'YouTube', url: 'https://www.youtube.com' },
        { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'NASA', url: 'https://www.nasa.gov' },
      ];
      el.innerHTML = `
        <div style="display:flex;flex-direction:column;height:100%">
          <div class="br-toolbar">
            <button class="br-btn">←</button>
            <button class="br-btn">→</button>
            <input class="br-url" placeholder="Cari atau masukkan URL" value="rusdi.os/home">
            <button class="br-btn">▶</button>
          </div>
          <div class="br-content">
            <h2>🌐 Rusdi Space Browser</h2>
            <p style="color:var(--text-dim)">Jelajahi galaksi digital.</p>
            <div class="br-bookmarks">
              ${bookmarks.map(b => `<div class="br-bookmark" data-url="${b.url}">${b.name}</div>`).join('')}
            </div>
          </div>
        </div>
      `;
      el.querySelectorAll('.br-bookmark').forEach(b => {
        b.onclick = () => window.open(b.dataset.url, '_blank');
      });
    }
  },
  camera: {
    name: 'Kamera', icon: '📷', glow: 'glow-gold', gradient: 'gradient-3',
    render: (el) => {
      el.innerHTML = `
        <div class="camera-viewfinder">
          <div class="camera-grid"></div>
        </div>
        <div class="camera-controls">
          <div class="cam-mode">FOTO</div>
          <button class="cam-shutter"></button>
          <div class="cam-flip">🔄</div>
        </div>
      `;
    }
  },
  photos: {
    name: 'Foto', icon: '🖼️', glow: 'glow-pink', gradient: 'gradient-2',
    render: (el) => {
      const emojis = ['🌌','🪐','🌟','🚀','👨‍🚀','🌙','☄️','🛰️','🌠','🌍','⭐','🔭'];
      el.innerHTML = `<div class="photos-grid">${emojis.map(e => `<div class="photo-item" style="background:linear-gradient(135deg,hsl(${Math.random()*360},70%,25%),hsl(${Math.random()*360},70%,15%))">${e}</div>`).join('')}</div>`;
    }
  },
  music: {
    name: 'Musik', icon: '🎵', glow: 'glow-purple', gradient: 'gradient-2',
    render: (el) => {
      const tracks = [
        { title: 'Cosmic Drift', artist: 'Rusdi Space Band' },
        { title: 'Nebula Dreams', artist: 'Astro Sounds' },
        { title: 'Orbit Symphony', artist: 'Galaxy Orchestra' },
      ];
      let idx = 0, playing = false, progress = 0, interval;
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
      const update = () => {
        el.querySelector('#m-title').textContent = tracks[idx].title;
        el.querySelector('#m-artist').textContent = tracks[idx].artist;
      };
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
      el.querySelector('#m-next').onclick = () => { idx = (idx+1)%tracks.length; progress = 0; update(); };
      el.querySelector('#m-prev').onclick = () => { idx = (idx-1+tracks.length)%tracks.length; progress = 0; update(); };
    }
  },
  calendar: {
    name: 'Kalender', icon: '📅', glow: 'glow-cyan', gradient: 'gradient-1',
    render: (el) => {
      const d = new Date();
      const y = d.getFullYear(), m = d.getMonth();
      const monthName = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
      const first = new Date(y, m, 1).getDay();
      const days = new Date(y, m+1, 0).getDate();
      const today = d.getDate();
      const dows = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
      let cells = '';
      for (let i = 0; i < first; i++) cells += `<div class="cal-day other-month"></div>`;
      for (let i = 1; i <= days; i++) cells += `<div class="cal-day ${i===today?'today':''}">${i}</div>`;
      el.innerHTML = `
        <div class="cal-header">
          <div class="cal-month">${monthName}</div>
          <div class="cal-nav"><button>‹</button><button>›</button></div>
        </div>
        <div class="cal-grid">
          ${dows.map(w => `<div class="cal-dow">${w}</div>`).join('')}
          ${cells}
        </div>
      `;
    }
  },
  clock: {
    name: 'Jam', icon: '🕐', glow: 'glow-gold', gradient: 'gradient-3',
    render: (el) => {
      el.innerHTML = `
        <div class="clock-container">
          <div class="clock-time" id="clock-time">00:00:00</div>
          <div class="clock-date" id="clock-date"></div>
        </div>
        <div class="clock-world">
          <div class="clock-city"><div class="cc-name">🌍 Jakarta</div><div class="cc-time" id="t-jkt"></div></div>
          <div class="clock-city"><div class="cc-name">🌏 Tokyo</div><div class="cc-time" id="t-tky"></div></div>
          <div class="clock-city"><div class="cc-name">🌎 New York</div><div class="cc-time" id="t-nyc"></div></div>
          <div class="clock-city"><div class="cc-name">🌌 London</div><div class="cc-time" id="t-lon"></div></div>
        </div>
      `;
      const fmt = (tz) => new Date().toLocaleTimeString('id-ID', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
      const update = () => {
        el.querySelector('#clock-time').textContent = new Date().toLocaleTimeString('id-ID');
        el.querySelector('#clock-date').textContent = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        el.querySelector('#t-jkt').textContent = fmt('Asia/Jakarta');
        el.querySelector('#t-tky').textContent = fmt('Asia/Tokyo');
        el.querySelector('#t-nyc').textContent = fmt('America/New_York');
        el.querySelector('#t-lon').textContent = fmt('Europe/London');
      };
      update();
      setInterval(update, 1000);
    }
  },
  weather: {
    name: 'Cuaca', icon: '⛅', glow: 'glow-cyan', gradient: 'gradient-1',
    render: (el) => {
      el.innerHTML = `
        <div class="weather-container">
          <div class="weather-main">🌌</div>
          <div class="weather-city">Bumi, Milky Way</div>
          <div class="weather-temp">24°</div>
          <div class="weather-desc">Bening di luar angkasa</div>
          <div class="weather-details">
            <div class="weather-detail"><div class="wd-icon">💧</div><div class="wd-value">45%</div><div class="wd-label">Kelembapan</div></div>
            <div class="weather-detail"><div class="wd-icon">💨</div><div class="wd-value">12 km/j</div><div class="wd-label">Angin</div></div>
            <div class="weather-detail"><div class="wd-icon">🌡️</div><div class="wd-value">26°</div><div class="wd-label">Terasa</div></div>
          </div>
        </div>
      `;
    }
  },
  maps: {
    name: 'Peta', icon: '🗺️', glow: 'glow-green', gradient: 'gradient-4',
    render: (el) => {
      el.innerHTML = `
        <div class="map-container">
          <div class="map-grid-overlay"></div>
          <div class="map-pin">📍</div>
          <div class="map-label">Lokasi Anda: Bumi 🌍</div>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px">
          <input class="br-url" placeholder="Cari lokasi di galaksi...">
          <button class="br-btn">🔍</button>
        </div>
      `;
    }
  },
  notes: {
    name: 'Catatan', icon: '🗒️', glow: 'glow-gold', gradient: 'gradient-3',
    render: (el) => {
      let notes = JSON.parse(localStorage.getItem('rusdi-notes') || '[]');
      if (!notes.length) notes = [{ id: 1, title: 'Catatan Astronot', body: 'Jangan lupa bawa oksigen! 🚀' }];
      let activeId = notes[0].id;
      const save = () => localStorage.setItem('rusdi-notes', JSON.stringify(notes));
      const render = () => {
        const active = notes.find(n => n.id === activeId) || notes[0];
        el.innerHTML = `
          <div class="notes-header">
            <div style="font-size:18px;font-weight:700">📝 Catatan</div>
            <button class="notes-add" id="notes-add">+ Baru</button>
          </div>
          ${notes.map(n => `
            <div class="note-item ${n.id===activeId?'active':''}" data-id="${n.id}">
              <div class="note-title">${n.title || 'Tanpa Judul'}</div>
              <div class="note-preview">${(n.body||'').slice(0,40)}</div>
            </div>
          `).join('')}
          <div class="notes-editor" style="margin-top:16px">
            <input class="notes-title-input" id="notes-title" value="${active.title}" placeholder="Judul...">
            <textarea class="notes-body" id="notes-body" placeholder="Tulis catatan...">${active.body}</textarea>
          </div>
        `;
        el.querySelectorAll('.note-item').forEach(i => i.onclick = () => { activeId = +i.dataset.id; render(); });
        el.querySelector('#notes-add').onclick = () => {
          const n = { id: Date.now(), title: 'Catatan Baru', body: '' };
          notes.push(n); activeId = n.id; save(); render();
        };
        const t = el.querySelector('#notes-title'), b = el.querySelector('#notes-body');
        t.oninput = () => { notes.find(n=>n.id===activeId).title = t.value; save(); };
        b.oninput = () => { notes.find(n=>n.id===activeId).body = b.value; save(); };
      };
      render();
    }
  },
  calculator: {
    name: 'Kalkulator', icon: '🧮', glow: 'glow-purple', gradient: 'gradient-6',
    render: (el) => {
      let expr = '';
      el.innerHTML = `
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
      `;
      const upd = () => {
        el.querySelector('#calc-expr').textContent = expr;
        try { el.querySelector('#calc-result').textContent = expr ? eval(expr) : '0'; } catch { el.querySelector('#calc-result').textContent = 'Error'; }
      };
      el.querySelectorAll('.calc-btn').forEach(b => b.onclick = () => {
        const v = b.dataset.v;
        if (v === 'C') expr = '';
        else if (v === 'back') expr = expr.slice(0,-1);
        else if (v === '=') { try { expr = String(eval(expr)); } catch { expr = 'Error'; } }
        else expr += v;
        upd();
      });
    }
  },
  files: {
    name: 'File', icon: '📁', glow: 'glow-blue', gradient: 'gradient-6',
    render: (el) => {
      const fs = { '/': { type:'folder', name:'Home', children: {
        'Dokumen': { type:'folder', children: { 'catatan.txt':{type:'file',content:'Catatan misi luar angkasa 🌌'}, 'README.md':{type:'file',content:'# Rusdi OS\nLauncher tema luar angkasa.'} } },
        'Gambar': { type:'folder', children: {} },
        'Musik': { type:'folder', children: {} },
        'Unduhan': { type:'folder', children: {} },
      }}};
      let cur = '/';
      const get = (p) => { if (p==='/') return fs['/']; const a=p.split('/').filter(Boolean); let n=fs['/']; for(const x of a) n=n.children[x]; return n; };
      const render = () => {
        const f = get(cur).children || {};
        el.innerHTML = `
          <div class="fm-toolbar">
            <button class="fm-btn" id="fm-up">⬆</button>
            <div class="fm-path">${cur}</div>
          </div>
          <div class="fm-content">
            ${Object.entries(f).map(([n,i]) => `<div class="fm-item" data-name="${n}" data-type="${i.type}"><div class="fi-icon">${i.type==='folder'?'📁':'📄'}</div><div class="fi-name">${n}</div></div>`).join('') || '<div style="grid-column:1/-1;text-align:center;color:var(--text-dim);padding:40px">Folder kosong</div>'}
          </div>
        `;
        el.querySelector('#fm-up').onclick = () => { if (cur!=='/') { cur=cur.split('/').slice(0,-2).join('/')+'/'; if(cur==='')cur='/'; render(); } };
        el.querySelectorAll('.fm-item').forEach(i => i.onclick = () => {
          const n = i.dataset.name, node = f[n];
          if (node.type==='folder') { cur = cur==='/' ? '/'+n+'/' : cur+n+'/'; render(); }
          else WM.openApp({ ...APPS.notes, name:n });
        });
      };
      render();
    }
  },
  settings: {
    name: 'Pengaturan', icon: '⚙️', glow: 'glow-purple', gradient: 'gradient-6',
    render: (el) => {
      const saved = JSON.parse(localStorage.getItem('rusdi-settings') || '{}');
      const wps = [
        'linear-gradient(135deg,#05010f,#1a0a3e,#4c1d95)',
        'linear-gradient(135deg,#0a0524,#064e3b)',
        'linear-gradient(135deg,#1e1b4b,#831843)',
        'linear-gradient(135deg,#0c0a1e,#312e81)',
        'linear-gradient(135deg,#020617,#4c1d95,#831843)',
      ];
      let s = { wallpaper:0, sound:true, notifications:true, ...saved };
      const render = () => {
        el.innerHTML = `
          <div class="settings-section">
            <h3>🚀 Tampilan</h3>
            <div class="setting-row"><div><div class="setting-label">Tema Luar Angkasa</div><div class="setting-desc">Mode gelap bawaan</div></div><div class="toggle on"></div></div>
            <div class="setting-row"><div><div class="setting-label">Wallpaper Nebula</div><div class="setting-desc">Pilih latar galaksi</div></div></div>
            <div class="wallpaper-grid">${wps.map((w,i)=>`<div class="wallpaper-opt ${s.wallpaper===i?'active':''}" style="background:${w}" data-wp="${i}"></div>`).join('')}</div>
          </div>
          <div class="settings-section">
            <h3>🔔 Umum</h3>
            <div class="setting-row"><div><div class="setting-label">Suara</div><div class="setting-desc">Efek suara sistem</div></div><div class="toggle ${s.sound?'on':''}" data-t="sound"></div></div>
            <div class="setting-row"><div><div class="setting-label">Notifikasi</div><div class="setting-desc">Pesan dari luar angkasa</div></div><div class="toggle ${s.notifications?'on':''}" data-t="notifications"></div></div>
          </div>
          <div class="settings-section">
            <h3>ℹ️ Tentang</h3>
            <div class="setting-row"><div><div class="setting-label">Rusdi OS Launcher</div><div class="setting-desc">Space Edition v2.0</div></div></div>
          </div>
        `;
        el.querySelectorAll('[data-t]').forEach(t => t.onclick = () => { s[t.dataset.t] = !s[t.dataset.t]; t.classList.toggle('on', s[t.dataset.t]); save(); });
        el.querySelectorAll('[data-wp]').forEach(w => w.onclick = () => {
          s.wallpaper = +w.dataset.wp;
          document.body.style.background = wps[s.wallpaper];
          render(); save();
        });
      };
      const save = () => localStorage.setItem('rusdi-settings', JSON.stringify(s));
      render();
    }
  },
  terminal: {
    name: 'Terminal', icon: '⌨️', glow: 'glow-green', gradient: 'gradient-8',
    render: (el) => {
      const hist = ['Rusdi OS Terminal v2.0 — Space Edition', 'Ketik "help" untuk daftar perintah.', ''];
      const render = () => {
        el.innerHTML = `<div class="term-container" id="tb">${hist.map(l=>`<div class="term-line">${l}</div>`).join('')}<div class="term-input-line"><span class="term-prompt">astronot@rusdi:~$</span><input class="term-input" id="ti" autofocus></div></div>`;
        const tb = el.querySelector('#tb'); tb.scrollTop = tb.scrollHeight;
        const inp = el.querySelector('#ti'); inp.focus();
        inp.onkeydown = e => { if (e.key==='Enter') { const c=inp.value.trim(); hist.push(`<span class="term-prompt">astronot@rusdi:~$</span> ${c}`); proc(c); render(); } };
      };
      const proc = cmd => {
        const p = cmd.split(' '), c = p[0];
        switch(c){
          case 'help': hist.push('Perintah: help, echo, date, whoami, ls, neofetch, clear, exit, space'); break;
          case 'echo': hist.push(p.slice(1).join(' ')); break;
          case 'date': hist.push(new Date().toString()); break;
          case 'whoami': hist.push('astronot'); break;
          case 'ls': hist.push('Dokumen  Gambar  Musik  Unduhan  Galaksi'); break;
          case 'clear': hist.length = 0; break;
          case 'neofetch': hist.push(`       🪐🪐🪐       astronot@rusdi
     🪐🪐🪐🪐🪐🪐     ----------
    🪐      🪐    OS: Rusdi OS Space 2.0
   🪐        🪐   Kernel: Web 2.0
   🪐        🪐   Shell: rsh
    🪐      🪐    DE: Rusdi Launcher
     🪐🪐🪐🪐🪐🪐     WM: Rusdi WM
       🪐🪐🪐       CPU: Browser V8
                    RAM: ~${Math.round(performance.memory?performance.memory.usedJSHeapSize/1048576:50)}MB`); break;
          case 'space': hist.push('🌌 Selamat menjelajah luar angkasa! 🚀'); break;
          case 'exit': hist.push('Tidak bisa keluar dari alam semesta 😄'); break;
          case '': break;
          default: hist.push(`rsh: perintah tidak ditemukan: ${c}`);
        }
      };
      render();
    }
  },
  gallery: {
    name: 'Galeri', icon: '🎨', glow: 'glow-pink', gradient: 'gradient-2',
    render: (el) => {
      const emojis = ['🌌','🪐','🌟','🚀','👨‍🚀','🌙','☄️','🛰️','🌠','🌍','⭐','🔭'];
      el.innerHTML = `<div class="gallery-grid">${emojis.map((e,i)=>`<div class="gallery-item" style="background:linear-gradient(135deg,hsl(${i*30},70%,25%),hsl(${i*30+60},70%,15%))">${e}</div>`).join('')}</div>`;
    }
  },
  game: {
    name: 'Game', icon: '🎮', glow: 'glow-purple', gradient: 'gradient-2',
    render: (el) => {
      let board = Array(9).fill(''), turn = 'X', over = false;
      const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      const check = () => win.some(w => board[w[0]] && board[w[0]]===board[w[1]] && board[w[1]]===board[w[2]]);
      const render = () => {
        const w = check();
        el.innerHTML = `
          <div class="game-container">
            <div class="game-status">${w ? `🎉 ${w} Menang!` : over ? '🤝 Seri!' : `Giliran: ${turn}`}</div>
            <div class="game-board">${board.map((c,i)=>`<div class="game-cell ${c?c.toLowerCase():''}" data-i="${i}">${c}</div>`).join('')}</div>
            <button class="game-reset" id="gr">🔄 Main Lagi</button>
          </div>
        `;
        el.querySelectorAll('.game-cell').forEach(c => c.onclick = () => {
          if (board[+c.dataset.i] || over) return;
          board[+c.dataset.i] = turn;
          if (check()) over = true;
          else if (board.every(x=>x)) over = true;
          else turn = turn==='X'?'O':'X';
          render();
        });
        el.querySelector('#gr').onclick = () => { board=Array(9).fill(''); turn='X'; over=false; render(); };
      };
      render();
    }
  },
  about: {
    name: 'Tentang', icon: 'ℹ️', glow: 'glow-cyan', gradient: 'gradient-1',
    render: (el) => {
      el.innerHTML = `
        <div class="about-container">
          <div class="about-logo">🚀</div>
          <div class="about-name">Rusdi OS Launcher</div>
          <div class="about-version">Space Edition v2.0</div>
          <p class="about-desc">Launcher bertema luar angkasa untuk Android & iOS. Jelajahi galaksi dari layar utama Anda dengan animasi bintang, nebula, dan planet yang menakjubkan.</p>
          <div class="about-specs">
            <div><span>Tema</span><span>Luar Angkasa</span></div>
            <div><span>Platform</span><span>Android, iOS, Web</span></div>
            <div><span>Tipe</span><span>PWA Launcher</span></div>
            <div><span>Kernel</span><span>Web 2.0</span></div>
            <div><span>RAM</span><span>~50MB</span></div>
            <div><span>Bahasa</span><span>Indonesia</span></div>
          </div>
          <p style="color:var(--text-dim);font-size:11px;margin-top:20px">© 2026 Rusdi OS · Dibuat dengan 💜 untuk para penjelajah galaksi</p>
        </div>
      `;
    }
  }
};

// Home screen apps (first page)
const HOME_APPS = ['phone','messages','mail','browser','camera','photos','music','calendar','clock','weather','maps','notes'];

// Dock apps
const DOCK_APPS = ['browser','notes','calculator','settings'];

// All apps in drawer
const DRAWER_APPS = Object.keys(APPS);

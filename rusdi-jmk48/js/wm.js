// Rusdi OS Launcher — Window Manager (Mobile fullscreen style)
class WindowManager {
  constructor() {
    this.appView = document.getElementById('app-view');
    this.appViewBody = document.getElementById('app-view-body');
    this.titleEl = document.getElementById('av-title');
    this.backBtn = document.getElementById('av-back');
    this.history = [];
  }

  openApp(app) {
    this.history.push(app);
    this.titleEl.textContent = app.name;
    this.appViewBody.innerHTML = '';
    if (app.render) app.render(this.appViewBody);
    this.appView.classList.remove('hidden');
  }

  close() {
    this.appView.classList.add('hidden');
    this.history = [];
  }

  back() {
    if (this.history.length > 1) {
      this.history.pop();
      const app = this.history[this.history.length - 1];
      this.titleEl.textContent = app.name;
      this.appViewBody.innerHTML = '';
      if (app.render) app.render(this.appViewBody);
    } else {
      this.close();
    }
  }
}

const WM = new WindowManager();

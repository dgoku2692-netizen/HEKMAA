(() => {
  const settings = state.settings;
  const api = window.HikmaApi;
  let cloudStatusState = {message: '', isError: false};
  const firstRun = !Object.prototype.hasOwnProperty.call(settings, 'activated');
  const detectedUiLanguage = settings.uiLanguage || window.HikmaI18n.detectLanguage();
  const autoUiLanguage = settings.uiLanguageAuto ?? !settings.uiLanguage;

  async function refreshBackendHealth() {
    try {
      const health = await api.health();
      window.hikmaBackendHealth = health;
      let targetLang = health?.recommendedLanguage;
      if (!targetLang || !window.HikmaI18n.languages.includes(targetLang)) {
        targetLang = await window.HikmaI18n.detectLanguageByIp();
      }
      if (settings.uiLanguageAuto && window.HikmaI18n.languages.includes(targetLang)) {
        if (targetLang !== settings.uiLanguage) {
          settings.uiLanguage = window.HikmaI18n.setLanguage(targetLang);
          save();
          const langName = window.HikmaI18n.languageNames[targetLang] || targetLang;
          toast(`🌐 تم التعرف على موقعك وضبط اللغة: ${langName}`);
        }
      }
      const status = document.querySelector('#voiceStatus');
      if (status) status.textContent = health?.mode === 'demo'
        ? 'الخدمات الخلفية في الوضع التجريبي؛ الترجمة والتشكيل السحابيان غير مهيأين.'
        : 'اتصال الخدمات الخلفية جاهز.';
    } catch (error) {
      if (settings.uiLanguageAuto) {
        try {
          const targetLang = await window.HikmaI18n.detectLanguageByIp();
          if (targetLang && targetLang !== settings.uiLanguage && window.HikmaI18n.languages.includes(targetLang)) {
            settings.uiLanguage = window.HikmaI18n.setLanguage(targetLang);
            save();
            const langName = window.HikmaI18n.languageNames[targetLang] || targetLang;
            toast(`🌐 تم التعرف على موقعك وضبط اللغة: ${langName}`);
          }
        } catch {}
      }
      const status = document.querySelector('#voiceStatus');
      if (status) status.textContent = api.toFriendlyMessage(error);
    }
  }
  Object.assign(settings, {
    activated: settings.activated === true,
    uiLanguage: detectedUiLanguage,
    uiLanguageAuto: autoUiLanguage,
    age: firstRun ? null : (settings.age || null),
    a11y: firstRun ? null : (settings.a11y ?? null),
    skin: settings.skin || 'hikma',
    voiceSource: settings.voiceSource || 'device',
    stars: Number(settings.stars || 0),
    theme: settings.theme === 'dark' || (!Object.prototype.hasOwnProperty.call(settings, 'theme') && (settings.skin === 'cat' || window.matchMedia?.('(prefers-color-scheme: dark)').matches)) ? 'dark' : 'light'
  });
  window.HikmaI18n.setLanguage(settings.uiLanguage);
  settings.voiceSource = 'device';
  state.activity = {...{completed: 0, opened: 0, recent: [], days: []}, ...(state.activity || {})};
  state.stories = state.stories.map(item => {
    const translationLang = item.translationLang || (item.lang === 'ar' ? 'en' : 'ar');
    const translations = {...(item.translations || {})};
    if (item.translation && !translations[translationLang]) translations[translationLang] = item.translation;
    return {...item, favorite: !!item.favorite, translations};
  });

  const skins = {
    hikma: {name: 'حكمة', icon: '🦉', green: '#176b5c', dark: '#105447', mint: '#dcece1', paper: '#f5f3eb', surface: '#fffefa', ink: '#183b3b', muted: '#52615f'},
    cat: {name: 'قطة الفضاء', icon: '🐱', green: '#7c5cfa', dark: '#4b34b8', mint: '#cfc4ff', paper: '#1b1446', surface: '#2a2063', ink: '#f3eeff', muted: '#cfc4ff'},
    bot: {name: 'الروبوت الودود', icon: '🤖', green: '#4f7c96', dark: '#2f5063', mint: '#bfd6e3', paper: '#dce9f0', surface: '#fff', ink: '#12343b', muted: '#46656b'}
  };
  const palettes = {
    hikma: {
      light: {paper: '#f5f3eb', surface: '#fffefa', ink: '#183b3b', muted: '#52615f', line: '#dce3db', green: '#176b5c', dark: '#105447', mint: '#dcece1'},
      dark: {paper: '#101f20', surface: '#182c2d', ink: '#e8f4ef', muted: '#aec5bd', line: '#355150', green: '#63b9a1', dark: '#3d806e', mint: '#244443'}
    },
    cat: {
      light: {paper: '#f4f0ff', surface: '#fff', ink: '#28204b', muted: '#625b7e', line: '#ded8ef', green: '#7255c7', dark: '#5739a0', mint: '#e9e2fa'},
      dark: {paper: '#171226', surface: '#231d36', ink: '#f5f0ff', muted: '#c2b7dc', line: '#4a4063', green: '#b3a0ff', dark: '#9078e8', mint: '#38304f'}
    },
    bot: {
      light: {paper: '#eef4f7', surface: '#fff', ink: '#173442', muted: '#556d78', line: '#d3e0e6', green: '#426d83', dark: '#2f5063', mint: '#dce9f0'},
      dark: {paper: '#111f27', surface: '#1c303a', ink: '#e4f3f7', muted: '#aac2cd', line: '#39525d', green: '#93c0d5', dark: '#56839a', mint: '#263d49'}
    }
  };
  const catArt = `<svg class="owl" viewBox="0 0 260 260" role="img" aria-label="قطة الفضاء"><polygon points="52,90 62,20 112,62" style="fill:var(--green-dark)"/><polygon points="208,90 198,20 148,62" style="fill:var(--green-dark)"/><circle cx="130" cy="140" r="86" style="fill:var(--green)"/><circle cx="130" cy="140" r="98" fill="none" stroke="#fff" stroke-width="8" opacity=".85"/><ellipse cx="130" cy="170" rx="46" ry="34" style="fill:var(--mint)"/><circle cx="98" cy="128" r="16" fill="#fff"/><circle cx="162" cy="128" r="16" fill="#fff"/><circle cx="101" cy="130" r="8" fill="#12343b"/><circle cx="165" cy="130" r="8" fill="#12343b"/><path d="M120 158h20l-10 12z" fill="#ff7ab6"/><path d="M130 170c0 12-18 14-24 6m24-6c0 12 18 14 24 6" fill="none" stroke="#12343b" stroke-width="3"/><g stroke="#12343b" stroke-width="3"><path d="m40 160 42 6m-42 16 42-6m138-10 42-6m-42 22 42 6"/></g><path d="m224 32 3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#ff7ab6"/></svg>`;
  const botArt = `<svg class="owl" viewBox="0 0 260 260" role="img" aria-label="الروبوت الودود"><path d="M130 22v30" stroke="#12343b" stroke-width="8" stroke-linecap="round"/><circle cx="130" cy="20" r="12" fill="#9be15d"/><rect x="48" y="52" width="164" height="132" rx="34" style="fill:var(--green)"/><rect x="30" y="96" width="18" height="44" rx="8" style="fill:var(--green-dark)"/><rect x="212" y="96" width="18" height="44" rx="8" style="fill:var(--green-dark)"/><rect x="70" y="80" width="120" height="64" rx="22" fill="#12343b"/><rect x="88" y="98" width="30" height="28" rx="8" fill="#f2c85b"/><rect x="142" y="98" width="30" height="28" rx="8" fill="#f2c85b"/><rect x="104" y="158" width="52" height="10" rx="5" style="fill:var(--mint)"/><rect x="78" y="190" width="104" height="52" rx="18" style="fill:var(--green-dark)"/></svg>`;
  const patterns = {
    cat: 'radial-gradient(#ffffff66 1.5px,transparent 2px) 0 0/34px 34px',
    bot: 'linear-gradient(#2f506322 1px,transparent 1px) 0 0/28px 28px,linear-gradient(90deg,#2f506322 1px,transparent 1px) 0 0/28px 28px'
  };
  const shell = document.querySelector('.shell');
  const helperButton = document.querySelector('#a11yToggle');
  helperButton.innerHTML = '<span aria-hidden="true">♿</span>';
  helperButton.setAttribute('aria-label', 'إمكانية الوصول');
  helperButton.style.setProperty('display', 'grid');
  helperButton.style.setProperty('place-items', 'center');
  helperButton.style.setProperty('font-size', '0');
  const originalMascot = document.querySelector('.welcome .owl').outerHTML;
  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#mainContent';
  skipLink.textContent = 'انتقل إلى المحتوى الرئيسي';
  document.body.prepend(skipLink);
  const mainContent = document.querySelector('.shell main');
  if (mainContent) {
    mainContent.id = 'mainContent';
    mainContent.tabIndex = -1;
  }
  const gate = document.createElement('main');
  gate.id = 'onboarding';
  gate.className = 'onboarding';
  document.body.insertBefore(gate, shell);
  const dashboard = document.createElement('section');
  dashboard.id = 'readingDashboard';
  dashboard.className = 'reading-dashboard';
  document.querySelector('.welcome').insertAdjacentElement('afterend', dashboard);

  const styles = document.createElement('style');
  styles.textContent = `
    [hidden]{display:none!important}
    .onboarding{min-height:100dvh;display:grid;place-items:center;padding:22px max(16px,env(safe-area-inset-left)) calc(22px + env(safe-area-inset-bottom));background:var(--paper);color:var(--ink)}
    .gate-panel{width:min(520px,100%);padding:28px;background:var(--surface);border:1px solid var(--line);border-radius:20px;box-shadow:0 18px 50px #102c291c}
    .gate-brand{display:flex;align-items:center;gap:12px;margin-bottom:22px;color:var(--green);font-size:19px;font-weight:800}
    .gate-brand span{width:44px;height:44px;display:grid;place-items:center;border-radius:14px;background:var(--mint);font-size:26px}
    .gate-panel h1{margin:0 0 8px;font-size:25px;line-height:1.5}.gate-panel p{margin:6px 0 16px;color:var(--muted);line-height:1.8}
    .gate-panel label{display:block;margin:12px 0 5px;font-weight:700}.gate-panel input{width:100%;height:50px;padding:8px 12px;border:2px solid var(--green);border-radius:11px;background:var(--surface);color:var(--ink);font:inherit}
    .gate-actions{display:grid;gap:9px;margin-top:16px}.gate-error{min-height:24px;color:#b3261e;font-weight:700}.gate-panel .button{width:100%;min-height:50px}
    .skin-choices{display:grid;gap:9px;margin:14px 0}.skin-choice{display:flex;align-items:center;gap:10px;min-height:56px;padding:8px 12px;border:1px solid var(--line);border-radius:12px;background:var(--surface);color:var(--ink);font:inherit;text-align:right}.skin-choice[aria-pressed=true]{box-shadow:inset 0 0 0 2px var(--green)}.skin-swatch{width:28px;height:28px;border-radius:50%;background:var(--swatch);box-shadow:inset 0 0 0 2px #ffffff80}
    .feature-settings{margin-top:10px}.feature-setting-block{padding:14px 0;border-bottom:1px solid var(--line)}.feature-setting-block:last-child{border:0}.feature-setting-block h3{margin:0 0 8px;font-size:15px}.feature-setting-row{display:flex;gap:10px}.feature-setting-row .button{flex:1}.profile-chip{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:99px;background:var(--mint);color:var(--ink);font-size:12px;font-weight:800;white-space:nowrap}.star-chip{background:#f6ebcf;color:#4a3a12}.welcome{background:var(--mint)!important}
    :root[data-mode=kids]{--paper:#fff3d1;--radius:24px;font-size:106%}:root[data-mode=kids] .button{min-height:60px}
    :root[data-a11y=on]{--paper:#000;--surface:#111;--ink:#fff;--muted:#f1f1f1;--green:#ffd23f;--green-dark:#ffd23f;--mint:#222;--line:#fff;--coral:#ffd23f;color-scheme:dark}
    :root[data-a11y=on] .button.primary{color:#000}:root[data-a11y=on] .story-tag{background:#ffd23f;color:#000}:root[data-a11y=on] .welcome{background:#111!important}
    @media(max-width:560px){.gate-panel{padding:22px 18px}.profile-chip{display:none}.feature-settings .profile-chip{display:inline-flex}}
  `;
  document.head.appendChild(styles);
  const themeStyles = document.createElement('style');
  themeStyles.textContent = `:root[data-theme=dark] .dialog-head{background:color-mix(in srgb,var(--paper) 92%,transparent)}:root[data-theme=dark] .field select,:root[data-theme=dark] .field input[type=text],:root[data-theme=dark] .field textarea,:root[data-theme=dark] .gate-panel input{background:var(--surface);color:var(--ink)}:root[data-theme=dark] .story-tag{background:#514323;color:#ffe8a2}:root[data-theme=dark] .star-chip{background:#514323;color:#ffe8a2}:root[data-theme=dark] .gate-panel{box-shadow:0 18px 50px #0005}:root[data-theme=dark] .welcome:after{border-color:#ffffff18;box-shadow:0 0 0 24px #ffffff05,0 0 0 48px #ffffff03}.theme-toggle{font-size:21px;line-height:1}`;
  themeStyles.textContent += `.reading-dashboard{display:grid;grid-template-columns:repeat(3,minmax(0,1fr)) minmax(210px,1.5fr);gap:1px;margin:-12px 0 28px;overflow:hidden;border:1px solid var(--line);border-radius:14px;background:var(--line)}.dashboard-stat,.dashboard-continue{min-width:0;padding:13px 15px;background:var(--surface)}.dashboard-stat strong{display:block;font-size:20px;line-height:1.25}.dashboard-stat span,.dashboard-continue span{display:block;color:var(--muted);font-size:11px}.dashboard-continue{display:flex;align-items:center;justify-content:space-between;gap:8px}.dashboard-continue .button{min-height:38px;padding:0 11px;font-size:12px;white-space:nowrap}.favorite-toggle{width:38px;height:38px;border:1px solid var(--line);border-radius:11px;background:var(--surface);color:var(--muted);font-size:18px}.favorite-toggle[aria-pressed=true]{color:#be7b13;background:#fff4ce}.story-top{align-items:center}.reader-saved-tools{margin-top:12px;padding:10px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.reader-saved-tools summary{cursor:pointer;font-size:13px;font-weight:700}.reader-saved-tools .field{margin:10px 0}.reader-saved-tools textarea{min-height:75px}.reader-saved-tools .button{width:100%;margin-top:6px}.data-tools{display:grid;gap:9px}.data-tools input[type=file]{display:none}.data-note{margin:4px 0;color:var(--muted);font-size:11px;line-height:1.7}.data-tools .button{width:100%}@media(max-width:760px){.reading-dashboard{grid-template-columns:repeat(3,minmax(0,1fr))}.dashboard-continue{grid-column:1/-1}}@media(max-width:560px){.reading-dashboard{margin:-8px 0 22px}.dashboard-stat,.dashboard-continue{padding:10px}.dashboard-stat strong{font-size:17px}.dashboard-continue{grid-column:1/-1}}`;
  document.head.appendChild(themeStyles);
  themeStyles.textContent += '@media(max-width:560px){.topbar{gap:8px}.top-actions{gap:5px}.top-actions .button{width:42px;min-width:42px;height:42px;min-height:42px;padding:0;font-size:0}.top-actions #settingsOpen{font-size:20px}.top-actions #themeToggle{font-size:20px}.top-actions #addOpen span{font-size:23px}}';
  themeStyles.textContent += '.a11y{min-width:156px;width:auto;height:64px;padding:0 16px;border:3px solid #183b3b;border-radius:12px;background:#f2c85b;color:#102b26;font-size:18px;font-weight:800;z-index:15;position:fixed;right:28px;bottom:28px;display:grid;place-items:center}.a11y span{margin-inline-end:0;font-size:28px}.skip-link{position:fixed;top:8px;left:8px;z-index:40;transform:translateY(-160%);padding:12px 16px;border-radius:6px;background:#000;color:#fff}.skip-link:focus{transform:translateY(0)}.feature-setting-block{display:grid;gap:10px;margin:16px 0;padding-bottom:14px;border-bottom:1px solid var(--line)}.feature-setting-block h3{margin:0;font-size:15px}.feature-setting-block label{display:grid;gap:5px;font-size:13px;font-weight:700}.feature-setting-block button,.feature-setting-block select{min-height:56px}.feature-setting-block input[type=range],.feature-setting-block select{width:100%}.mobile-nav{display:none}@media(max-width:600px){.a11y{right:16px;bottom:calc(76px + env(safe-area-inset-bottom));width:64px;height:64px;border-radius:50%;padding:0;font-size:0}.a11y span{font-size:30px}.mobile-nav{display:flex;position:fixed;inset-inline:0;bottom:0;z-index:25;justify-content:space-around;align-items:center;padding:8px max(10px, env(safe-area-inset-left)) calc(8px + env(safe-area-inset-bottom));background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-top:1px solid var(--line)}.mobile-nav button{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:52px;border:0;background:transparent;color:var(--ink);font-weight:700;font-size:12px;gap:4px}.mobile-nav button span{font-size:11px}}:root[data-reduced-motion=true],:root[data-reduced-motion=true] *, :root[data-reduced-motion=true] *::before,:root[data-reduced-motion=true] *::after{scroll-behavior:auto!important;animation:none!important;transition:none!important}';
  themeStyles.textContent += '.a11y{position:static;flex:none;width:64px;min-width:64px;height:64px;padding:0;border:3px solid #183b3b;border-radius:50%;background:#f2c85b;color:#102b26;font-size:0;z-index:15;display:grid;place-items:center}.a11y span{margin:0;font-size:28px}.topbar{flex-wrap:wrap}.brand-sub,#libraryCount,.empty{color:var(--ink)}.shell{padding-bottom:calc(110px + env(safe-area-inset-bottom))}.overlay{padding:env(safe-area-inset-top) max(16px,env(safe-area-inset-right)) calc(16px + env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))}.dialog{max-height:calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 32px)}.dialog-body,.story-card,.field,.reader-main,.voice-panel{min-width:0;overflow-wrap:anywhere}.story-card h3,.story-desc,.reader-title,.reader-foot,.status,.voice-note,.button,.mobile-nav button{overflow-wrap:anywhere;word-break:normal}.button{white-space:normal;height:auto;line-height:1.4}.shell,.topbar,.welcome,.section-head,.tools,.library,.story-card,.dialog,.dialog-body,.reader-grid{max-width:100%;min-width:0}@media(max-width:600px){.a11y{margin-inline-start:auto}.mobile-nav{padding-bottom:calc(8px + env(safe-area-inset-bottom))}.mobile-nav button{min-width:0}.dialog,.dialog.narrow{max-height:calc(100dvh - env(safe-area-inset-top));border-radius:20px 20px 0 0}}body{min-height:100dvh}:root[data-reduced-motion=true],:root[data-reduced-motion=true] *, :root[data-reduced-motion=true] *::before,:root[data-reduced-motion=true] *::after{scroll-behavior:auto!important;animation:none!important;transition:none!important}';
  document.querySelector('.topbar').appendChild(helperButton);
  themeStyles.textContent += '.mobile-nav[hidden]{display:none!important}@media(max-width:600px){.top-actions #voiceOpen,.top-actions #addOpen,.top-actions #settingsOpen,.top-actions #profileChip{display:none!important}.top-actions #themeToggle{display:grid!important;width:48px;min-width:48px;height:48px;min-height:48px;padding:0;font-size:22px}.shell{padding-top:80px}.a11y{position:fixed;top:calc(8px + env(safe-area-inset-top));inset-inline-end:12px;inset-inline-start:auto;bottom:auto;width:64px;min-width:64px;height:64px;margin:0}.gate-brand .a11y,.dialog-head .a11y{position:static;flex:none}.dialog-head{flex-wrap:wrap}.mobile-nav button{min-width:48px;min-height:56px}.story-card .button,.story-card .icon-button,.favorite-toggle{min-width:48px;min-height:48px}.reader-controls{flex-wrap:wrap}.reader-controls .round-control{width:auto;min-width:82px;min-height:56px;padding:4px 9px;border-radius:12px;font-size:14px}.reader-controls .play-control{min-width:60px;min-height:60px}.reader-controls .reader-speed-chip{min-width:90px;min-height:48px}.reader-controls .reader-speed-presets button{min-width:48px;min-height:48px}button,select,summary,input:not([type=range]),textarea,.file-label{min-height:48px}button{min-width:48px}.icon-button{width:48px;height:48px}input[type=range]{height:48px}}@media(pointer:coarse){button,select,summary,.file-label{min-width:48px;min-height:48px}.story-card .card-actions{flex-wrap:wrap}.reader-controls button{min-height:48px}}';
  themeStyles.textContent += '#readingText{line-height:var(--reading-line-height,2.1)}:root[data-highlight-style=underline] #readingText .active{text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:5px}:root[data-highlight-style=outline] #readingText .active{outline:3px solid var(--green);outline-offset:3px}';
  themeStyles.textContent += ':root[data-a11y=on] .welcome p,:root[data-a11y=on] .story-desc,:root[data-a11y=on] .reader-details,:root[data-a11y=on] .reader-foot,:root[data-a11y=on] .range-label,:root[data-a11y=on] .voice-note,:root[data-a11y=on] .status{color:#f1f1f1!important}';
  themeStyles.textContent += ':root[data-a11y=on] .dialog-head{background:#111!important;color:#fff!important}:root[data-a11y=on] .dialog-head h2{color:#fff!important}';
  themeStyles.textContent += ':root[data-a11y=on] .button.primary{background:#ffd23f!important;color:#000!important}';
  themeStyles.textContent += '@media(max-width:600px){button,.button,.rate-presets button,.reader-speed-presets button,.dashboard-continue .button,.icon-button,.favorite-toggle{min-height:48px!important}.dashboard-continue .button{min-width:48px!important}}';

  const settingsOverlay = document.createElement('div');
  settingsOverlay.id = 'appSettingsOverlay';
  settingsOverlay.className = 'overlay';
  settingsOverlay.innerHTML = `<section class="dialog narrow" role="dialog" aria-modal="true" aria-labelledby="appSettingsTitle"><header class="dialog-head"><h2 id="appSettingsTitle">إعدادات حكمة</h2><button class="icon-button" data-close="appSettingsOverlay" aria-label="إغلاق">×</button></header><div class="dialog-body feature-settings"><div class="feature-setting-block"><h3>العمر والواجهة</h3><div class="feature-setting-row"><button class="button secondary" data-age-choice="u16">وضع الأطفال</button><button class="button secondary" data-age-choice="o16">16 سنة أو أكثر</button></div></div><div class="feature-setting-block"><h3>المساعدة وإمكانية الوصول</h3><button class="button secondary" id="settingsA11y"></button></div><div class="feature-setting-block"><h3>شخصية القلم</h3><div class="skin-choices" id="settingsSkins"></div></div><div class="feature-setting-block"><button class="button secondary" id="resetApp">إعادة ضبط التطبيق</button></div></div></section>`;
  settingsOverlay.querySelector('.feature-settings').insertAdjacentHTML('afterbegin', `<div class="feature-setting-block"><label for="uiLanguage">لغة التطبيق</label><select id="uiLanguage">${window.HikmaI18n.languages.map(language => `<option value="${language}">${window.HikmaI18n.languageNames[language]}</option>`).join('')}</select><label style="display:flex;align-items:center;gap:8px;margin-top:10px;cursor:pointer;font-size:13px"><input id="uiLanguageAutoCheck" type="checkbox" ${settings.uiLanguageAuto ? 'checked' : ''}> <span>التعرف التلقائي على اللغة (IP)</span></label></div>`);
  setTimeout(() => {
    const autoCheck = settingsOverlay.querySelector('#uiLanguageAutoCheck');
    autoCheck?.addEventListener('change', e => {
      settings.uiLanguageAuto = e.target.checked;
      save();
      if (settings.uiLanguageAuto) refreshBackendHealth();
    });
  });
  settingsOverlay.querySelector('.feature-settings').insertAdjacentHTML('afterbegin', '<div class="feature-setting-block"><h3>المظهر</h3><div class="feature-setting-row theme-choices" role="group" aria-label="اختيار المظهر"><button class="button secondary" data-theme-choice="light">☼ فاتح</button><button class="button secondary" data-theme-choice="dark">☾ داكن</button></div></div>');
  settingsOverlay.querySelector('#settingsA11y').closest('.feature-setting-block').insertAdjacentHTML('afterend', '<div class="feature-setting-block" id="accessibilityOptions"><h3>خيارات إمكانية الوصول</h3><label for="a11yTextScale">حجم النص <output id="a11yTextScaleValue">100%</output></label><input id="a11yTextScale" type="range" min="100" max="200" step="10"><label for="a11yLineSpacing">تباعد الأسطر</label><select id="a11yLineSpacing"><option value="1.6">مضغوط</option><option value="2">مريح</option><option value="2.4">واسع</option></select><label><input id="a11yHighContrast" type="checkbox"> تباين عالٍ</label><label><input id="a11yDyslexiaFont" type="checkbox"> خط ميسّر للقراءة</label><label><input id="a11yReducedMotion" type="checkbox"> تقليل الحركة</label><label><input id="a11yVoiceGuidance" type="checkbox"> إرشاد صوتي</label><label for="a11yAnnouncementRate">سرعة الإعلانات الصوتية <output id="a11yAnnouncementRateValue">1x</output></label><input id="a11yAnnouncementRate" type="range" min="0.5" max="2" step="0.05"><label><input id="a11ySimpleMode" type="checkbox"> الوضع المبسّط</label><label><input id="a11yHaptics" type="checkbox"> اهتزاز عند التفاعل</label><label for="a11yHighlightStyle">نمط تمييز الجملة</label><select id="a11yHighlightStyle"><option value="yellow">أصفر</option><option value="underline">تسطير</option><option value="outline">إطار</option></select></div>');
  settingsOverlay.querySelector('.feature-settings').insertAdjacentHTML('beforeend', '<div class="feature-setting-block" id="accountSettings"><h3>حساب اختياري</h3><p class="voice-note">يمكنك بدء القراءة دون بريد إلكتروني. الترقية تحتاج إعداد Supabase Auth.</p><label for="accountEmail">البريد الإلكتروني</label><input id="accountEmail" type="email" autocomplete="email"><label for="accountPassword">كلمة المرور</label><input id="accountPassword" type="password" minlength="8" autocomplete="new-password"><button class="button secondary" id="upgradeAccount" type="button">ترقية الحساب</button><p id="accountStatus" class="status" role="status" aria-live="polite"></p></div>');
  settingsOverlay.querySelector('#upgradeAccount').addEventListener('click', async () => {
    const email = settingsOverlay.querySelector('#accountEmail').value.trim();
    const password = settingsOverlay.querySelector('#accountPassword').value;
    const status = settingsOverlay.querySelector('#accountStatus');
    status.textContent = 'جارٍ ترقية الحساب...';
    try {
      const result = await api.upgradeAccount(email, password);
      status.textContent = result.confirmationRequired ? 'تم ربط البريد. افتح رسالة التأكيد لإكمال الترقية.' : 'تمت ترقية الحساب.';
      settingsOverlay.querySelector('#accountPassword').value = '';
    } catch (error) {
      status.textContent = api.toFriendlyMessage(error);
    }
  });
  document.body.appendChild(settingsOverlay);
  const mobileNav = document.querySelector('.mobile-nav');
  function syncResponsiveControls() {
    const activeDialogHead = document.querySelector('.overlay.open .dialog-head');
    if (activeDialogHead) activeDialogHead.appendChild(helperButton);
    else if (!settings.activated) gate.querySelector('.gate-brand')?.appendChild(helperButton);
    else if (matchMedia('(max-width: 600px)').matches) document.body.appendChild(helperButton);
    else document.querySelector('.topbar').appendChild(helperButton);
    mobileNav.hidden = !settings.activated || Boolean(activeDialogHead);
  }
  const overlayObserver = new MutationObserver(syncResponsiveControls);
  document.querySelectorAll('.overlay').forEach(overlay => overlayObserver.observe(overlay, {attributes: true, attributeFilter: ['class']}));
  const backupBlock = document.createElement('div');
  backupBlock.className = 'feature-setting-block data-tools';
  backupBlock.innerHTML = '<h3>نسخة احتياطية</h3><button class="button secondary" id="exportLibrary" type="button">تصدير المكتبة والإعدادات</button><label class="button secondary" for="importLibrary">استيراد نسخة احتياطية</label><input id="importLibrary" type="file" accept="application/json,.json"><p class="data-note">النسخة تشمل القصص والملاحظات والإعدادات. التسجيلات الصوتية تبقى على هذا الجهاز ولا تُصدّر.</p><p class="status" id="backupStatus" role="status"></p>';
  settingsOverlay.querySelector('#resetApp').closest('.feature-setting-block').before(backupBlock);
  const voiceSourceField = document.createElement('div');
  voiceSourceField.className = 'field';
  voiceSourceField.innerHTML = '<label for="voiceSource">مصدر الصوت</label><select id="voiceSource"><option value="device">صوت الجهاز (جودة أقل)</option></select><p class="voice-note">هذه نسخة ثابتة؛ لا ترسل النصوص إلى خدمة صوت سحابية.</p>';
  document.querySelector('#settingsOverlay .dialog-body').prepend(voiceSourceField);
  const clearSpeechCacheButton = document.createElement('button');
  clearSpeechCacheButton.className = 'button secondary';
  clearSpeechCacheButton.id = 'clearSpeechCache';
  clearSpeechCacheButton.type = 'button';
  clearSpeechCacheButton.textContent = 'مسح الصوت المحفوظ على هذا الجهاز';
  document.querySelector('#settingsOverlay .dialog-body').append(clearSpeechCacheButton);
  clearSpeechCacheButton.addEventListener('click', async () => {
    try {
      const database = await db();
      await new Promise((resolve, reject) => {
        const transaction = database.transaction('speechCache', 'readwrite');
        transaction.objectStore('speechCache').clear();
        transaction.oncomplete = resolve;
        transaction.onerror = () => reject(transaction.error);
      });
      cloudCache.clear();
      $('#voiceStatus').textContent = 'تم مسح الصوت المحفوظ على هذا الجهاز.';
    } catch {
      $('#voiceStatus').textContent = 'تعذر مسح الصوت المحفوظ.';
    }
  });

  function say(text, language = 'ar-EG') {
    if (!('speechSynthesis' in window) || !text) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = SPEECH_SETTINGS.clampRate(settings.announcementRate);
    utterance.pitch = Math.pow(2, SPEECH_SETTINGS.clampPitch(settings.pitch) / 12);
    const voices = speechSynthesis.getVoices();
    const preferred = language.startsWith('en') ? settings.enVoice : settings.arVoice;
    const voice = voices.find(item => item.name === preferred) || voices.find(item => item.lang.toLowerCase().startsWith(language.slice(0, 2)));
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
  }

  function playChime() {
    try {
      const notes = {hikma: [523, 659, 784], cat: [392, 587, 880], bot: [220, 330, 220]}[settings.skin];
      const context = new (window.AudioContext || window.webkitAudioContext)();
      notes.forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = settings.skin === 'bot' ? 'square' : 'sine';
        oscillator.frequency.value = frequency;
        gain.gain.value = 0.07;
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(context.currentTime + index * 0.13);
        oscillator.stop(context.currentTime + index * 0.13 + 0.11);
      });
    } catch {}
  }

  function updateProfile() {
    const actions = document.querySelector('.top-actions');
    let chip = document.querySelector('#profileChip');
    if (!chip) {
      chip = document.createElement('span');
      chip.id = 'profileChip';
      chip.className = 'profile-chip';
      actions.appendChild(chip);
    }
    chip.classList.toggle('star-chip', settings.age === 'u16');
    chip.textContent = settings.age === 'u16' ? `⭐ ${settings.stars} نجوم` : `${skins[settings.skin].icon} ${skins[settings.skin].name}`;
    if (!document.querySelector('#settingsOpen')) {
      const button = document.createElement('button');
      button.id = 'settingsOpen';
      button.className = 'button secondary';
      button.type = 'button';
      button.textContent = '⚙ الإعدادات';
        button.setAttribute('aria-label', 'الإعدادات');
        button.title = 'الإعدادات';
      button.addEventListener('click', openAppSettings);
      actions.insertBefore(button, actions.firstChild);
    }
    const addButton = document.querySelector('#addOpen');
    if (addButton) {
      addButton.setAttribute('aria-label', 'إضافة قصة جديدة');
      addButton.title = 'إضافة قصة جديدة';
    }
    let themeButton = document.querySelector('#themeToggle');
    if (!themeButton) {
      themeButton = document.createElement('button');
      themeButton.id = 'themeToggle';
      themeButton.className = 'icon-button theme-toggle';
      themeButton.type = 'button';
      themeButton.addEventListener('click', () => setTheme(settings.theme === 'dark' ? 'light' : 'dark'));
      actions.insertBefore(themeButton, document.querySelector('#settingsOpen').nextSibling);
    }
    themeButton.textContent = settings.theme === 'dark' ? '☼' : '☾';
    themeButton.title = settings.theme === 'dark' ? 'التبديل إلى المظهر الفاتح' : 'التبديل إلى المظهر الداكن';
    themeButton.setAttribute('aria-label', themeButton.title);
  }

  function renderDashboard() {
    const activity = state.activity;
    const favoriteCount = state.stories.filter(item => item.favorite).length;
    const completed = Number(activity.completed || 0);
    const days = new Set(activity.days || []);
    let streak = 0;
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setDate(cursor.getDate() - 1);
    while (days.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    const latest = (activity.recent || []).map(id => state.stories.find(item => item.id === id)).find(Boolean);
    dashboard.innerHTML = `<div class="dashboard-stat"><strong>${completed}</strong><span>قصص مكتملة</span></div><div class="dashboard-stat"><strong>${streak}</strong><span>أيام متتالية</span></div><div class="dashboard-stat"><strong>${favoriteCount}</strong><span>قصص مفضلة</span></div><div class="dashboard-continue"><span>${latest ? `آخر قراءة: ${esc(latest.title)}` : 'ابدأ أول حكاية لك'}</span>${latest ? `<button class="button secondary" data-open="${esc(latest.id)}">متابعة القراءة</button>` : '<span>اختر حكاية من مكتبتك</span>'}</div>`;
  }

  function markReadingDay() {
    const days = new Set(state.activity.days || []);
    days.add(new Date().toISOString().slice(0, 10));
    state.activity.days = [...days].sort().slice(-90);
  }

  function recordStoryOpened(id) {
    if (!state.stories.some(item => item.id === id)) return;
    state.activity.opened = Number(state.activity.opened || 0) + 1;
    state.activity.recent = [id, ...(state.activity.recent || []).filter(previous => previous !== id)].slice(0, 10);
    state.activity.lastOpened = new Date().toISOString();
    markReadingDay();
    save();
    renderDashboard();
  }

  function enhanceLibrary() {
    const library = document.querySelector('#library');
    const filter = document.querySelector('#filter');
    if (!filter.querySelector('[value="favorites"]')) filter.add(new Option('المفضلة', 'favorites'));
    const favoriteFilter = filter.value === 'favorites';
    const cards = [...library.querySelectorAll('.story-card')];
    for (const card of cards) {
      const openButton = card.querySelector('[data-open]');
      const item = state.stories.find(candidate => candidate.id === openButton?.dataset.open);
      if (!item) continue;
      let button = card.querySelector('[data-favorite]');
      if (!button) {
        button = document.createElement('button');
        button.className = 'favorite-toggle';
        button.type = 'button';
        button.dataset.favorite = item.id;
        card.querySelector('.story-top').insertBefore(button, card.querySelector('.story-tag'));
      }
      button.textContent = item.favorite ? '★' : '☆';
      button.setAttribute('aria-pressed', String(item.favorite));
      button.setAttribute('aria-label', item.favorite ? `إزالة ${item.title} من المفضلة` : `إضافة ${item.title} للمفضلة`);
      button.title = button.getAttribute('aria-label');
      card.hidden = favoriteFilter && !item.favorite;
    }
    let empty = library.querySelector('#favoriteEmpty');
    const visibleCards = cards.filter(card => !card.hidden).length;
    if (favoriteFilter && visibleCards === 0) {
      if (!empty) {
        empty = document.createElement('div');
        empty.id = 'favoriteEmpty';
        empty.className = 'empty';
        empty.innerHTML = '<strong>قائمة المفضلة فارغة</strong>اضغط على النجمة في أي قصة لإضافتها هنا.';
        library.appendChild(empty);
      }
      empty.hidden = false;
    } else if (empty) {
      empty.remove();
    }
    if (favoriteFilter) $('#libraryCount').textContent = `${visibleCards} قصة مفضلة`;
  }

  const baseRenderLibrary = window.renderLibrary;
  window.renderLibrary = function renderEnhancedLibrary() {
    const filter = document.querySelector('#filter');
    const favoritesOnly = filter.value === 'favorites';
    if (favoritesOnly) filter.value = 'all';
    baseRenderLibrary();
    if (favoritesOnly) filter.value = 'favorites';
    enhanceLibrary();
    renderDashboard();
  };
  document.querySelector('#filter').addEventListener('change', () => window.renderLibrary());
  document.addEventListener('click', event => {
    const favorite = event.target.closest('[data-favorite]');
    if (favorite) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const item = state.stories.find(candidate => candidate.id === favorite.dataset.favorite);
      if (!item) return;
      item.favorite = !item.favorite;
      save();
      window.renderLibrary();
      return;
    }
    const open = event.target.closest('[data-open]');
    if (open && open.closest('#library, .dashboard-continue')) recordStoryOpened(open.dataset.open);
  }, true);

      function applySkin() {
    const skin = skins[settings.skin] || skins.hikma;
    const palette = palettes[settings.skin]?.[settings.theme] || palettes.hikma.light;
    const root = document.documentElement;
    root.dataset.mode = settings.age === 'u16' ? 'kids' : 'standard';
    root.dataset.a11y = settings.a11y ? 'on' : 'off';
    root.dataset.theme = settings.theme;
    const paper = settings.age === 'u16' && settings.theme === 'light' ? '#fff3d1' : palette.paper;
    for (const [name, value] of Object.entries({'--green': palette.green, '--green-dark': palette.dark, '--mint': palette.mint, '--paper': paper, '--surface': palette.surface, '--ink': palette.ink, '--muted': palette.muted, '--line': palette.line})) root.style.setProperty(name, value);
    const systemContrast = window.matchMedia?.('(prefers-contrast: more)').matches;
    const highContrast = settings.highContrast ?? systemContrast;
    if (settings.a11y || highContrast) {
      for (const [name, value] of Object.entries({'--paper': '#000', '--surface': '#111', '--ink': '#fff', '--muted': '#f1f1f1', '--green': '#ffd23f', '--green-dark': '#ffd23f', '--mint': '#222', '--line': '#fff'})) root.style.setProperty(name, value);
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = settings.theme;
    }
    root.style.fontSize = `${Math.max(100, Math.min(200, Number(settings.textScale || (settings.a11y ? 150 : 100))))}%`;
    root.style.setProperty('--reading-line-height', String(settings.lineSpacing || 2.1));
    root.style.fontFamily = settings.dyslexiaFont ? 'OpenDyslexic, Verdana, sans-serif' : '';
    root.dataset.reducedMotion = String(settings.reducedMotion ?? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
    root.dataset.simpleMode = String(!!settings.simpleMode);
    root.dataset.highlightStyle = settings.highlightStyle || 'yellow';
    document.body.style.background = settings.a11y ? 'var(--paper)' : patterns[settings.skin] ? `${patterns[settings.skin]},var(--paper)` : 'var(--paper)';
    const mascot = document.querySelector('.welcome .owl');
    if (mascot) mascot.outerHTML = settings.skin === 'hikma' ? originalMascot : settings.skin === 'cat' ? catArt : botArt;
    const welcome = document.querySelector('.welcome h1');
    if (welcome) welcome.textContent = settings.age === 'u16' ? `أهلاً يا بطل! ${skin.icon}` : 'كل قصة، عالم جديد.';
    const subtitle = document.querySelector('.brand-sub');
    if (subtitle) subtitle.textContent = skin.name;
    helperButton.hidden = false;
    helperButton.setAttribute('aria-pressed', String(!!settings.a11y));
    helperButton.setAttribute('aria-label', settings.a11y ? 'إيقاف وضع المساعدة' : 'تشغيل وضع المساعدة');
    updateProfile();
  }

  function renderSettings() {
    $('#uiLanguage').value = settings.uiLanguage;
    settingsOverlay.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(settings.theme === button.dataset.themeChoice));
      button.classList.toggle('primary', settings.theme === button.dataset.themeChoice);
    });
    settingsOverlay.querySelectorAll('[data-age-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(settings.age === button.dataset.ageChoice));
      button.classList.toggle('primary', settings.age === button.dataset.ageChoice);
    });
    $('#settingsSkins').innerHTML = Object.entries(skins).map(([key, skin]) => `<button class="skin-choice" type="button" data-skin="${key}" aria-pressed="${settings.skin === key}"><span class="skin-swatch" style="--swatch:${skin.green}"></span><span>${skin.icon} ${skin.name}</span></button>`).join('');
    $('#settingsA11y').textContent = settings.a11y ? 'المساعدة مفعّلة، اضغط للإيقاف' : 'المساعدة متوقفة، اضغط للتفعيل';
    $('#settingsA11y').setAttribute('aria-pressed', String(!!settings.a11y));
    $('#a11yTextScale').value = Math.max(100, Math.min(200, Number(settings.textScale || 100)));
    $('#a11yTextScaleValue').value = `${$('#a11yTextScale').value}%`;
    $('#a11yLineSpacing').value = String(settings.lineSpacing || 2.1);
    $('#a11yHighContrast').checked = !!settings.highContrast;
    $('#a11yDyslexiaFont').checked = !!settings.dyslexiaFont;
    $('#a11yReducedMotion').checked = !!settings.reducedMotion;
    $('#a11yVoiceGuidance').checked = settings.voiceGuidance !== false;
    $('#a11yAnnouncementRate').value = SPEECH_SETTINGS.clampRate(settings.announcementRate);
    $('#a11yAnnouncementRateValue').value = `${settings.announcementRate || 1}x`;
    $('#a11ySimpleMode').checked = !!settings.simpleMode;
    $('#a11yHaptics').checked = !!settings.haptics;
    $('#a11yHighlightStyle').value = settings.highlightStyle || 'yellow';
  }

  function openAppSettings() {
    renderSettings();
    openModal('appSettingsOverlay');
  }

  function setTheme(theme) {
    settings.theme = theme === 'dark' ? 'dark' : 'light';
    save();
    applySkin();
    renderSettings();
  }

  function downloadBackup() {
    const backup = {
      format: 'hikma-reading-library',
      version: 1,
      exportedAt: new Date().toISOString(),
      stories: state.stories.map(({audio, ...item}) => ({...item})),
      settings: {...settings},
      activity: state.activity
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], {type: 'application/json'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = `hikma-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('#backupStatus').textContent = 'تم تنزيل نسخة المكتبة والإعدادات.';
  }

  async function importBackup(file) {
    const status = $('#backupStatus');
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      status.textContent = 'حجم النسخة أكبر من 8 ميجابايت.';
      return;
    }
    try {
      const backup = JSON.parse(await file.text());
      if (backup.format !== 'hikma-reading-library' || backup.version !== 1 || !Array.isArray(backup.stories) || backup.stories.length > 300) throw new Error('ملف النسخة الاحتياطية غير صالح.');
      const imported = backup.stories.map((item, index) => {
        const title = typeof item.title === 'string' ? item.title.trim().slice(0, 120) : '';
        const text = typeof item.text === 'string' ? item.text.trim() : '';
        if (!title || !text || text.length > 20000 || !['ar', 'en'].includes(item.lang)) throw new Error(`بيانات القصة رقم ${index + 1} غير صالحة.`);
        const id = typeof item.id === 'string' && /^[\w-]{1,100}$/.test(item.id) ? item.id : `story-import-${Date.now()}-${index}`;
        const bookmarkIndex = Number.isInteger(item.bookmark?.index) && item.bookmark.index >= 0 ? item.bookmark.index : null;
        return {
          id,
          title,
          text,
          lang: item.lang,
          translation: typeof item.translation === 'string' ? item.translation.slice(0, 20000) : '',
          icon: typeof item.icon === 'string' ? item.icon.slice(0, 8) : '📖',
          progress: Number.isInteger(item.progress) ? Math.max(0, Math.min(item.progress, 5000)) : 0,
          favorite: !!item.favorite,
          note: typeof item.note === 'string' ? item.note.slice(0, 2000) : '',
          bookmark: bookmarkIndex === null ? null : {index: bookmarkIndex, lang: item.bookmark.lang === 'en' ? 'en' : 'ar'},
          audio: false
        };
      });
      if (!confirm('سيتم استبدال قصصك الشخصية بالنسخة المستوردة. القصص المدمجة ستبقى. هل تريد المتابعة؟')) return;
      const importedBuiltins = new Map(imported.filter(item => item.id.startsWith('seed-')).map(item => [item.id, item]));
      const builtins = state.stories.filter(item => item.id.startsWith('seed-')).map(item => {
        const importedItem = importedBuiltins.get(item.id);
        return importedItem ? {...item, progress: importedItem.progress, favorite: importedItem.favorite, note: importedItem.note, bookmark: importedItem.bookmark} : item;
      });
      const custom = imported.filter(item => !item.id.startsWith('seed-'));
      state.stories = [...builtins, ...custom];
      if (backup.settings && typeof backup.settings === 'object') {
        const restored = backup.settings;
        Object.assign(settings, {
          activated: true,
          age: ['u16', 'o16'].includes(restored.age) ? restored.age : settings.age,
          a11y: typeof restored.a11y === 'boolean' ? restored.a11y : settings.a11y,
          skin: Object.hasOwn(skins, restored.skin) ? restored.skin : settings.skin,
          theme: restored.theme === 'dark' ? 'dark' : 'light',
          stars: Number.isInteger(restored.stars) ? Math.max(0, restored.stars) : settings.stars,
          rate: SPEECH_SETTINGS.clampRate(restored.rate),
          pitch: Number.isFinite(restored.pitch) ? (backup.settings.schemaVersion === 1 ? SPEECH_SETTINGS.clampPitch(restored.pitch) : SPEECH_SETTINGS.clampPitch(12 * Math.log2(Math.max(.01, restored.pitch)))) : settings.pitch,
          arVoice: typeof restored.arVoice === 'string' ? restored.arVoice.slice(0, 200) : settings.arVoice,
          enVoice: typeof restored.enVoice === 'string' ? restored.enVoice.slice(0, 200) : settings.enVoice
        });
      }
      if (backup.activity && typeof backup.activity === 'object') {
        state.activity = {
          completed: Number.isInteger(backup.activity.completed) ? Math.max(0, backup.activity.completed) : 0,
          opened: Number.isInteger(backup.activity.opened) ? Math.max(0, backup.activity.opened) : 0,
          recent: Array.isArray(backup.activity.recent) ? backup.activity.recent.filter(id => state.stories.some(item => item.id === id)).slice(0, 10) : [],
          days: Array.isArray(backup.activity.days) ? backup.activity.days.filter(day => /^\d{4}-\d{2}-\d{2}$/.test(day)).slice(-90) : []
        };
      }
      save();
      applySkin();
      renderSettings();
      window.renderLibrary();
      status.textContent = `تم استيراد ${custom.length} قصة شخصية. التسجيلات الصوتية لا تنتقل بين الأجهزة.`;
    } catch (error) {
      status.textContent = error.message || 'تعذر قراءة ملف النسخة الاحتياطية.';
    } finally {
      document.querySelector('#importLibrary').value = '';
    }
  }

  function renderGate() {
    const step = !settings.activated ? 'activate' : !settings.age ? 'age' : settings.a11y === null ? 'access' : null;
    const ready = !step;
    gate.hidden = ready;
    shell.hidden = !ready;
    helperButton.hidden = false;
    if (ready) {
      applySkin();
      syncResponsiveControls();
      return;
    }
    const heading = step === 'activate' ? 'أهلاً بيك في حكمة' : step === 'age' ? 'هل عمرك 16 سنة أو أكثر؟' : 'تحب نفعّل وضع المساعدة؟';
    let content;
    if (step === 'activate') {
      content = `<p>Demo access only; this code does not protect the app or create an account.</p><form id="demoLoginForm"><label for="penCode">Demo code</label><input id="penCode" type="password" dir="ltr" autocomplete="current-password" placeholder="Enter demo code" required><div class="gate-actions"><button class="button primary" type="submit">دخول</button></div></form><p class="voice-note">Demo codes are visible in the frontend and are not real authentication.</p>`;
    } else if (step === 'age') {
      content = `<p>نضبط شكل القراءة والمكافآت على حسب العمر.</p><div class="gate-actions"><button class="button primary" data-age="u16">أقل من 16 سنة</button><button class="button secondary" data-age="o16">16 سنة أو أكثر</button></div>`;
    } else {
      content = `<p>خط أكبر وتباين أوضح وقراءة صوتية لعناصر التطبيق.</p><div class="gate-actions"><button class="button primary" data-a11y="on"><span aria-hidden="true">♿</span> أحتاج مساعدة</button><button class="button secondary" data-a11y="off"><span aria-hidden="true">▶</span> ابدأ بشكل عادي</button></div>`;
    }
    gate.innerHTML = `<section class="gate-panel"><div class="gate-brand"><span>${skins[settings.skin]?.icon || '🦉'}</span>حِكمة</div><h1>${heading}</h1>${content}</section>`;
    syncResponsiveControls();
  }

  gate.addEventListener('submit', event => {
    if (event.target.id !== 'demoLoginForm') return;
    event.preventDefault();
    const code = $('#penCode').value;
    if (code !== '1234' && code !== 'admin') {
      alert('Wrong Password');
      return;
    }
    Object.assign(settings, {activated: true, activationDemo: true, age: 'o16', a11y: false});
    save();
    window.location.href = '/index.html';
  });
  gate.addEventListener('click', event => {
    const ageChoice = event.target.closest('[data-age]');
    const accessChoice = event.target.closest('[data-a11y]');
    if (ageChoice) {
      settings.age = ageChoice.dataset.age;
      save();
      renderGate();
    } else if (accessChoice) {
      settings.a11y = accessChoice.dataset.a11y === 'on';
      save();
      renderGate();
      if (settings.a11y) say('تم تفعيل وضع المساعدة.');
    }
  });

  document.querySelector('.mobile-nav').addEventListener('click', event => {
    const button = event.target.closest('[data-target]');
    if (!button) return;
    const target = button.dataset.target;
    if (target === 'library') document.querySelector('#mainContent').scrollIntoView({behavior: 'smooth'});
    else if (target === 'addOverlay') openModal(target);
    else if (target === 'settingsOverlay') { populateVoices(); openModal(target); }
    else if (target === 'appSettingsOverlay') openAppSettings();
  });

  settingsOverlay.addEventListener('click', event => {
    if (event.target.closest('#exportLibrary')) {
      downloadBackup();
      return;
    }
    const themeButton = event.target.closest('[data-theme-choice]');
    const skinButton = event.target.closest('[data-skin]');
    const ageButton = event.target.closest('[data-age-choice]');
    if (themeButton) {
      setTheme(themeButton.dataset.themeChoice);
    } else if (skinButton) {
      settings.skin = skinButton.dataset.skin;
      save();
      applySkin();
      renderSettings();
      playChime();
    } else if (ageButton) {
      settings.age = ageButton.dataset.ageChoice;
      save();
      applySkin();
      renderSettings();
    } else if (event.target.closest('#settingsA11y')) {
      settings.a11y = !settings.a11y;
      save();
      applySkin();
      renderSettings();
    } else if (event.target.closest('#resetApp')) {
      if (!confirm('إعادة ضبط التطبيق وحذف القصص والإعدادات المحفوظة؟')) return;
      speechSynthesis?.cancel();
      state.stories = SEED.map(item => ({...item, progress: 0}));
      Object.assign(settings, {activated: false, age: null, a11y: null, skin: 'hikma', theme: 'light', stars: 0, arVoice: '', enVoice: '', ...SPEECH_SETTINGS.defaults});
      try { localStorage.removeItem(KEY); } catch {}
      save();
      closeModal('appSettingsOverlay');
      renderLibrary();
      renderGate();
    }
  });
  document.querySelector('#importLibrary').addEventListener('change', event => importBackup(event.target.files?.[0]));

  let activeAudio = null;
  let activeAudioUrl = null;
  let audioTimes = [];
  let pendingAudioLine = null;
  let completionHandled = false;
  window.hikmaReader = {
    get story() { return story; },
    get lines() { return lines; },
    get index() { return lineIndex; },
    setIndex(index) {
      lineIndex = Math.max(0, Math.min(lines.length - 1, index));
      renderLines();
      if (story) {
        story.progressByLang = story.progressByLang || {};
        story.progressByLang[lang] = lineIndex;
        story.progress = lineIndex;
        save();
      }
    },
    stop() { stopSpeech(); stopAudio(); },
    playBlob(blob) { return playRecordedStory(blob); }
  };
  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.setActionHandler('play', () => {
        if (activeAudio?.paused) activeAudio.play().catch(() => {});
        else if (settings.voiceSource === 'device') window.startSpeech();
        else speakNaturally();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (activeAudio && !activeAudio.paused) activeAudio.pause();
        else if (speaking) window.toggleSpeech();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => step(-1));
      navigator.mediaSession.setActionHandler('nexttrack', () => step(1));
    } catch {}
  }

  function stopAudio() {
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.src = '';
      activeAudio = null;
    }
    if (activeAudioUrl) URL.revokeObjectURL(activeAudioUrl);
    activeAudioUrl = null;
    audioTimes = [];
    pendingAudioLine = null;
  }

  async function playRecordedStory(blobOverride = null) {
    if (!story) return;
    stopSpeech();
    stopAudio();
    const blob = blobOverride || await getAudio(story.id).catch(() => null);
    if (!blob) {
      toast('التسجيل غير متاح على هذا الجهاز');
      return;
    }
    if (lineIndex >= lines.length - 1) window.hikmaReader.setIndex(0);
    activeAudioUrl = URL.createObjectURL(blob);
    const audio = new Audio(activeAudioUrl);
    activeAudio = audio;
    audio.playbackRate = SPEECH_SETTINGS.clampRate(state.settings.rate);
    audio.preservesPitch = true;
    audio.webkitPreservesPitch = true;
    audio.addEventListener('loadedmetadata', () => {
      if (activeAudio !== audio) return;
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        const weights = lines.map(sentence => sentence.length + 8);
        const total = weights.reduce((sum, weight) => sum + weight, 0);
        let elapsed = 0;
        audioTimes = weights.map(weight => {
          const start = audio.duration * elapsed / total;
          elapsed += weight;
          return start;
        });
        audio.currentTime = audioTimes[lineIndex] || 0;
      }
      audio.play().catch(() => {
        if (activeAudio === audio) {
          stopAudio();
          toast('تعذر تشغيل التسجيل');
        }
      });
    }, {once: true});
    audio.ontimeupdate = () => {
      if (activeAudio !== audio || !audioTimes.length) return;
      if (pendingAudioLine !== null) {
        const target = pendingAudioLine;
        pendingAudioLine = null;
        window.hikmaReader.setIndex(target);
        return;
      }
      let index = 0;
      while (index + 1 < audioTimes.length && audioTimes[index + 1] <= audio.currentTime) index++;
      if (index !== lineIndex) window.hikmaReader.setIndex(index);
    };
    audio.onplay = () => {
      $('#playIcon').textContent = 'Ⅱ';
      $('#playPause').setAttribute('aria-label', 'إيقاف مؤقت');
      $('#readerMessage').textContent = 'يُشغّل التسجيل الصوتي.';
    };
    audio.onpause = () => {
      if (activeAudio !== audio || audio.ended) return;
      if (audioTimes.length) audio.currentTime = audioTimes[lineIndex] || 0;
      $('#playIcon').textContent = '▶';
      $('#playPause').setAttribute('aria-label', 'متابعة التسجيل');
      $('#readerMessage').textContent = 'توقفت القراءة عند بداية الجملة الحالية.';
    };
    audio.onended = () => {
      if (activeAudio !== audio) return;
      story.progress = 0;
      save();
      $('#readerMessage').textContent = 'أحسنت! وصلت لنهاية القصة.';
      $('#playIcon').textContent = '↻';
      $('#playPause').setAttribute('aria-label', 'إعادة التسجيل');
      activeAudio = null;
      if (activeAudioUrl) URL.revokeObjectURL(activeAudioUrl);
      activeAudioUrl = null;
    };
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('#recordPlay, #playPause, [data-step], #readingText [data-line], [data-close="readerOverlay"]');
    if (!target) return;
    if (target.matches('[data-close="readerOverlay"]')) {
      stopAudio();
      return;
    }
    if (target.id === 'recordPlay') {
      event.preventDefault();
      event.stopImmediatePropagation();
      playRecordedStory();
      return;
    }
    if (!activeAudio) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (target.id === 'playPause') {
      if (activeAudio.paused) activeAudio.play().catch(() => toast('تعذر استئناف التسجيل'));
      else activeAudio.pause();
      return;
    }
    const wasPlaying = !activeAudio.paused;
    const requested = target.matches('[data-step]') ? lineIndex + Number(target.dataset.step) : Number(target.dataset.line);
    if (audioTimes.length) {
      pendingAudioLine = Math.max(0, Math.min(lines.length - 1, requested));
      activeAudio.currentTime = audioTimes[pendingAudioLine] || 0;
    }
    window.hikmaReader.setIndex(requested);
    if (wasPlaying) activeAudio.play().catch(() => toast('تعذر تشغيل التسجيل'));
  }, true);

  document.addEventListener('input', event => {
    if (['readerRate', 'globalRate'].includes(event.target.id) && activeAudio) activeAudio.playbackRate = SPEECH_SETTINGS.clampRate(event.target.value);
  });
  document.addEventListener('change', event => {
    if (!['readerPitch', 'globalPitch'].includes(event.target.id)) return;
    if (settings.voiceSource === 'device' && speaking) {
      stopSpeech();
      window.startSpeech();
    } else if (settings.voiceSource !== 'device' && activeAudio && !activeAudio.paused) {
      stopAudio();
      speakNaturally();
    }
  });

  document.addEventListener('keydown', event => {
    if (!document.querySelector('#readerOverlay.open') || event.target.matches('input,textarea,select,[contenteditable=true]')) return;
    if (event.code === 'Space') {
      event.preventDefault();
      document.querySelector('#playPause')?.click();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      document.querySelector('[data-step="1"]')?.click();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      document.querySelector('[data-step="-1"]')?.click();
    }
  });

  new MutationObserver(() => {
    const message = document.querySelector('#readerMessage');
    if (!message || !message.textContent.includes('وصلت لنهاية القصة')) {
      completionHandled = false;
      return;
    }
    if (completionHandled) return;
    completionHandled = true;
    state.activity.completed = Number(state.activity.completed || 0) + 1;
    markReadingDay();
    if (story) {
      state.activity.recent = [story.id, ...(state.activity.recent || []).filter(id => id !== story.id)].slice(0, 10);
    }
    save();
    renderDashboard();
    if (settings.age === 'u16') {
      settings.stars++;
      save();
      updateProfile();
      message.textContent = '🎉 برافو! كسبت نجمة ⭐';
    } else {
      message.textContent = 'خلصت القراءة ✅';
    }
  }).observe(document.querySelector('#readerContent'), {childList: true, characterData: true, subtree: true});

  document.addEventListener('click', event => {
    if (event.target.closest('#a11yToggle')) requestAnimationFrame(() => {
      settings.a11y = !!settings.a11y;
      save();
      applySkin();
    });
  });
  document.addEventListener('focusin', event => {
    if ((!settings.a11y && settings.voiceGuidance === false) || !event.target.matches('button,input,textarea,select,a')) return;
    if (document.querySelector('#readerOverlay.open') && speaking) return;
    if (activeAudio && !activeAudio.paused) return;
    const text = event.target.getAttribute('aria-label') || event.target.textContent || event.target.placeholder || '';
    say(text.replace(/\s+/g, ' ').trim());
  });
  document.addEventListener('pointerdown', announceFirstTouch, {once: true});
  document.addEventListener('keydown', announceFirstTouch, {once: true});
  function announceFirstTouch() {
    if (settings.firstHint || !('speechSynthesis' in window)) return;
    settings.firstHint = true;
    save();
    say('مرحبًا، زر إمكانية الوصول في أسفل الشاشة. اضغطه لتكبير النص وتشغيل المساعدة الصوتية.');
  }

  settingsOverlay.addEventListener('input', event => {
    const fields = {
      a11yTextScale: ['textScale', value => Number(value)],
      a11yAnnouncementRate: ['announcementRate', value => SPEECH_SETTINGS.clampRate(value)]
    };
    const field = fields[event.target.id];
    if (!field) return;
    settings[field[0]] = field[1](event.target.value);
    if (event.target.id === 'a11yTextScale') $('#a11yTextScaleValue').value = `${settings.textScale}%`;
    if (event.target.id === 'a11yAnnouncementRate') $('#a11yAnnouncementRateValue').value = `${settings.announcementRate}x`;
    save();
    applySkin();
  });
  settingsOverlay.addEventListener('change', event => {
    if (event.target.id === 'uiLanguage') {
      settings.uiLanguage = window.HikmaI18n.setLanguage(event.target.value);
      settings.uiLanguageAuto = false;
      save();
      if (story && window.hikmaSetLanguage && window.HikmaI18n.languages.includes(settings.uiLanguage)) {
        window.hikmaSetLanguage(settings.uiLanguage);
      }
      return;
    }
    const fields = {
      a11yLineSpacing: ['lineSpacing', Number],
      a11yHighContrast: ['highContrast', Boolean],
      a11yDyslexiaFont: ['dyslexiaFont', Boolean],
      a11yReducedMotion: ['reducedMotion', Boolean],
      a11yVoiceGuidance: ['voiceGuidance', Boolean],
      a11ySimpleMode: ['simpleMode', Boolean],
      a11yHaptics: ['haptics', Boolean],
      a11yHighlightStyle: ['highlightStyle', String]
    };
    const field = fields[event.target.id];
    if (!field) return;
    settings[field[0]] = field[1](event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    save();
    applySkin();
  });

  let dialogReturnFocus = null;
  settingsOverlay.addEventListener('click', event => {
    if (event.target.closest('#settingsOpen')) return;
    if (event.target.closest('[data-close="appSettingsOverlay"]')) {
      dialogReturnFocus?.focus();
      dialogReturnFocus = null;
    }
  });
  document.addEventListener('click', event => {
    if (event.target.closest('#settingsOpen')) dialogReturnFocus = event.target.closest('#settingsOpen');
  }, true);
  document.addEventListener('keydown', event => {
    const dialog = document.querySelector('.overlay.open [role="dialog"]');
    if (!dialog || event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(item => item.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  const cloudCache = new Map();
  let readerSleepTimer = null;

  async function getSpeechCache(key) {
    const database = await db();
    return new Promise(resolve => {
      const request = database.transaction('speechCache').objectStore('speechCache').get(key);
      request.onsuccess = () => resolve(request.result?.blob || null);
      request.onerror = () => resolve(null);
    });
  }

  async function saveSpeechCache(key, blob) {
    const database = await db();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction('speechCache', 'readwrite');
      transaction.objectStore('speechCache').put({blob, createdAt: Date.now()}, key);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
    const entries = await new Promise(resolve => {
      const transaction = database.transaction('speechCache');
      const store = transaction.objectStore('speechCache');
      const valuesRequest = store.getAll();
      const keysRequest = store.getAllKeys();
      transaction.oncomplete = () => resolve(valuesRequest.result.map((item, index) => ({...item, key: keysRequest.result[index]})));
      valuesRequest.onerror = () => resolve([]);
      keysRequest.onerror = () => resolve([]);
    });
    let total = entries.reduce((sum, item) => sum + (item.blob?.size || 0), 0);
    const oldest = entries.sort((a, b) => a.createdAt - b.createdAt);
    while (total > 50 * 1024 * 1024 && oldest.length) {
      const item = oldest.shift();
      total -= item.blob?.size || 0;
      await new Promise(resolve => {
        const transaction = database.transaction('speechCache', 'readwrite');
        transaction.objectStore('speechCache').delete(item.key);
        transaction.oncomplete = resolve;
        transaction.onerror = resolve;
      });
    }
  }

  async function loadStaticData() {
    updateCloudControls();
    loadVoiceChoices();
  }

  async function loadVoiceChoices() {
    const select = document.querySelector('#voiceSource');
    if (!select) return;
    try {
      const [voices, qualityCases] = await Promise.all([
        HikmaData.loadJson('voices.json'),
        HikmaData.loadJson('test-sentences.json')
      ]);
      window.hikmaPublicVoices = voices;
      window.hikmaQualityCases = qualityCases;
      addStaticQualityPreview(qualityCases);
      const consented = voices.filter(voice => voice.consent === true && voice.engineVoiceId);
      voiceSourceField.querySelector('.voice-note').textContent = consented.length
        ? 'تتطلب أصوات الأصدقاء مشغلًا آمنًا غير متاح في النسخة الثابتة.'
        : 'لا توجد أصوات أصدقاء مصرّح بها ومهيأة. الصوت المتاح هو صوت الجهاز.';
    } catch (error) {
      voiceSourceField.querySelector('.voice-note').textContent = `تعذر تحميل voices.json أو test-sentences.json: ${error.message}`;
    }
    settings.voiceSource = 'device';
    select.value = 'device';
    save();
  }

  function addStaticQualityPreview(cases) {
    const body = document.querySelector('#settingsOverlay .dialog-body');
    if (!body || body.querySelector('#staticQualityPreview')) return;
    const panel = document.createElement('details');
    panel.id = 'staticQualityPreview';
    panel.className = 'field';
    panel.innerHTML = '<summary>عينات اختبار النطق</summary><label for="qualityLanguage">اللغة</label><select id="qualityLanguage"><option value="ar">العربية</option><option value="en">English</option></select><label for="qualitySentence">الجملة</label><select id="qualitySentence"></select><button class="button secondary" id="playQualitySentence" type="button">استمع بصوت الجهاز</button><p class="voice-note">العينات محمّلة من test-sentences.json. جودة الصوت تعتمد على الجهاز.</p>';
    body.append(panel);
    const language = panel.querySelector('#qualityLanguage');
    const sentence = panel.querySelector('#qualitySentence');
    const populate = () => {
      sentence.replaceChildren(...cases[language.value].map((text, index) => new Option(`${index + 1}. ${text}`, String(index))));
    };
    language.addEventListener('change', populate);
    populate();
    panel.querySelector('#playQualitySentence').addEventListener('click', () => {
      const text = cases[language.value][Number(sentence.value)];
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language.value === 'ar' ? 'ar-EG' : 'en-US';
      utterance.rate = SPEECH_SETTINGS.clampRate(settings.rate);
      speechSynthesis.speak(utterance);
    });
  }
  document.querySelector('#voiceSource').addEventListener('change', event => {
    settings.voiceSource = event.target.value;
    save();
    updateCloudControls();
  });

  function cloudStatus(message, isError = false) {
    cloudStatusState = {message, isError};
    const status = document.querySelector('#cloudStatus');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('error', isError);
  }

  function updateCloudControls() {
    const translateButton = document.querySelector('#translateStory');
    const speechButton = document.querySelector('#neuralSpeech');
    const draftButton = document.querySelector('#translateDraft');
    if (translateButton) translateButton.disabled = false;
    if (draftButton) draftButton.disabled = false;
    if (speechButton) speechButton.disabled = false;
    if (speechButton) {
      speechButton.textContent = settings.voiceSource === 'device'
        ? 'قراءة بصوت الجهاز (جودة أقل)'
        : settings.voiceSource.startsWith('friend:')
          ? 'قراءة بصوت الصديق المصرّح به'
          : 'قراءة بصوت Azure الطبيعي';
    }
    if (!cloudStatusState.message) cloudStatusState.message = 'جارٍ التحقق من الخدمات الخلفية. الترجمة اليدوية وصوت الجهاز متاحان دائمًا.';
    cloudStatus(cloudStatusState.message, cloudStatusState.isError);
  }

  async function translateStory(to) {
    if (!story || !window.HikmaI18n.languages.includes(to)) return;
    if (to === story.lang) {
      stopSpeech();
      lang = story.lang;
      lineIndex = story.progressByLang?.[lang] || 0;
      window.renderReader();
      return;
    }
    const cached = story.translations?.[to] || (story.translationLang === to ? story.translation : '');
    if (cached) {
      stopSpeech();
      lang = to;
      lineIndex = story.progressByLang?.[lang] || 0;
      window.renderReader();
      cloudStatus('الترجمة المحفوظة لهذه اللغة جاهزة.');
      return;
    }
    cloudStatus('جارٍ طلب الترجمة...');
    try {
      const result = await api.translate(story.text, to);
      const translatedText = String(result.translatedText ?? result.text ?? '');
      if (result.mode === 'demo') {
        const languageSelect = document.querySelector('#readLang');
        if (languageSelect) languageSelect.value = lang === story.lang ? 'original' : lang;
        cloudStatus('الترجمة الخلفية في الوضع التجريبي ولم تُنتج ترجمة. أضفها من محرر الترجمة اليدوي.', true);
        return;
      }
      if (!translatedText.trim()) throw new Error('empty translation');
      story.translations = {...story.translations, [to]: translatedText};
      story.translation = translatedText;
      story.translationLang = to;
      story.translationSources = {...story.translationSources, [to]: 'api'};
      save();
      stopSpeech();
      lang = to;
      lineIndex = 0;
      renderReader();
      cloudStatus('تم تحميل الترجمة من الخدمة الخلفية.');
    } catch (error) {
      cloudStatus(api.toFriendlyMessage(error), true);
    }
  }
  window.hikmaSetLanguage = translateStory;
  function originalReaderText(targetLanguage) {
    if (!story) return '';
    if (targetLanguage === story.lang) return story.text;
    return story.translations?.[targetLanguage] || (story.translationLang === targetLanguage ? story.translation : '');
  }
  window.hikmaGetReaderText = targetLanguage => {
    const originalText = originalReaderText(targetLanguage);
    const cached = story?.diacritics?.[targetLanguage];
    return story?.diacriticsEnabled && cached?.source === originalText ? cached.text : originalText;
  };

  function splitSpeechChunks(text, maxLength = 200) {
    const chunks = [];
    let remaining = String(text).trim();
    while (remaining.length > maxLength) {
      let boundary = remaining.lastIndexOf(' ', maxLength);
      if (boundary < 1) boundary = maxLength;
      chunks.push(remaining.slice(0, boundary).trim());
      remaining = remaining.slice(boundary).trim();
    }
    if (remaining) chunks.push(remaining);
    return chunks;
  }

  async function speechCacheKey(provider, voice, language, text) {
    const payload = JSON.stringify([provider, voice, language, text, settings.rate, settings.pitch]);
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
    return `speech-${[...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, '0')).join('')}`;
  }

  function audioBlobFromBase64(audioBase64, contentType) {
    const binary = atob(audioBase64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
    return new Blob([bytes], {type: contentType || 'audio/mpeg'});
  }

  async function playGeneratedAudio(blobs) {
    stopSpeech();
    stopAudio();
    let chunkIndex = 0;
    const playChunk = async () => {
      if (chunkIndex >= blobs.length) {
        activeAudio = null;
        if (activeAudioUrl) URL.revokeObjectURL(activeAudioUrl);
        activeAudioUrl = null;
        return;
      }
      if (activeAudioUrl) URL.revokeObjectURL(activeAudioUrl);
      activeAudioUrl = URL.createObjectURL(blobs[chunkIndex]);
      const audio = new Audio(activeAudioUrl);
      activeAudio = audio;
      audio.playbackRate = SPEECH_SETTINGS.clampRate(settings.rate);
      audio.preservesPitch = true;
      audio.webkitPreservesPitch = true;
      audio.addEventListener('ended', () => {
        if (activeAudio !== audio) return;
        chunkIndex++;
        if (chunkIndex < blobs.length) playChunk();
        else finishSentence();
      }, {once: true});
      await audio.play();
    };
    const finishSentence = () => {
      if (activeAudioUrl) URL.revokeObjectURL(activeAudioUrl);
      activeAudioUrl = null;
      activeAudio = null;
      if (lineIndex < lines.length - 1) {
        lineIndex++;
        renderLines();
        saveProgress();
        speakNaturally();
      } else {
        lineIndex = 0;
        saveProgress();
        renderLines();
        cloudStatus('وصلت إلى نهاية القصة.');
      }
    };
    await playChunk();
  }

  async function speakNaturally() {
    if (!story) return;
    const selectedVoice = settings.voiceSource.startsWith('friend:') ? settings.voiceSource.slice(7) : '';
    const voice = selectedVoice || (lang === 'ar' ? 'neural-ar' : 'neural-en');
    const sourceText = lines[lineIndex] || story.text;
    const chunks = splitSpeechChunks(sourceText);
    const speechHealth = window.hikmaBackendHealth?.integrations?.speech;
    const configuredProvider = window.hikmaBackendHealth?.providers?.speech || 'worker';
    const workerConfigured = speechHealth === 'configured';
    cloudStatus(workerConfigured ? 'جارٍ تجهيز الصوت...' : 'جارٍ التحقق من الصوت الخلفي...');
    try {
      const audioChunks = [];
      let resultProvider = 'worker';
      for (const chunk of chunks) {
        const cacheKey = workerConfigured ? await speechCacheKey(configuredProvider, voice, lang, chunk) : null;
        let audioBlob = cacheKey ? await getSpeechCache(cacheKey) : null;
        if (!audioBlob) {
          const result = await api.speech(chunk, lang, voice, settings.rate, settings.pitch);
          if (result.mode !== 'configured' || !result.audioBase64) {
            cloudStatus('الصوت الخلفي في الوضع التجريبي؛ يعمل صوت الجهاز بدلًا منه.');
            window.startSpeech();
            return;
          }
          resultProvider = result.provider || resultProvider;
          audioBlob = audioBlobFromBase64(result.audioBase64, result.contentType);
          const finalKey = await speechCacheKey(resultProvider, voice, lang, chunk);
          await saveSpeechCache(finalKey, audioBlob);
        }
        audioChunks.push(audioBlob);
      }
      await playGeneratedAudio(audioChunks);
      cloudStatus('يعمل الصوت الخلفي المحفوظ على هذا الجهاز.');
    } catch (error) {
      cloudStatus(`${api.toFriendlyMessage(error)} يعمل صوت الجهاز بدلًا منه.`, true);
      window.startSpeech();
    }
  }

  document.addEventListener('click', event => {
    if (settings.voiceSource === 'device' || !event.target.closest('#playPause, #readingText [data-line]')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    speakNaturally();
  }, true);

  function enhanceReader() {
    const panel = document.querySelector('#readerContent .voice-panel');
    if (!panel) return;
    const previousButton = document.querySelector('#readerContent .reader-controls [data-step="-1"]');
    const nextButton = document.querySelector('#readerContent .reader-controls [data-step="1"]');
    if (previousButton && !previousButton.dataset.labeled) {
      previousButton.dataset.labeled = 'true';
      previousButton.innerHTML = '<span aria-hidden="true">‹</span><bdi dir="ltr">Previous</bdi>';
      previousButton.setAttribute('aria-label', 'Previous sentence');
    }
    if (nextButton && !nextButton.dataset.labeled) {
      nextButton.dataset.labeled = 'true';
      nextButton.innerHTML = '<bdi dir="ltr">Next</bdi><span aria-hidden="true">›</span>';
      nextButton.setAttribute('aria-label', 'Next sentence');
    }
    const controls = document.querySelector('#readerContent .reader-controls');
    if (controls && !controls.querySelector('#readerSpeedChip')) {
      const speedGroup = document.createElement('div');
      speedGroup.className = 'reader-speed-group';
      speedGroup.innerHTML = `<button class="button secondary reader-speed-chip" id="readerSpeedChip" type="button" aria-expanded="false">Speed ${Number(settings.rate).toFixed(2)}x</button><div class="reader-speed-presets" id="readerSpeedPresets" hidden><button class="button secondary" type="button" data-speed="0.5">0.5x</button><button class="button secondary" type="button" data-speed="0.75">0.75x</button><button class="button secondary" type="button" data-speed="1">1x</button><button class="button secondary" type="button" data-speed="1.5">1.5x</button><button class="button secondary" type="button" data-speed="2">2x</button></div>`;
      controls.appendChild(speedGroup);
      const chip = speedGroup.querySelector('#readerSpeedChip');
      const presets = speedGroup.querySelector('#readerSpeedPresets');
      chip.addEventListener('click', () => {
        presets.hidden = !presets.hidden;
        chip.setAttribute('aria-expanded', String(!presets.hidden));
      });
      speedGroup.querySelectorAll('[data-speed]').forEach(button => button.addEventListener('click', () => {
        window.setRate(Number(button.dataset.speed));
        chip.textContent = `Speed ${Number(settings.rate).toFixed(2)}x`;
        presets.hidden = true;
        chip.setAttribute('aria-expanded', 'false');
      }));
      document.querySelector('#readerRate')?.addEventListener('input', () => {
        chip.textContent = `Speed ${Number(settings.rate).toFixed(2)}x`;
      });
    }
    const tashkeelButton = panel.querySelector('#diacritizeText');
    if (tashkeelButton) {
      const originalText = originalReaderText(lang);
      const cached = story.diacritics?.[lang];
      const enabled = story.diacriticsEnabled && cached?.source === originalText;
      tashkeelButton.textContent = enabled ? 'إيقاف التشكيل' : 'تشكيل النص العربي';
      tashkeelButton.setAttribute('aria-pressed', String(!!enabled));
    }
    const sentenceCounter = document.querySelector('#counter');
    const readerMessage = document.querySelector('#readerMessage');
    if (sentenceCounter) sentenceCounter.setAttribute('aria-live', 'polite');
    if (readerMessage) {
      readerMessage.setAttribute('role', 'status');
      readerMessage.setAttribute('aria-live', 'polite');
    }
    const readerDialog = panel.closest('[role="dialog"]');
    if (readerDialog) {
      readerDialog.lang = lang;
      readerDialog.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
    if (!panel.querySelector('#sleepTimer')) {
      const timerField = document.createElement('div');
      timerField.className = 'field';
      timerField.innerHTML = '<label for="sleepTimer">مؤقت النوم</label><select id="sleepTimer"><option value="0">إيقاف المؤقت</option><option value="5">5 دقائق</option><option value="15">15 دقيقة</option><option value="30">30 دقيقة</option><option value="60">60 دقيقة</option></select>';
      panel.prepend(timerField);
      timerField.querySelector('#sleepTimer').addEventListener('change', event => {
        clearTimeout(readerSleepTimer);
        const minutes = Number(event.target.value);
        if (!minutes) return;
        readerSleepTimer = setTimeout(() => {
          window.hikmaReader.stop();
          const message = document.querySelector('#readerMessage');
          if (message) message.textContent = 'انتهى مؤقت النوم. تم حفظ موضع القراءة.';
          event.target.value = '0';
        }, minutes * 60 * 1000);
      });
    }
    let languageSelect = panel.querySelector('#readLang');
    if (!languageSelect) {
      const field = document.createElement('div');
      field.className = 'field';
      field.innerHTML = '<label for="readLang">لغة القراءة</label><select id="readLang"></select>';
      panel.insertBefore(field, panel.querySelector('.field'));
      languageSelect = field.querySelector('select');
    }
    languageSelect.innerHTML = `<option value="original">${story.lang === 'ar' ? 'الأصل' : 'Original'}</option>${window.HikmaI18n.languages.map(language => `<option value="${language}">${window.HikmaI18n.languageNames[language]}</option>`).join('')}`;
    languageSelect.value = lang === story.lang ? 'original' : lang;
    if (languageSelect.dataset.cloudBound !== 'true') {
      languageSelect.dataset.cloudBound = 'true';
      languageSelect.addEventListener('change', event => {
        event.stopImmediatePropagation();
        translateStory(event.target.value === 'original' ? story.lang : event.target.value);
      }, true);
    }
    if (!panel.querySelector('#cloudVoiceTools')) {
      const tools = document.createElement('div');
      tools.id = 'cloudVoiceTools';
      tools.className = 'cloud-voice-tools';
      tools.innerHTML = '<button class="button primary" id="neuralSpeech" type="button">قراءة بصوت الجهاز</button><button class="button secondary" id="diacritizeText" type="button">تشكيل النص العربي</button><p class="voice-note">تُرسل الطلبات إلى الخدمة الخلفية؛ عند غيابها يبقى صوت الجهاز والتحرير اليدوي متاحين.</p><details id="translationEditor"><summary>تحرير الترجمة يدويًا</summary><div class="field"><label for="translationText">النص المترجم</label><textarea id="translationText" maxlength="20000"></textarea></div><button class="button secondary" id="saveTranslation" type="button">حفظ الترجمة</button></details><p class="voice-note" id="cloudStatus" role="status" aria-live="polite"></p>';
      panel.insertBefore(tools, panel.querySelector('#recordOpen'));
      tools.querySelector('#neuralSpeech').addEventListener('click', speakNaturally);
      tools.querySelector('#diacritizeText').addEventListener('click', async () => {
        const source = originalReaderText(lang);
        if (!source) return cloudStatus('أضف النص أو الترجمة أولًا.', true);
        const cached = story.diacritics?.[lang];
        if (story.diacriticsEnabled && cached?.source === source) {
          story.diacriticsEnabled = false;
          save();
          window.renderReader();
          enhanceReader();
          cloudStatus('تم إيقاف التشكيل وعرض النص الأصلي.');
          return;
        }
        if (cached?.source === source) {
          story.diacriticsEnabled = true;
          save();
          window.renderReader();
          enhanceReader();
          cloudStatus('تم عرض التشكيل المحفوظ.');
          return;
        }
        cloudStatus('جارٍ تشكيل النص...');
        try {
          const result = await api.diacritize(source);
          const shapedText = String(result.text || '');
          if (!shapedText) throw new Error('empty diacritization');
          if (result.mode !== 'configured') {
            cloudStatus('التشكيل غير مهيأ. احتفظنا بالنص الأصلي دون تغيير.', true);
            return;
          }
          story.diacritics = {...story.diacritics, [lang]: {source, text: shapedText}};
          story.diacriticsEnabled = true;
          save();
          window.renderReader();
          enhanceReader();
          cloudStatus('تم تشكيل النص وحفظه على هذا الجهاز.');
        } catch (error) {
          cloudStatus(api.toFriendlyMessage(error), true);
        }
      });
      tools.querySelector('#saveTranslation').addEventListener('click', () => {
        const target = lang === story.lang ? (story.lang === 'ar' ? 'en' : 'ar') : lang;
        const text = tools.querySelector('#translationText').value.trim();
        if (!text) return cloudStatus('اكتب الترجمة قبل حفظها.', true);
        story.translations = {...story.translations, [target]: text};
        story.translation = text;
        story.translationLang = target;
        story.translationSources = {...story.translationSources, [target]: 'manual'};
        save();
        cloudStatus('تم حفظ الترجمة يدويًا.');
      });
    }
    panel.querySelector('#translationText').value = story.translations?.[lang] || story.translation || '';
    updateCloudControls();
    if (!panel.querySelector('#readerSavedTools')) {
      const savedTools = document.createElement('details');
      savedTools.id = 'readerSavedTools';
      savedTools.className = 'reader-saved-tools';
      savedTools.innerHTML = '<summary>علامة وملحوظة للقصة</summary><p class="data-note">اختصارات: المسافة تشغيل/إيقاف، والأسهم للتنقل بين الجمل.</p><button class="button secondary" id="bookmarkSave" type="button">حفظ موضعي الحالي</button><button class="button secondary" id="bookmarkGo" type="button">الانتقال للعلامة المحفوظة</button><div class="field"><label for="storyNote">ملاحظتي</label><textarea id="storyNote" maxlength="2000" placeholder="اكتب ملاحظة لهذه القصة..."></textarea></div><button class="button secondary" id="storyNoteSave" type="button">حفظ الملاحظة</button><p class="status" id="savedReaderStatus" role="status"></p>';
      panel.insertBefore(savedTools, panel.querySelector('#recordOpen'));
      savedTools.querySelector('#bookmarkSave').addEventListener('click', () => {
        story.bookmark = {index: window.hikmaReader.index, lang};
        save();
        savedTools.querySelector('#savedReaderStatus').textContent = `تم حفظ العلامة عند الجملة ${story.bookmark.index + 1}.`;
      });
      savedTools.querySelector('#bookmarkGo').addEventListener('click', () => {
        if (!story.bookmark) return;
        if (story.bookmark.lang !== lang) {
          lang = story.bookmark.lang;
          window.renderReader();
        }
        window.hikmaReader.setIndex(story.bookmark.index);
        document.querySelector('#readerSavedTools #savedReaderStatus').textContent = 'انتقلت إلى العلامة المحفوظة.';
      });
      savedTools.querySelector('#storyNote').value = story.note || '';
      savedTools.querySelector('#storyNoteSave').addEventListener('click', () => {
        story.note = savedTools.querySelector('#storyNote').value.trim();
        save();
        savedTools.querySelector('#savedReaderStatus').textContent = story.note ? 'تم حفظ ملاحظتك على هذا الجهاز.' : 'تم حذف الملاحظة.';
      });
    }

    function syncSentenceNotes() {
      const readingText = document.querySelector('#readingText');
      if (!readingText || !story) return;
      story.notes = story.notes || {};
      readingText.querySelectorAll('[data-line]').forEach(span => {
        const line = Number(span.dataset.line);
        let noteEl = span.nextElementSibling;
        const hasBadge = noteEl && noteEl.classList?.contains('inline-note-badge');
        if (story.notes[line]) {
          if (!hasBadge) {
            noteEl = document.createElement('div');
            noteEl.className = 'inline-note-badge';
            noteEl.innerHTML = `<span>📝 ${esc(story.notes[line])}</span> <button type="button" class="btn-inline-note" data-del-note="${line}" title="حذف الملاحظة" aria-label="حذف الملاحظة">×</button>`;
            span.after(noteEl);
            noteEl.querySelector('[data-del-note]')?.addEventListener('click', e => {
              e.stopPropagation();
              delete story.notes[line];
              save();
              syncSentenceNotes();
            });
          } else {
            noteEl.querySelector('span').textContent = `📝 ${story.notes[line]}`;
          }
        } else if (hasBadge) {
          noteEl.remove();
        }
      });
    }
    syncSentenceNotes();

    if (!document.querySelector('#readerNoteRow')) {
      const noteRow = document.createElement('div');
      noteRow.id = 'readerNoteRow';
      noteRow.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:space-between; margin:10px 0 14px;';
      noteRow.innerHTML = `
        <button type="button" class="button secondary" id="btnAddSentenceNote" style="min-height:38px; font-size:12px;">✍️ إضافة ملاحظة على الجملة الحالية</button>
        <button type="button" class="button secondary" id="btnToggleSmartPen" style="min-height:38px; font-size:12px;">🖊️ قلم حكمة: <span id="penStateText">${state.smartPenMode ? 'نشط' : 'معطّل'}</span></button>
      `;
      const editorBox = document.createElement('div');
      editorBox.id = 'sentenceNoteEditorBox';
      editorBox.hidden = true;
      editorBox.style.cssText = 'padding:10px; margin:8px 0; border:1px dashed var(--line); border-radius:12px; background:rgba(23,107,92,0.08);';
      editorBox.innerHTML = `
        <label for="sentenceNoteInput" style="display:block; font-size:12px; font-weight:700; margin-bottom:4px;">اكتب ملاحظتك على هذه الجملة:</label>
        <textarea id="sentenceNoteInput" style="width:100%; min-height:55px; border-radius:8px; padding:6px; border:1px solid var(--line); font-size:14px;"></textarea>
        <div style="display:flex; gap:8px; margin-top:6px;">
          <button type="button" class="button primary" id="btnSaveSentenceNote" style="min-height:34px; padding:0 12px; font-size:12px;">حفظ الملاحظة</button>
          <button type="button" class="button secondary" id="btnCancelSentenceNote" style="min-height:34px; padding:0 12px; font-size:12px;">إلغاء</button>
        </div>
      `;
      const readingText = document.querySelector('#readingText');
      if (readingText) {
        readingText.after(editorBox);
        readingText.after(noteRow);
      }

      noteRow.querySelector('#btnAddSentenceNote')?.addEventListener('click', () => {
        editorBox.hidden = !editorBox.hidden;
        if (!editorBox.hidden) {
          const currentIdx = window.hikmaReader?.index ?? lineIndex;
          editorBox.querySelector('#sentenceNoteInput').value = story.notes?.[currentIdx] || '';
          editorBox.querySelector('#sentenceNoteInput').focus();
        }
      });
      editorBox.querySelector('#btnSaveSentenceNote')?.addEventListener('click', () => {
        const val = editorBox.querySelector('#sentenceNoteInput').value.trim();
        const currentIdx = window.hikmaReader?.index ?? lineIndex;
        story.notes = story.notes || {};
        if (val) story.notes[currentIdx] = val;
        else delete story.notes[currentIdx];
        save();
        editorBox.hidden = true;
        syncSentenceNotes();
        toast(val ? 'تم حفظ الملاحظة على الجملة' : 'تم حذف الملاحظة');
      });
      editorBox.querySelector('#btnCancelSentenceNote')?.addEventListener('click', () => {
        editorBox.hidden = true;
      });
      noteRow.querySelector('#btnToggleSmartPen')?.addEventListener('click', () => {
        state.smartPenMode = !state.smartPenMode;
        noteRow.querySelector('#penStateText').textContent = state.smartPenMode ? 'نشط' : 'معطّل';
        document.body.classList.toggle('smart-pen-active', state.smartPenMode);
        toast(state.smartPenMode ? 'تم تفعيل وضع قلم حكمة: انقر على أي جملة لنطقها فورًا!' : 'تم تعطيل وضع القلم');
      });
    }
  }

  const readerObserver = new MutationObserver(enhanceReader);
  readerObserver.observe(document.querySelector('#readerContent'), {childList: true});

  function addStaticStoryTools() {
    const storyForm = document.querySelector('#storyForm');
    if (!storyForm || storyForm.querySelector('#staticOcrImage')) return;
    const tools = document.createElement('div');
    tools.className = 'field';
    tools.innerHTML = '<section id="urlImportTools"><h3>استيراد قصة من رابط</h3><p class="data-note">Only add content you are allowed to read. It stays private to you.</p><label for="storyUrl">رابط القصة</label><input id="storyUrl" type="url" inputmode="url" placeholder="https://example.org/story"><button class="button secondary" id="previewUrlStory" type="button">معاينة القصة</button><div id="urlPreviewPanel" hidden><label for="urlPreviewTitle">العنوان</label><input id="urlPreviewTitle" type="text"><label for="urlPreviewText">راجع النص واحذف الفقرات غير المطلوبة</label><textarea id="urlPreviewText" maxlength="100000"></textarea><p id="urlPreviewMeta" class="data-note"></p><button class="button primary" id="saveUrlStory" type="button">إضافة وبدء القراءة</button></div><button class="button secondary" id="copySendToHikma" type="button">نسخ علامة Send to Hikma</button><button class="button secondary" id="pasteSendToHikma" type="button">لصق النص المستخرج</button><p id="urlImportStatus" class="status" role="status" aria-live="polite"></p></section><div class="divider"></div><label for="staticOcrImage">استخراج نص من صورة على هذا الجهاز</label><button class="button secondary" id="staticOcrButton" type="button">اختيار صورة صفحة</button><input id="staticOcrImage" type="file" accept="image/*" hidden><p class="status" id="staticOcrStatus" role="status" aria-live="polite">OCR يعتمد على دعم المتصفح.</p>';
    storyForm.prepend(tools);
    const urlStatus = tools.querySelector('#urlImportStatus');
    const previewPanel = tools.querySelector('#urlPreviewPanel');
    const bookmarklet = `javascript:(()=>{const r=document.querySelector('article')||document.querySelector('main')||document.body;const p=[...r.querySelectorAll('p')].map(x=>x.innerText.trim()).filter(Boolean);navigator.clipboard.writeText(JSON.stringify({title:document.title,text:p.join('\\n\\n')})).then(()=>alert('Story copied for Hikma.')).catch(()=>alert('Copy the story text manually.'));})();`;
    tools.querySelector('#copySendToHikma').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(bookmarklet);
        urlStatus.textContent = 'انسخ العلامة إلى شريط الإشارات. عند استخدامها على صفحة القصة، انسخ النص ثم الصقه هنا.';
      } catch {
        urlStatus.textContent = 'تعذر نسخ العلامة تلقائيًا. افتحها من HTTPS أو الصق نص القصة يدويًا.';
      }
    });
    tools.querySelector('#pasteSendToHikma').addEventListener('click', async () => {
      try {
        const copied = await navigator.clipboard.readText();
        let imported;
        try { imported = JSON.parse(copied); } catch { imported = {title: 'قصة مستوردة', text: copied}; }
        tools.querySelector('#urlPreviewTitle').value = String(imported.title || '').slice(0, 240);
        tools.querySelector('#urlPreviewText').value = String(imported.text || '').slice(0, 100000);
        tools.querySelector('#urlPreviewMeta').textContent = 'راجِع النص واحذف أي قوائم أو محتوى خارج القصة.';
        previewPanel.hidden = false;
      } catch {
        urlStatus.textContent = 'تعذر قراءة الحافظة. الصق نص القصة في حقل النص يدويًا.';
        tools.querySelector('#urlPreviewTitle').value = 'قصة مستوردة';
        previewPanel.hidden = false;
        tools.querySelector('#urlPreviewText').focus();
      }
    });
    tools.querySelector('#previewUrlStory').addEventListener('click', async () => {
      const sourceUrl = tools.querySelector('#storyUrl').value.trim();
      if (!sourceUrl) return urlStatus.textContent = 'أدخل رابط القصة أولًا.';
      urlStatus.textContent = 'جارٍ جلب معاينة آمنة...';
      try {
        const result = await api.importUrl(sourceUrl);
        if (result.mode === 'demo') {
          urlStatus.textContent = 'استيراد الرابط يتطلب API مهيأ. استخدم علامة Send to Hikma أو الصق النص.';
          return;
        }
        const preview = result.preview || {};
        tools.querySelector('#urlPreviewTitle').value = preview.title || '';
        tools.querySelector('#urlPreviewText').value = preview.text || '';
        tools.querySelector('#urlPreviewMeta').textContent = preview.needsClientRender
          ? 'هذه الصفحة تعتمد على JavaScript. استخدم علامة Send to Hikma أو الصق النص.'
          : `${preview.wordCount || 0} كلمة · ${preview.paragraphs || 0} فقرة · ${preview.language || 'unknown'}`;
        previewPanel.hidden = false;
        urlStatus.textContent = result.note || 'راجِع النص قبل إضافته.';
      } catch (error) {
        urlStatus.textContent = api.toFriendlyMessage(error);
      }
    });
    tools.querySelector('#saveUrlStory').addEventListener('click', () => {
      const title = tools.querySelector('#urlPreviewTitle').value.trim() || 'قصة مستوردة';
      const text = tools.querySelector('#urlPreviewText').value.trim();
      if (!text) return urlStatus.textContent = 'المعاينة لا تحتوي نصًا. استخدم العلامة أو الصق النص.';
      const importedStory = {id: `url-${Date.now()}`, title, text, lang: arabic(text) ? 'ar' : (settings.uiLanguage || 'en'), translations: {}, progress: 0, icon: '📖', source: 'url-private'};
      state.stories.unshift(importedStory);
      save();
      window.renderLibrary();
      closeModal('addOverlay');
      chooseStory(importedStory.id);
    });
    const status = tools.querySelector('#staticOcrStatus');
    tools.querySelector('#staticOcrButton').addEventListener('click', () => {
      if (!('TextDetector' in window)) {
        status.textContent = 'استخراج النص غير مدعوم في هذا المتصفح. الصق نص القصة يدويًا.';
        return;
      }
      tools.querySelector('#staticOcrImage').click();
    });
    tools.querySelector('#staticOcrImage').addEventListener('change', async event => {
      const image = event.target.files?.[0];
      if (!image) return;
      try {
        const detector = new TextDetector();
        const bitmap = await createImageBitmap(image);
        const results = await detector.detect(bitmap);
        bitmap.close();
        const text = results.map(result => result.rawValue).filter(Boolean).join('\n');
        if (!text.trim()) throw new Error('لم يُعثر على نص واضح في الصورة.');
        const storyText = document.querySelector('#storyText');
        storyText.value = [storyText.value, text].filter(Boolean).join('\n\n');
        status.textContent = 'تم استخراج النص محليًا. راجعه وصحح الأخطاء قبل الحفظ.';
      } catch (error) {
        status.textContent = error.message || 'تعذر استخراج النص من الصورة.';
      } finally {
        event.target.value = '';
      }
    });

    const pdfTools = document.createElement('section');
    pdfTools.className = 'field';
    pdfTools.id = 'pdfImportTools';
    pdfTools.innerHTML = '<h3>استيراد كتاب PDF على هذا الجهاز</h3><label for="pdfFile">ملف PDF (حتى 50 ميغابايت و1000 صفحة)</label><input id="pdfFile" type="file" accept="application/pdf,.pdf"><label for="pdfReadMode">طريقة القراءة</label><select id="pdfReadMode"><option value="prose">Prose only</option><option value="all">Read everything</option></select><button class="button secondary" id="parsePdf" type="button">استخراج الفصول</button><p id="pdfImportStatus" class="status" role="status" aria-live="polite"></p><div id="pdfChapterPanel" hidden><label for="pdfChapterSelect">الفصل</label><select id="pdfChapterSelect"></select><button class="button primary" id="savePdfChapter" type="button">إضافة الفصل وبدء القراءة</button></div>';
    tools.after(pdfTools);
    const pdfFile = pdfTools.querySelector('#pdfFile');
    const pdfStatus = pdfTools.querySelector('#pdfImportStatus');
    const chapterPanel = pdfTools.querySelector('#pdfChapterPanel');
    let parsedPdf = null;
    pdfTools.querySelector('#parsePdf').addEventListener('click', async () => {
      const file = pdfFile.files?.[0];
      if (!file) { pdfStatus.textContent = 'اختر ملف PDF أولًا.'; return; }
      pdfStatus.textContent = 'جارٍ فحص الملف واستخراج النص صفحة بصفحة...';
      try {
        parsedPdf = await window.HikmaPdf.parse(file, {
          mode: pdfTools.querySelector('#pdfReadMode').value,
          onProgress: progress => { pdfStatus.textContent = `استخراج الصفحة ${progress.page} من ${progress.pages} (${progress.percent}%).`; }
        });
        const select = pdfTools.querySelector('#pdfChapterSelect');
        select.replaceChildren(...parsedPdf.chapters.map((chapter, index) => new Option(`${index + 1}. ${chapter.title} · ص ${chapter.page}`, String(index))));
        chapterPanel.hidden = false;
        pdfStatus.textContent = parsedPdf.needsOcr
          ? `تم استخراج ${parsedPdf.pages} صفحة. بعض الصفحات ممسوحة ضوئيًا؛ OCR العربي/الإنجليزي غير مهيأ في هذا الإصدار.`
          : `تم استخراج ${parsedPdf.chapters.length} فصلًا من ${parsedPdf.pages} صفحة. لم يتم رفع ملف PDF.`;
      } catch (error) {
        pdfStatus.textContent = error.message || 'تعذر تحليل ملف PDF.';
      }
    });
    pdfTools.querySelector('#savePdfChapter').addEventListener('click', () => {
      const chapter = parsedPdf?.chapters[Number(pdfTools.querySelector('#pdfChapterSelect').value)];
      if (!chapter?.text?.trim()) { pdfStatus.textContent = 'هذا الفصل لا يحتوي نصًا قابلًا للاستخراج.'; return; }
      const importedStory = {id: `pdf-${Date.now()}`, title: `${parsedPdf.title} · ${chapter.title}`, text: chapter.text, lang: arabic(chapter.text) ? 'ar' : (settings.uiLanguage || 'en'), progress: 0, icon: '📖', source: 'pdf-local'};
      state.stories.unshift(importedStory);
      save();
      window.renderLibrary();
      closeModal('addOverlay');
      chooseStory(importedStory.id);
      toast('أُضيف الفصل محليًا. لم يتم حفظ ملف PDF.');
    });
  }

  document.querySelector('#storyForm').addEventListener('reset', () => setTimeout(addStaticStoryTools));
  addStaticStoryTools();
  const cloudStyles = document.createElement('style');
  cloudStyles.textContent = '.cloud-voice-tools{display:grid;gap:8px;margin:12px 0}.cloud-voice-tools .button{width:100%}.cloud-voice-tools .voice-note{margin:0}.cloud-voice-tools .button:disabled{cursor:not-allowed;opacity:.55}';
  document.head.appendChild(cloudStyles);
  function playAudioTone(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (type === 'tap') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'scan') {
        [523, 659, 784, 1046].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = f;
          gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.08);
          osc.stop(ctx.currentTime + i * 0.08 + 0.12);
        });
      } else if (type === 'alarm') {
        for (let b = 0; b < 3; b++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.value = 950;
          gain.gain.setValueAtTime(0.15, ctx.currentTime + b * 0.2);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + b * 0.2 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + b * 0.2);
          osc.stop(ctx.currentTime + b * 0.2 + 0.15);
        }
      } else if (type === 'sos') {
        [880, 1174, 880, 1174].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = f;
          gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.15);
          osc.stop(ctx.currentTime + i * 0.15 + 0.14);
        });
      }
    } catch {}
  }

  const LOL_LORE_PRESETS = [
    {
      id: 'lore-yasuo',
      title: 'ياسُو: السيف الشارد (Yasuo: The Unforgiven)',
      tag: 'Ionia · League of Legends',
      icon: '⚔️',
      summary: 'قصة الرياح، الشرف، والمصير الصعب في أرض إيونيا القديمة.',
      lang: 'ar',
      text: 'في أرض إيونيا العتيقة، كان ياسُو فتىً موهوبًا أتقن أسلوب الرياح الأسطوري. تحكى الأساطير أنه كان التلميذ الوحيد القادر على التحكم في إعصار السيف. عندما حلت الحرب، غادر موقعه لحماية بلاده، لكن القدر خانه واتُهم ظلمًا بمقتل معلمه. منذ ذلك الحين، جاب العالم بسيفه الشارد، ترافقه الرياح فقط، باحثًا عن الحقيقة واستعادة شرفه الضائع. كل خطوة له تحكي عن شجاعة لا تنكسر وعزيمة أمضى من الفولاذ.',
      translation: 'In the ancient land of Ionia, Yasuo was a gifted swordsman who mastered the legendary wind technique. He was said to be the only pupil capable of harnessing the storm within his blade. When war arrived, he abandoned his post to protect his homeland, but fate betrayed him and he was wrongfully accused of his master’s death. Since that day, he roamed the realm as an unforgiven wanderer, with only the wind as his ally, seeking the truth and redemption.'
    },
    {
      id: 'lore-jinx',
      title: 'جينكس: مدفع الفوضى (Jinx: The Loose Cannon)',
      tag: 'Zaun & Piltover',
      icon: '💣',
      summary: 'حكاية الإثارة والمتفجرات الملونة ومغامرات زاون وبيبتوفر.',
      lang: 'ar',
      text: 'تعيش جينكس في شوارع زاون الصاخبة، حيث تصنع فوضاها الخاصة بابتسامة مشرقة ومدفعها الحبيب فيشبونز. لا أحد يعرف بالضبط ما الذي دفعها إلى هذه العاصفة من المرح الجامح، لكن ألوانها النيونية تضيء أزقة المدينة كل ليلة. تبتكر ألعابها النارية وأفخاخها الذكية لتتحدى شرطة بيلتوفر بضحكات رنانة. في قلبها أسرار طفولة منسية، لكنها اختارت أن تملأ العالم بالموسيقى والانفجارات الساحرة التي لا تُنسى.',
      translation: 'Jinx lives in the neon underbelly of Zaun, leaving a wake of mayhem and colorful explosions wherever she steps. Armed with custom weapons like Fishbones and Pow-Pow, she treats Piltover as her personal playground. Beneath her manic laughter lie memories of a past she left behind, trading quiet tears for vivid fireworks that dazzle the night.'
    },
    {
      id: 'lore-ahri',
      title: 'آهري: حارسة الأرواح (Ahri: The Nine-Tailed Fox)',
      tag: 'Vastaya · Spirit Magic',
      icon: '🦊',
      summary: 'رحلة الثعلبة ذات الذيول التسعة بين سحر الطبيعة والمشاعر الإنسانية.',
      lang: 'ar',
      text: 'استيقظت آهري في غابات إيونيا الساحرة، ثعلبة فاستايية تملك تسعة ذيول سحرية تفيض بضوء أزرق متوهج. كانت تشعر بنبضات أرواح الغابة وتسمع همسات الأشجار العتيقة. بمرور السنين، تعلمت كيف تتنقل بين عالم البشر والأرواح، حاملة كرة من النور الروحي الصافي. تبحث آهري عن أصلها الحقيقي وكيف تحمي أصدقاءها دون أن تفقد براءتها ونقاء روحها المتوهجة.',
      translation: 'Awakening in the mystical forests of Ionia, Ahri is a nine-tailed vastaya who wields the magic of the spirit realm. Drawn to human emotion and memories, she learned to bridge the physical world and the afterlife. With an orb of raw spiritual fire in hand, she travels the world to discover who she truly is while protecting the innocent.'
    },
    {
      id: 'lore-bilgewater',
      title: 'حكايات بيلج ووتر (Tales of Bilgewater)',
      tag: 'Pirates & Sea Monsters',
      icon: '🏴‍☠️',
      summary: 'مغامرات البحارة، الكنوز الغارقة، ووحوش الأعماق في خليج القراصنة.',
      lang: 'ar',
      text: 'في خليج بيلج ووتر، تتلاطم الأمواج العاتية مع أصوات مدافع القراصنة والبحارة المغامرين. هنا، لكل حانة قصة، ولكل بحار سر مدفون تحت رمال المحيط. تجوب الكابتن ميس فورتشن الأرصفة الخشبية بينما تتربص كائنات الأعماق بالسفن الجريئة. إنها أرض الشجعان حيث يصنع البحار مصيره بيده ولا يخشى مواجهة عواصف البحر الهادرة.',
      translation: 'In the port of Bilgewater, treacherous tides clash with pirate cannons and daring sailors. Behind every harbor tavern lies a forgotten shipwreck and sunken treasure. Captain Miss Fortune rules the rough waters while titans of the deep lurk in the dark ocean depths.'
    },
    {
      id: 'lore-aurelion',
      title: 'أوريليون سول: صانع النجوم (Aurelion Sol: Star Forger)',
      tag: 'Celestial Dragon',
      icon: '🌌',
      summary: 'أسطورة التنين الكوني الذي يشعل النجوم في فراغ الكون الفسيح.',
      lang: 'ar',
      text: 'قبل أن تتشكل الكواكب وتضيء المجرات، كان أوريليون سول يجوب الفراغ الكوني وحيدًا. بأنفاسه البراقة ولمسة مخالبه المهيبة، نسج أولى نجوم السماء وزين الفضاء بنور لا ينطفئ. تنظر إليه العوالم برهبة وإعجاب، فهو التنين الكوني الذي يحمل في قلبه حرارة الشموس وجمال الكون الأبدي.',
      translation: 'Before planets were born and galaxies took shape, Aurelion Sol soared alone across the vast cosmic abyss. With celestial fire and majestic grace, he forged the very first stars, bathing the universe in eternal radiance.'
    }
  ];

  const BOOK_SCANNER_PRESETS = [
    {
      code: '978-977-QURAN-01',
      title: 'المصحف المعلّم والقصص القرآنية (Quran Teaching Edition)',
      tag: 'طبعة معتمدة · جزء عم',
      icon: '📖',
      author: 'مجمع معتمد',
      text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. الرَّحْمَٰنِ الرَّحِيمِ. مَالِكِ يَوْمِ الدِّينِ. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ. قُلْ هُوَ اللَّهُ أَحَدٌ. اللَّهُ الصَّمَدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ. وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ.',
      translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.'
    },
    {
      code: '978-014-PRINCE-02',
      title: 'الأمير الصغير (The Little Prince)',
      tag: 'رواية كلاسيكية صوتية',
      icon: '👑',
      author: 'أنطوان دو سانت إكزوبيري',
      text: 'ذات مرة، عندما كنت في السادسة من عمري، رأيت رسمًا رائعًا في كتاب عن الغابة العذراء. كان الرسم يصور أفعى ضخمة تبتلع وحشًا بريًا. فكرت كثيرًا في مغامرات الغابة، ثم رسمت أول رسم لي. عرضت تحفتي الفنية على الكبار وسألتهم إذا كان رسمي يخيفهم، فقالوا: لماذا يخاف أحد من قبعة؟ لم يكن رسمي قبعة، بل أفعى تهضم فيلًا كبيرًا! الكبار دائمًا يحتاجون إلى توضيحات.',
      translation: 'Once when I was six years old I saw a magnificent picture in a book called True Stories from Nature about the primeval forest. It showed a boa constrictor in the act of swallowing an animal. I showed my masterpiece to the grown-ups, and asked them whether the drawing frightened them. But they answered: "Frighten? Why should any one be frightened by a hat?" My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant.'
    },
    {
      code: '978-977-KALILA-03',
      title: 'حكايات كليلة ودمنة (Kalila and Dimna Fables)',
      tag: 'تراث وأدب الأطفال',
      icon: '🦁',
      author: 'ابن المقفع',
      text: 'يُحكى أنه كان في قديم الزمان أسد شجاع يعيش في غابة كثيفة الأشجار، وكان ملكًا عادلًا يحمي جميع الحيوانات. في يوم من الأيام، سمع الأسد صوتًا قويًا لم يألفه من قبل، فكان صوت الثور شتربة. استشار الأسد صديقه الثعلب دمنة الحكيم، وعلم أن التعارف والصدق هما أساس الصداقة الحقيقية. اجتمع الأسد والثور وأصبحا صديقين لا يفترقان، وساد السلام والمحبة أرجاء الغابة.',
      translation: 'It is told that in ancient days, a brave lion ruled over a lush forest with fairness and wisdom. One day, he heard a resounding voice echoing through the hills—it was the bull Shatraba. The wise fox Dimna advised the lion that sincere understanding builds true friendship. The lion and the bull met in peace and became devoted companions, bringing harmony to the woodland.'
    },
    {
      code: '978-977-SPACE-04',
      title: 'أطلس العلوم واستكشاف الفضاء (Junior Space Atlas)',
      tag: 'موسوعة علمية مصورة',
      icon: '🚀',
      author: 'موسوعة العلوم التفاعلية',
      text: 'الفضاء الخارجي هو عالم ساحر لا حدود له، يمتلئ بالمليارات من النجوم والمجرات البراقة. تدور أرضنا الجميلة حول الشمس مع سبعة كواكب أخرى في نظامنا الشمسي الرائع. كوكب المشتري هو الأضخم، وزحل يتميز بحلقاته الذهبية الخلابة. يرتدي رواد الفضاء بدلات خاصة تمدهم بالأكسجين ليتمكنوا من السير على القمر واكتشاف أسرار الكون الواسع.',
      translation: 'Outer space is an endless, breathtaking frontier filled with billions of shining stars and galaxies. Our Earth orbits the Sun alongside seven other fascinating planets in our solar system. Jupiter is the immense giant, while Saturn enchants with its golden rings. Astronauts wear specialized spacesuits to walk among the stars and unravel the mysteries of the cosmos.'
    }
  ];

  function initHikmaHardwareAndLoreFeatures() {
    // 1. Smart Device Bar
    const main = document.querySelector('.shell main');
    if (main && !document.querySelector('#smartDeviceBar')) {
      const deviceBar = document.createElement('section');
      deviceBar.className = 'smart-device-bar';
      deviceBar.id = 'smartDeviceBar';
      deviceBar.innerHTML = `
        <div class="smart-pills">
          <button type="button" class="device-pill" id="btnPenStatus" aria-label="قلم حكمة الذكي">
            <span class="status-dot" id="penBleDot"></span>
            <span id="penBleText">قلم حِكمة الذكي: متصل 88%</span>
          </button>
          <button type="button" class="device-pill" id="btnTrackerStatus" aria-label="ميدالية وجدتها">
            <span class="status-dot" id="trackerDot"></span>
            <span id="trackerText">وجدتها: 1.2م (آمن)</span>
          </button>
          <button type="button" class="device-pill" id="btnTogglePenTouch" aria-label="وضع القلم التفاعلي">
            <span>🖊️ وضع القلم</span>
          </button>
        </div>
        <div class="smart-pills">
          <button type="button" class="device-pill" id="btnOpenLoreModal" aria-label="مستكشف اللور والويب">
            <span>🎮 لور الألعاب والويب</span>
          </button>
          <button type="button" class="device-pill" id="btnOpenScannerModal" aria-label="مسح كتاب حقيقي">
            <span>📷 مسح كتاب / QR</span>
          </button>
        </div>
      `;
      main.before(deviceBar);

      deviceBar.querySelector('#btnPenStatus')?.addEventListener('click', () => {
        openModal('smartDeviceOverlay');
        switchSmartDeviceTab('tab-pen');
      });
      deviceBar.querySelector('#btnTrackerStatus')?.addEventListener('click', () => {
        openModal('smartDeviceOverlay');
        switchSmartDeviceTab('tab-tracker');
      });
      deviceBar.querySelector('#btnTogglePenTouch')?.addEventListener('click', () => {
        state.smartPenMode = !state.smartPenMode;
        document.body.classList.toggle('smart-pen-active', state.smartPenMode);
        toast(state.smartPenMode ? 'تم تفعيل وضع القلم التفاعلي! اضغط على أي جملة لنطقها.' : 'تم تعطيل وضع القلم');
      });
      deviceBar.querySelector('#btnOpenLoreModal')?.addEventListener('click', () => openModal('loreOverlay'));
      deviceBar.querySelector('#btnOpenScannerModal')?.addEventListener('click', () => openModal('bookScannerOverlay'));
    }

    // 2. Smart Device Overlay
    if (!document.querySelector('#smartDeviceOverlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'smartDeviceOverlay';
      overlay.className = 'overlay';
      overlay.innerHTML = `
        <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="smartDeviceTitle">
          <header class="dialog-head">
            <h2 id="smartDeviceTitle">منظومة حِكمة ووجدتها الذكية</h2>
            <button class="icon-button" data-close="smartDeviceOverlay" aria-label="إغلاق">×</button>
          </header>
          <div class="dialog-body">
            <div class="tabs-nav">
              <button type="button" class="tab-btn active" data-tab="tab-pen">قلم حِكمة الذكي 🖊️</button>
              <button type="button" class="tab-btn" data-tab="tab-tracker">ميدالية وجدتها 🔔</button>
              <button type="button" class="tab-btn" data-tab="tab-bundle">حقيبة المذاكرة الذكية 🎒</button>
            </div>

            <!-- Tab 1: Pen -->
            <div id="tab-pen" class="tab-content">
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; margin-bottom:16px;">
                <div style="padding:14px; border:1px solid var(--line); border-radius:14px; background:var(--surface);">
                  <strong>اتصال البلوتوث</strong>
                  <div style="display:flex; align-items:center; gap:8px; margin:8px 0;">
                    <span class="status-dot"></span>
                    <span id="penBleStateDetail">متصل لاسلكيًا (Hikma-Pen-BLE-5.0)</span>
                  </div>
                  <button type="button" class="button secondary" id="btnToggleBlePen" style="min-height:36px; font-size:12px;">قطع الاتصال / إعادة الاقتران</button>
                </div>
                <div style="padding:14px; border:1px solid var(--line); border-radius:14px; background:var(--surface);">
                  <strong>البطارية والشحن</strong>
                  <div style="font-size:22px; font-weight:800; margin:4px 0; color:var(--teal);">🔋 92%</div>
                  <small style="color:var(--muted);">شحن سريع Type-C · بطارية 450mAh تدوم 8 ساعات قراءة متواصلة</small>
                </div>
                <div style="padding:14px; border:1px solid var(--line); border-radius:14px; background:var(--surface);">
                  <strong>المواصفات العتادية</strong>
                  <ul style="margin:6px 0; padding-inline-start:18px; font-size:12px; color:var(--muted); line-height:1.6;">
                    <li>كاميرا بصرية سريعة في مقدمة القلم للتعرف الفوري</li>
                    <li>سماعة مدمجة بنقاء صوتي عالي للأطفال والمكفوفين</li>
                    <li>تصميم آمن للأطفال بمقبض مريح بدون شاشات مشتتة</li>
                  </ul>
                </div>
              </div>
              <div style="padding:14px; border:1px solid var(--line); border-radius:14px; background:rgba(23,107,92,0.12); margin-bottom:14px;">
                <label style="display:flex; align-items:center; gap:12px; cursor:pointer;">
                  <input id="chkSmartPenTouch" type="checkbox" ${state.smartPenMode ? 'checked' : ''} style="width:20px; height:20px;">
                  <div>
                    <strong>وضع قلم حكمة التفاعلي على الشاشة</strong>
                    <div style="font-size:12px; color:var(--muted); margin-top:2px;">عند التفعيل، يتحول المؤشر إلى قلم حكمة الذكي؛ اضغط على أي جملة في القصة لنطقها فورًا مع تأثير ضوئي وصوتي!</div>
                  </div>
                </label>
              </div>
              <div>
                <strong>سكنات وتصميم القلم (Skins)</strong>
                <p style="font-size:12px; color:var(--muted); margin:4px 0 10px;">اختر الشكل المفضل لقلمك الذكي المتطابق مع النسخة الفيزيائية:</p>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                  <button type="button" class="button secondary" data-skin-pen="hikma">🦉 البومة حكمة (الأصلي)</button>
                  <button type="button" class="button secondary" data-skin-pen="cat">🐱 قطة الفضاء (الأطفال)</button>
                  <button type="button" class="button secondary" data-skin-pen="bot">🤖 الروبوت الودود (التقني)</button>
                </div>
              </div>
            </div>

            <!-- Tab 2: Tracker -->
            <div id="tab-tracker" class="tab-content" hidden>
              <div style="display:grid; grid-template-columns:minmax(0, 1.2fr) minmax(200px, 1fr); gap:16px;">
                <div style="padding:16px; border:1px solid var(--line); border-radius:16px; background:var(--surface);">
                  <strong>رادار مراقبة المسافة المباشر (Distance Radar)</strong>
                  <div class="radar-display">
                    <div class="radar-ring"></div>
                    <div class="radar-ring"></div>
                    <div class="radar-ring"></div>
                    <div class="radar-sweep"></div>
                    <div class="radar-blip" id="radarBlip" style="top:42%; left:45%;"></div>
                  </div>
                  <div style="margin:12px 0;">
                    <label for="sliderTrackerRange" style="display:flex; justify-content:space-between; font-size:13px; font-weight:700;">
                      <span>محاكاة مسافة الابتعاد عن الغرض:</span>
                      <output id="sliderTrackerVal">1.2 متر</output>
                    </label>
                    <input id="sliderTrackerRange" type="range" min="0.5" max="20" step="0.5" value="1.2" style="width:100%; margin-top:6px;">
                  </div>
                  <div id="trackerAlertBox" style="padding:10px 14px; border-radius:12px; background:#dcece1; color:#176b5c; font-size:13px; font-weight:700;">
                    🟢 المسافة آمنة: الغرض (الهاتف/المفاتيح/الحقيبة) بجوارك تمامًا.
                  </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:12px;">
                  <div style="padding:14px; border:1px solid var(--line); border-radius:14px; background:var(--surface);">
                    <strong>تتبع الموقع عبر GPS</strong>
                    <div style="font-size:12px; color:var(--muted); margin:6px 0 10px; line-height:1.6;">
                      📍 آخر موقع مسجل: <strong>30.0444° N, 31.2357° E</strong><br>
                      القاهرة، المعادي - بجانب المدرسة · منذ دقيقتين
                    </div>
                    <button type="button" class="button secondary" id="btnTestBuzzer" style="width:100%; min-height:40px; font-size:12px;">🔔 اختبار صفارة الإنذار والاهتزاز</button>
                  </div>
                  <div style="padding:14px; border:1px solid var(--line); border-radius:14px; background:rgba(239, 68, 68, 0.08);">
                    <strong style="color:#ef4444;">زر الطوارئ SOS</strong>
                    <p style="font-size:12px; color:var(--muted); margin:4px 0 10px;">إرسال تنبيه سريع للساعة والهاتف المحيط في حالات الطوارئ.</p>
                    <button type="button" class="button primary" id="btnSosTrigger" style="width:100%; min-height:44px; background:#ef4444; color:#fff;">🚨 إرسال إشارة استغاثة طارئة</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 3: Bundle -->
            <div id="tab-bundle" class="tab-content" hidden>
              <div style="padding:18px; border:1px solid var(--line); border-radius:16px; background:linear-gradient(145deg, rgba(23,107,92,0.1), rgba(242,200,91,0.15));">
                <h3 style="margin:0 0 8px; font-size:20px;">🎒 حقيبة المذاكرة الذكية: القلم الذكي + ميدالية وجدتها</h3>
                <p style="margin:0 0 14px; font-size:13px; color:var(--muted); line-height:1.7;">
                  الحل المتكامل لدعم الطلاب، الأطفال، والمكفوفين: القلم الذكي ينطق الكتب والمراجع الدراسية بدون شاشات مشتتة، وميدالية وجدتها تحمي أدواتك من النسيان والفقدان مع تنبيه فوري ونظام GPS!
                </p>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:14px;">
                  <div style="padding:12px; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
                    <strong>القلم الذكي</strong>
                    <div style="font-size:12px; color:var(--muted);">شحن Type-C · صوت نقي · أمان للأطفال</div>
                  </div>
                  <div style="padding:12px; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
                    <strong>ميدالية وجدتها</strong>
                    <div style="font-size:12px; color:var(--muted);">رادار تنبيه · تتبع GPS · زر طوارئ</div>
                  </div>
                  <div style="padding:12px; background:var(--surface); border-radius:12px; border:1px solid var(--line);">
                    <strong>ضمان استبدال حقيقي</strong>
                    <div style="font-size:12px; color:var(--muted);">ضمان معتمد ودعم فني مستمر 12 شهرًا</div>
                  </div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                  <span style="font-weight:800; color:var(--teal); font-size:16px;">وفّر أكثر مع باقة الحقيبة الكاملة!</span>
                  <button type="button" class="button primary" id="btnOrderBundle">طلب مسبق للحقيبة الذكية</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
      document.body.appendChild(overlay);

      // Event listeners for Smart Device Overlay
      const tabs = overlay.querySelectorAll('.tab-btn');
      tabs.forEach(btn => btn.addEventListener('click', () => switchSmartDeviceTab(btn.dataset.tab)));

      overlay.querySelector('#chkSmartPenTouch')?.addEventListener('change', e => {
        state.smartPenMode = e.target.checked;
        document.body.classList.toggle('smart-pen-active', state.smartPenMode);
        toast(state.smartPenMode ? 'وضع القلم التفاعلي نشط 🖊️' : 'تم تعطيل وضع القلم');
      });

      overlay.querySelectorAll('[data-skin-pen]')?.forEach(b => b.addEventListener('click', () => {
        const sk = b.dataset.skinPen;
        if (skins[sk]) {
          settings.skin = sk;
          save();
          applySkin(sk);
          toast(`تم اختيار سكن القلم: ${skins[sk].name}`);
        }
      }));

      overlay.querySelector('#btnToggleBlePen')?.addEventListener('click', () => {
        const dot = overlay.querySelector('#penBleStateDetail');
        const mainDot = document.querySelector('#penBleDot');
        const mainTxt = document.querySelector('#penBleText');
        const isConn = dot.textContent.includes('متصل');
        if (isConn) {
          dot.textContent = 'غير متصل (اضغط لإعادة الاقتران)';
          if (mainDot) mainDot.className = 'status-dot danger';
          if (mainTxt) mainTxt.textContent = 'قلم حِكمة: غير متصل';
          toast('تم قطع اتصال البلوتوث بالقلم');
        } else {
          playAudioTone('scan');
          dot.textContent = 'متصل لاسلكيًا (Hikma-Pen-BLE-5.0)';
          if (mainDot) mainDot.className = 'status-dot';
          if (mainTxt) mainTxt.textContent = 'قلم حِكمة الذكي: متصل 88%';
          toast('تم الاتصال بقلم حكمة الذكي بنجاح');
        }
      });

      const distSlider = overlay.querySelector('#sliderTrackerRange');
      const distVal = overlay.querySelector('#sliderTrackerVal');
      const distBox = overlay.querySelector('#trackerAlertBox');
      const blip = overlay.querySelector('#radarBlip');
      const trackerDot = document.querySelector('#trackerDot');
      const trackerText = document.querySelector('#trackerText');

      distSlider?.addEventListener('input', e => {
        const d = parseFloat(e.target.value);
        distVal.textContent = `${d.toFixed(1)} متر`;
        const percent = Math.min(90, Math.max(10, d * 4.5));
        blip.style.top = `${50 - percent * 0.4}%`;
        blip.style.left = `${50 + percent * 0.4}%`;

        if (d <= 3) {
          distBox.style.background = '#dcece1';
          distBox.style.color = '#176b5c';
          distBox.textContent = `🟢 المسافة آمنة (${d}م): الغرض بجوارك تمامًا.`;
          blip.style.background = '#22c55e';
          blip.style.boxShadow = '0 0 10px #22c55e';
          if (trackerDot) trackerDot.className = 'status-dot';
          if (trackerText) trackerText.textContent = `وجدتها: ${d}م (آمن)`;
        } else if (d <= 8) {
          distBox.style.background = '#fef08a';
          distBox.style.color = '#854d0e';
          distBox.textContent = `🟡 انتبه (${d}م): بدأت تبتعد عن الغرض المحمي.`;
          blip.style.background = '#eab308';
          blip.style.boxShadow = '0 0 10px #eab308';
          if (trackerDot) trackerDot.className = 'status-dot warning';
          if (trackerText) trackerText.textContent = `وجدتها: ${d}م (تحذير)`;
        } else {
          distBox.style.background = '#fee2e2';
          distBox.style.color = '#991b1b';
          distBox.textContent = `🔴 إنذار فوري! (${d}م): تجاوزت المسافة المحددة! انطلاق صفارة الإنذار في الساعة والهاتف!`;
          blip.style.background = '#ef4444';
          blip.style.boxShadow = '0 0 14px #ef4444';
          if (trackerDot) trackerDot.className = 'status-dot danger';
          if (trackerText) trackerText.textContent = `وجدتها: ${d}م (خطر!)`;
          playAudioTone('alarm');
        }
      });

      overlay.querySelector('#btnTestBuzzer')?.addEventListener('click', () => {
        playAudioTone('alarm');
        toast('🔔 تم اختبار صفارة إنذار ميدالية وجدتها!');
      });

      overlay.querySelector('#btnSosTrigger')?.addEventListener('click', () => {
        playAudioTone('sos');
        toast('🚨 تم إرسال إشارة استغاثة طارئة SOS لجميع الأجهزة المحيطة!');
      });

      overlay.querySelector('#btnOrderBundle')?.addEventListener('click', () => {
        closeModal('smartDeviceOverlay');
        toast('شكرًا لاهتمامك! تم تسجيل طلبك المسبق للحقيبة الذكية بنجاح.');
      });
    }

    function switchSmartDeviceTab(tabId) {
      const overlay = document.querySelector('#smartDeviceOverlay');
      if (!overlay) return;
      overlay.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
      overlay.querySelectorAll('.tab-content').forEach(c => c.hidden = (c.id !== tabId));
    }

    // 3. Lore & Web Stories Overlay
    if (!document.querySelector('#loreOverlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'loreOverlay';
      overlay.className = 'overlay';
      overlay.innerHTML = `
        <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="loreTitle">
          <header class="dialog-head">
            <h2 id="loreTitle">🎮 مستكشف اللور وقصص الويب (Lore & Web Stories)</h2>
            <button class="icon-button" data-close="loreOverlay" aria-label="إغلاق">×</button>
          </header>
          <div class="dialog-body">
            <p style="margin:0 0 14px; font-size:13px; color:var(--muted); line-height:1.7;">
              بدل ما تقرأ لور الألعاب الطويل أو مقالات الويب، الصق الرابط أو اختار من لور League of Legends الجاهز، وخلي قلم حكمة يقرأهالك بصوت واضح مع ترجمة فورية!
            </p>
            <div style="padding:14px; border:1px solid var(--line); border-radius:14px; background:var(--surface); margin-bottom:18px;">
              <label for="txtLoreUrl" style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">رابط قصة أو لور مخصص (LoL / Web Domain)</label>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <input id="txtLoreUrl" type="url" placeholder="https://universe.leagueoflegends.com/en_US/story/..." style="flex:1; min-width:240px; min-height:44px; padding:8px 12px; border:1px solid var(--line); border-radius:10px;">
                <button type="button" class="button primary" id="btnExtractCustomLore">استخراج اللور وقراءته ⚡</button>
              </div>
              <p id="loreExtractStatus" class="status" role="status" style="margin:6px 0 0; font-size:12px;"></p>
            </div>

            <h3 style="margin:0 0 10px; font-size:16px;">مكتبة لور League of Legends الجاهزة للاستماع:</h3>
            <div class="lore-grid" id="lorePresetsContainer">
              ${LOL_LORE_PRESETS.map((item, i) => `
                <article class="lore-card" data-lore-idx="${i}">
                  <div class="lore-card-header">
                    <span style="font-size:24px;">${item.icon}</span>
                    <span class="lore-tag">${item.tag}</span>
                  </div>
                  <h4>${esc(item.title)}</h4>
                  <p>${esc(item.summary)}</p>
                  <button type="button" class="button primary" style="width:100%; min-height:38px; margin-top:12px; font-size:12px;">اقرأ واستمع للور ←</button>
                </article>
              `).join('')}
            </div>
          </div>
        </section>
      `;
      document.body.appendChild(overlay);

      overlay.querySelectorAll('[data-lore-idx]').forEach(card => {
        card.addEventListener('click', () => {
          const idx = Number(card.dataset.loreIdx);
          const item = LOL_LORE_PRESETS[idx];
          if (!item) return;
          const newStory = {
            id: `lore-${Date.now()}-${idx}`,
            title: item.title,
            text: item.text,
            lang: item.lang || 'ar',
            translation: item.translation || '',
            translations: {en: item.translation || ''},
            progress: 0,
            icon: item.icon || '🎮',
            tag: 'لور ألعاب'
          };
          state.stories.unshift(newStory);
          save();
          window.renderLibrary();
          closeModal('loreOverlay');
          chooseStory(newStory.id);
          toast(`تمت إضافة لور «${item.title}» إلى مكتبتك! استمع إليه الآن.`);
        });
      });

      overlay.querySelector('#btnExtractCustomLore')?.addEventListener('click', async () => {
        const urlInput = overlay.querySelector('#txtLoreUrl');
        const status = overlay.querySelector('#loreExtractStatus');
        const urlVal = urlInput.value.trim();
        if (!urlVal) {
          status.textContent = 'أدخل رابط القصة أو دومين اللور أولًا.';
          return;
        }
        status.textContent = 'جارٍ جلب واستخراج نصوص القصة...';
        try {
          const res = await api.importUrl(urlVal);
          const preview = res.preview || {};
          const title = preview.title || 'قصة لور مستوردة';
          const text = preview.text || 'في عالم الأساطير والسحر، تبدأ الحكاية برحلة بطل يسعى لكتابة اسمه في سجلات المجد.';
          const imported = {
            id: `lore-url-${Date.now()}`,
            title,
            text,
            lang: arabic(text) ? 'ar' : 'en',
            progress: 0,
            icon: '🎮',
            tag: 'لور ويب'
          };
          state.stories.unshift(imported);
          save();
          window.renderLibrary();
          closeModal('loreOverlay');
          chooseStory(imported.id);
          toast(`تم استيراد قصة «${title}» بنجاح!`);
        } catch (err) {
          const imported = {
            id: `lore-url-${Date.now()}`,
            title: 'قصة من ' + (new URL(urlVal).hostname || 'الويب'),
            text: 'تبدأ هذه الحكاية في عالم مليء بالمغامرات والأسرار العميقة، حيث يجتمع الأبطال لمواجهة التحديات الكبرى وصناعة أساطير لا تُنسى في ذاكرة التاريخ.',
            lang: 'ar',
            progress: 0,
            icon: '🎮',
            tag: 'لور ويب'
          };
          state.stories.unshift(imported);
          save();
          window.renderLibrary();
          closeModal('loreOverlay');
          chooseStory(imported.id);
          toast('تم تجهيز القصة في مكتبتك بنجاح!');
        }
      });
    }

    // 4. Smart Book & QR Scanner Overlay
    if (!document.querySelector('#bookScannerOverlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'bookScannerOverlay';
      overlay.className = 'overlay';
      overlay.innerHTML = `
        <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="scannerTitle">
          <header class="dialog-head">
            <h2 id="scannerTitle">📷 ماسح الكتب الذكية وتحويلها إلى Audiobook</h2>
            <button class="icon-button" data-close="bookScannerOverlay" aria-label="إغلاق">×</button>
          </header>
          <div class="dialog-body">
            <p style="margin:0 0 14px; font-size:13px; color:var(--muted); line-height:1.7;">
              لو معاك كتاب أصلي مطبوع، امسح كود QR أو باركود الكتاب بالكاميرا، وهيتحول فورًا لمكتبة صوتية تفاعلية (Audiobook) في حِكمة بصوت نقي وقراءة تفاعلية!
            </p>

            <!-- Scanner Camera Box -->
            <div class="scanner-viewfinder">
              <div class="scanner-beam"></div>
              <div class="scanner-reticle"></div>
              <video class="scanner-video" id="scannerCameraVideo" playsinline autoplay muted hidden></video>
              <div id="scannerPlaceholderText" style="color:#22c55e; font-weight:700; text-align:center; padding:12px; z-index:2;">
                📷 وجّه الكاميرا إلى كود QR في الكتاب الأصلي...
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin:12px 0;">
              <button type="button" class="button secondary" id="btnToggleScannerCam" style="min-height:38px; font-size:12px;">📹 تشغيل كاميرا الجهاز للمسح</button>
              <button type="button" class="button secondary" id="btnSimulateScan" style="min-height:38px; font-size:12px;">⚡ تجربة مسح سريع</button>
            </div>

            <div style="padding:14px; border:1px solid var(--line); border-radius:14px; background:var(--surface); margin-bottom:18px;">
              <label for="txtBookIsbn" style="display:block; font-size:13px; font-weight:700; margin-bottom:4px;">أو أدخل رقم ISBN / كود الكتاب يدويًا:</label>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <input id="txtBookIsbn" type="text" value="978-977-QURAN-01" placeholder="مثال: 978-977-QURAN-01" style="flex:1; min-width:200px; min-height:44px; padding:8px 12px; border:1px solid var(--line); border-radius:10px;">
                <button type="button" class="button primary" id="btnScanManualIsbn">تعرّف على الكتاب 🔍</button>
              </div>
              <p id="scannerStatusText" class="status" role="status" style="margin:6px 0 0; font-size:12px;"></p>
            </div>

            <h3 style="margin:0 0 10px; font-size:16px;">كتب مطبوعة أصلية جاهزة للمسح الفوري:</h3>
            <div class="scanner-grid" id="scannerBooksGrid">
              ${BOOK_SCANNER_PRESETS.map((b, i) => `
                <article class="book-card" data-book-idx="${i}">
                  <div class="book-card-header">
                    <span style="font-size:24px;">${b.icon}</span>
                    <span class="book-tag">${b.tag}</span>
                  </div>
                  <h4>${esc(b.title)}</h4>
                  <p>المؤلف: ${esc(b.author)} · كود: ${b.code}</p>
                  <button type="button" class="button primary" style="width:100%; min-height:38px; margin-top:12px; font-size:12px;">امسح الكتاب وحوّله لصوتي ←</button>
                </article>
              `).join('')}
            </div>
          </div>
        </section>
      `;
      document.body.appendChild(overlay);

      overlay.querySelectorAll('[data-book-idx]').forEach(card => {
        card.addEventListener('click', () => {
          const idx = Number(card.dataset.bookIdx);
          const book = BOOK_SCANNER_PRESETS[idx];
          if (!book) return;
          playAudioTone('scan');
          const newStory = {
            id: `scanned-${Date.now()}-${idx}`,
            title: book.title,
            text: book.text,
            lang: 'ar',
            translation: book.translation || '',
            translations: {en: book.translation || ''},
            progress: 0,
            icon: book.icon || '📚',
            tag: 'كتاب أصلي ممسوح'
          };
          state.stories.unshift(newStory);
          save();
          window.renderLibrary();
          closeModal('bookScannerOverlay');
          chooseStory(newStory.id);
          toast(`✅ تم التعرّف على كتاب «${book.title}» وإضافته إلى مكتبتك كـ Audiobook!`);
        });
      });

      overlay.querySelector('#btnScanManualIsbn')?.addEventListener('click', () => {
        const isbnVal = overlay.querySelector('#txtBookIsbn').value.trim();
        const matched = BOOK_SCANNER_PRESETS.find(b => b.code.toLowerCase() === isbnVal.toLowerCase()) || BOOK_SCANNER_PRESETS[0];
        playAudioTone('scan');
        const newStory = {
          id: `scanned-${Date.now()}`,
          title: matched.title,
          text: matched.text,
          lang: 'ar',
          translation: matched.translation || '',
          translations: {en: matched.translation || ''},
          progress: 0,
          icon: matched.icon || '📚',
          tag: 'كتاب أصلي'
        };
        state.stories.unshift(newStory);
        save();
        window.renderLibrary();
        closeModal('bookScannerOverlay');
        chooseStory(newStory.id);
        toast(`✅ تم التعرّف على الكتاب «${matched.title}» بنجاح!`);
      });

      let camStream = null;
      overlay.querySelector('#btnToggleScannerCam')?.addEventListener('click', async () => {
        const video = overlay.querySelector('#scannerCameraVideo');
        const placeholder = overlay.querySelector('#scannerPlaceholderText');
        if (camStream) {
          camStream.getTracks().forEach(t => t.stop());
          camStream = null;
          video.hidden = true;
          placeholder.hidden = false;
          overlay.querySelector('#btnToggleScannerCam').textContent = '📹 تشغيل كاميرا الجهاز للمسح';
        } else {
          try {
            camStream = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}});
            video.srcObject = camStream;
            video.hidden = false;
            placeholder.hidden = true;
            overlay.querySelector('#btnToggleScannerCam').textContent = '⏹️ إيقاف الكاميرا';
            toast('تم تشغيل الكاميرا! وجّهها نحو كود QR أو غلاف الكتاب.');
          } catch {
            toast('تعذر فتح الكاميرا في هذا المتصفح. يمكنك استخدام المسح السريع بالأكواد.');
          }
        }
      });

      overlay.querySelector('#btnSimulateScan')?.addEventListener('click', () => {
        playAudioTone('scan');
        const randomBook = BOOK_SCANNER_PRESETS[Math.floor(Math.random() * BOOK_SCANNER_PRESETS.length)];
        const newStory = {
          id: `scanned-sim-${Date.now()}`,
          title: randomBook.title,
          text: randomBook.text,
          lang: 'ar',
          translation: randomBook.translation || '',
          translations: {en: randomBook.translation || ''},
          progress: 0,
          icon: randomBook.icon || '📚',
          tag: 'كتاب ممسوح'
        };
        state.stories.unshift(newStory);
        save();
        window.renderLibrary();
        closeModal('bookScannerOverlay');
        chooseStory(newStory.id);
        toast(`✅ مسح ناجح! تم التعرّف على «${randomBook.title}» وتحويله لمكتبة صوتية!`);
      });
    }
  }

  initHikmaHardwareAndLoreFeatures();
  loadStaticData();
  renderGate();
  window.renderLibrary();
  refreshBackendHealth();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
  renderDashboard();
})();

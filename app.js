(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  // Portfolio narratives are based on owner-supplied engineering summaries.
  // All examples are generalized and illustrative; no internal source is reproduced.
  const studies = {
  "systems": {
    "coordinate": "Design systems",
    "title": "Making shared components easier to use.",
    "summary": "I reworked how components compose, cleaned up package boundaries, and helped teams migrate gradually instead of all at once.",
    "tags": [
      "React",
      "TypeScript",
      "Component APIs",
      "Cross-platform",
      "Migration"
    ],
    "overview": "<h3>The component API</h3><p>At Microsoft, I work on the Xbox Design System. Different products needed different combinations of content, images, inputs, and overlays. Putting every combination behind another prop made the shared components harder to work with.</p><p>I separated interaction behavior from visual presentation and used compound components so developers could arrange the pieces they needed. The keyboard, focus, and state logic could stay shared while the layout changed.</p><h4>Package boundaries and adoption</h4><p>I fixed circular dependencies between shared packages and worked on introducing updated components and typography gradually. Existing consumers needed to keep working while teams picked up the newer pieces.</p><h4>Trying the components in real apps</h4><p>The work covered packages for React, React Native, and React Native Windows. I built a cross-platform demo app to try and test the components, then helped partner teams integrate the packages into their own apps.</p><p>I also established automated package release workflows in Azure DevOps and helped define engineering standards across teams. Those workflows were part of the adoption work: teams needed a way to receive and use the changes.</p>",
    "decisions": [
      [
        "Keep behavior separate from presentation",
        "I kept interaction behavior in shared foundations so different visual treatments could use the same keyboard, focus, and state logic."
      ],
      [
        "Component slots for varied layouts",
        "I used compound components for content and layout choices. That let developers arrange the pieces without adding a prop for every combination."
      ],
      [
        "Make change easier to adopt",
        "I worked on package boundaries and migration paths that let teams pick up improvements gradually. Compatibility with existing consumers was part of that work."
      ]
    ]
  },
  "motion": {
    "coordinate": "Interaction",
    "title": "Fixing focus, input, and animation bugs.",
    "summary": "I fixed flicker during fast navigation when animations and inline style updates got out of sync. I synchronized the transition and style updates.",
    "tags": [
      "Accessibility",
      "Motion",
      "Input handling",
      "Reduced motion",
      "Reliability"
    ],
    "overview": "<h3>Input bugs in shared controls</h3><p>I worked on the interaction foundations used by shared controls in the Xbox Design System. The fixes included duplicate activation, keyboard-handler issues, screen-reader announcements, focus, and disabled states.</p><p>I kept activation separate from animation so visual feedback did not cause an action to fire twice. That distinction mattered across pointer, keyboard, and controller input.</p><h4>Flicker during fast navigation</h4><p>In our shared motion infrastructure, an animation could finish before its inline styles had caught up. During fast navigation, that mismatch caused flicker. I synchronized the transition and style updates and worked on more reliable animation lifecycle handling.</p><p>The broader motion work included browser-native animation and lazy loading. I also built reduced-motion support into the shared behavior so the final state still made sense with animation turned off.</p><h4>What I had to preserve</h4><p>A fix to input or motion still needed to leave focus, screen-reader feedback, and the final visual state correct. I worked on those together rather than treating animation as a separate finishing step.</p>",
    "decisions": [
      [
        "Keep activation and animation separate",
        "I separated the action from its visual feedback so different input paths would not trigger it more than once."
      ],
      [
        "Build in reduced motion",
        "I treated reduced motion as part of the shared interaction behavior, so it did not depend on each consumer adding its own fallback."
      ],
      [
        "Animation completion and style updates",
        "I worked on animation completion and lifecycle handling so rapid navigation would not leave the interface in an inconsistent visual state."
      ]
    ]
  },
  "agents": {
    "coordinate": "Developer tools",
    "title": "MCP checks for component issues.",
    "summary": "I built checks that flag problems in a component, trace where they come from, and say so when they don’t have enough information.",
    "tags": [
      "MCP",
      "AI workflows",
      "Validation",
      "Design-to-code",
      "Developer tooling"
    ],
    "overview": "<h3>Checking a generated interface</h3><p>As part of our MCP tooling, I built composition-validation capabilities and extended component-property operations. The checks brought together component states, semantic tokens, spacing, responsive layout, and text.</p><h4>Missing information needed its own result</h4><p>A tool cannot validate a state if the specification for that state is missing. I kept those checks separate from passes and failures, so a developer could see what still needed checking.</p><p>I also added traceability so a finding could be connected to the design or specification information behind it. That gave developers something to inspect when deciding whether to change the implementation.</p><h4>Connecting inspection and review</h4><p>I worked on component-property operations and specification workflows alongside validation. The goal was to connect inspection, implementation, and review while keeping a developer responsible for the decision.</p><p>The demo below is a smaller example: it checks whether a background token matches a destructive action and whether the state specification was supplied.</p>",
    "decisions": [
      [
        "Related checks in one operation",
        "I checked how states, tokens, spacing, responsive rules, and text work together, instead of treating each piece in isolation."
      ],
      [
        "Say when information is missing",
        "I kept issues separate from inconclusive checks. If the tool did not have enough information, I wanted that to be visible."
      ],
      [
        "Keep a developer in the loop",
        "I connected specifications, implementation, and validation with review checkpoints. The findings help a developer make a decision."
      ]
    ]
  }
};
  const order = Object.keys(studies);
  const dialog = $('#study-dialog');
  let fallbackDialog = false;
  let activeStudy = 'systems';
  let activeTab = 'overview';
  let returnFocus = null;
  let returnHash = location.hash.startsWith('#case-') ? '#work' : location.hash;
  const visited = new Set();
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const toast = $('#toast');
  let toastTimer;
  function announce(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
  }
  function renderPanel(tab) {
    if (!['overview', 'decisions', 'demo'].includes(tab)) return;
    activeTab = tab;
    const study = studies[activeStudy];
    $$('[data-study-tab]').forEach((button) => {
      const selected = button.dataset.studyTab === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const panel = $('#study-panel');
    panel.setAttribute('aria-labelledby', `study-tab-${tab}`);
    if (tab === 'overview') panel.innerHTML = study.overview;
    else if (tab === 'demo') { panel.innerHTML = demoMarkup(activeStudy); bindDemo(activeStudy, panel); }
    else panel.innerHTML = `<h3>The choices I made.</h3><div class="decision-list">${study.decisions.map(([title, explanation]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(explanation)}</p></article>`).join('')}</div>`;
  }
  // Original, synthetic demonstrations. No internal Microsoft source or assets.
  function demoMarkup(id) {
    const note = '<p class="trace-caption">I made this example for the portfolio. It uses sample data.</p>';
    if (id === 'agents') return `<div class="atlas-demo"><h3>Try a semantic-token check</h3><p>Choose a token for a destructive action and optionally provide the component state. See which checks pass, which flag an issue, and which need more information.</p><label for="demo-token">Background token</label><select id="demo-token"><option value="success">color.background.success</option><option value="danger">color.background.danger</option><option value="unknown">Unspecified token</option></select><label class="demo-check"><input id="demo-state" type="checkbox" checked> State specification available</label><button type="button" class="demo-action" id="demo-validate">Validate composition</button><div id="demo-result" class="demo-result" role="status" aria-live="polite"></div>${note}</div>`;
    if (id === 'systems') return `<div class="atlas-demo"><h3>Compose a component</h3><p>Choose which parts the card includes. The preview and component structure update together. Add an action, then try selecting the destination.</p><label for="demo-layout">Preview size</label><select id="demo-layout"><option value="wide">Desktop</option><option value="mobile">Mobile · 280px</option></select><label class="demo-check"><input type="checkbox" id="demo-image" checked> Include image slot</label><label class="demo-check"><input type="checkbox" id="demo-meta" checked> Include metadata slot</label><label class="demo-check"><input type="checkbox" id="demo-action-slot"> Include action slot</label><div class="demo-result demo-component" id="demo-composition" aria-live="polite"></div><pre class="demo-code" id="demo-api" aria-label="Illustrative component composition"></pre><p id="demo-action-status" class="demo-feedback" role="status"></p>${note}</div>`;
    return `<div class="atlas-demo"><h3>One action, multiple inputs</h3><p>Activate the button with a pointer, Enter, or Space. The native button emits one activation event for each action. Motion respects your system preference and the control below.</p><fieldset class="interaction-controls"><legend>Preview a state · works on touch too</legend><div class="demo-state-buttons"><button type="button" class="demo-action" data-preview-state="rest" aria-pressed="true">Rest</button><button type="button" class="demo-action" data-preview-state="hover" aria-pressed="false">Hover</button><button type="button" class="demo-action" data-preview-state="press" aria-pressed="false">Press</button><button type="button" class="demo-action" data-preview-state="disabled" aria-pressed="false">Disabled</button></div></fieldset><label for="demo-viewport">Preview size</label><select id="demo-viewport"><option value="wide">Desktop</option><option value="mobile">Mobile · 280px</option></select><label for="demo-speed">Animation timing</label><select id="demo-speed"><option value="180">Quick · 180ms</option><option value="350" selected>Balanced · 350ms</option><option value="700">Slow · 700ms</option></select><label class="demo-check"><input type="checkbox" id="demo-reduce"> Reduce motion in this demo</label><div class="demo-device" id="demo-device"><span class="demo-device-label">Destination preview</span><button type="button" class="demo-action interaction-target" id="demo-activate">Save destination</button><p id="demo-state-label">Rest · ready to activate</p></div><div id="demo-motion-result" class="demo-result" role="status" aria-live="polite">Saved 0 times</div><div class="demo-track" aria-hidden="true"><span id="demo-dot" class="demo-dot"></span></div><section class="kinetic-lab" aria-labelledby="kinetic-title"><h4 id="kinetic-title">Press and save a card</h4><p>Press and hold the whole card, then release. Try Tab, Enter, or Space too. Saving only happens on activation.</p><label for="card-scale">Press scale <output id="card-scale-value">0.96</output></label><input id="card-scale" type="range" min="90" max="99" value="96"><label for="card-easing">Release feel</label><select id="card-easing"><option value="spring">Spring</option><option value="smooth">Smooth</option><option value="snappy">Snappy</option></select><button type="button" class="demo-action" id="card-press-preview" aria-pressed="false">Preview held press</button><div class="kinetic-stage"><button type="button" id="kinetic-card" class="kinetic-card" aria-pressed="false"><span class="kinetic-landscape" aria-hidden="true"><span class="kinetic-planet"></span><span class="kinetic-ridge"></span><span class="kinetic-ridge ridge-back"></span><span class="kinetic-coordinates">47.61° N / 122.33° W</span></span><span class="kinetic-card-copy"><span class="eyebrow">Sample destination</span><strong>Sample mountain stop</strong><span>Press to save this imaginary stop.</span><span class="kinetic-save">Save destination ↗</span></span></button></div><p id="kinetic-feedback" role="status">Not saved yet. Give it a press.</p><p class="trace-caption">The scale changes while held; the release follows the easing you choose. Reduced motion keeps the state feedback and removes the movement.</p></section>${note}</div>`;
  }
  function bindDemo(id, panel) {
    if (id === 'agents') {
      const run = () => {
        const token = panel.querySelector('#demo-token').value;
        const state = panel.querySelector('#demo-state').checked;
        const tokenFinding = token === 'success' ? 'ISSUE: A success token does not match destructive intent.' : token === 'danger' ? 'PASS: The token matches destructive intent.' : 'INCONCLUSIVE: No token was supplied.';
        panel.querySelector('#demo-result').textContent = tokenFinding + ' ' + (state ? 'PASS: State specification supplied.' : 'INCONCLUSIVE: State specification missing.');
      };
      panel.querySelector('#demo-validate').addEventListener('click', run); run();
    } else if (id === 'systems') {
      const render = () => {
        const image = panel.querySelector('#demo-image').checked, meta = panel.querySelector('#demo-meta').checked, action = panel.querySelector('#demo-action-slot').checked;
        panel.querySelector('#demo-composition').innerHTML = `<strong>Sample destination</strong>${image ? '<div class="demo-thumb" role="img" aria-label="Illustration placeholder">◈</div>' : ''}<p>A reusable destination card assembled from independent slots.</p>${meta ? '<small>Category · Interface architecture</small>' : ''}${action ? '<div><button type="button" class="demo-action" id="demo-card-action">Choose destination</button></div>' : ''}`;
        panel.querySelector('#demo-api').textContent = ['<Card>', '  <Card.Title />', image && '  <Card.Image />', '  <Card.Content />', meta && '  <Card.Metadata />', action && '  <Card.Action />', '</Card>'].filter(Boolean).join('\n');
        panel.querySelector('#demo-card-action')?.addEventListener('click', () => { panel.querySelector('#demo-action-status').textContent = 'Destination selected. This is an original component-composition example.'; });
      };
      panel.querySelectorAll('input').forEach(el => el.addEventListener('change', render));
      panel.querySelector('#demo-layout').addEventListener('change', e => panel.querySelector('#demo-composition').classList.toggle('demo-mobile', e.target.value === 'mobile')); render();
    } else {
      let count = 0;
      const button = panel.querySelector('#demo-activate');
      const reduce = panel.querySelector('#demo-reduce');
      reduce.checked = document.documentElement.classList.contains('reduce-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const syncMotion = () => {
        const reduced = reduce.checked || document.documentElement.classList.contains('reduce-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const duration = reduced ? '0ms' : panel.querySelector('#demo-speed').value + 'ms';
        panel.querySelector('#demo-dot').style.transitionDuration = duration;
        button.style.transitionDuration = duration;
        panel.querySelector('.kinetic-lab').classList.toggle('demo-reduced', reduced);
      };
      reduce.addEventListener('change', syncMotion);
      panel.querySelector('#demo-speed').addEventListener('change', syncMotion);
      panel.querySelector('#demo-viewport').addEventListener('change', e => panel.querySelector('#demo-device').classList.toggle('demo-mobile', e.target.value === 'mobile'));
      panel.querySelectorAll('[data-preview-state]').forEach(control => control.addEventListener('click', () => {
        const state = control.dataset.previewState;
        panel.querySelectorAll('[data-preview-state]').forEach(el => el.setAttribute('aria-pressed', String(el === control)));
        button.dataset.state = state;
        button.disabled = state === 'disabled';
        panel.querySelector('#demo-state-label').textContent = {rest: 'Rest · ready to activate', hover: 'Hover · a little lift and emphasis', press: 'Press · immediate visual feedback', disabled: 'Disabled · no activation'}[state];
      }));
      const kinetic = panel.querySelector('#kinetic-card');
      const scale = panel.querySelector('#card-scale');
      scale.addEventListener('input', () => {
        const value = (Number(scale.value) / 100).toFixed(2);
        panel.querySelector('#card-scale-value').textContent = value;
        kinetic.style.setProperty('--press-scale', value);
      });
      panel.querySelector('#card-easing').addEventListener('change', e => {
        const curves = {spring: 'cubic-bezier(.2,1.7,.4,1)', smooth: 'cubic-bezier(.25,.1,.25,1)', snappy: 'cubic-bezier(.2,.8,.2,1)'};
        kinetic.style.setProperty('--release-ease', curves[e.target.value]);
      });
      panel.querySelector('#card-press-preview').addEventListener('click', e => {
        const pressed = e.currentTarget.getAttribute('aria-pressed') !== 'true';
        e.currentTarget.setAttribute('aria-pressed', String(pressed));
        kinetic.classList.toggle('preview-pressed', pressed);
      });
      kinetic.addEventListener('click', () => {
        const saved = kinetic.getAttribute('aria-pressed') !== 'true';
        kinetic.setAttribute('aria-pressed', String(saved));
        kinetic.querySelector('.kinetic-save').textContent = saved ? 'Saved ✓' : 'Save destination ↗';
        panel.querySelector('#kinetic-feedback').textContent = saved ? 'Destination saved. Press again to remove it.' : 'Destination removed from your saved stops.';
      });
      // Put the usable control first, including on touch screens.
      const primary = document.createElement('section');
      primary.className = 'motion-primary';
      primary.setAttribute('aria-label','Try the button');
      primary.append(panel.querySelector('#demo-device'), panel.querySelector('#demo-motion-result'), panel.querySelector('.demo-track'));
      panel.querySelector('.atlas-demo > p').after(primary);
      const press = () => { if (!button.disabled) button.classList.add('is-held'); };
      const release = () => button.classList.remove('is-held');
      button.addEventListener('pointerdown', press);
      ['pointerup','pointercancel','pointerleave','blur'].forEach(event => button.addEventListener(event, release));
      kinetic.addEventListener('pointerdown', () => kinetic.classList.add('is-held'));
      ['pointerup','pointercancel','pointerleave','blur'].forEach(event => kinetic.addEventListener(event, () => kinetic.classList.remove('is-held')));
      syncMotion();
      button.addEventListener('click', () => {
        count++;
        panel.querySelector('#demo-motion-result').textContent = `Saved ${count} ${count === 1 ? 'time' : 'times'}. Each tap or key activation counts once.`;
        const dot = panel.querySelector('#demo-dot');
        const reduced = panel.querySelector('#demo-reduce').checked || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        dot.classList.toggle('demo-dot-end', count % 2 === 1);
        syncMotion();
      });
    }
  }
  function updateProgress() {
    $('#study-reading-status').textContent = `${visited.size} / 3 case studies opened`;
  }
  function setHash(hash) {
    // Embedded browsers may restrict history writes; content must still open.
    try { history.replaceState(null, '', `${location.pathname}${location.search}${hash}`); } catch (_) { /* Navigation is optional. */ }
  }
  function showStudy() {
    fallbackDialog = false;
    try {
      if (typeof dialog.showModal !== 'function') throw new Error('Native dialog unavailable');
      dialog.showModal();
    } catch (_) {
      fallbackDialog = true;
      dialog.open = true;
      dialog.classList.add('fallback-modal');
      $('#study-backdrop').hidden = false;
    }
    document.body.classList.add('dialog-open');
  }
  function finishStudy() {
    document.body.classList.remove('dialog-open');
    if (location.hash.startsWith('#case-')) setHash(returnHash);
    if (returnFocus && returnFocus !== document.body) returnFocus.focus();
    if (visited.size === order.length) announce('You’ve opened all three case studies.');
  }
  function closeStudy() {
    if (fallbackDialog) {
      dialog.open = false;
      dialog.classList.remove('fallback-modal');
      $('#study-backdrop').hidden = true;
      fallbackDialog = false;
      finishStudy();
    } else dialog.close();
  }
  function openStudy(id, opener) {
    if (!studies[id]) return;
    const wasOpen = dialog.open;
    if (!wasOpen) {
      returnFocus = opener || (document.activeElement === document.body ? $('#reader-toggle') : document.activeElement);
      if (!location.hash.startsWith('#case-')) returnHash = location.hash;
    }
    activeStudy = id;
    const study = studies[id];
    $('#study-coordinate').textContent = study.coordinate;
    $('#study-title').textContent = study.title;
    $('#study-summary').textContent = study.summary;
    $('#study-tags').innerHTML = study.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
    renderPanel('overview');
    visited.add(id);
    updateProgress();
    setHash(`#case-${id}`);
    if (!wasOpen) {
      showStudy();
    }
    dialog.scrollTop = 0;
    $('#close-study').focus();
  }
  $$('[data-study]').forEach((button) => button.addEventListener('click', () => openStudy(button.dataset.study, button)));
  $$('[data-study-tab]').forEach((button) => button.addEventListener('click', () => renderPanel(button.dataset.studyTab)));
  $('#close-study').addEventListener('click', closeStudy);
  $('#study-backdrop').addEventListener('click', closeStudy);
  dialog.addEventListener('close', finishStudy);
  dialog.addEventListener('keydown', (event) => {
    if (!fallbackDialog) return;
    if (event.key === 'Escape') { event.preventDefault(); closeStudy(); }
    if (event.key === 'Tab') {
      const stops = [...dialog.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),summary,[tabindex]')].filter(el => el.tabIndex >= 0 && el.getClientRects().length);
      if (event.shiftKey && document.activeElement === stops[0]) { event.preventDefault(); stops.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === stops.at(-1)) { event.preventDefault(); stops[0].focus(); }
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeStudy();
  });
  $('#next-study').addEventListener('click', () => openStudy(order[(order.indexOf(activeStudy) + 1) % order.length]));
  $('#reader-toggle').addEventListener('click', () => {
    const enabled = document.body.classList.toggle('reader-mode');
    $('#reader-toggle').setAttribute('aria-pressed', String(enabled));
    $('.reader-note').hidden = !enabled;
  });
  function wireTabs(selector, onSelect) {
    const buttons = $$(selector);
    buttons.forEach((button, index) => button.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      onSelect(buttons[next]);
      buttons[next].focus();
    }));
  }
  wireTabs('[data-study-tab]', (button) => renderPanel(button.dataset.studyTab));
  const locations = {
  "india": {
    "coordinate": "Hyderabad, India · 2009–2013",
    "title": "Starting with computer science.",
    "description": "I studied computer science and engineering at Jawaharlal Nehru Technological University in Hyderabad.",
    "view": "world"
  },
  "new-york": {
    "coordinate": "New York, Ny · 2013–2015",
    "title": "Moving to New York for my master’s.",
    "description": "I studied computer science at NYU and interned at the NYC Comptroller’s Office and NYU Incubators.",
    "view": "us"
  },
  "lincoln": {
    "coordinate": "Lincoln, Nebraska · 2015–2020",
    "title": "From front-end to full-stack work.",
    "description": "At LI-COR, I started as a front-end web developer and later moved into full-stack work. I built product configuration tools, publication search, data-driven interfaces, and content platforms.",
    "view": "us"
  },
  "viome": {
    "coordinate": "Bellevue, Wa · 2020–2022",
    "title": "Building web and mobile apps in healthcare.",
    "description": "At Viome, a healthcare startup, my software engineering work covered web and mobile. I helped redesign the entire app, built reusable React and React Native components, and worked on how we shipped updates.",
    "view": "us"
  },
  "microsoft": {
    "coordinate": "Redmond, Wa · 2022–present",
    "title": "Moving into design engineering.",
    "description": "Microsoft is where I moved into the intersection of design and engineering. As a Senior UX Engineer on the Xbox Design System, I turn design ideas into shared components, interactions, and tools for other engineers.",
    "view": "us"
  }
};
  const chaptersVisited = new Set();
  function selectMapView(view) {
    if (!['world', 'us'].includes(view)) return;
    $('#map-world').hidden = view !== 'world';
    $('#map-us').hidden = view !== 'us';
    $$('[data-map-view]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.mapView === view)));
  }
  function selectLocation(id) {
    const chapter = locations[id];
    if (!chapter) return;
    selectMapView(chapter.view);
    $('#location-coordinate').textContent = chapter.coordinate;
    $('#location-title').textContent = chapter.title;
    $('#location-description').textContent = chapter.description;
    $('#location-link').setAttribute('href', `#journey-${id}`);
    $$('[data-location]').forEach((link) => {
      const selected = link.dataset.location === id;
      link.classList.toggle('selected', selected);
      link.setAttribute('aria-current', selected ? 'location' : 'false');
    });
    chaptersVisited.add(id);
    $('#map-progress').textContent = `${chaptersVisited.size} / ${Object.keys(locations).length} chapters explored`;
  }
  $$('[data-location]').forEach((link) => link.addEventListener('click', (event) => {
    // Real links provide a no-JavaScript path; enhanced taps show an inline chapter.
    event.preventDefault();
    selectLocation(link.dataset.location);
    if (link.classList.contains('geo-marker')) {
      const stop = $$('[data-location]').find((candidate) => candidate.dataset.location === link.dataset.location && !candidate.classList.contains('geo-marker'));
      if (stop) stop.focus({ preventScroll: true });
    }
  }));
  $$('[data-map-view]').forEach((button) => button.addEventListener('click', () => selectMapView(button.dataset.mapView)));
  selectLocation('india');
  const initialChapter = location.hash.match(/^#journey-(india|new-york|lincoln|viome|microsoft)$/);
  if (initialChapter) selectLocation(initialChapter[1]);
  const appearance = window.AtlasAppearance;
  const themeSelect = $('#site-theme');
  const contrastControl = $('#site-contrast');
  function reflectAppearance(announceChange = false) {
    if (!appearance) return;
    const state = appearance.state();
    themeSelect.value = state.theme;
    contrastControl.checked = state.highContrast;
    $('#theme-color').setAttribute('content', appearance.palette().bg);
    if (announceChange) $('#appearance-status').textContent = `${state.theme.charAt(0).toUpperCase() + state.theme.slice(1)} theme. High contrast ${state.highContrast ? 'on' : 'off'}.`;
  }
  const motion = window.AtlasMotion;
  const motionControl = $('#site-motion');
  function reflectMotion(announceChange = false) {
    motionControl.checked = motion.reduced();
    motionControl.disabled = motion.devicePreference.matches;
    if (announceChange) $('#appearance-status').textContent = `Reduced motion ${motion.reduced() ? 'on. Animations stopped.' : 'off.'}`;
  }
  motionControl.addEventListener('change', () => { motion.set(motionControl.checked); reflectMotion(true); });
  motion.devicePreference.addEventListener('change', () => reflectMotion(true));
  reflectMotion();
  if (appearance) {
    themeSelect.addEventListener('change', () => { appearance.set(themeSelect.value, contrastControl.checked); reflectAppearance(true); });
    contrastControl.addEventListener('change', () => { appearance.set(themeSelect.value, contrastControl.checked); reflectAppearance(true); });
    appearance.prefersContrast.addEventListener('change', (event) => {
      if (!appearance.hasExplicitPreference()) { appearance.set(appearance.state().theme, event.matches, false); reflectAppearance(true); }
    });
  }
  window.addEventListener('hashchange', () => {
    const match = location.hash.match(/^#case-(systems|motion|agents)$/);
    if (match) openStudy(match[1]);
    else if (dialog.open) closeStudy();
  });
  reflectAppearance();
  const initial = location.hash.match(/^#case-(systems|motion|agents)$/);
  if (initial) openStudy(initial[1]);
})();

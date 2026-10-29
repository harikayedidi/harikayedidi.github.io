(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  // Portfolio narratives are based on owner-supplied engineering summaries.
  // All examples are generalized and illustrative; no internal source is reproduced.
  const studies = {
  "systems": {
    "coordinate": "01 / DESIGN SYSTEMS",
    "title": "Foundations that travel.",
    "summary": "How I made shared components easier to compose, maintain, and adopt across products.",
    "tags": [
      "React",
      "TypeScript",
      "Component APIs",
      "Cross-platform",
      "Migration"
    ],
    "overview": "<h3>Making components easier to work with.</h3><p>At Microsoft, I work on the Xbox Design System. One challenge was making shared components flexible enough for different products without adding a new prop for every situation.</p><p>I separated interaction behavior from visual presentation and used compound components so developers could put together the pieces they needed. Content, images, inputs, and overlays could work together without everything living in one large component.</p><h4>What I changed</h4><p>I cleaned up package boundaries and fixed circular dependencies. I also worked on ways to introduce newer components and typography gradually, so teams could adopt changes without replacing everything at once.</p><ul><li>I made more complex interfaces possible through composition.</li><li>I removed circular dependencies between shared packages.</li><li>I supported gradual migration while keeping existing consumers working.</li></ul><h4>Working across platforms and teams</h4><p>The component work sits within a wider set of packages for React, React Native, and React Native Windows. I also built a cross-platform demo app for trying and testing components, and helped partner teams integrate the packages into their own apps.</p><p>That consumer side matters to me. The API has to work for the people assembling the interface, and the package structure needs to make sense when a team adopts or updates it.</p><h4>Helping teams work with the system</h4><p>Alongside the component work, I help define engineering standards and shared development practices. I work with designers and engineers to turn product requirements into component APIs and UI systems that can be maintained across teams.</p><p>I also established automated package release workflows in Azure DevOps. The architecture, the API, and the way a package gets released are all parts of making the system useful to its consumers.</p>",
    "decisions": [
      [
        "Keep behavior separate from presentation",
        "I kept interaction behavior in shared foundations so different visual treatments could use the same keyboard, focus, and state logic."
      ],
      [
        "Use smaller pieces instead of more props",
        "I used compound components so developers could choose and arrange the parts they needed, rather than keep adding options to one component."
      ],
      [
        "Make change easier to adopt",
        "I worked on package boundaries and migration paths that let teams pick up improvements gradually. Compatibility with existing consumers was part of that work."
      ]
    ]
  },
  "motion": {
    "coordinate": "02 / INTERACTION",
    "title": "Motion with a purpose.",
    "summary": "How I worked on predictable input behavior, accessibility, and motion that holds up during real use.",
    "tags": [
      "Accessibility",
      "Motion",
      "Input handling",
      "Reduced motion",
      "Reliability"
    ],
    "overview": "<h3>A control should do what you expect.</h3><p>Whether someone uses a keyboard, controller, pointer, or screen reader, a shared control needs to behave consistently. I worked on the interaction foundations behind those controls, fixing duplicate activation, keyboard-handler issues, screen-reader announcements, and focus and disabled states.</p><h4>Getting the details right</h4><p>I also worked on our shared motion infrastructure, using browser-native animation, lazy loading, and more reliable lifecycle handling. During fast navigation, an animation could finish before its inline styles had caught up. I synchronized those transitions to address the flicker.</p><p>Reduced motion was part of the same work. I wanted the interaction to still make sense when someone preferred less animation.</p><ul><li>I fixed duplicate activation and keyboard-handling issues.</li><li>I improved focus, screen-reader behavior, and reduced-motion support.</li><li>I addressed rapid-navigation flicker and repeated style updates.</li></ul><h4>Why I worked on the shared foundations</h4><p>These controls are reused across interfaces. Keeping activation, focus, disabled states, and motion behavior in shared foundations means the same behavior can be used by different components and visual treatments.</p><p>The details are connected. A motion fix still needs to leave the right visual state behind, and an input fix still needs to preserve focus and screen-reader behavior. I worked on those pieces together.</p>",
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
        "Keep animation and visual state in sync",
        "I worked on animation completion and lifecycle handling so rapid navigation would not leave the interface in an inconsistent visual state."
      ]
    ]
  },
  "agents": {
    "coordinate": "03 / DEVELOPER EXPERIENCE",
    "title": "Tools for the builders.",
    "summary": "How I built MCP-enabled validation tools that tell developers what looks wrong and what still needs checking.",
    "tags": [
      "MCP",
      "AI workflows",
      "Validation",
      "Design-to-code",
      "Developer tooling"
    ],
    "overview": "<h3>Making AI feedback useful.</h3><p>An interface can look plausible and still use the wrong token, miss a component state, or get the spacing wrong. As part of our MCP tooling, I built composition-validation capabilities, extended component-property operations, and worked on specification and validation workflows.</p><h4>What I built</h4><p>I brought component inspection into a repeatable validation operation that checks states, tokens, spacing, responsive layout, and text. I also added traceability so findings could be connected back to the information behind them.</p><p>I wanted the tooling to be clear about what it knew. A missing design property should not quietly become a pass. The result needed to separate a real issue from something the tool could not check.</p><ul><li>I brought related component checks into one validation operation.</li><li>I made findings actionable and kept track of their sources.</li><li>I separated missing information from successful validation, with a developer still reviewing the result.</li></ul><h4>What the validation brings together</h4><ul><li>Component states and the properties available for each state.</li><li>Semantic token use, spacing, responsive layout, and text.</li><li>The design or specification information behind a finding.</li><li>Checks that could not finish because the needed information was missing.</li></ul><p>I also worked on component-property operations and specification workflows, so inspection, implementation, and review could be connected. The demo uses a much smaller example: a token check and whether a state specification was supplied.</p>",
    "decisions": [
      [
        "Look at the component as a whole",
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
    if (id === 'systems') return `<div class="atlas-demo"><h3>Compose a component</h3><p>Toggle independent slots without adding special-case props to one monolithic component.</p><label for="demo-layout">Preview size</label><select id="demo-layout"><option value="wide">Desktop</option><option value="mobile">Mobile · 280px</option></select><label class="demo-check"><input type="checkbox" id="demo-image" checked> Include image slot</label><label class="demo-check"><input type="checkbox" id="demo-meta" checked> Include metadata slot</label><label class="demo-check"><input type="checkbox" id="demo-action-slot"> Include action slot</label><div class="demo-result demo-component" id="demo-composition" aria-live="polite"></div><pre class="demo-code" id="demo-api" aria-label="Illustrative component composition"></pre><p id="demo-action-status" class="demo-feedback" role="status"></p>${note}</div>`;
    return `<div class="atlas-demo"><h3>One action, multiple inputs</h3><p>Activate the button with a pointer, Enter, or Space. The native button emits one activation event for each action. Motion respects your system preference and the control below.</p><fieldset class="interaction-controls"><legend>Preview a state · works on touch too</legend><div class="demo-state-buttons"><button type="button" class="demo-action" data-preview-state="rest" aria-pressed="true">Rest</button><button type="button" class="demo-action" data-preview-state="hover" aria-pressed="false">Hover</button><button type="button" class="demo-action" data-preview-state="press" aria-pressed="false">Press</button><button type="button" class="demo-action" data-preview-state="disabled" aria-pressed="false">Disabled</button></div></fieldset><label for="demo-viewport">Preview size</label><select id="demo-viewport"><option value="wide">Desktop</option><option value="mobile">Mobile · 280px</option></select><label for="demo-speed">Animation timing</label><select id="demo-speed"><option value="180">Quick · 180ms</option><option value="350" selected>Balanced · 350ms</option><option value="700">Slow · 700ms</option></select><label class="demo-check"><input type="checkbox" id="demo-reduce"> Reduce motion in this demo</label><div class="demo-device" id="demo-device"><span class="demo-device-label">Destination preview</span><button type="button" class="demo-action interaction-target" id="demo-activate">Save destination</button><p id="demo-state-label">Rest · ready to activate</p></div><div id="demo-motion-result" class="demo-result" role="status" aria-live="polite">Activations: 0</div><div class="demo-track" aria-hidden="true"><span id="demo-dot" class="demo-dot"></span></div><section class="kinetic-lab" aria-labelledby="kinetic-title"><h4 id="kinetic-title">A card you can feel</h4><p>Press and hold the whole card, then release. Try Tab, Enter, or Space too. Saving only happens on activation.</p><label for="card-scale">Press scale <output id="card-scale-value">0.96</output></label><input id="card-scale" type="range" min="90" max="99" value="96"><label for="card-easing">Release feel</label><select id="card-easing"><option value="spring">Spring</option><option value="smooth">Smooth</option><option value="snappy">Snappy</option></select><button type="button" class="demo-action" id="card-press-preview" aria-pressed="false">Preview held press</button><div class="kinetic-stage"><button type="button" id="kinetic-card" class="kinetic-card" aria-pressed="false"><span class="kinetic-landscape" aria-hidden="true"><span class="kinetic-planet"></span><span class="kinetic-ridge"></span><span class="kinetic-ridge ridge-back"></span><span class="kinetic-coordinates">47.61° N / 122.33° W</span></span><span class="kinetic-card-copy"><span class="eyebrow">SAMPLE DESTINATION / 01</span><strong>A little further out.</strong><span>Press to save this imaginary stop.</span><span class="kinetic-save">Save destination ↗</span></span></button></div><p id="kinetic-feedback" role="status">Not saved yet. Give it a press.</p><p class="trace-caption">The scale changes while held; the release follows the easing you choose. Reduced motion keeps the state feedback and removes the movement.</p></section>${note}</div>`;
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
      syncMotion();
      button.addEventListener('click', () => {
        count++;
        panel.querySelector('#demo-motion-result').textContent = `Activations: ${count}`;
        const dot = panel.querySelector('#demo-dot');
        const reduced = panel.querySelector('#demo-reduce').checked || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        dot.classList.toggle('demo-dot-end', count % 2 === 1);
        syncMotion();
      });
    }
  }
  function updateProgress() {
    $('#study-reading-status').textContent = `${visited.size} / 3 destinations explored`;
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
    if (visited.size === order.length) announce('Three perspectives explored. One engineering practice.');
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
      const stops = [$('#close-study'), ...$$('[data-study-tab]').filter((button) => button.tabIndex === 0), $('#study-panel'), $('#next-study')];
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
    "coordinate": "01 / HYDERABAD, INDIA · 2009–2013",
    "title": "Starting with computer science.",
    "description": "I studied computer science and engineering at Jawaharlal Nehru Technological University in Hyderabad.",
    "view": "world"
  },
  "new-york": {
    "coordinate": "02 / NEW YORK, NY · 2013–2015",
    "title": "Moving to New York for my master’s.",
    "description": "I studied computer science at NYU and interned at the NYC Comptroller’s Office and NYU Incubators.",
    "view": "us"
  },
  "lincoln": {
    "coordinate": "03 / LINCOLN, NEBRASKA · 2015–2020",
    "title": "From front-end to full-stack work.",
    "description": "At LI-COR, I started as a front-end web developer and later moved into full-stack work. I built product configuration tools, publication search, data-driven interfaces, and content platforms.",
    "view": "us"
  },
  "viome": {
    "coordinate": "04 / BELLEVUE, WA · 2020–2022",
    "title": "Building web and mobile apps in healthcare.",
    "description": "At Viome, a healthcare startup, my software engineering work covered web and mobile. I helped redesign the entire app, built reusable React and React Native components, and worked on how we shipped updates.",
    "view": "us"
  },
  "microsoft": {
    "coordinate": "05 / REDMOND, WA · 2022–PRESENT",
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
  const accents = { mint: '#a9d7b8', apricot: '#edb29d', lilac: '#c8bce5' };
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
    updateTokens();
  }
  let accent = 'mint';
  let density = 'comfortable';
  const radius = $('#radius-control');
  const lab = $('#lab-preview');
  const motionControl = $('#motion-control');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function applyMotion(value) {
    document.documentElement.classList.toggle('reduce-motion', value);
    motionControl.checked = value;
  }
  applyMotion(motionPreference.matches);
  motionPreference.addEventListener('change', (event) => applyMotion(event.matches));
  motionControl.addEventListener('change', () => applyMotion(motionControl.checked));
  function updateTokens() {
    const value = Math.max(0, Math.min(24, Number(radius.value) || 0));
    const space = density === 'compact' ? 12 : 20;
    const palette = appearance ? appearance.palette() : null;
    const accentColor = palette ? palette[`lab-${accent}`] : accents[accent];
    lab.style.setProperty('--demo-accent', accentColor);
    lab.style.setProperty('--demo-radius', `${value}px`);
    lab.style.setProperty('--demo-space', `${space}px`);
    $('#radius-value').textContent = `${value}px`;
    $('#token-code').textContent = `--accent: ${accentColor};\n--radius: ${value}px;\n--space: ${space}px;`;
    $$('[data-accent]').forEach((button) => {
      const selected = button.dataset.accent === accent;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    $$('[data-density]').forEach((button) => {
      const selected = button.dataset.density === density;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  $$('[data-accent]').forEach((button) => button.addEventListener('click', () => { accent = button.dataset.accent; updateTokens(); }));
  $$('[data-density]').forEach((button) => button.addEventListener('click', () => { density = button.dataset.density; updateTokens(); }));
  radius.addEventListener('input', updateTokens);
  if (appearance) {
    themeSelect.addEventListener('change', () => { appearance.set(themeSelect.value, contrastControl.checked); reflectAppearance(true); });
    contrastControl.addEventListener('change', () => { appearance.set(themeSelect.value, contrastControl.checked); reflectAppearance(true); });
    appearance.prefersContrast.addEventListener('change', (event) => {
      if (!appearance.hasExplicitPreference()) { appearance.set(appearance.state().theme, event.matches, false); reflectAppearance(true); }
    });
  }
  function selectPreviewTab(tab) {
    $$('[data-preview-tab]').forEach((button) => {
      const selected = button.dataset.previewTab === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    $('#preview-panel').setAttribute('aria-labelledby', `preview-tab-${tab}`);
    $('#preview-panel').innerHTML = tab === 'overview'
      ? '<div class="sample-task"><span class="task-symbol">↗</span><div><strong>A system, not a one-off.</strong><small>Color, spacing, shape, and interaction.</small></div><span class="sample-badge">Ready</span></div>'
      : '<div class="sample-task"><span class="task-symbol">⌘</span><div><strong>Shared decisions, visible behavior.</strong><small>Use arrow keys between tabs. Tab to the button.</small></div></div>';
  }
  $$('[data-preview-tab]').forEach((button) => button.addEventListener('click', () => selectPreviewTab(button.dataset.previewTab)));
  wireTabs('[data-preview-tab]', (button) => selectPreviewTab(button.dataset.previewTab));
  let interactions = 0;
  $('#preview-cta').addEventListener('click', () => {
    interactions += 1;
    $('#preview-feedback').textContent = `Interaction ${interactions} complete. The same tokens shape every state.`;
  });
  $('#reset-lab').addEventListener('click', () => {
    accent = 'mint'; density = 'comfortable'; radius.value = '12'; interactions = 0;
    updateTokens(); selectPreviewTab('overview'); applyMotion(motionPreference.matches);
    $('#preview-feedback').textContent = 'Lab reset. Try the button, or explore its focus states.';
  });
  window.addEventListener('hashchange', () => {
    const match = location.hash.match(/^#case-(systems|motion|agents)$/);
    if (match) openStudy(match[1]);
    else if (dialog.open) closeStudy();
  });
  updateTokens();
  reflectAppearance();
  const initial = location.hash.match(/^#case-(systems|motion|agents)$/);
  if (initial) openStudy(initial[1]);
})();

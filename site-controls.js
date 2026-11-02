(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
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
  reflectAppearance();
})();

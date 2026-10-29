(() => {
  'use strict';
  const key='harika-atlas-reduce-motion';
  const devicePreference=matchMedia('(prefers-reduced-motion: reduce)');
  let saved=false;
  try { saved=localStorage.getItem(key)==='true'; } catch (_) {}
  const reduced=()=>saved||devicePreference.matches;
  function apply(){
    document.documentElement.classList.toggle('reduce-motion',reduced());
    if(reduced())document.getAnimations?.().forEach(animation=>animation.cancel());
  }
  function set(value){saved=Boolean(value);try{localStorage.setItem(key,String(saved));}catch(_){}apply();}
  apply();devicePreference.addEventListener('change',apply);
  window.AtlasMotion={reduced,set,devicePreference};
})();

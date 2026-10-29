(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = () => root.classList.contains('reduce-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(forced-colors: active)').matches;
  const nameStage = document.querySelector('.hero-copy');
  let spotlightTimer;
  function lightName(event) {
    if (reduced() || root.dataset.highContrast === 'true') return;
    if (event.target.closest('a,button,input,select')) return;
    const box = nameStage.getBoundingClientRect();
    const x = Math.max(0,Math.min(1,(event.clientX-box.left)/box.width));
    const y = Math.max(0,Math.min(1,(event.clientY-box.top)/box.height));
    nameStage.style.setProperty('--spot-x', `${x*100}%`);
    nameStage.style.setProperty('--spot-y', `${y*100}%`);
    nameStage.style.setProperty('--name-x', `${(0.5-y)*4}deg`);
    nameStage.style.setProperty('--name-y', `${(x-0.5)*4}deg`);
    nameStage.classList.add('spotlight-on');
  }
  function restName() {
    nameStage.classList.remove('spotlight-on');
    ['--name-x','--name-y'].forEach(key=>nameStage.style.removeProperty(key));
  }
  nameStage.addEventListener('pointermove', event=>{ if(event.pointerType==='mouse' && matchMedia('(hover:hover)').matches) lightName(event); });
  nameStage.addEventListener('pointerdown', event=>{ if(event.pointerType!=='mouse'){ lightName(event); clearTimeout(spotlightTimer); spotlightTimer=setTimeout(restName,900); } });
  nameStage.addEventListener('pointerleave',restName);
  nameStage.addEventListener('pointercancel',restName);
  document.querySelectorAll('.site-header nav, .appearance-inner').forEach(menu => {
    let menuTimer;
    function lightMenu(event) {
      if (reduced() || root.dataset.highContrast === 'true') return;
      const box = menu.getBoundingClientRect();
      menu.style.setProperty('--menu-x', `${event.clientX-box.left}px`);
      menu.style.setProperty('--menu-y', `${event.clientY-box.top}px`);
      menu.classList.add('menu-lit');
    }
    menu.addEventListener('pointermove', event=>{ if(event.pointerType==='mouse')lightMenu(event); });
    menu.addEventListener('pointerdown', event=>{lightMenu(event);clearTimeout(menuTimer);menuTimer=setTimeout(()=>menu.classList.remove('menu-lit'),900);});
    ['pointerleave','pointercancel'].forEach(event=>menu.addEventListener(event,()=>menu.classList.remove('menu-lit')));
  });
  // Pointer tilt is decorative; all actions remain native buttons.
  document.querySelectorAll('.work-card').forEach(card => {
    const reset = () => ['--tilt-x','--tilt-y','--shine-x','--shine-y'].forEach(name => card.style.removeProperty(name));
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || reduced() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return reset();
      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(1,(event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1,(event.clientY - rect.top) / rect.height));
      card.style.setProperty('--tilt-y', `${(x - .5) * 8}deg`);
      card.style.setProperty('--tilt-x', `${(.5 - y) * 6}deg`);
      card.style.setProperty('--shine-x', `${x * 100}%`);
      card.style.setProperty('--shine-y', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointercancel', reset);
  });
  const section = document.querySelector('#journey');
  const backToTop = document.getElementById('back-to-top');
  let scrollFrame = 0;
  function updateBackToTop() {
    scrollFrame = 0;
    backToTop.hidden = section.getBoundingClientRect().top > window.innerHeight * .75;
  }
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateBackToTop);
  }, {passive:true});
  window.addEventListener('resize', updateBackToTop);
  window.addEventListener('load', updateBackToTop);
  updateBackToTop();

  const consolePanel = section.querySelector('.passport-console');
  const buttons = [...section.querySelectorAll('[data-passport]')];
  const articles = buttons.map(button => document.getElementById(`journey-${button.dataset.passport}`));
  const previous = document.getElementById('passport-prev');
  const next = document.getElementById('passport-next');
  const timeline = section.querySelector('.timeline');
  const endpaper = section.querySelector('.passport-endpaper');
  const book = section.querySelector('.passport-book');
  const coverShell = section.querySelector('.passport-cover-shell');
  const cover = document.getElementById('open-passport');
  const closeCover = document.getElementById('close-passport');
  let bookOpen = false, coverAnimation = null;
  function syncCover() {
    const closed = mode === 'explore' && !bookOpen;
    book.classList.toggle('book-closed', closed);
    coverShell.hidden = !closed && !coverAnimation;
    closeCover.hidden = mode !== 'explore' || !bookOpen;
    timeline.inert = closed;
    endpaper.inert = closed;
    cover.setAttribute('aria-expanded', String(bookOpen));
  }
  function openBook(focus = false) {
    if (coverAnimation) { coverAnimation.cancel(); coverAnimation = null; }
    // Freeze the actual cover before full-height pages enter the layout.
    const coverBox = {width:cover.offsetWidth,height:cover.offsetHeight,left:cover.offsetLeft,top:cover.offsetTop};
    bookOpen = true;
    syncCover();
    if (focus) closeCover.focus({preventScroll:true});
    if (reduced()) return;
    coverShell.hidden = false;
    coverShell.classList.add('cover-opening');
    cover.style.width = `${coverBox.width}px`;
    cover.style.height = `${coverBox.height}px`;
    cover.style.left = `${coverBox.left}px`;
    cover.style.top = `${coverBox.top}px`;
    cover.style.bottom = 'auto';
    cover.inert = true;
    const animation = cover.animate([{transform:'rotateY(0deg)'},{transform:'rotateY(-178deg)'}],{duration:520,easing:'cubic-bezier(.35,.05,.2,1)',fill:'forwards'});
    coverAnimation = animation;
    animation.onfinish = () => finishCover();
  }
  function finishCover() {
    if (coverAnimation) { coverAnimation.cancel(); coverAnimation = null; }
    coverShell.classList.remove('cover-opening');
    cover.inert = false;
    ['width','height','left','top','bottom'].forEach(property => cover.style.removeProperty(property));
    syncCover();
  }
  cover.addEventListener('click', () => { cancelTurn(); index = 0; render(); openBook(true); });
  closeCover.addEventListener('click', () => {
    cancelTurn(); bookOpen = false; finishCover(); cover.focus({preventScroll:true});
  });
  let transaction = null, gesture = null, queuedIndex = null;
  function clearTurn() {
    if (!transaction) return;
    if (transaction.animation) transaction.animation.cancel();
    transaction.outgoing.remove(); transaction.incoming.remove();
    transaction = null;
    timeline.classList.remove('is-turning', 'is-dragging');
    timeline.style.removeProperty('min-height');
  }
  function cancelTurn() { queuedIndex = null; gesture = null; clearTurn(); }
  function snapshot(article, className) {
    const page = document.createElement('div');
    page.className = className;
    page.setAttribute('aria-hidden', 'true'); page.inert = true;
    const face = document.createElement('div');
    face.className = 'book-page-face';
    ['.timeline-date', 'h3', '.timeline-role', ':scope > p:not([class])', '.experience-detail-body'].forEach(selector => {
      const source = article.querySelector(selector);
      if (source) face.append(source.cloneNode(true));
    });
    face.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    page.append(face);
    return page;
  }
  function beginTurn(target) {
    if (target < 0 || target >= articles.length || target === index) return false;
    clearTurn();
    const outgoing = snapshot(articles[index], 'book-turn-sheet');
    const incoming = snapshot(articles[target], 'book-incoming-page');
    const forward = target > index;
    outgoing.style.transformOrigin = forward ? 'left center' : 'right center';
    timeline.style.minHeight = `${timeline.getBoundingClientRect().height}px`;
    timeline.classList.add('is-turning');
    timeline.append(incoming, outgoing);
    const incomingHeight = incoming.querySelector('.book-page-face').scrollHeight;
    timeline.style.minHeight = `${Math.max(timeline.getBoundingClientRect().height, incomingHeight)}px`;
    transaction = {target, outgoing, incoming, sign:forward ? -1 : 1, progress:0, animation:null};
    return true;
  }
  function paintTurn(progress) {
    if (!transaction) return;
    transaction.progress = Math.max(0, Math.min(1, progress));
    transaction.outgoing.style.transform = `rotateY(${transaction.sign * 100 * transaction.progress}deg)`;
    transaction.outgoing.style.setProperty('--turn-shade', String(transaction.progress * .2));
  }
  function settleTurn(commit) {
    const current = transaction;
    if (!current) return;
    const finish = () => {
      if (transaction !== current) return;
      const target = current.target;
      // Commit content and metadata in the same frame that removes the visual leaves.
      if (commit) { index = target; articles[index].scrollTop = 0; render(); }
      clearTurn();
      const nextTarget = queuedIndex; queuedIndex = null;
      if (nextTarget !== null && nextTarget !== index) select(nextTarget);
    };
    const end = commit ? 1 : 0;
    if (reduced() || Math.abs(end - current.progress) < .005) return finish();
    const animation = current.outgoing.animate([
      {transform:`rotateY(${current.sign * 100 * current.progress}deg)`},
      {transform:`rotateY(${current.sign * 100 * end}deg)`}
    ], {duration:Math.max(80, Math.round(320 * Math.abs(end - current.progress))),easing:'cubic-bezier(.2,.65,.3,1)',fill:'forwards'});
    current.animation = animation;
    animation.onfinish = finish;
  }
  const mobileCareer = matchMedia('(max-width: 760px)');
  let index = 0, mode = mobileCareer.matches ? 'all' : 'explore', renderedOrder = 'explore';
  function render() {
    if (renderedOrder !== mode) {
      const order = mode === 'all' ? [...articles].reverse() : articles;
      const route = section.querySelector('.passport-route');
      order.forEach(article => timeline.append(article));
      (mode === 'all' ? [...buttons].reverse() : buttons).forEach(button => route.append(button));
      renderedOrder = mode;
    }
    endpaper.hidden = mode === 'all';
    syncCover();
    document.getElementById('book-city').textContent = buttons[index].querySelector('strong').textContent;
    document.getElementById('book-year').textContent = buttons[index].querySelector('.route-index').textContent.split('/')[1].trim();
    document.getElementById('book-folio').textContent = `${String(index + 1).padStart(2, '0')} / 05`;
    buttons.forEach((button, i) => { if (mode === 'all') button.removeAttribute('aria-pressed'); else button.setAttribute('aria-pressed', String(i === index)); });
    articles.forEach((article, i) => { article.hidden = mode === 'explore' && i !== index; });
    section.classList.toggle('passport-all', mode === 'all');
    section.querySelectorAll('[data-career-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.careerMode === mode)));
    previous.disabled = index === 0;
    next.disabled = index === buttons.length - 1;
    document.getElementById('passport-status').textContent = mode === 'all' ? 'Full résumé · all 5 chapters' : `Chapter ${index + 1} of 5 · ${buttons[index].querySelector('strong').textContent}`;
  }
  function select(i, animate = true) {
    if (i < 0 || i >= articles.length) return;
    if (transaction) { queuedIndex = i; return; }
    const wasClosed = !bookOpen;
    if (wasClosed && mode === 'explore') openBook();
    if (i === index) return;
    if (!animate || reduced() || mode !== 'explore' || wasClosed || coverAnimation) {
      index = i; render(); return;
    }
    if (beginTurn(i)) settleTurn(true);
  }
  // Horizontal pointer gestures drive the same visual leaves as the arrow buttons.
  // Vertical touch movement is left to the browser for normal page scrolling.
  timeline.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary || !bookOpen || mode !== 'explore' || transaction || coverAnimation) return;
    if (event.target.closest('a,button,input,select,textarea,summary')) return;
    gesture = {id:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,time:event.timeStamp,velocity:0,active:false,direction:0};
    if (event.pointerType === 'mouse') event.preventDefault();
  });
  timeline.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.active) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { gesture = null; return; }
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      gesture.active = true;
      timeline.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    const direction = dx < 0 ? 1 : -1;
    const target = index + direction;
    if (direction !== gesture.direction) {
      clearTurn(); gesture.direction = direction;
      if (!beginTurn(target)) return;
    }
    if (!transaction) return;
    timeline.classList.add('is-dragging');
    const elapsed = Math.max(1,event.timeStamp - gesture.time);
    gesture.velocity = (event.clientX - gesture.lastX) / elapsed;
    gesture.lastX = event.clientX; gesture.time = event.timeStamp;
    paintTurn(Math.abs(dx) / Math.max(160,timeline.getBoundingClientRect().width * .7));
  }, {passive:false});
  function endGesture(event, cancelled = false) {
    if (!gesture || event.pointerId !== gesture.id) return;
    const current = gesture; gesture = null;
    if (timeline.hasPointerCapture(event.pointerId)) timeline.releasePointerCapture(event.pointerId);
    if (!current.active || !transaction) return;
    const freshFlick = event.timeStamp - current.time < 90 && Math.abs(current.velocity) > .55 && Math.sign(current.velocity) === (transaction.target > index ? -1 : 1) && transaction.progress > .06;
    settleTurn(!cancelled && (transaction.progress >= .25 || freshFlick));
  }
  timeline.addEventListener('pointerup', event => endGesture(event));
  timeline.addEventListener('pointercancel', event => endGesture(event,true));
  timeline.addEventListener('lostpointercapture', event => { if (gesture && event.pointerId === gesture.id) endGesture(event,true); });
  articles.forEach(article => { article.tabIndex = 0; });
  timeline.tabIndex = 0;
  timeline.setAttribute('role','group');
  timeline.setAttribute('aria-label','Work and education');
  timeline.addEventListener('keydown', event => {
    if (event.key === 'Escape' && transaction) { event.preventDefault(); cancelTurn(); return; }
    if ((event.target !== timeline && !articles.includes(event.target)) || !bookOpen || mode !== 'explore') return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); select(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    select(i);
    if (mode === 'all') { articles[i].scrollIntoView({behavior:reduced() ? 'instant' : 'smooth',block:'start'}); articles[i].focus({preventScroll:true}); }
  }));
  section.querySelectorAll('[data-career-mode]').forEach(button => button.addEventListener('click', () => {
    cancelTurn(); finishCover(); mode = button.dataset.careerMode;
    index = mode === 'all' ? articles.length - 1 : 0;
    if (mode === 'all') articles.forEach(article => { article.querySelector('details').open = true; });
    render();
  }));
  previous.addEventListener('click', () => select(Math.max(0,index - 1)));
  next.addEventListener('click', () => select(Math.min(buttons.length - 1,index + 1)));
  // Reveal hidden destinations before normal anchor navigation scrolls to them.
  function revealHash(hash) {
    const i = articles.findIndex(article => `#${article.id}` === hash);
    if (i >= 0) select(i, false);
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#journey-"]');
    if (link && !link.hasAttribute('data-location')) revealHash(link.getAttribute('href'));
  });
  window.addEventListener('hashchange', () => revealHash(location.hash));
  const motionObserver = new MutationObserver(() => { if (reduced()) { cancelTurn(); finishCover(); } });
  motionObserver.observe(root, {attributes:true,attributeFilter:['class']});
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => { if (reduced()) { cancelTurn(); finishCover(); } });
  function syncCareerViewport() {
    cancelTurn(); finishCover();
    section.classList.toggle('mobile-resume', mobileCareer.matches);
    mode = mobileCareer.matches ? 'all' : 'explore';
    index = mobileCareer.matches ? articles.length - 1 : 0;
    bookOpen = false;
    articles.forEach(article => { article.querySelector('details').open = true; article.tabIndex = -1; });
    timeline.tabIndex = mobileCareer.matches ? -1 : 0;
    consolePanel.querySelector('.passport-caption').textContent = mobileCareer.matches ? 'Jump to a role or school' : 'Choose a chapter';
    buttons.forEach(button => { button.querySelector('strong').textContent = mobileCareer.matches ? button.querySelector('span:last-child').textContent : {india:'Hyderabad','new-york':'New York',lincoln:'Lincoln',viome:'Bellevue',microsoft:'Redmond'}[button.dataset.passport]; });
    render();
  }
  mobileCareer.addEventListener('change', syncCareerViewport);
  section.classList.add('passport-ready');
  consolePanel.hidden = false;
  coverShell.hidden = false;
  syncCareerViewport();
  revealHash(location.hash);
  render();
})();

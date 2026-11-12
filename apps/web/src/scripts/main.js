// ---------- UI (no dependencies) ----------
(function(){
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vt=f=>document.startViewTransition&&!RM?document.startViewTransition(f):f();

// @include scripts/ui/mobile-menu.js
// @include scripts/ui/cursor.js
// @include scripts/ui/hud.js
// @include scripts/demos/web.js
// @include scripts/demos/app.js
// @include scripts/demos/video.js
// @include scripts/demos/ai.js
// @include scripts/demos/call.js
// @include scripts/ui/tilt.js
// @include features/contact/contact.js
// @include features/work/work.js
// @include features/work/demos/clinica.js
// @include scripts/ui/legal-dialog.js
})();

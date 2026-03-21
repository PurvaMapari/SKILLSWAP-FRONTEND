/* ════════════════════════════════════════
   MAIN.JS — SkillSwap
   Mobile nav · Carousel · Mockup tiles
   ════════════════════════════════════════ */

/* ── MOBILE NAV ── */
(function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!navToggle || !navLinks) return;

    // Inject mobile-open styles once
    const s = document.createElement('style');
    s.textContent = `
    @media (max-width: 900px) {
      .nav-links.mob-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 66px; left: 0; right: 0;
        background: rgba(14,14,14,0.97);
        backdrop-filter: blur(18px);
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        gap: 1rem;
        z-index: 998;
      }
    }
  `;
    document.head.appendChild(s);

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mob-open');
    });

    document.addEventListener('click', e => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('mob-open');
        }
    });
})();


/* ── CAROUSEL ── */
(function () {
    const cards = [
        { emoji: '⛸️', title: 'Skater', bg: '#06b6d4', pill: 'Like to learn Dance' },
        { emoji: '🎨', title: 'UI/UX Designer', bg: '#F97316', pill: 'Like to learn Guitar' },
        { emoji: '🎸', title: 'Guitarist', bg: '#10b981', pill: 'Like to learn Language' },
        { emoji: '🎹', title: 'Pianist', bg: '#ef4444', pill: 'Like to learn Designing' },
        { emoji: '💃', title: 'Dancer', bg: '#8b5cf6', pill: 'Like to learn Skating' },
    ];

    let current = 1;
    const positions = ['side-far', 'side', 'center', 'side', 'side-far'];

    function updateCarousel() {
        const wraps = document.querySelectorAll('.sc-wrap');
        if (!wraps.length) return;

        wraps.forEach((wrap, i) => {
            const idx = (current + i - 2 + cards.length) % cards.length;
            const c = cards[idx];

            wrap.className = 'sc-wrap ' + positions[i];
            wrap.querySelector('.sc-emoji').textContent = c.emoji;
            wrap.querySelector('.sc-title').textContent = c.title;
            wrap.querySelector('.sc-pill').textContent = c.pill;
            wrap.querySelector('.sc-glow').style.background =
                `radial-gradient(circle, ${c.bg}, transparent)`;
            wrap.querySelector('.sc-otitle').textContent = c.title;
            wrap.querySelector('.sc-opill').textContent = c.pill;
        });
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            current = (current - 1 + cards.length) % cards.length;
            updateCarousel();
        });
        nextBtn.addEventListener('click', () => {
            current = (current + 1) % cards.length;
            updateCarousel();
        });
        updateCarousel();
    }
})();


/* ── MOCKUP TILE CLICK ── */
(function () {
    document.querySelectorAll('.mtile').forEach(tile => {
        tile.addEventListener('click', () => {
            document.querySelectorAll('.mtile').forEach(x => x.classList.remove('active'));
            tile.classList.add('active');
        });
    });
})();

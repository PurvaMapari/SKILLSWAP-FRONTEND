let dropdownTimer;

$('.nav-menu-btn').on('click', function (e) {
    e.stopPropagation();

    const menu = $('.dropdown-menu');

    // Toggle menu
    menu.toggleClass('open');

    // Clear previous timer
    clearTimeout(dropdownTimer);

    // Set new timer ONLY if opened
    if (menu.hasClass('open')) {
        dropdownTimer = setTimeout(() => {
            menu.removeClass('open');
        }, 3000);
    }
});

// ONE combined document click (IMPORTANT)
$(document).on('click', function (e) {

    // MOBILE NAV
    if (!$(e.target).closest('.nav-toggle, #navLinks').length) {
        $('#navLinks').removeClass('mob-open');
    }

    // DROPDOWN
    if (!$(e.target).closest('.nav-dropdown').length) {
        $('.dropdown-menu').removeClass('open');
        clearTimeout(dropdownTimer);
    }

});

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

    function nextSlide() {
        current = (current + 1) % cards.length;
        updateCarousel();
    }

    function prevSlide() {
        current = (current - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    $(document).ready(function () {

        if (!$('#prevBtn, #nextBtn').length) return;

        // ── Button click ──
        $('#nextBtn').on('click', nextSlide);
        $('#prevBtn').on('click', prevSlide);

        // ── NEW JS FEATURE 1: Auto-play with setInterval ──
        let autoPlay = setInterval(nextSlide, 3500);

        // Pause on hover over the carousel section
        $('.sc-wrap, #prevBtn, #nextBtn').on('mouseenter', function () {
            clearInterval(autoPlay);
        }).on('mouseleave', function () {
            autoPlay = setInterval(nextSlide, 3500);
        });

        // ── NEW JS FEATURE 2: Keyboard Arrow Navigation ──
        $(document).on('keydown', function (e) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // ── NEW JS FEATURE 3: Touch Swipe Support ──
        let touchStartX = 0;
        const carouselEl = document.querySelector('.sc-wrap');
        if (carouselEl) {
            document.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].clientX;
            }, { passive: true });

            document.addEventListener('touchend', function (e) {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {   // 50px threshold
                    diff > 0 ? nextSlide() : prevSlide();
                }
            }, { passive: true });
        }

        updateCarousel();

    });

})();


$(document).ready(function () {

    /* ── Fix: declare activeCat properly ── */
    let activeCat = 'all';


    /* ----------------------------------------------------------
       JQUERY FEATURE 1 — .mtile Active State (explore page)
       WAS: separate $(document).ready block
       NOW: merged here, uses .on() instead of .click()
    ---------------------------------------------------------- */
    $('.mtile').on('click', function () {
        $('.mtile').removeClass('active');
        $(this).addClass('active');
    });


    /* ----------------------------------------------------------
       JQUERY FEATURE 2 — Category Pills (explore page)
       No change in logic, but now properly scoped with let activeCat
    ---------------------------------------------------------- */
    $('.cat-pill').on('click', function () {
        $('.cat-pill').removeClass('active');
        $(this).addClass('active');
        activeCat = $(this).data('cat');
        applyFilters();
    });


    /* ----------------------------------------------------------
       JQUERY FEATURE 3 — Dropdown Menu in Navbar
       WAS: separate $(document).ready block
       NOW: merged here
    ---------------------------------------------------------- */
    $('.nav-menu-btn').on('click', function (e) {
        e.stopPropagation();
        $('.dropdown-menu').toggleClass('open');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.nav-dropdown').length) {
            $('.dropdown-menu').removeClass('open');
        }
    });


    /* ----------------------------------------------------------
       IMPROVED — Form Validation (login, signup, contact pages)
       WAS: used browser alert() — ugly, blocks the thread.
       NOW: uses inline showToast() for a modern UX.
            Also highlights invalid fields in red.
    ---------------------------------------------------------- */
    $('#loginForm, #signupForm, #contactForm').on('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Reset previous error states
        $(this).find('input, textarea').removeClass('field-error field-ok');
        $(this).find('input[required], textarea[required]').each(function () {

            const value = $(this).val().trim();
            const id = $(this).attr('id');

            $(this).removeClass('field-ok field-error');

            // ❌ Empty
            if (value === '') {
                $(this).addClass('field-error');
                isValid = false;
            }

            // ❌ Email check
            else if (id === 'email') {
                if (!isValidEmail(value)) {
                    $(this).addClass('field-error');
                    isValid = false;
                } else {
                    $(this).addClass('field-ok');
                }
            }

            // ❌ Password check
            else if (id === 'password') {
                if (value.length < 6) {
                    $(this).addClass('field-error');
                    isValid = false;
                } else {
                    $(this).addClass('field-ok');
                }
            }

            // ✅ Other fields
            else {
                $(this).addClass('field-ok');
            }
        });

        if (!isValid) {
            showToast('⚠ Please fill in all required fields.', 'error');
            return; // 🚨 STOP HERE (VERY IMPORTANT)
        }

        showToast('✓ Form submitted successfully!', 'success');

        // ✅ Redirect ONLY on success
        setTimeout(() => {
            window.location.href = 'pages/home.html';
        }, 1000);
    });


    /* ----------------------------------------------------------
       NEW JS FEATURE 4 — Real-time Input Validation Feedback
       Highlights field green/red as the user types.
       Uses JS input event + classList for instant feedback.
    ---------------------------------------------------------- */
    // ✅ Real-time validation (EMAIL + PASSWORD)

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Email validation function
    function isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    // Email input check
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            const value = this.value.trim();

            this.classList.remove('field-ok', 'field-error');

            if (value === '') {
                this.classList.add('field-error');
            }
            else if (isValidEmail(value)) {
                this.classList.add('field-ok');
            }
            else {
                this.classList.add('field-error');
            }
        });
    }

    // Password input check
    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const value = this.value.trim();

            this.classList.remove('field-ok', 'field-error');

            if (value.length >= 6) {
                this.classList.add('field-ok');
            } else {
                this.classList.add('field-error');
            }
        });
    }


    /* ----------------------------------------------------------
       NEW JQUERY FEATURE 4 — Sticky Navbar Shrink on Scroll
       Adds .scrolled class to navbar after scrolling 60px.
       In your CSS add:  .navbar.scrolled { padding: 6px 28px; }
    ---------------------------------------------------------- */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('.navbar, nav.navbar').addClass('scrolled');
        } else {
            $('.navbar, nav.navbar').removeClass('scrolled');
        }

        // Back-to-top button visibility
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn(200);
        } else {
            $('#backToTop').fadeOut(200);
        }
    });


    /* ----------------------------------------------------------
       NEW JQUERY FEATURE 5 — Smooth Scroll for Anchor Links
       Any <a href="#section"> will smoothly animate to that section.
    ---------------------------------------------------------- */
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate(
                { scrollTop: target.offset().top - 70 },
                500,
                'swing'
            );
        }
    });


    /* ----------------------------------------------------------
       NEW JQUERY FEATURE 6 — Back-to-Top Button
       Add <button id="backToTop">↑</button> to your HTML.
       Style it as a fixed circle button in your CSS.
    ---------------------------------------------------------- */
    $('body').append('<button id="backToTop" title="Back to top">↑</button>');
    $('#backToTop').hide().on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 400);
    });


    /* ----------------------------------------------------------
       NEW JQUERY FEATURE 7 — Skill Card Tilt Effect
       Cards tilt slightly based on mouse position inside the card.
       Uses jQuery mousemove + CSS transform.
    ---------------------------------------------------------- */
    $(document).on('mousemove', '.skill-card, .sc-wrap.center', function (e) {
        const card = $(this);
        const offset = card.offset();
        const cw = card.outerWidth();
        const ch = card.outerHeight();
        const mx = e.pageX - offset.left - cw / 2;
        const my = e.pageY - offset.top - ch / 2;
        const rotX = -(my / ch) * 12;   // max 12deg tilt
        const rotY = (mx / cw) * 12;
        card.css('transform', `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`);
    });

    $(document).on('mouseleave', '.skill-card, .sc-wrap.center', function () {
        $(this).css('transform', '');
    });


    /* ----------------------------------------------------------
       NEW JQUERY FEATURE 8 — Live Search / Filter
       Add <input id="skillSearch" placeholder="Search skills…"> in HTML.
       Filters any element with class .skill-card in real time.
    ---------------------------------------------------------- */
    $('#skillSearch').on('input', function () {
        const q = $(this).val().toLowerCase().trim();
        $('.skill-card').each(function () {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(q));
        });
    });


    /* ----------------------------------------------------------
       NEW JQUERY FEATURE 9 — Character Counter for Textarea
       Add data-maxlength="200" on your <textarea> in HTML.
       Auto-appends a small counter below.
    ---------------------------------------------------------- */
    $('textarea[data-maxlength]').each(function () {
        const max = parseInt($(this).data('maxlength'));
        const counter = $('<span class="char-counter">0 / ' + max + '</span>');
        $(this).after(counter);

        $(this).on('input', function () {
            const len = $(this).val().length;
            counter.text(len + ' / ' + max);
            if (len > max * 0.9) {
                counter.css('color', '#ef4444');   // red when near limit
            } else {
                counter.css('color', '');
            }
            if (len > max) {
                $(this).val($(this).val().substring(0, max)); // hard cap
                counter.text(max + ' / ' + max);
            }
        });
    });


    /* ----------------------------------------------------------
       NEW JQUERY FEATURE 10 — Skeleton Loader Removal
       If you add skeleton shimmer divs with class .skeleton
       they fade out and are removed once the page is ready.
    ---------------------------------------------------------- */
    $('.skeleton').fadeOut(400, function () {
        $(this).remove();
    });


}); // END single $(document).ready()


/* ============================================================
   SECTION 4 — NEW JS FEATURES (outside jQuery ready)
   ============================================================ */

/* ----------------------------------------------------------
   NEW JS FEATURE 5 — IntersectionObserver: Scroll Animations
   Elements with class .reveal animate in when scrolled into view.
   Add class="reveal" to any section/card in your HTML.
   In CSS add:
     .reveal { opacity: 0; transform: translateY(30px); transition: opacity .5s, transform .5s; }
     .reveal.visible { opacity: 1; transform: none; }
---------------------------------------------------------- */
(function () {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
})();


/* ----------------------------------------------------------
   NEW JS FEATURE 6 — Theme Toggle (Dark / Light)
   Add <button id="themeToggle">🌙</button> to your navbar.
   Reads/writes to localStorage so preference persists.
   In CSS add body.light { ... } overrides.
---------------------------------------------------------- */
(function () {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    // Restore saved preference on load
    if (localStorage.getItem('ss_theme') === 'light') {
        document.body.classList.add('light');
        btn.textContent = '☀️';
    }

    btn.addEventListener('click', function () {
        const isLight = document.body.classList.toggle('light');
        localStorage.setItem('ss_theme', isLight ? 'light' : 'dark');
        btn.textContent = isLight ? '☀️' : '🌙';
    });
})();

(function () {

    // Create container once
    if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    window.showToast = function (message, type) {
        type = type || 'success';
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.textContent = message;
        document.getElementById('toast-container').appendChild(toast);

        // Trigger animation on next frame
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                toast.classList.add('show');
            });
        });

        // Auto-remove after 3 seconds
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 350);
        }, 3000);
    };

})();


/* ----------------------------------------------------------
   NEW JS FEATURE 8 — Debounce Utility
   Used internally to prevent the search filter from firing
   on every single keystroke. Improves performance.
   A general-purpose utility you can use anywhere.
   Usage: const debouncedFn = debounce(myFn, 300);
---------------------------------------------------------- */
function debounce(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...arguments), delay);
    };
}

// Apply debounce to live search (overrides the inline handler)
$(document).ready(function () {
    $('#skillSearch').off('input').on('input', debounce(function () {
        const q = $(this).val().toLowerCase().trim();
        $('.skill-card').each(function () {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(q));
        });
    }, 250));
});

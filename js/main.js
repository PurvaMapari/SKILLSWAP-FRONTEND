$(document).ready(function () {

    let dropdownTimer;

    $('.nav-menu-btn').on('click', function (e) {
        e.stopPropagation();

        const menu = $('.dropdown-menu');
        menu.toggleClass('open');

        clearTimeout(dropdownTimer);

        if (menu.hasClass('open')) {
            dropdownTimer = setTimeout(() => {
                menu.removeClass('open');
            }, 3000);
        }
    });

    $(document).on('click', function (e) {

        if (!$(e.target).closest('.nav-toggle, #navLinks').length) {
            $('#navLinks').removeClass('mob-open');
        }

        if (!$(e.target).closest('.nav-dropdown').length) {
            $('.dropdown-menu').removeClass('open');
            clearTimeout(dropdownTimer);
        }

    });

});

/* ============================================================

   ============================================================ */

$(document).ready(function () {
    // filter design, code in explore page
    /* ── Fix: declare activeCat properly ── */
    let activeCat = 'all';


    //---------------------------------------------------------- */
    $('.mtile').on('click', function () {
        $('.mtile').removeClass('active');
        $(this).addClass('active');
    });



    //---------------------------------------------------------- */
    $('.cat-pill').on('click', function () {
        $('.cat-pill').removeClass('active');
        $(this).addClass('active');
        activeCat = $(this).data('cat');
        applyFilters();
    });


    /* ----------------------------------------------------------
       
    ---------------------------------------------------------- */
    let dropdownTimer;

    $('.nav-menu-btn').on('click', function (e) {
        e.stopPropagation();

        const menu = $('.dropdown-menu');
        menu.toggleClass('open');

        // auto close after 5 sec
        clearTimeout(dropdownTimer);
        if (menu.hasClass('open')) {
            dropdownTimer = setTimeout(() => {
                menu.removeClass('open');
            }, 5000);
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.nav-dropdown').length) {
            $('.dropdown-menu').removeClass('open');
            clearTimeout(dropdownTimer);
        }
    });

    $('#loginForm, #signupForm, #contactForm').on('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Reset previous error states
        $(this).find('input, textarea').removeClass('field-error field-ok');
        $(this).find('input[required], textarea[required]').each(function () {

            const value = $(this).val().trim();
            const id = $(this).attr('id');

            $(this).removeClass('field-ok field-error');

            if (value === '') {
                $(this).addClass('field-error');
                isValid = false;
            }

            else if (id === 'email') {
                if (!isValidEmail(value)) {
                    $(this).addClass('field-error');
                    isValid = false;
                } else {
                    $(this).addClass('field-ok');
                }
            }

            else if (id === 'password') {
                if (value.length < 6) {
                    $(this).addClass('field-error');
                    isValid = false;
                } else {
                    $(this).addClass('field-ok');
                }
            }

            else {
                $(this).addClass('field-ok');
            }
        });

        if (!isValid) {
            showToast('⚠ Please fill in all required fields.', 'error');
            return;
        }

        showToast('✓ Form submitted successfully!', 'success');

        setTimeout(() => {
            window.location.href = 'pages/home.html';
        }, 1000);
    });


    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    function isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

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
       
    ---------------------------------------------------------- */
    $('body').append('<button id="backToTop" title="Back to top">↑</button>');
    $('#backToTop').hide().on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 400);
    });


    /* ----------------------------------------------------------
      
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
       
    ---------------------------------------------------------- */
    $('#skillSearch').on('input', function () {
        const q = $(this).val().toLowerCase().trim();
        $('.skill-card').each(function () {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(q));
        });
    });


    /* ----------------------------------------------------------
      
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
      
    ---------------------------------------------------------- */
    $('.skeleton').fadeOut(400, function () {
        $(this).remove();
    });


});


/* ============================================================
  
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


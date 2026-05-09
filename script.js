// ============================================
// C4 GYM - PRELOADER & NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // --- PRELOADER ---
    var preloader = document.getElementById('preloader');

    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });

    // Fallback
    setTimeout(function () {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 3500);

    // --- NAVBAR SCROLL ---
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
        // --- HAMBURGER & MOBILE MENU ---
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- ACTIVE NAV LINK ON SCROLL ---
    var navAnchors = document.querySelectorAll('.nav-links a');
    var allSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 150;

        allSections.forEach(function (sec) {
            var top = sec.offsetTop;
            var height = sec.offsetHeight;
            var id = sec.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navAnchors.forEach(function (a) {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    });
        // --- HERO PARTICLES ---
    var particleBox = document.querySelector('.hero-content');

    if (particleBox) {
        var heroEl = document.querySelector('.hero');
        for (var i = 0; i < 25; i++) {
            var dot = document.createElement('div');
            dot.style.cssText = 'position:absolute;width:' + (2 + Math.random() * 4) + 'px;height:' + (2 + Math.random() * 4) + 'px;background:#ff2d2d;border-radius:50%;opacity:0.25;z-index:1;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;animation:particleDrift ' + (4 + Math.random() * 5) + 's ease-in-out infinite;animation-delay:' + (Math.random() * 5) + 's;';
            heroEl.appendChild(dot);
        }

        var styleEl = document.createElement('style');
        styleEl.textContent = '@keyframes particleDrift{0%,100%{transform:translateY(0) scale(1);opacity:0.2;}50%{transform:translateY(-90px) scale(1.4);opacity:0.6;}}';
        document.head.appendChild(styleEl);
    }

    // --- STAT COUNTER ---
    var statNums = document.querySelectorAll('.hero-stat-num');
    var counted = false;

    function runCounters() {
        statNums.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'));
            var step = target / 120;
            var current = 0;

            function tick() {
                current += step;
                if (current < target) {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = target;
                }
            }

            tick();
        });
    }

    var heroObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !counted) {
                counted = true;
                runCounters();
            }
        });
    }, { threshold: 0.4 });

    var heroSec = document.querySelector('.hero');
    if (heroSec) { heroObs.observe(heroSec); }
        // --- SCROLL ANIMATIONS ---
    var animItems = document.querySelectorAll(
        '.service-card, .service-card-full, .plan-card, .contact-item, .gallery-item, .about-feature, .social-card, .about-img-wrap, .about-text'
    );

    animItems.forEach(function (el) {
        el.classList.add('anim-up');
    });

    var scrollObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var d = entry.target.getAttribute('data-delay') || 0;
                setTimeout(function () {
                    entry.target.classList.add('visible');
                }, parseInt(d));
                scrollObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    animItems.forEach(function (el) {
        scrollObs.observe(el);
    });

    // --- BACK TO TOP ---
    var topBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });
        // --- QUOTES CAROUSEL DUPLICATION ---
    var qTrack = document.getElementById('quotesTrack');
    if (qTrack) {
        var originalCards = qTrack.innerHTML;
        qTrack.innerHTML = originalCards + originalCards;
    }

}); // END DOMContentLoaded

// ============================================
// MEMBERSHIP POPUP
// ============================================

function openMembershipPopup() {
    var popup = document.getElementById('membershipPopup');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Scroll to contact section behind popup
    setTimeout(function () {
        var contactEl = document.getElementById('contact');
        if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 350);
}

function closeMembershipPopup() {
    var popup = document.getElementById('membershipPopup');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close popup on overlay click
document.addEventListener('click', function (e) {
    var popup = document.getElementById('membershipPopup');
    if (e.target === popup) {
        closeMembershipPopup();
    }
});

// Close on ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMembershipPopup();

        var ham = document.getElementById('hamburger');
        var mob = document.getElementById('mobileMenu');
        if (mob && mob.classList.contains('active')) {
            ham.classList.remove('active');
            mob.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});
// ============================================
// SHARE FUNCTION
// ============================================

function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'C4 GYM - Rawalpindi',
            text: 'Check out C4 GYM - The best gym in Rawalpindi! 5.0 Rated.',
            url: window.location.href
        }).catch(function () {});
    } else {
        var ta = document.createElement('textarea');
        ta.value = 'C4 GYM - Best gym in Rawalpindi!\n22 No. Chungi Rd, Cantt\nCall: 0317 5793957\n' + window.location.href;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);

        var note = document.createElement('div');
        note.textContent = '✓ Link copied!';
        note.style.cssText = 'position:fixed;bottom:75px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#ff2d2d,#ff6b35);color:white;padding:11px 22px;border-radius:50px;font-family:Oswald,sans-serif;letter-spacing:1px;z-index:99999;font-size:0.88rem;box-shadow:0 5px 18px rgba(255,45,45,0.4);';
        document.body.appendChild(note);

        setTimeout(function () {
            note.style.opacity = '0';
            note.style.transition = 'opacity 0.4s';
            setTimeout(function () {
                document.body.removeChild(note);
            }, 400);
        }, 2000);
    }
    }

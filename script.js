// ============================================
// C4 GYM - PREMIUM WEBSITE JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(function () {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });

    // Fallback in case load event already fired
    setTimeout(function () {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 3000);
      // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Scroll effect on navbar
    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu on link click
    mobileNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
      // ============================================
    // HERO PARTICLES
    // ============================================
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ============================================
    // STAT COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    function animateCounters() {
        statNumbers.forEach(function (stat) {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            }

            updateCounter();
        });
    }

    // Intersection Observer for stats
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !statsCounted) {
                    statsCounted = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(heroSection);
      }
      // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const animateElements = document.querySelectorAll('.service-card, .plan-card, .contact-card, .gallery-item, .feature-item, .social-card');

    animateElements.forEach(function (el) {
        el.classList.add('animate-on-scroll');
    });

    const scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(function () {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(function (el) {
        scrollObserver.observe(el);
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
      // ============================================
    // QUOTES SLIDER - Duplicate for infinite scroll
    // ============================================
    const quotesTrack = document.getElementById('quotesTrack');
    if (quotesTrack) {
        const quoteCards = quotesTrack.innerHTML;
        quotesTrack.innerHTML = quoteCards + quoteCards;
    }

}); // END of DOMContentLoaded

// ============================================
// MEMBERSHIP POPUP
// ============================================
function showMembershipPopup() {
    const popup = document.getElementById('membershipPopup');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Smooth scroll to contact section
    setTimeout(function () {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
}

function closeMembershipPopup() {
    const popup = document.getElementById('membershipPopup');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close popup on overlay click
document.addEventListener('click', function (e) {
    const popup = document.getElementById('membershipPopup');
    if (e.target === popup) {
        closeMembershipPopup();
    }
});

// Close popup on ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeMembershipPopup();
        // Also close mobile menu
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
      
    }// ============================================
// SHARE WEBSITE FUNCTION
// ============================================
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'C4 GYM - Rawalpindi',
            text: 'Check out C4 GYM - The best gym in Rawalpindi! 5.0 ★ Rated. Located at 22 No. Chungi Rd, Cantt.',
            url: window.location.href
        }).catch(function (err) {
            console.log('Share cancelled');
        });
    } else {
        // Fallback: copy to clipboard
        const textArea = document.createElement('textarea');
        textArea.value = 'C4 GYM - The best gym in Rawalpindi! 🏋️ 5.0 ★ Rated\n📍 22 No. Chungi Rd, opp. Cheezious, Cantt\n📞 0317 5793957\n' + window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Show a small notification
        var notification = document.createElement('div');
        notification.textContent = '✓ Link copied to clipboard!';
        notification.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#ff2d2d,#ff6b35);color:white;padding:12px 24px;border-radius:50px;font-family:Oswald,sans-serif;letter-spacing:1px;z-index:99999;font-size:0.9rem;box-shadow:0 5px 20px rgba(255,45,45,0.4);';
        document.body.appendChild(notification);
        setTimeout(function () {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease';
            setTimeout(function () {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }
            }
});

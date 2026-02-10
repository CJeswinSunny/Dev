/* ============================================
   MODERN ADVANCED PORTFOLIO - JAVASCRIPT
   GSAP + Lenis + Particles.js + Vanilla JS
   ============================================ */

// ============================================
// GSAP SETUP
// ============================================

gsap.registerPlugin(ScrollTrigger);

// ============================================
// LENIS SMOOTH SCROLLING
// ============================================

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sync Lenis scroll with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ============================================
// PARTICLES BACKGROUND
// ============================================

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles(count = 50) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 1.5,
                opacity: Math.random() * 0.3 + 0.1,
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`;
            ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        });

        animationId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
    });
}

initParticles();

// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.querySelector('.cursor');
const cursorBlur = document.querySelector('.cursor-blur');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';

    cursorBlur.style.left = cursorX - 20 + 'px';
    cursorBlur.style.top = cursorY - 20 + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
document.querySelectorAll('a, button, .link-btn').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.style.borderColor = '#ff006e';
        cursor.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.6)';
        cursorBlur.style.borderColor = 'rgba(255, 0, 110, 0.3)';
        cursorBlur.style.boxShadow = '0 0 40px rgba(255, 0, 110, 0.3)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.borderColor = '#00f0ff';
        cursor.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.6)';
        cursorBlur.style.borderColor = 'rgba(0, 240, 255, 0.2)';
        cursorBlur.style.boxShadow = '0 0 40px rgba(0, 240, 255, 0.3)';
    });
});

// ============================================
// NAVBAR & NAVIGATION
// ============================================

const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navMenu.classList.remove('active');

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            lenis.scrollTo(targetSection, {
                offset: -70,
                duration: 1.2,
            });
        }

        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    // Update active nav link
    let current = '';
    document.querySelectorAll('section[id]').forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// TYPING ANIMATION
// ============================================

const typingText = document.querySelector('.typing-text');
const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Creative Coder'];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(typeAnimation, 2000);
            return;
        }
    } else {
        typingText.textContent = currentRole.substring(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeAnimation, 500);
            return;
        }
    }

    setTimeout(typeAnimation, isDeleting ? 50 : 100);
}

typeAnimation();

// ============================================
// CTA BUTTON SCROLL
// ============================================

document.querySelector('.cta-button')?.addEventListener('click', () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        lenis.scrollTo(projectsSection, {
            offset: -70,
            duration: 1.2,
        });
    }
});

// ============================================
// SCROLL ANIMATIONS WITH GSAP
// ============================================

// About section animation
gsap.utils.toArray('.about-text p').forEach((element, index) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
    });
});

// Skills section animations
gsap.utils.toArray('.skill-category').forEach((element, index) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.15,
    });
});

// Animate progress bars
gsap.utils.toArray('.progress-bar .progress').forEach((element) => {
    const width = element.getAttribute('data-width');
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        width: 0,
        duration: 1,
        ease: 'power3.out',
    });
});

// Projects section animations
gsap.utils.toArray('.project-card').forEach((element, index) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: index * 0.1,
    });

    // Magnetic hover effect
    element.addEventListener('mouseenter', () => {
        gsap.to(element, {
            y: -10,
            duration: 0.3,
            overwrite: 'auto',
        });
    });

    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            y: 0,
            duration: 0.3,
            overwrite: 'auto',
        });
    });
});

// Timeline animations
gsap.utils.toArray('.timeline-item').forEach((element, index) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.6,
        delay: index * 0.1,
    });
});

// Contact form animations
gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: -50,
    duration: 0.6,
});

gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: 50,
    duration: 0.6,
});

// ============================================
// PARALLAX EFFECT
// ============================================

gsap.utils.toArray('section').forEach((section) => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            scrub: 1,
            markers: false,
        },
        y: window.innerHeight * 0.1,
    });
});

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner"></i>';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual backend)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Success message
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.style.color = '#00f0ff';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                formStatus.textContent = '';
            }, 3000);
        } catch (error) {
            formStatus.textContent = '✗ Error sending message. Please try again.';
            formStatus.style.color = '#ff006e';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Form focus animations
    document.querySelectorAll('.form-group input, .form-group textarea').forEach((input) => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                duration: 0.3,
                boxShadow: '0 2px 10px rgba(0, 240, 255, 0.3)',
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                duration: 0.3,
                boxShadow: 'none',
            });
        });
    });
}

// ============================================
// BUTTON MAGNETIC EFFECT
// ============================================

function createMagneticEffect(element) {
    let magneticX = 0;
    let magneticY = 0;

    element.addEventListener('mouseenter', function () {
        gsap.to(this, { duration: 0.4, overwrite: 'auto' });
    });

    element.addEventListener('mousemove', function (event) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        magneticX = (event.clientX - centerX) * 0.3;
        magneticY = (event.clientY - centerY) * 0.3;

        gsap.to(this, {
            x: magneticX,
            y: magneticY,
            duration: 0.6,
            overwrite: 'auto',
        });
    });

    element.addEventListener('mouseleave', function () {
        gsap.to(this, {
            x: 0,
            y: 0,
            duration: 0.6,
        });
    });
}

// Apply magnetic effect to buttons
document.querySelectorAll('.cta-button, .submit-btn, .project-btn').forEach((btn) => {
    createMagneticEffect(btn);
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    // Animate hero on load
    gsap.from('.hero-title', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
    });

    gsap.from('.hero-subtitle', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.1,
    });

    gsap.from('.hero-description', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.2,
    });

    gsap.from('.cta-button', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.3,
    });

    gsap.from('.scroll-indicator', {
        duration: 0.8,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.4,
    });
});

// ============================================
// SOCIAL LINKS ANIMATION
// ============================================

document.querySelectorAll('.social-link').forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            duration: 0.3,
            y: -5,
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            duration: 0.3,
            y: 0,
            boxShadow: 'none',
        });
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cWelcome to C Jeswin Sunny\'s Portfolio', 'font-size: 20px; color: #00f0ff; font-weight: bold;');
console.log('%cBuilt with GSAP, Lenis, and Particles.js', 'font-size: 14px; color: #00f0ff;');
console.log('%cLet\'s build something amazing together!', 'font-size: 12px; color: #00d4ff; font-style: italic;');

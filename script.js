/* ============================================
   MODERN PREMIUM PORTFOLIO - JAVASCRIPT
   Advanced Animations & Interactions
   ============================================ */

// ============================================
// CURSOR EFFECTS
// ============================================

const cursorFollower = document.querySelector('.cursor-follower');
const cursorDot = document.querySelector('.cursor-dot');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Move cursor dot immediately
    cursorDot.style.left = mouseX - 4 + 'px';
    cursorDot.style.top = mouseY - 4 + 'px';
});

// Smooth cursor follower animation
function animateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursorFollower.style.left = followerX - 15 + 'px';
    cursorFollower.style.top = followerY - 15 + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hide cursor on interactive elements
document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.btn') || e.target.closest('a')) {
        cursorFollower.style.borderColor = 'var(--neon-accent)';
        cursorFollower.style.boxShadow = 'var(--glow-accent), inset 0 0 10px rgba(255, 20, 147, 0.2)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.btn') || e.target.closest('a')) {
        cursorFollower.style.borderColor = 'var(--neon-primary)';
        cursorFollower.style.boxShadow = 'var(--glow-primary), inset 0 0 10px rgba(0, 217, 255, 0.2)';
    }
});

// ============================================
// TYPING ANIMATION
// ============================================

const typingText = document.querySelector('.typing-text');
const roles = [
    'Designer',
    'Creator',
    'Innovator',
    'Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        // Typing
        typingText.textContent = currentRole.substring(0, charIndex);
        charIndex++;

        if (charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(typeAnimation, 2000);
            return;
        }
    } else {
        // Deleting
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
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ============================================
// SKILL BARS ANIMATION
// ============================================

const skillBars = document.querySelectorAll('.skill-progress');

skillBars.forEach((bar, index) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = bar.style.width;
                bar.style.animation = `fillBar 1.5s ease-out ${index * 0.1}s forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(bar);
});

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
            link.style.color = 'var(--neon-primary)';
            link.style.textShadow = 'var(--glow-primary)';
        } else {
            link.style.color = 'var(--text-secondary)';
            link.style.textShadow = 'none';
        }
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
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        formStatus.textContent = 'Sending...';
        formStatus.style.color = 'var(--neon-primary)';

        try {
            // Simulate form submission (replace with actual backend call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success message
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formStatus.style.color = 'var(--neon-primary)';
            contactForm.reset();

            // Reset after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 5000);
        } catch (error) {
            // Error message
            formStatus.textContent = '✗ Error sending message. Please try again.';
            formStatus.style.color = 'var(--neon-accent)';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });

    // Add floating label interaction
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('.form-label').style.color = 'var(--neon-primary)';
            input.parentElement.querySelector('.form-label').style.textShadow = 'var(--glow-primary)';
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.querySelector('.form-label').style.color = 'var(--text-muted)';
                input.parentElement.querySelector('.form-label').style.textShadow = 'none';
            }
        });
    });
}

// ============================================
// HAMBURGER MENU (Mobile)
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const parallaxValue = element.getAttribute('data-parallax');
        const yPos = scrolled * parallaxValue;
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

const buttons = document.querySelectorAll('.btn, .project-link, .social-icon');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// PROJECT CARD INTERACTIONS
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ============================================
// RANDOM BLOB ANIMATION
// ============================================

// Create animated background blobs
const style = document.createElement('style');
style.textContent = `
    @keyframes blob-animation-1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    
    @keyframes blob-animation-2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-40px, 20px) scale(1.1); }
        66% { transform: translate(20px, -30px) scale(0.9); }
    }
    
    @keyframes blob-animation-3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(20px, 40px) scale(0.9); }
        66% { transform: translate(-30px, -20px) scale(1.1); }
    }
`;
document.head.appendChild(style);

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    // Animate hero content on page load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButtons = document.querySelector('.cta-buttons');

    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
        heroSubtitle.style.opacity = '0';
    }
    if (ctaButtons) {
        ctaButtons.style.animation = 'fadeInUp 0.8s ease 0.4s forwards';
        ctaButtons.style.opacity = '0';
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Heavy operations here if needed
    }, 150);
});

// ============================================
// ACCESSIBILITY
// ============================================

// Add keyboard navigation for buttons
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            element.click();
        }
    });
});

console.log('✓ Modern Portfolio Loaded - Premium Dark Theme');

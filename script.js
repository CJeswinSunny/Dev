// ============= CURSOR EFFECTS =============
const cursorFollower = document.querySelector('.cursor-follower');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor dot
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth cursor follower animation
let followerX = 0;
let followerY = 0;

function animate() {
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;

    cursorFollower.style.left = followerX - 15 + 'px';
    cursorFollower.style.top = followerY - 15 + 'px';

    requestAnimationFrame(animate);
}

animate();

// ============= NAVIGATION SCROLL =============
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============= LETTER ANIMATIONS =============
function animateLetters(element) {
    const words = element.querySelectorAll('.word');

    words.forEach((word, index) => {
        const letters = word.textContent.split('');
        word.innerHTML = '';

        letters.forEach((letter, letterIndex) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'letter-animate';
            span.style.animation = `slideInUp 0.6s ease ${0.05 * letterIndex}s forwards`;
            word.appendChild(span);
        });
    });
}

// Animate hero title on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title.animated-text');
    if (heroTitle) {
        animateLetters(heroTitle);
    }
});

// ============= INTERSECTION OBSERVER FOR ANIMATIONS =============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate section titles
            const title = entry.target.querySelector('.section-title.animated-text');
            if (title) {
                animateLetters(title);
            }

            // Animate about cards
            const aboutCards = entry.target.querySelectorAll('.about-card');
            aboutCards.forEach((card, index) => {
                card.style.animation = `slideInUp 0.6s ease ${0.1 * index}s forwards`;
            });

            // Animate stat boxes
            const statBoxes = entry.target.querySelectorAll('.stat-box');
            statBoxes.forEach((box, index) => {
                box.style.animation = `slideInUp 0.6s ease ${0.1 * index}s forwards`;
                animateNumbers(box);
            });

            // Animate portfolio cards
            const portfolioCards = entry.target.querySelectorAll('.portfolio-card');
            portfolioCards.forEach((card, index) => {
                card.style.animation = `slideInUp 0.6s ease ${0.05 * index}s forwards`;
            });

            // Animate testimonials
            const testimonialCards = entry.target.querySelectorAll('.testimonial-card');
            testimonialCards.forEach((card, index) => {
                card.style.animation = `slideInUp 0.6s ease ${0.1 * index}s forwards`;
            });

            // Animate contact items
            const contactItems = entry.target.querySelectorAll('.contact-item');
            contactItems.forEach((item, index) => {
                item.style.animation = `slideInUp 0.6s ease ${0.1 * index}s forwards`;
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.about, .portfolio, .testimonials, .contact, .stats-section').forEach(section => {
    observer.observe(section);
});

// ============= NUMBER COUNTER ANIMATION =============
function animateNumbers(element) {
    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return;

    const finalNumber = parseInt(numberElement.textContent.replace(/\D/g, ''));
    const suffix = numberElement.textContent.replace(/[0-9]/g, '');
    let currentNumber = 0;
    const increment = Math.ceil(finalNumber / 50);
    const speed = 30;

    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(counter);
        }
        numberElement.textContent = currentNumber + suffix;
    }, speed);
}

// ============= PARALLAX SCROLLING =============
function setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax'));
            const rect = element.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const elementOffset = element.offsetTop;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = (scrolled - elementOffset) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });

        // Parallax hero section
        const heroParallax = document.querySelector('.hero-parallax');
        if (heroParallax) {
            const scrolled = window.pageYOffset;
            heroParallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

setupParallax();

// ============= PORTFOLIO FILTERING =============
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Set first filter button as active by default
if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
}

// ============= FORM HANDLING =============
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', { name, email, subject, message });

        showFormStatus('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();

        // Clear other form elements styling
        setTimeout(() => {
            contactForm.querySelectorAll('input, textarea').forEach(field => {
                field.blur();
            });
        }, 100);
    });
}

function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.animation = 'slideInUp 0.3s ease';

        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
}

// ============= FORM INPUT EFFECTS =============
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Add placeholder to trigger label animation
    if (!input.hasAttribute('placeholder')) {
        input.setAttribute('placeholder', ' ');
    }

    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ============= SMOOTH SCROLL =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============= SCROLL PROGRESS ANIMATION =============
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #D4AF37, #A0692F);
    z-index: 999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
});

// ============= HOVER EFFECTS FOR CARDS =============
document.querySelectorAll('.hover-lift, .about-card, .portfolio-card, .testimonial-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });

    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============= NAVIGATION HIGHLIGHT ON SCROLL =============
function highlightNavLink() {
    const sections = document.querySelectorAll('section, .hero, .about, .portfolio, .testimonials, .contact');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============= HAMBURGER MENU =============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ============= LAZY LOADING IMAGES =============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============= PAGE LOAD ANIMATION =============
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============= SKILLS PROGRESS BAR ANIMATION =============
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width || '0';
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = `fillBar 1s ease forwards`;
                }, 10);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

animateSkillBars();

// ============= TABLET AND MOBILE RESPONSIVE =============
function handleResponsive() {
    const width = window.innerWidth;

    if (width <= 768) {
        // Disable parallax on mobile/tablet for better performance
        document.querySelectorAll('[data-parallax]').forEach(el => {
            el.style.transform = 'translateY(0)';
        });
    }
}

window.addEventListener('resize', handleResponsive);
handleResponsive();

// ============= DYNAMIC YEAR IN FOOTER =============
const yearElement = document.querySelector('.year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============= CLICK RIPPLE EFFECT =============
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;

    // Add ripple animation to styles if not present
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                from {
                    opacity: 1;
                    transform: scale(0);
                }
                to {
                    opacity: 0;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => ripple.remove());
}

document.querySelectorAll('.btn, .filter-btn, .social-link').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ============= PRELOAD IMAGES =============
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.src || img.dataset.src;
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}

window.addEventListener('load', preloadImages);

// ============= SCROLL REVEAL ANIMATIONS =============
const revealElements = document.querySelectorAll('[data-reveal]');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ============= PAGE VISIBILITY CHECK =============
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not active
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// ============= TOUCH DEVICE HANDLING =============
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    // Disable hover effects on touch devices and use active states instead
    document.querySelectorAll('.btn, .portfolio-card, .social-link').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// ============= KEYBOARD NAVIGATION =============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu && navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        }
    }

    // Tab key highlighting
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

console.log('Portfolio initialized successfully!');

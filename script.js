// Google Antigravity Cursor Effect
class CursorTrail {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9998';
        document.body.appendChild(this.canvas);
        
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Create particles on mouse movement
        this.createParticles(e.clientX, e.clientY);
    }
    
    createParticles(x, y) {
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.random() * Math.PI * 2);
            const velocity = 2 + Math.random() * 4;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1.0,
                size: 2 + Math.random() * 3,
                color: this.randomGoldenColor()
            });
        }
    }
    
    randomGoldenColor() {
        const colors = [
            'rgba(212, 175, 55, ',
            'rgba(200, 160, 40, ',
            'rgba(220, 190, 70, ',
            'rgba(180, 140, 30, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.size *= 0.98;
            
            // Draw particle with fade
            this.ctx.fillStyle = p.color + p.life + ')';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Remove dead particles
            if (p.life <= 0 || p.size <= 0.5) {
                this.particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor trail
const cursorTrail = new CursorTrail();

// Cursor Dot & Ring
const cursorDot = document.querySelector('.cursor-dot');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position cursor dot
    cursorDot.style.left = mouseX - 6 + 'px';
    cursorDot.style.top = mouseY - 6 + 'px';
});

// Animate follower with delay
function animateFollower() {
    let dx = mouseX - followerX;
    let dy = mouseY - followerY;
    
    followerX += dx * 0.2;
    followerY += dy * 0.2;
    
    cursorFollower.style.left = followerX - 20 + 'px';
    cursorFollower.style.top = followerY - 20 + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Hide cursor on hover of interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '0.4';
        cursorFollower.style.opacity = '0.3';
        cursorFollower.style.borderColor = 'var(--primary)';
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0.8';
        cursorFollower.style.opacity = '0.6';
        cursorFollower.style.borderColor = 'var(--gold)';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
});

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const counters = document.querySelectorAll('.counter');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
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
});

// Portfolio Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            item.classList.remove('hidden');
            if (filterValue !== 'all' && item.getAttribute('data-category') !== filterValue) {
                item.classList.add('hidden');
            }
        });
    });
});

// Counter Animation
function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        
        const increment = target / 50;
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 30);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Intersection Observer for Counter Animation
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(statsSection);
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formStatus = contactForm.querySelector('.form-status');
        
        // Simulate form submission
        formStatus.textContent = 'Sending...';
        formStatus.classList.remove('success', 'error');
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.classList.add('success');
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1000);
    });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('[class*="fade-in"], [class*="slide-in"], .text-reveal');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const blobs = document.querySelectorAll('.gradient-blob');
    
    blobs.forEach((blob, index) => {
        blob.style.transform = `translateY(${scrollY * (0.5 + index * 0.1)}px)`;
    });
});

// Add scroll event listener for navbar shadow
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 0) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');
});

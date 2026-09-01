// ============================================
// Smooth scrolling for navigation links
// ============================================

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

// ============================================
// Navbar active link update on scroll
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Fade-in animation on scroll
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe career items, certificate cards, and skill items
document.querySelectorAll('.career-item, .certificate-card, .skill-item, .highlight-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// Add fade-in animation keyframes
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-link.active {
        color: #d4af37;
        border-bottom: 2px solid #d4af37;
    }
`;
document.head.appendChild(style);

// ============================================
// Mobile menu toggle (if needed)
// ============================================

const toggleMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
};

// ============================================
// Scroll to top button
// ============================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #d4af37;
    color: #1a1a1a;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 99;
    display: none;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
        setTimeout(() => {
            scrollTopBtn.style.opacity = '1';
        }, 10);
    } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => {
            scrollTopBtn.style.display = 'none';
        }, 300);
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ============================================
// Page load animation
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
// Force page to start at top on reload
window.history.scrollRestoration = 'manual';

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
/* ==========================================
   TECHNO-NOIR PORTFOLIO - JAVASCRIPT
   Matrix-inspired interactions and animations
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    function isMobile() {
  return window.innerWidth <= 768;
}

    initParticles();
    initSpotlight();
    initHeroAnimations();
    initCertificateMarquees();
    initCertModal();
    initScrollAnimations();
    initProjectCards();
    initProjectModal();
    initViewAllProjects();
    initContactAnimations();
    initNavigation();
});

/* ==========================================
   PARTICLE CANVAS ANIMATION
   Subtle floating particles in background
   ========================================== */

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle array
    const particles = [];
    const particleCount = 50;
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 255, 65, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 255, 65, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* ==========================================
   SPOTLIGHT EFFECT
   Follows mouse on desktop
   ========================================== */

function initSpotlight() {
    const spotlight = document.querySelector('.spotlight');
    
    // Only enable on desktop
    if (window.innerWidth > 768) {
        let mouseX = 0;
        let mouseY = 0;
        let spotX = 0;
        let spotY = 0;
        
        // Track mouse position
       document.addEventListener('mousemove', (e) => {
    const spotlightSize = 700;
    const x = e.clientX - spotlightSize / 2;
    const y = e.clientY - spotlightSize / 2;

    spotlight.animate(
        { transform: `translate(${x}px, ${y}px)` },
        { duration: 80, fill: 'forwards', easing: 'ease-out' }
    );
});
        
        // Show spotlight when mouse enters hero section
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mouseenter', () => {
            spotlight.style.opacity = '1';
        });
        
        heroSection.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });
        
        // Animate spotlight with smooth delay
        function animateSpotlight() {
            // Ease towards mouse position
            const dx = mouseX - spotX;
            const dy = mouseY - spotY;
            
            spotX += dx * 0.1;
            spotY += dy * 0.1;
            
            spotlight.style.left = spotX + 'px';
            spotlight.style.top = spotY + 'px';
            
            requestAnimationFrame(animateSpotlight);
        }
        
        animateSpotlight();
    }
}

/* ==========================================
   HERO SECTION ANIMATIONS
   Entrance animations for text and image
   ========================================== */

function initHeroAnimations() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero text
    gsap.to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'expo.out'
    });
    
    // Animate hero image
   gsap.fromTo(
  '.hero-image-container',
  {
    opacity: 0,
    y: 40,
    scale: 0.96
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top 70%',
      once: true
    }
  }
);

    
    // Animate scroll indicator
    gsap.to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out'
    });
}

/* ==========================================
   CERTIFICATE MARQUEES
   Auto-scrolling rows with pause on hover
   ========================================== */

function initCertificateMarquees() {
    const rows = document.querySelectorAll('.cert-row');
    
    rows.forEach(row => {
        const track = row.querySelector('.cert-track');
        const cards = Array.from(track.children);
        
        // ✅ FIXED: Mark original certificates before cloning
        cards.forEach(card => {
            card.setAttribute('data-original', 'true');
        });
        
        // Clone cards for seamless loop
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.removeAttribute('data-original'); // Remove marker from clones
            track.appendChild(clone);
        });
    });
}

/* ==========================================
   CERTIFICATE MODAL
   View all certificates in grid
   ========================================== */

function initCertModal() {
    const modal = document.getElementById('certModal');
    const openBtn = document.getElementById('viewAllCerts');
    const closeBtn = document.getElementById('closeModal');
    const overlay = modal.querySelector('.modal-overlay');
    const certGrid = modal.querySelector('.cert-grid');

    const viewer = document.getElementById('certImageViewer');
    const viewerImg = document.getElementById('viewerImage');  // ✅ FIXED: was certViewerImg

    function attachImageClicks(scope) {
        scope.querySelectorAll('.cert-card img').forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                viewerImg.src = img.src;
                viewer.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    openBtn.addEventListener('click', () => {
        certGrid.innerHTML = '';
        
        // ✅ FIXED: Only select ORIGINAL certificates (not clones from marquee)
        const originalCerts = document.querySelectorAll('.cert-card[data-original="true"]');

        originalCerts.forEach(cert => {
            const clone = cert.cloneNode(true);
            certGrid.appendChild(clone);
        });

        attachImageClicks(certGrid);

        modal.classList.add('active');
        gsap.fromTo(
            modal.querySelector('.modal-content'),
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'expo.out' }
        );
    });

    function closeModal() {
        modal.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    viewer.addEventListener('click', () => {
        viewer.classList.remove('active');
        viewerImg.src = '';
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
            viewer.classList.remove('active');
            viewerImg.src = '';
            document.body.style.overflow = '';
        }
    });

    attachImageClicks(document);
}


/* ==========================================
   SCROLL-TRIGGERED ANIMATIONS
   Timeline and section animations
   ========================================== */

function initScrollAnimations() {
    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

/* ==========================================
   PROJECT FAN CARDS - INTERACTIONS
   Mouse parallax, hover effects, click to open
   ========================================== */

function initProjectCards() {
    let isScrolling = false;
    let scrollTimeout;
    const fanContainer = document.getElementById('projectsFan');
    const fanCards = document.querySelectorAll('.project-fan-card');
    
    if (!fanContainer || fanCards.length === 0) return;
    
    // Animate cards on scroll
   gsap.to('.project-fan-card', {
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    scrollTrigger: {
        trigger: fanContainer,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
        onEnter: () => isScrolling = false,
        onLeave: () => isScrolling = true,
        onEnterBack: () => isScrolling = false,
        onLeaveBack: () => isScrolling = true
    }
});
    
    // Mouse parallax effect (desktop only)
    if (window.innerWidth > 768) {
        let mouseX = 0;
        let mouseY = 0;
        
        fanContainer.addEventListener('mousemove', (e) => {
    if (isScrolling) return;
            const rect = fanContainer.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            mouseY = (e.clientY - rect.top) / rect.height - 0.5;
            
            fanCards.forEach((card, index) => {
                const position = parseInt(card.getAttribute('data-position'));
                const centerPosition = 2; // Middle card
                const offset = position - centerPosition;
                
                // Don't apply parallax to hovered card
                if (!card.matches(':hover')) {
                    // Calculate parallax intensity based on distance from center
                    const parallaxX = mouseX * 30 * offset;
                    const parallaxY = mouseY * 20;
                    const rotateY = mouseX * 5 * offset;
                    
                    // Get base transform values
                    let baseTransforms = getBaseTransform(position);
                    
                    // Apply parallax on top of base transform
                    gsap.to(card, {
                        x: baseTransforms.x + parallaxX,
                        y: parallaxY,
                        rotateY: baseTransforms.rotateY + rotateY,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                }
            });
        });
        
        // Reset on mouse leave
        fanContainer.addEventListener('mouseleave', () => {
            fanCards.forEach((card, index) => {
                const position = parseInt(card.getAttribute('data-position'));
                let baseTransforms = getBaseTransform(position);
                
                if (!card.matches(':hover')) {
                    gsap.to(card, {
                        x: baseTransforms.x,
                        y: 0,
                        rotateY: baseTransforms.rotateY,
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
    
    // Click to open project modal
    fanCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // Hover effect - store hover position for CSS
    fanCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const position = parseInt(card.getAttribute('data-position'));
            const baseTransform = getBaseTransform(position);
            card.style.setProperty('--hover-x', baseTransform.x + 'px');
        });
        
        // ✅ FIX: Reset card position when mouse leaves
        card.addEventListener('mouseleave', () => {
            const position = parseInt(card.getAttribute('data-position'));
            const baseTransform = getBaseTransform(position);
            
            // Force reset to base position using GSAP
            gsap.to(card, {
                x: baseTransform.x,
                y: 0,
                z: baseTransform.z,
                rotateY: baseTransform.rotateY,
                rotateZ: baseTransform.rotateZ,
                scale: baseTransform.scale,
                duration: 0.6,
                ease: 'power2.out',
                clearProps: 'transform' // Clear inline styles after animation
            });
        });
    });
}

/* ==========================================
   HELPER - GET BASE TRANSFORM VALUES
   Returns position-based transform values
   ========================================== */

function getBaseTransform(position) {
    const transforms = {
        0: { x: -400, y: 0, z: -200, rotateY: 25, rotateZ: -8, scale: 0.85 },
        1: { x: -200, y: 0, z: -100, rotateY: 15, rotateZ: -4, scale: 0.92 },
        2: { x: 0, y: 0, z: 0, rotateY: 0, rotateZ: 0, scale: 1 },
        3: { x: 200, y: 0, z: -100, rotateY: -15, rotateZ: 4, scale: 0.92 },
        4: { x: 400, y: 0, z: -200, rotateY: -25, rotateZ: 8, scale: 0.85 }
    };
    
    // Adjust for responsive breakpoints
    if (window.innerWidth <= 1200 && window.innerWidth > 900) {
        const responsiveTransforms = {
            0: { x: -350, rotateY: 20, rotateZ: -6, scale: 0.88 },
            1: { x: -175, rotateY: 12, rotateZ: -3, scale: 0.94 },
            2: { x: 0, rotateY: 0, rotateZ: 0, scale: 1 },
            3: { x: 175, rotateY: -12, rotateZ: 3, scale: 0.94 },
            4: { x: 350, rotateY: -20, rotateZ: 6, scale: 0.88 }
        };
        return { ...transforms[position], ...responsiveTransforms[position] };
    } else if (window.innerWidth <= 900 && window.innerWidth > 768) {
        const responsiveTransforms = {
            0: { x: -300, rotateY: 15, rotateZ: -4, scale: 0.9 },
            1: { x: -150, rotateY: 8, rotateZ: -2, scale: 0.95 },
            2: { x: 0, rotateY: 0, rotateZ: 0, scale: 1 },
            3: { x: 150, rotateY: -8, rotateZ: 2, scale: 0.95 },
            4: { x: 300, rotateY: -15, rotateZ: 4, scale: 0.9 }
        };
        return { ...transforms[position], ...responsiveTransforms[position] };
    }
    
    return transforms[position] || transforms[2];
}

/* ==========================================
   OPEN PROJECT MODAL
   Displays project details
   ========================================== */

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const projectDetail = modal.querySelector('.project-detail');
    
    // Project data - Replace with your actual project details
    const projectData = {
        '1': {
            title: 'ESP32 Tic Tac Toe Server',
            desc: 'Real-time multiplayer tic tac toe game hosted on ESP32',
            tags: ['ESP32', 'WiFi', 'C++', 'IoT'],
            details: 'A lightweight game server running on ESP32 that enables multiplayer tic tac toe over WiFi using embedded networking.',
            image: 'PROJECT_01'
        },
        '2': {
            title: 'ESP32 Web Chatroom',
            desc: 'Embedded web-based chat application',
            tags: ['ESP32', 'WebSockets', 'HTML', 'Networking'],
            details: 'A real-time chatroom served directly from an ESP32, allowing multiple users to communicate over a local network.',
            image: 'PROJECT_02'
        },
        '3': {
            title: 'Weather App',
            desc: 'Live weather application using OpenWeatherMap API',
            tags: ['JavaScript', 'API', 'OpenWeather', 'Frontend'],
            details: 'A responsive weather app that fetches and displays real-time weather data using external APIs.',
            image: 'PROJECT_03'
        },
        '4': {
            title: 'Data Science Projects',
            desc: 'Machine learning and data analysis projects',
            tags: ['Python', 'Pandas', 'ML', 'EDA'],
            details: 'A collection of data science tasks including EDA, sentiment analysis, and predictive modeling using real-world datasets.',
            image: 'PROJECT_04'
        },
        '5': {
            title: 'Interactive Portfolio',
            desc: 'Cyberpunk-inspired personal portfolio',
            tags: ['UI/UX', 'JavaScript', 'CSS', 'Animation'],
            details: 'A visually rich portfolio showcasing projects, experience, and certifications with interactive animations.',
            image: 'PROJECT_05'
        },
        // ✅ ADD YOUR NEW PROJECTS HERE (Examples below - Replace with your actual projects)
        '6': {
            title: 'E-Commerce Platform',
            desc: 'Full-stack shopping solution with payment integration',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            details: 'A complete e-commerce platform with product management, shopping cart, secure checkout, and order tracking. Includes admin dashboard and customer reviews.',
            image: 'PROJECT_06'
        },
        '7': {
            title: 'Weather Dashboard',
            desc: 'Real-time weather tracking with forecasts',
            tags: ['Vue.js', 'API', 'Charts.js', 'PWA'],
            details: 'Interactive weather application with real-time updates, 7-day forecasts, and location-based services. Features beautiful data visualizations and works offline.',
            image: 'PROJECT_07'
        },
        '8': {
            title: 'Task Manager',
            desc: 'Collaborative project management tool',
            tags: ['Angular', 'Firebase', 'Material UI', 'PWA'],
            details: 'A powerful task management system with team collaboration, real-time updates, and project tracking. Includes kanban boards and timeline views.',
            image: 'PROJECT_08'
        },
        '9': {
            title: 'Social Media App',
            desc: 'Modern social networking platform',
            tags: ['React Native', 'GraphQL', 'PostgreSQL', 'AWS'],
            details: 'Full-featured social media application with posts, stories, messaging, and notifications. Built for both iOS and Android platforms.',
            image: 'PROJECT_09'
        },
        '10': {
            title: 'AI Chatbot',
            desc: 'Intelligent customer support assistant',
            tags: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
            details: 'Advanced chatbot using natural language processing for customer support. Features sentiment analysis, multi-language support, and learning capabilities.',
            image: 'PROJECT_10'
        }
        // Add more projects as needed - just copy the pattern above
    };
    
    const project = projectData[projectId];
    
    if (project) {
        projectDetail.innerHTML = `
            <div class="project-modal-image" style="width: 100%; height: 400px; margin-bottom: 2rem; background: linear-gradient(135deg, rgba(0, 255, 65, 0.05), rgba(173, 255, 0, 0.05)); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0, 255, 65, 0.2);">
                <div class="project-placeholder" style="font-family: var(--font-mono); font-size: 2rem; color: var(--color-text-dim);">${project.image}</div>
            </div>
            <h2 style="font-family: var(--font-mono); color: var(--color-primary); margin: 0 0 1rem; font-size: 2rem; letter-spacing: 2px;">${project.title}</h2>
            <p style="color: var(--color-text-dim); margin-bottom: 2rem; line-height: 1.8; font-size: 1.1rem;">${project.details}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
            <p style="color: var(--color-text); line-height: 1.8;">${project.desc}</p>
        `;
        
        modal.classList.add('active');
        gsap.fromTo(modal.querySelector('.project-modal-content'),
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'expo.out' }
        );
    }
}

/* ==========================================
   PROJECT MODAL
   Close functionality
   ========================================== */

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeProjectModal');
    const overlay = modal.querySelector('.modal-overlay');
    
    // Close modal
    function closeModal() {
        gsap.to(modal.querySelector('.project-modal-content'), {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
                modal.classList.remove('active');
            }
        });
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================
   VIEW ALL PROJECTS - GRID MODAL
   Opens grid view of all projects
   ========================================== */

function initViewAllProjects() {
    const viewAllBtn = document.getElementById('viewAllProjects');
    const gridModal = document.getElementById('projectGridModal');
    const closeBtn = document.getElementById('closeProjectGrid');
    const overlay = gridModal.querySelector('.modal-overlay');
    const gridView = gridModal.querySelector('.projects-grid-view');
    
    if (!viewAllBtn || !gridModal) return;
    
    // Open grid modal
    viewAllBtn.addEventListener('click', () => {
        // Clear and populate grid
        gridView.innerHTML = '';
        
        const allProjects = document.querySelectorAll('.project-fan-card');
        allProjects.forEach(project => {
            const clone = project.cloneNode(true);
            // Remove data-position attribute for grid view
            clone.removeAttribute('data-position');
            gridView.appendChild(clone);
            
            // Re-attach click handler for modal
            clone.addEventListener('click', () => {
                const projectId = clone.getAttribute('data-project');
                closeGridModal();
                setTimeout(() => openProjectModal(projectId), 300);
            });
        });
        
        // Show modal with animation
        gridModal.classList.add('active');
        gsap.fromTo(gridModal.querySelector('.modal-content'),
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'expo.out' }
        );
    });
    
    // Close grid modal
    function closeGridModal() {
        gsap.to(gridModal.querySelector('.modal-content'), {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
                gridModal.classList.remove('active');
            }
        });
    }
    
    closeBtn.addEventListener('click', closeGridModal);
    overlay.addEventListener('click', closeGridModal);
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gridModal.classList.contains('active')) {
            closeGridModal();
        }
    });
}

/* ==========================================
   CONTACT SECTION ANIMATIONS
   Animate contact items on scroll
   ========================================== */

function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animate contact text
    gsap.from('.contact-text', {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-text',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
}

/* ==========================================
   NAVIGATION
   Smooth scroll and active state
   ========================================== */

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const nav = document.querySelector('.main-nav');
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Hide/show nav on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/* ==========================================
   PERFORMANCE & RESPONSIVENESS
   ========================================== */

// Detect mobile and disable certain effects
const isMobile = window.innerWidth <= 768;

if (isMobile) {
    // Disable complex animations on mobile
    gsap.globalTimeline.timeScale(1.5);
}

// Handle resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('particle-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ==========================================
   CONSOLE MESSAGE
   ========================================== */

console.log(`
%c
┌─────────────────────────────────────┐
│                                     │
│   TECHNO-NOIR PORTFOLIO v1.0       │
│   System Status: ONLINE             │
│                                     │
│   Built with:                       │
│   • Vanilla JavaScript ES6          │
│   • GSAP + ScrollTrigger           │
│   • Matrix-inspired Design          │
│                                     │
│   [WELCOME TO THE MATRIX]          │
│                                     │
└─────────────────────────────────────┘
`,
'color: #00FF41; font-family: monospace; font-size: 12px; font-weight: bold;'
);
// Certificate Image Viewer - Init Function
function initCertificateViewer() {
    const certViewer = document.getElementById('certImageViewer');
    const viewerImage = document.getElementById('viewerImage');

    if (!certViewer || !viewerImage) return;

    // Use event delegation to handle clicks on original AND cloned certificates
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cert-img')) {
            e.stopPropagation();
            viewerImage.src = e.target.dataset.full || e.target.src;
            certViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close viewer on click
    certViewer.addEventListener('click', () => {
        certViewer.classList.remove('active');
        viewerImage.src = '';
        document.body.style.overflow = '';
    });

    // Close viewer on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certViewer.classList.contains('active')) {
            certViewer.classList.remove('active');
            viewerImage.src = '';
            document.body.style.overflow = '';
        }
    });
}

// Call it immediately
initCertificateViewer();

/* ==========================================
   MOBILE-SPECIFIC ENHANCEMENTS
   ========================================== */

// Mobile detection utility
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// Disable certificate marquee animation on mobile
function handleCertificateScrolling() {
  if (isMobileDevice()) {
    const certRows = document.querySelectorAll('.cert-row');
    certRows.forEach(row => {
      const track = row.querySelector('.cert-track');
      if (track) {
        track.style.animation = 'none';
      }
    });
  }
}

// Initialize mobile-specific features
function initMobileFeatures() {
  if (!isMobileDevice()) return;
  
  // Disable spotlight on mobile (redundant check)
  const spotlight = document.querySelector('.spotlight');
  if (spotlight) {
    spotlight.style.display = 'none';
  }
  
  // Handle certificate scrolling
  handleCertificateScrolling();
  
  // Add swipe indicator for projects
  addProjectSwipeIndicator();
  
  // Optimize animations for mobile
  if (typeof gsap !== 'undefined') {
    gsap.globalTimeline.timeScale(1.3);
  }
}

// Add visual hint for swipeable projects
function addProjectSwipeIndicator() {
  const projectsContainer = document.querySelector('.projects-fan-container');
  if (!projectsContainer || projectsContainer.children.length <= 1) return;
  
  const indicator = document.createElement('div');
  indicator.className = 'swipe-indicator-mobile';
  indicator.innerHTML = '<span>← Swipe →</span>';
  indicator.style.cssText = `
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 255, 65, 0.1);
    backdrop-filter: blur(8px);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-primary);
    pointer-events: none;
    opacity: 0;
    animation: fadeInOut 3s ease-in-out;
    z-index: 10;
  `;
  
  const projectsSection = document.querySelector('.projects-section');
  if (projectsSection) {
    projectsSection.style.position = 'relative';
    projectsSection.appendChild(indicator);
  }
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0%, 100% { opacity: 0; }
      20%, 80% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Remove indicator after first interaction
  projectsContainer.addEventListener('scroll', () => {
    indicator.remove();
  }, { once: true });
}

// Touch-friendly project card interactions
function enhanceProjectCardTouch() {
  if (!isMobileDevice()) return;
  
  const cards = document.querySelectorAll('.project-fan-card');
  cards.forEach(card => {
    // Prevent default hover animations
    card.addEventListener('touchstart', (e) => {
      e.currentTarget.style.transition = 'transform 0.2s ease';
    });
    
    card.addEventListener('touchend', (e) => {
      e.currentTarget.style.transition = '';
    });
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileFeatures();
    enhanceProjectCardTouch();
  });
} else {
  initMobileFeatures();
  enhanceProjectCardTouch();
}

// Re-initialize on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    handleCertificateScrolling();
  }, 250);
});
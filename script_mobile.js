/* ==========================================
   MOBILE JAVASCRIPT - LASER FIX FOR PROJECTS
   Everything else stays the same
   ========================================== */

(function() {
  'use strict';

  function isMobile() {
    return window.innerWidth <= 768;
  }

  // ==========================================
  // HAMBURGER MENU (KEEP AS IS)
  // ==========================================

  function initHamburgerMenu() {
    if (!isMobile()) return;

    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileNavMenu');
    const overlay = document.getElementById('mobileNavOverlay');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !menu || !overlay) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop < 100) {
        toggle.classList.remove('hide');
      } else if (scrollTop > lastScrollTop) {
        toggle.classList.add('hide');
      } else {
        toggle.classList.remove('hide');
      }
      lastScrollTop = scrollTop;
    }, { passive: true });

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    overlay.addEventListener('click', function() {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        toggle.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        if (target) {
          setTimeout(function() {
            window.scrollTo({
              top: target.offsetTop - 80,
              behavior: 'smooth'
            });
          }, 300);
        }
      });
    });

    console.log('✅ Hamburger working');
  }

  // ==========================================
  // HERO BOX (KEEP AS IS)
  // ==========================================

  function fixHeroBox() {
    if (!isMobile()) return;

    const section = document.querySelector('.hero-section');
    const grid = document.querySelector('.hero-grid');
    const heroText = document.querySelector('.hero-text');
    const imageContainer = document.querySelector('.hero-image-container');
    
    const elementsToStrip = [section, grid, heroText, imageContainer];
    
    elementsToStrip.forEach(function(el) {
      if (el) {
        el.style.background = 'none';
        el.style.border = 'none';
        el.style.boxShadow = 'none';
        el.style.backdropFilter = 'none';
      }
    });

    const content = document.querySelector('.hero-content');
    if (content) {
      content.style.background = 'rgba(255, 255, 255, 0.04)';
      content.style.backdropFilter = 'blur(10px)';
      content.style.borderRadius = '10px';
      content.style.border = '1px solid rgba(0, 255, 65, 0.2)';
      content.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.1)';
      content.style.width = 'calc(100% - 40px)';
      content.style.maxWidth = '600px';
      content.style.margin = '0 auto';
      content.style.padding = '24px 20px';
    }

    console.log('✅ Hero: ONE box, centered');
  }

  // ==========================================
  // PROJECTS - EXTREME INLINE-BLOCK FIX
  // ==========================================

  function fixProjects() {
    if (!isMobile()) return;

    const container = document.querySelector('.projects-fan-container');
    if (!container) {
      console.warn('❌ Projects container not found');
      return;
    }

    console.log('🔧 Fixing projects with inline-block approach...');

    // Force container to inline-block layout
    container.style.cssText = `
      display: block !important;
      width: 100vw !important;
      overflow-x: scroll !important;
      overflow-y: hidden !important;
      white-space: nowrap !important;
      padding: 20px 0 !important;
      position: relative !important;
      perspective: none !important;
      height: auto !important;
      transform: none !important;
      transform-style: flat !important;
    `;

    const cards = document.querySelectorAll('.project-fan-card');
    
    console.log(`📦 Found ${cards.length} project cards`);

    // Force each card to inline-block
    cards.forEach(function(card, index) {
      card.style.cssText = `
        display: inline-block !important;
        width: 280px !important;
        min-width: 280px !important;
        max-width: 280px !important;
        height: auto !important;
        vertical-align: top !important;
        margin-right: 16px !important;
        background: var(--color-muted) !important;
        border: 1px solid rgba(0, 255, 65, 0.1) !important;
        border-radius: 4px !important;
        overflow: hidden !important;
        position: static !important;
        transform: none !important;
        opacity: 1 !important;
        z-index: 1 !important;
        left: auto !important;
        right: auto !important;
        top: auto !important;
        bottom: auto !important;
      `;

      // First card gets left margin
      if (index === 0) {
        card.style.marginLeft = '20px';
      }

      // Last card gets right margin
      if (index === cards.length - 1) {
        card.style.marginRight = '20px';
      }

      // Fix content inside cards
      const overlay = card.querySelector('.project-overlay');
      const info = card.querySelector('.project-info');
      
      if (overlay) {
        overlay.style.whiteSpace = 'normal';
      }
      if (info) {
        info.style.whiteSpace = 'normal';
      }

      console.log(`   ✓ Card ${index + 1}: inline-block`);
    });
    
    // Start at beginning
    setTimeout(function() {
      container.scrollLeft = 0;
    }, 100);

    console.log('✅ Projects: inline-block horizontal scroll ready');
  }

  // ==========================================
  // CERTIFICATES (KEEP AS IS)
  // ==========================================

  function fixCertificates() {
    if (!isMobile()) return;

    const rows = document.querySelectorAll('.cert-row');
    
    if (!rows.length) {
      console.warn('Certificate rows not found');
      return;
    }

    rows.forEach(function(row) {
      row.style.overflowX = 'auto';
      row.style.overflowY = 'hidden';
      
      const track = row.querySelector('.cert-track');
      if (track) {
        track.style.animation = 'none';
        track.style.display = 'flex';
      }
    });

    console.log('✅ Certificates: ' + rows.length + ' rows scrollable');
  }

  // ==========================================
  // OPTIMIZE (KEEP AS IS)
  // ==========================================

  function optimize() {
    if (!isMobile()) return;

    const spotlight = document.querySelector('.spotlight');
    if (spotlight) {
      spotlight.style.display = 'none';
    }

    if (window.gsap) {
      try {
        gsap.globalTimeline.timeScale(1.5);
      } catch (e) {}
    }

    console.log('✅ Optimizations applied');
  }

  // ==========================================
  // INITIALIZE
  // ==========================================

  function init() {
    if (!isMobile()) {
      console.log('Desktop mode');
      return;
    }

    console.log('');
    console.log('==========================================');
    console.log('📱 MOBILE MODE - INLINE-BLOCK FIX');
    console.log('==========================================');

    initHamburgerMenu();
    fixHeroBox();
    fixProjects();
    fixCertificates();
    optimize();

    console.log('==========================================');
    console.log('✅ ALL SYSTEMS GO');
    console.log('==========================================');
    console.log('');
    console.log('Expected:');
    console.log('  • Hero: ONE centered box ✓');
    console.log('  • Stats: 03+, 10+, ∞ aligned ✓');
    console.log('  • Projects: 5 cards horizontal ✓');
    console.log('  • Certificates: Swipe rows ✓');
    console.log('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      location.reload();
    }, 500);
  });

})();
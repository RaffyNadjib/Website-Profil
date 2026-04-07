'use strict';

// 1. MOBILE NAVBAR TOGGLE
function initNavbar() {
  const toggle  = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }
}

// 2. DARK / LIGHT MODE TOGGLE
function initThemeToggle() {
  const themeToggleInput = document.getElementById('themeToggle'); 
  
  if (!themeToggleInput) return;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    themeToggleInput.checked = true;
  } else {
    document.body.removeAttribute('data-theme');
    themeToggleInput.checked = false;
  }

  themeToggleInput.addEventListener('change', () => {
    if (themeToggleInput.checked) {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// 3. TYPING EFFECT
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const texts = ['Frontend Developer', 'UI/UX Enthusiast', 'Creative Coder'];
  let textIndex = 0; let charIndex = 0; let isDeleting = false;

  function type() {
    const current = texts[textIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false; textIndex = (textIndex + 1) % texts.length; delay = 500;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 500);
}

// 4. INTERACTIVE 3D TILT EFFECT
function initInteractive3dTilt() {
  const photoWrapper = document.querySelector('.hero-photo-wrapper');
  
  if (!photoWrapper) return;

  const maxTiltAngle = 15;

  photoWrapper.addEventListener('mousemove', (e) => {
    const rect = photoWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const deltaXPercent = deltaX / (rect.width / 2);
    const deltaYPercent = deltaY / (rect.height / 2);
    const rotateXAngle = -deltaYPercent * maxTiltAngle;
    const rotateYAngle = deltaXPercent * maxTiltAngle;
    
    photoWrapper.style.transform = `scale(1.05) translateZ(20px) rotateX(${rotateXAngle}deg) rotateY(${rotateYAngle}deg)`;
  });

  photoWrapper.addEventListener('mouseleave', () => {
    photoWrapper.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    photoWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)';
    setTimeout(() => {
      photoWrapper.style.transition = 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)';
    }, 500);
  });
}

// 5. FITUR PENCARIAN PRODUK AFFILIATE (SUPER FIX)
function initAffiliateSearch() {
  const searchInput = document.getElementById('affiliateSearch');
  const affiliateCards = document.querySelectorAll('.affiliate-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();

      affiliateCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
          // Gunakan setProperty untuk mengatasi !important di CSS
          card.style.setProperty('display', 'flex', 'important'); 
        } else {
          card.style.setProperty('display', 'none', 'important');
        }
      });
    });
  }
}

// JALANKAN SEMUA FUNGSI SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initTypingEffect();
  initInteractive3dTilt();
  initAffiliateSearch();
});
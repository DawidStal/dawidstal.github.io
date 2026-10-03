// =============================
// Component Loader
// =============================
async function loadComponents() {
  try {
    // Fetch and load header
    const headerRes = await fetch('header.html');
    if (headerRes.ok) {
      const headerHtml = await headerRes.text();
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHtml;
        initNavbar(); // Initialize nav logic AFTER header is in DOM
        setActiveNav();
      }
    }

    // Fetch and load footer
    const footerRes = await fetch('footer.html');
    if (footerRes.ok) {
      const footerHtml = await footerRes.text();
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHtml;
      }
    }
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

// =============================
// Navbar Logic
// =============================
function initNavbar() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.getElementById('navbar');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, .95)';
      } else {
        navbar.style.background = 'rgba(10, 10, 15, .85)';
      }
    }, { passive: true });
  }
}

// =============================
// Set Active Nav Link Based on Page
// =============================
function setActiveNav() {
  const body = document.body;
  const currentPage = body.getAttribute('data-page');

  if (currentPage) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      }
    });
  }
}

// =============================
// Scroll-triggered Animations
// =============================
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elements.forEach(el => observer.observe(el));
}

// =============================
// Init
// =============================
document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
  initScrollAnimations();
});

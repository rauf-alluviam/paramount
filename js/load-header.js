// Load header dynamically with error handling
function loadHeader() {
  const headerContainer = document.getElementById('header-container');
  
  if (!headerContainer) {
    console.error('Header container not found');
    return;
  }
  
  // Try to load the header
  fetch('/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      headerContainer.innerHTML = html;
      
      // Initialize header functionality after loading
      if (typeof initializeHeader === 'function') {
        initializeHeader();
      }
    })
    .catch(error => {
      console.error('Error loading header:', error);
      
      // Fallback: Create a simple header if fetch fails
      headerContainer.innerHTML = `
        <header class="main-header">
          <div class="container header-inner">
            <div class="logo">
              <img src="/assets/icon-logo.png" alt="P Icon" class="logo-icon" />
              <img src="/assets/logo.png" alt="Full Logo" class="logo-full" />
            </div>
            <nav class="navbar">
              <ul>
                <li><a href="/index.html#home">Home</a></li>
                <li><a href="/productgalary.html">Products</a></li>
                <li><a href="/index.html#about">About</a></li>
                <li><a href="/index.html#core offering">Core Offerings</a></li>
                <li><a href="/index.html#whychooseus">Why Choose Autorack</a></li>
                <li><a href="/contact.html">Contact</a></li>
              </ul>
            </nav>
            <a href="/contact.html" class="quote-btn">Get a Quote</a>
            <div class="menu-toggle" id="menuToggle">
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
        </header>
        
        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu-overlay" id="mobileMenuOverlay">
          <div class="close-menu" id="closeMenu">
            <i class="fa-solid fa-times"></i>
          </div>
          <div class="mobile-menu-container">
            <ul id="mobileNavMenu">
              <!-- Menu items will be dynamically added here -->
            </ul>
            <a href="/contact.html" class="quote-btn">Get a Quote</a>
            <div class="mobile-contact-info">
              <!-- Contact info will be dynamically added here -->
            </div>
          </div>
        </div>
      `;
      
      // Try to initialize header functionality with fallback
      try {
        if (typeof initializeHeader === 'function') {
          initializeHeader();
        }
      } catch (e) {
        console.error('Error initializing header:', e);
      }
    });
}

// Function to initialize header functionality
function initializeHeader() {
  const mainHeader = document.getElementById("mainHeader");
  const topbar = document.getElementById("topbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const closeMenu = document.getElementById("closeMenu");
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  const mobileContactInfo = document.querySelector(".mobile-contact-info");
  
  // Only proceed if elements exist
  if (!menuToggle || !mobileMenuOverlay) return;
  
  // Clone menu items to mobile menu
  const originalNavItems = document.querySelectorAll('.navbar ul li');
  originalNavItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      const clonedItem = document.createElement('li');
      const clonedLink = link.cloneNode(true);
      clonedItem.appendChild(clonedLink);
      mobileNavMenu.appendChild(clonedItem);
    }
  });
  
  // Clone contact info to mobile menu
  const emailLink = document.querySelector('.topbar-left a[href^="mailto"]');
  const phoneLink = document.querySelector('.topbar-left a[href^="tel"]');
  
  if (emailLink && mobileContactInfo) {
    const emailClone = emailLink.cloneNode(true);
    mobileContactInfo.appendChild(emailClone);
  }
  
  if (phoneLink && mobileContactInfo) {
    const phoneClone = phoneLink.cloneNode(true);
    mobileContactInfo.appendChild(phoneClone);
  }
  
  // Toggle mobile menu
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    mobileMenuOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close mobile menu
  closeMenu.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    mobileMenuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      mobileMenuOverlay.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
      
      // Handle navigation
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      } else {
        // For external links, navigate normally
        if (href) window.location.href = href;
      }
    });
  });
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      // Scrolling down - hide topbar and make header white
      if (topbar) {
        topbar.classList.add("hidden");
      }
      if (mainHeader) {
        mainHeader.classList.add("scrolled");
      }
    } else {
      // At top - show topbar and remove white background
      if (topbar) {
        topbar.classList.remove("hidden");
      }
      if (mainHeader) {
        mainHeader.classList.remove("scrolled");
      }
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);

// Make initializeHeader globally available
window.initializeHeader = initializeHeader;
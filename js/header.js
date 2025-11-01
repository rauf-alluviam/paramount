// Header functionality - separate file
document.addEventListener("DOMContentLoaded", () => {
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
});
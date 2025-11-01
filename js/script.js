document.addEventListener("DOMContentLoaded", function () {
  const mainHeader = document.getElementById("mainHeader");
  const topbar = document.querySelector(".topbar");
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
    const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".navbar ul");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("open");

    menuToggle.innerHTML = menuToggle.classList.contains("open")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
});
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // ===== HERO PARALLAX EFFECT =====
  if (hero && heroContent) {
    hero.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 60;
      const y = (window.innerHeight / 2 - e.pageY) / 60;
      heroContent.style.transform = `translate(${x}px, ${y}px)`;
    });

    hero.addEventListener("mouseleave", () => {
      heroContent.style.transform = "translate(0, 0)";
    });
  }

  // ===== HEADER SCROLL BEHAVIOR =====
  window.addEventListener("scroll", function () {
    const sc = window.scrollY;

    if (sc > 50) {
      mainHeader?.classList.add("scrolled");
      if (topbar) topbar.style.display = "none";
    } else {
      mainHeader?.classList.remove("scrolled");
      if (topbar) topbar.style.display = "block";
    }

    // ===== ABOUT US SECTION REVEAL =====
    const about = document.querySelector(".about-diagonal");
    if (about) {
      const rect = about.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7) {
        about.classList.add("visible");
      }
    }
  });
});

// ===== SPOTLIGHT EFFECT =====
document.addEventListener("mousemove", (e) => {
  const spotlight = document.querySelector(".spotlight-bg");
  if (spotlight) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    spotlight.style.setProperty("--x", `${x}%`);
    spotlight.style.setProperty("--y", `${y}%`);
  }
});

// ===== 3D TILT EFFECT =====
const tiltCard = document.getElementById("tilt-card");
if (tiltCard) {
  tiltCard.addEventListener("mousemove", (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    tiltCard.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
  });

  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const items = document.querySelectorAll(".offer-item");
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.8;
  items.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < trigger) {
      item.classList.add("active");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===== SIMPLE FADE-UP ANIMATION ON SCROLL =====
const cards = document.querySelectorAll(".why-card, .why-image");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));
document.getElementById("quoteForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  console.log("Form submitted:", formData);

  try {
    const response = await fetch("http://localhost:5000/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
});
document.getElementById("quoteForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("http://localhost:5000/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Show success popup
      document.getElementById("successPopup").style.display = "flex";
      // Optional: clear form
      document.getElementById("quoteForm").reset();
    } else {
      alert(data.error || "Something went wrong.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send mail. Please try again.");
  }
});

// Close popup
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("successPopup").style.display = "none";
});
function initHeaderBehavior() {
  const mainHeader = document.getElementById("mainHeader");
  const topbar = document.querySelector(".topbar");

  // Scroll behavior
  window.addEventListener("scroll", function () {
    const sc = window.scrollY;
    if (sc > 50) {
      mainHeader?.classList.add("scrolled");
      if (topbar) topbar.style.display = "none";
    } else {
      mainHeader?.classList.remove("scrolled");
      if (topbar) topbar.style.display = "block";
    }
  });

  // Mobile toggle
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.querySelector(".navbar");
  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }
}
function initHeaderBehavior() {
  const mainHeader = document.getElementById("mainHeader");
  const topbar = document.querySelector(".topbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".navbar ul");

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("open");
      menuToggle.innerHTML = menuToggle.classList.contains("open")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // Scroll behavior
  window.addEventListener("scroll", function () {
    const sc = window.scrollY;
    if (sc > 50) {
      mainHeader?.classList.add("scrolled");
      if (topbar) topbar.style.display = "none";
    } else {
      mainHeader?.classList.remove("scrolled");
      if (topbar) topbar.style.display = "block";
    }
  });
}
// Mobile Menu Toggle - Corrected Version
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  
  // Create mobile menu overlay
  const mobileMenuOverlay = document.createElement('div');
  mobileMenuOverlay.className = 'mobile-menu-overlay';
  
  // Create menu container
  const menuContainer = document.createElement('div');
  menuContainer.className = 'mobile-menu-container';
  
  // Create close button
  const closeMenu = document.createElement('div');
  closeMenu.className = 'close-menu';
  closeMenu.innerHTML = '<i class="fa-solid fa-times"></i>';
  
  // Create menu list
  const menuList = document.createElement('ul');
  
  // Get menu items from original navbar
  const originalNavItems = document.querySelectorAll('.navbar ul li');
  
  // Clone each menu item
  originalNavItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      const clonedItem = document.createElement('li');
      const clonedLink = link.cloneNode(true);
      clonedItem.appendChild(clonedLink);
      menuList.appendChild(clonedItem);
    }
  });
  
  // Create quote button
  const quoteBtn = document.createElement('a');
  quoteBtn.href = '#';
  quoteBtn.className = 'quote-btn';
  quoteBtn.textContent = 'Get a Quote';
  
  // Create mobile contact info
  const mobileContactInfo = document.createElement('div');
  mobileContactInfo.className = 'mobile-contact-info';
  
  // Get contact info from topbar
  const emailLink = document.querySelector('.topbar-left a[href^="mailto"]');
  const phoneLink = document.querySelector('.topbar-left a[href^="tel"]');
  
  if (emailLink) {
    const emailClone = emailLink.cloneNode(true);
    mobileContactInfo.appendChild(emailClone);
  }
  
  if (phoneLink) {
    const phoneClone = phoneLink.cloneNode(true);
    mobileContactInfo.appendChild(phoneClone);
  }
  
  // Append elements to menu container
  menuContainer.appendChild(menuList);
  menuContainer.appendChild(quoteBtn);
  menuContainer.appendChild(mobileContactInfo);
  
  // Append elements to mobile menu overlay
  mobileMenuOverlay.appendChild(closeMenu);
  mobileMenuOverlay.appendChild(menuContainer);
  
  // Append mobile menu overlay to body
  document.body.appendChild(mobileMenuOverlay);
  
  // Toggle mobile menu
  menuToggle.addEventListener('click', function() {
    mobileMenuOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close mobile menu
  closeMenu.addEventListener('click', function() {
    mobileMenuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuOverlay.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Header scroll effect
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
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
  
  // Form submission
  const quoteForm = document.getElementById('quoteForm');
  const successPopup = document.getElementById('successPopup');
  const closePopup = document.getElementById('closePopup');
  
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success popup
      successPopup.style.display = 'flex';
      
      // Reset form
      quoteForm.reset();
    });
  }
  
  if (closePopup) {
    closePopup.addEventListener('click', function() {
      successPopup.style.display = 'none';
    });
  }
  
  // Close popup when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === successPopup) {
      successPopup.style.display = 'none';
    }
  });
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('[data-animate]');
  
  function animateOnScroll() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
});
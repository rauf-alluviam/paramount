document.addEventListener("DOMContentLoaded", function () {
  const mainHeader = document.getElementById("mainHeader");
  const topbar = document.querySelector(".topbar");
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const spotlight = document.querySelector(".spotlight-bg");
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  spotlight.style.setProperty("--x", `${x}%`);
  spotlight.style.setProperty("--y", `${y}%`);
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

// Subtle 3D tilt effect on hover
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
document.addEventListener("mousemove", e => {
  const spotlight = document.querySelector(".spotlight-bg");
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  spotlight.style.setProperty("--x", `${x}%`);
  spotlight.style.setProperty("--y", `${y}%`);
});

// Scroll reveal animation
const items = document.querySelectorAll(".offer-item");
const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.8;
  items.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < trigger) {
      item.classList.add("active");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
// Register GSAP plugins
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// Smooth scroll to wishes section
const scrollBtn = document.getElementById("scrollBtn");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    const target = document.getElementById("wishes");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Initial hero animation
if (window.gsap) {
  gsap.from(".hero-content", {
    opacity: 0,
    y: 40,
    duration: 1.4,
    ease: "power3.out"
  });

  gsap.from(".float", {
    opacity: 0,
    y: 60,
    stagger: 0.25,
    duration: 1.4,
    ease: "power3.out"
  });

  // Gentle floating motion for hearts/confetti
  gsap.to(".float", {
    y: -18,
    x: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 3.2,
    stagger: {
      each: 0.3,
      from: "random"
    }
  });

  // Reveal wish cards on scroll
  gsap.from(".wish-card", {
    scrollTrigger: {
      trigger: ".wishes",
      start: "top 75%"
    },
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.2
  });

  // Parallax-like movement for cake background layers
  const layers = document.querySelectorAll(".parallax-layer");
  layers.forEach((layer, index) => {
    const movement = (index + 1) * 18;
    gsap.to(layer, {
      scrollTrigger: {
        trigger: ".cake-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      y: -movement
    });
  });

  // Animate cake entrance
  gsap.from(".cake", {
    scrollTrigger: {
      trigger: ".cake-section",
      start: "top 80%"
    },
    opacity: 0,
    y: 60,
    duration: 1.3,
    ease: "back.out(1.4)"
  });

  gsap.from(".cake-text", {
    scrollTrigger: {
      trigger: ".cake-section",
      start: "top 80%"
    },
    opacity: 0,
    x: -40,
    duration: 1,
    ease: "power3.out"
  });

  // Closing section fade-in
  gsap.from(".closing .section-inner", {
    scrollTrigger: {
      trigger: ".closing",
      start: "top 85%"
    },
    opacity: 0,
    y: 40,
    duration: 1.1,
    ease: "power3.out"
  });

  // Subtle pulsing flame while lit
  var flamePulse = gsap.to(".flame", {
    scaleY: 1.08,
    scaleX: 0.98,
    y: -2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 0.7
  });

  // Fancy hover interaction for wish cards (3D tilt + lift)
  var cards = document.querySelectorAll(".wish-card");
  cards.forEach(function (card) {
    var bounds = null;

    card.addEventListener("mouseenter", function () {
      bounds = card.getBoundingClientRect();
      gsap.to(card, {
        duration: 0.35,
        y: -14,
        scale: 1.03,
        rotateX: -6,
        rotateY: 6,
        boxShadow: "0 32px 70px rgba(0,0,0,0.8)",
        ease: "power3.out",
        transformPerspective: 900,
        transformOrigin: "center center"
      });
    });

    card.addEventListener("mousemove", function (e) {
      if (!bounds) return;
      var relX = e.clientX - bounds.left;
      var relY = e.clientY - bounds.top;
      var rotateY = ((relX / bounds.width) - 0.5) * 16;
      var rotateX = ((relY / bounds.height) - 0.5) * -16;

      gsap.to(card, {
        duration: 0.25,
        rotateX: rotateX,
        rotateY: rotateY,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", function () {
      bounds = null;
      gsap.to(card, {
        duration: 0.45,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        boxShadow: "0 26px 55px rgba(0,0,0,0.4)",
        ease: "power3.out"
      });
    });
  });
}

// Mood theme switcher (emoji buttons)
const moodButtons = document.querySelectorAll(".mood-btn");

function setTheme(theme) {
  const body = document.body;
  const themeClasses = ["theme-kitty", "theme-romantic", "theme-dreamy", "theme-party"];

  themeClasses.forEach((cls) => body.classList.remove(cls));

  if (theme === "kitty") body.classList.add("theme-kitty");
  if (theme === "romantic") body.classList.add("theme-romantic");
  if (theme === "dreamy") body.classList.add("theme-dreamy");
  if (theme === "party") body.classList.add("theme-party");

  moodButtons.forEach((btn) => btn.classList.remove("mood-btn--active"));
  moodButtons.forEach((btn) => {
    if (btn.dataset.theme === theme) {
      btn.classList.add("mood-btn--active");
    }
  });
}

moodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    if (theme) {
      setTheme(theme);
    }
  });
});

// Candle interaction
const candle = document.getElementById("candle");
const wishReveal = document.getElementById("wishReveal");

let flameOn = true;

function blowOutCandle() {
  if (!window.gsap || !flameOn) return;

  flameOn = false;

  // Stop any ongoing flame pulsing
  gsap.killTweensOf(".flame");

  const tl = gsap.timeline();

  tl.to(".flame", {
    scaleY: 0.3,
    scaleX: 1.1,
    y: 4,
    duration: 0.2,
    ease: "power1.in"
  })
    .to(
      ".flame",
      {
        opacity: 0,
        scaleY: 0,
        duration: 0.3,
        ease: "power1.out"
      },
      ">-=0.05"
    )
    .to(
      ".smoke",
      {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out"
      },
      "<"
    )
    .to(".smoke", {
      opacity: 0,
      duration: 1.6,
      ease: "power2.out"
    })
    .fromTo(
      wishReveal,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=1.1"
    );

  // Trigger celebratory confetti
  startConfetti();
}

if (candle) {
  candle.addEventListener("click", blowOutCandle);
  candle.addEventListener("touchend", blowOutCandle);
}

// Simple confetti animation using canvas
const confettiCanvas = document.getElementById("confettiCanvas");
let confettiCtx = null;
let confettiPieces = [];
let confettiRunning = false;
let confettiFrameId = null;

if (confettiCanvas && confettiCanvas.getContext) {
  confettiCtx = confettiCanvas.getContext("2d");

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  resizeConfettiCanvas();
  window.addEventListener("resize", resizeConfettiCanvas);
}

function createConfettiPiece() {
  const colors = ["#ff6f91", "#ff9671", "#ffc75f", "#f9f871", "#845ec2", "#00c9a7", "#fbeaff"];
  return {
    x: Math.random() * confettiCanvas.width,
    y: -20,
    size: 6 + Math.random() * 6,
    tilt: Math.random() * 10 - 5,
    tiltAngleIncrement: 0.02 + Math.random() * 0.08,
    tiltAngle: 0,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2 + Math.random() * 3
  };
}

function startConfetti() {
  if (!confettiCtx || confettiRunning) return;
  confettiRunning = true;
  confettiPieces = [];

  for (let i = 0; i < 220; i++) {
    confettiPieces.push(createConfettiPiece());
  }

  let animationTime = 0;
  const maxTime = 5500; // ms

  function updateConfetti(timestamp) {
    if (!confettiRunning) return;

    if (!updateConfetti.lastTime) updateConfetti.lastTime = timestamp;
    const delta = timestamp - updateConfetti.lastTime;
    updateConfetti.lastTime = timestamp;
    animationTime += delta;

    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach(function (p) {
      p.tiltAngle += p.tiltAngleIncrement;
      p.y += p.speed;
      p.x += Math.sin(p.tiltAngle) * 1.2;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      confettiCtx.beginPath();
      confettiCtx.strokeStyle = p.color;
      confettiCtx.lineWidth = p.size;
      confettiCtx.moveTo(p.x + p.tilt + p.size / 2, p.y);
      confettiCtx.lineTo(p.x + p.tilt, p.y + p.size * 1.5);
      confettiCtx.stroke();

      // recycle piece if it falls below the screen
      if (p.y > confettiCanvas.height + 30) {
        p.x = Math.random() * confettiCanvas.width;
        p.y = -20;
      }
    });

    if (animationTime < maxTime) {
      confettiFrameId = requestAnimationFrame(updateConfetti);
    } else {
      stopConfetti();
    }
  }

  confettiFrameId = requestAnimationFrame(updateConfetti);
}

function stopConfetti() {
  confettiRunning = false;
  if (confettiFrameId) {
    cancelAnimationFrame(confettiFrameId);
    confettiFrameId = null;
  }
  if (confettiCtx && confettiCanvas) {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}



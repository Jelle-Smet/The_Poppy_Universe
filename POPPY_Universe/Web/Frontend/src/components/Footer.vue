<template>
  <footer class="footer">
    <canvas id="footer-stars"></canvas>

    <div class="footer-content">
      <div class="footer-cta">
        <p class="cta-tagline">Ready to Explore the Universe?</p>
        <button class="cta-button" @click="$router.push('/engine-details')">
          Get My Recommendations <i class="fas fa-rocket"></i>
        </button>
      </div>

      <div class="footer-sections-wrapper">
        <div class="footer-contact">
          <h3>Connect</h3>
          <p class="email-text">Email: <a href="mailto:PoppyUniverse@outlook.com">PoppyUniverse@outlook.com</a></p>
          <div class="social-icons">
            <a href="https://github.com" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      &copy; {{ currentYear }} Poppy Universe. All rights reserved. Built with Vue 3.
      <button class="back-to-top" @click="scrollToTop" type="button" aria-label="Back to top">
        Back to Top
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
  mounted() {
    this.initStars();
    window.addEventListener('resize', this.resizeCanvas);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeCanvas);
  },
  methods: {
  // resize both width and height to keep the canvas sized correctly on resize
  resizeCanvas() {
    const canvas = document.getElementById('footer-stars');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = 80; // keep fixed footer canvas height
    }
  },

  initStars() {
    const canvas = document.getElementById('footer-stars');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // ensure canvas is properly sized before creating stars
    canvas.width = window.innerWidth;
    canvas.height = 80;
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      speed: Math.random() * 0.4 + 0.1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
  },

  // robust scrollToTop that tries document, common wrappers, and any scrollable element
  scrollToTop() {
    const trySmoothScroll = (el) => {
      const opts = { top: 0, behavior: 'smooth' };
      try {
        if (el === window) {
          window.scrollTo(opts);
        } else if (el && typeof el.scrollTo === 'function') {
          el.scrollTo(opts);
        } else if (el) {
          el.scrollTop = 0;
        }
        return true;
      } catch (err) {
        // behavior maybe unsupported on this element — fallback handled by caller
        return false;
      }
    };

    // 1) Try the document-level scroller
    const docEl = document.scrollingElement || document.documentElement || document.body;
    if (docEl && trySmoothScroll(docEl)) return;

    // 2) Try common app containers
    const candidates = [
      '.content-wrapper',
      '#main-layout',
      'main',
      '#app',
      'body',
      'html'
    ];

    for (const sel of candidates) {
      const el = document.querySelector(sel);
      if (el && el.scrollHeight > el.clientHeight) {
        trySmoothScroll(el);
        return;
      }
    }

    // 3) Find any scrollable element on the page (checks computed overflow and scrollable height)
    const all = Array.from(document.querySelectorAll('body *'));
    for (const el of all) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        trySmoothScroll(el);
        return;
      }
    }

    // 4) Final fallbacks
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }
}

};
</script>

<style scoped>
.footer {
  position: relative;
  width: 100vw; /* ensures full width even inside container layouts */
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  background: linear-gradient(
    to bottom,
    rgba(15, 0, 30, 0.75) 0%,
    rgba(32, 0, 70, 0.85) 50%,
    rgba(45, 0, 90, 0.95) 100%
  ); /* stronger, deeper cosmic gradient */

  color: #bfdbfe;
  overflow: hidden;
  padding-top: 20px;
  text-align: center;
  backdrop-filter: blur(8px); 
  border-top: 1px solid rgba(255, 255, 255, 0.15); 
}

#footer-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  pointer-events: none;

  /* darker tint behind stars so they actually show up */
  background: radial-gradient(
    circle at 50% 20%,
    rgba(255, 255, 255, 0.05),
    rgba(0, 0, 0, 0)
  );
  z-index: -1;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 10px; /* FIX 2: Reduced bottom padding */
}

h3 {
  color: #fca5a5;
  font-size: 1.25rem; 
  text-shadow: 0 0 8px rgba(252, 165, 165, 0.5);
  margin-bottom: 8px; /* FIX 2: Reduced bottom margin */
}

.footer-cta {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 12px;
  background: rgba(31, 1, 61, 0.3); /* lowered alpha for see-through */
  box-shadow: 0 0 30px rgba(252, 165, 165, 0.5);
  animation: pulseBorder 3s infinite ease-in-out;
}

.cta-tagline {
  font-size: 1.2rem; /* FIX 2: Reduced font size */
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px; /* FIX 2: Reduced bottom margin */
  letter-spacing: 1.5px;
  text-shadow: 0 0 8px #fca5a5;
}

.cta-button {
  background: linear-gradient(90deg, #10b981, #3b82f6);
  color: #fff;
  padding: 8px 25px; /* FIX 2: Reduced button padding */
  border: none;
  border-radius: 50px;
  font-size: 1rem; /* FIX 2: Reduced font size */
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); 
  transition: all 0.3s;
}

.footer-sections-wrapper {
  max-width: 300px; 
  margin: 0 auto;
  width: 100%;
}

.footer-contact {
  text-align: center;
  margin-bottom: 15px; /* FIX 2: Reduced bottom margin */
}

.email-text {
  margin-bottom: 10px; /* FIX 2: Reduced bottom margin */
}

a {
  color: #bfdbfe;
  transition: 0.3s;
}

a:hover {
  color: #fff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5); 
}

.social-icons a {
  font-size: 1.4rem; /* FIX 2: Reduced icon size */
  margin: 0 6px; /* FIX 2: Reduced margin between icons */
  color: #fca5a5;
  transition: transform 0.2s;
}

.social-icons a:hover {
  transform: scale(1.2);
}

.footer-bottom {
  width: 100%;
  padding: 10px 0; /* FIX 2: Reduced top/bottom padding */
  color: #9ca3af;
  border-top: 1px solid rgba(255, 255, 255, 0.15); 
  font-size: 0.9rem;
  display: flex; 
  justify-content: space-around;
  align-items: center;
}

.back-to-top {
  background: none;
  border: none;
  padding: 0;
  color: #fca5a5;
  cursor: pointer;
  transition: color 0.2s;
  font-weight: 500;
  margin: 0;
  font-size: 0.9rem;
}


.back-to-top:hover {
  color: #fff;
  text-decoration: underline;
}

/* Keyframes */
@keyframes pulseBorder {
  0%, 100% { box-shadow: 0 0 0 0 rgba(252, 165, 165, 0.3); } 
  50% { box-shadow: 0 0 20px 10px rgba(252, 165, 165, 0.7); } 
}

/* Responsive adjustments for mobile */
@media (max-width: 600px) {
  .footer-bottom {
      flex-direction: column;
      gap: 5px;
      text-align: center;
  }
}
</style>
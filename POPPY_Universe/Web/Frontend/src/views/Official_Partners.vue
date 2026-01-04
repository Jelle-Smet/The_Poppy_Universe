<template>
  <div class="partners-container">
    <div class="cosmic-bg"></div>
    
    <div class="glass-header">
      <div class="status-badge">
        <span class="status-dot"></span>
        REGISTRY_STATUS // <span class="cyan-text">RECRUITING</span>
      </div>
      <h1 class="hero-title">Orbital <span class="pink-glow">Partners</span></h1>
      <p class="hero-subtitle">DATA_FOUNDATION & MASTERMIND_EXPLORERS</p>
    </div>

    <div class="partners-grid">
      <section class="partner-section">
        <h2 class="section-title"><span class="pulse-dot cyan-pulse"></span> THE_FOUNDATION</h2>
        <div class="partner-cards">
          <div class="partner-card tech-partner cosmic-glass-panel">
            <div class="partner-icon">🛰️</div>
            <h3 class="cyan-text">Gaia Mission</h3>
            <p>Providing high-precision orbital data and spectral heuristics for over 1 billion stars.</p>
            <span class="tag cyan-tag">PRIMARY_DATA</span>
          </div>

          <div class="partner-card tech-partner cosmic-glass-panel">
            <div class="partner-icon">🔭</div>
            <h3 class="cyan-text">ESA Archive</h3>
            <p>Technical validation for distance metrics and luminosity calculations.</p>
            <span class="tag cyan-tag">VALIDATION</span>
          </div>
        </div>
      </section>

      <section class="partner-section">
        <h2 class="section-title"><span class="pulse-dot pink-pulse"></span> MASTERMIND_EXPLORERS</h2>
        <div class="partner-cards">
          
          <div v-for="partner in partners" :key="partner.name" class="partner-card influencer cosmic-glass-panel active-pilot">
            <div class="verified-badge">VERIFIED_PILOT</div>
            
            <div class="avatar-container">
              <img 
                :src="partner.pfp || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${partner.name}&backgroundColor=0f0028`" 
                :alt="partner.name" 
                class="partner-avatar" 
              />
              <div class="avatar-glow"></div>
            </div>

            <div class="partner-info">
              <h3 class="pink-text">{{ partner.name }}</h3>
              <p class="partner-bio">{{ partner.bio }}</p>
            </div>
            
            <div class="social-links">
              <a v-if="partner.socials.youtube" :href="partner.socials.youtube" target="_blank" class="social-icon" title="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a v-if="partner.socials.tiktok" :href="partner.socials.tiktok" target="_blank" class="social-icon" title="TikTok">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
              <a v-if="partner.socials.instagram" :href="partner.socials.instagram" target="_blank" class="social-icon" title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a v-if="partner.socials.twitter" :href="partner.socials.twitter" target="_blank" class="social-icon" title="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"></path></svg>
              </a>
              <a v-if="partner.socials.linkedin" :href="partner.socials.linkedin" target="_blank" class="social-icon" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a v-if="partner.socials.website" :href="partner.socials.website" target="_blank" class="social-icon" title="Portfolio">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-svg"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </a>
            </div>
          </div>

          <div class="partner-card influencer cosmic-glass-panel pending-card">
            <div class="avatar-placeholder">?</div>
            <h3 class="cyan-text">Reserved Slot</h3>
            <p>Reserved for Top-Tier Community Explorers & Space-Tech Creators.</p>
            <button class="apply-btn" @click="showInquiry = true">INQUIRE_HERE</button>
          </div>
        </div>
      </section>
    </div>

    <Transition name="fade">
      <div v-if="showInquiry" class="modal-overlay" @click.self="showInquiry = false">
        <div class="cosmic-glass-panel modal-box">
          <button class="close-btn" @click="showInquiry = false">×</button>
          <h2 class="pink-text section-title">PILOT_<span class="cyan-text">PROTOCOL</span></h2>
          <div class="recruitment-info">
            <p>The 2026 Mastermind Program is a curated expansion of the Poppy Universe lineage.</p>
            <div class="process-steps">
              <div class="step"><span class="step-num">01</span><p><strong>Fill Protocol:</strong> Complete the external vetting form.</p></div>
              <div class="step"><span class="step-num">02</span><p><strong>Revision:</strong> Manual review takes 3-5 orbital cycles.</p></div>
              <div class="step"><span class="step-num">03</span><p><strong>Launch:</strong> Your profile is activated on the registry.</p></div>
            </div>
          </div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSf5IXcKttDMCG7J4dVH_SxRMnL8ktFD1OLIs4gwMKLfYGYlxw/viewform?usp=header" target="_blank" class="glow-link-btn" @click="showInquiry = false">
            OPEN_APPLICATION_FORM →
          </a>
        </div>
      </div>
    </Transition>

    <div class="cosmic-glass-panel final-cta">
      <h3 class="pink-text">The <span class="pink-glow">Future</span> Architecture</h3>
      <p>Building a collective universe requires precision. We are currently scouting for 5 Mastermind Partners.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showInquiry = ref(false);

const partners = ref([
  {
    name: 'Poppy Explorer',
    role: 'Verified Pilot',
    bio: 'Lead curator of the 2026 Registry. Specialized in stellar heuristics and UI architecture.',
    pfp: '',
    socials: {
      youtube: '#',
      tiktok: '#',
      instagram: '#',
      twitter: '#',
      linkedin: '#',
      website: '#'
    }
  }
]);
</script>

<style scoped>
/* GENESIS COLOR PALETTE */
.partners-container {
  min-height: 100vh;
  padding: 80px 40px 100px; 
  background: #050010; /* Fallback */
  color: #e6e6fa;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  position: relative;
  
  /* --- NEW: The Frame Logic --- */
  border: 2px solid #c0fcfc; /* Neon Blue Edge */
  border-radius: 40px;      /* Rounded Edges */
  margin: 20px;             /* Space around the frame */
  overflow: hidden;         /* CRITICAL: This clips the cosmic-bg to the rounded corners */
  
  /* Glow Effects */
  box-shadow: 0 0 25px rgba(192, 252, 252, 0.2), 
              inset 0 0 20px rgba(192, 252, 252, 0.1);
  
  /* Color Shift Transition */
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.cosmic-bg {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(15, 0, 40, 1) 0%, rgba(5, 0, 16, 1) 100%);
  z-index: 0;
  /* No need to change this, the container's overflow: hidden handles it now! */
}

/* --- HOVER EFFECT --- */
.partners-container:hover {
  border-color: #ff69b4; /* Flips to Pink */
  box-shadow: 0 0 45px rgba(255, 105, 180, 0.4), 
              inset 0 0 25px rgba(255, 105, 180, 0.2);
}

/* PANELS - Matching Genesis "cosmic-glass-panel" */
.cosmic-glass-panel {
  background: rgba(15, 0, 40, 0.75);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.25);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

/* TYPOGRAPHY */
.hero-title { font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 900; line-height: 1; margin: 10px 0; text-align: center; position: relative; z-index: 1;}
.pink-glow { color: #ff69b4; text-shadow: 0 0 25px #ff007f; }
.pink-text { color: #ff69b4; text-transform: uppercase; letter-spacing: 2px; font-weight: 800; }
.cyan-text { color: #00ffff; }
.hero-subtitle { font-size: 0.9rem; letter-spacing: 6px; color: #00ffff; font-weight: bold; text-transform: uppercase; text-align: center; position: relative; z-index: 1;}

/* HEADER */
.glass-header { text-align: center; margin-bottom: 40px; position: relative; z-index: 1;}
.status-badge {
  display: inline-flex; align-items: center; gap: 12px;
  font-family: monospace; background: rgba(0, 255, 255, 0.05);
  color: rgba(0, 255, 255, 0.7); padding: 8px 20px;
  border-radius: 50px; font-size: 0.75rem; border: 1px solid rgba(0, 255, 255, 0.2);
}
.status-dot { width: 7px; height: 7px; background: #00ffff; border-radius: 50%; box-shadow: 0 0 10px #00ffff; }

/* GRID & CARDS */
.partners-grid { width: 100%; max-width: 1100px; display: flex; flex-direction: column; gap: 80px; position: relative; z-index: 1;}
.section-title { 
  display: flex; align-items: center; gap: 20px; 
  font-family: monospace; font-size: 0.8rem; letter-spacing: 5px; margin-bottom: 30px;
  color: rgba(230, 230, 250, 0.5);
}

.partner-cards {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;
}

.partner-card:hover { transform: translateY(-5px); border-color: #ff69b4; }
.active-pilot { border-left: 4px solid #ff69b4; }

.avatar-container { width: 110px; height: 110px; margin: 0 auto 20px; position: relative; }
.partner-avatar { width: 100%; height: 100%; border-radius: 50%; border: 2px solid #00ffff; padding: 5px; background: #050010; }
.avatar-glow { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #00ffff; filter: blur(30px); opacity: 0.15; z-index: -1; }

/* SOCIALS */
.social-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
.social-icon { color: #00ffff; transition: 0.3s; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
.social-icon:hover { color: #ff69b4; transform: scale(1.2); }
.icon-svg { width: 18px; height: 18px; }

/* MODAL & BUTTONS */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(5, 0, 16, 0.95); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.modal-box { max-width: 600px; text-align: left; }
.step { display: flex; gap: 15px; margin-bottom: 15px; }
.step-num { color: #ff69b4; font-family: monospace; font-weight: 900; }

.glow-link-btn { display: block; text-align: center; margin-top: 30px; color: #00ffff; text-decoration: none; font-weight: 800; border: 1px solid #00ffff; padding: 15px; border-radius: 12px; transition: 0.3s; }
.glow-link-btn:hover { background: rgba(0,255,255,0.1); border-color: #ff69b4; color: #ff69b4; }

.apply-btn {
  background: none; border: 1px solid #ff69b4; color: #ff69b4;
  padding: 10px 20px; border-radius: 8px; font-family: monospace; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 15px;
}
.apply-btn:hover { background: #ff69b4; color: #fff; box-shadow: 0 0 15px #ff69b4; }

/* DECORATION */
.pulse-dot { width: 10px; height: 10px; border-radius: 50%; animation: pulse 2s infinite; }
.cyan-pulse { background: #00ffff; box-shadow: 0 0 10px #00ffff; }
.pink-pulse { background: #ff69b4; box-shadow: 0 0 10px #ff69b4; }
@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

.final-cta { text-align: center; margin-bottom: 60px; position: relative; z-index: 1;}
.close-btn { position: absolute; top: 20px; right: 20px; background: none; border: none; color: #00ffff; font-size: 2rem; cursor: pointer; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
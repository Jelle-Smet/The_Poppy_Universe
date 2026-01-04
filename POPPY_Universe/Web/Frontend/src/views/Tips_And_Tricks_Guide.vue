<template>
  <div class="engine-details-container">

    <div class="cosmic-panel intro-container">
      <header class="engine-main-header">
        <h1 class="hero-title loaded">
          Poppy <span class="pink-glow">Tips & Tricks</span> ⚡
        </h1>
        <p class="engine-tagline">POPPY'S GUIDE — OBSERVER HACKS V1.0</p>
      </header>

      <div class="intro-content">
        <p class="panel-intro">
          Navigate the night sky smarter, not harder. These <strong>pro tips and hacks</strong> will enhance your stargazing, equipment usage, and data logging experience.
          <br><br>
        </p>
      </div>
    </div>

    <div class="details-layout">
      <aside class="side-nav-rail">
        <div class="nav-rail-stack">

          <div class="cosmic-panel sticky-nav">
            <div class="nav-header">Tips <span class="pink-text">Categories</span></div>
            <div class="nav-items-wrapper">
              <a href="#tip1" class="nav-item"><span class="nav-dot l1"></span>Observation Hacks</a>
              <a href="#tip2" class="nav-item"><span class="nav-dot l2"></span>Equipment Tricks</a>
              <a href="#tip3" class="nav-item"><span class="nav-dot l3"></span>Data Logging Tips</a>
              <a href="#tip4" class="nav-item"><span class="nav-dot l4"></span>Environmental Insights</a>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Quick <span class="pink-text">Notes</span></h4>
            <p class="sidebar-info-text">Shortcut your way to better observations.</p>
            <div class="resource-box">
              <div class="guide-link">Night Mode: Red Light Only</div>
              <div class="guide-link">Cool Down Equipment 20-30m</div>
              <div class="guide-link">Carry a Small Notebook</div>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Other Modules</h4>
            <div class="resource-box">
              <router-link to="/equipment-guide" class="guide-link">Equipment Basics</router-link>
              <router-link to="/stargazing-guide" class="guide-link">Stargazing Guide</router-link>
              <router-link to="/object-identification" class="guide-link">Object Identification</router-link>
            </div>
          </div>

        </div>
      </aside>

      <main class="content-body">

        <section id="tip1" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l1"></span>
            <div class="title-meta">
              <h2>Tip 1 — <span class="pink-text">Observation Hacks</span></h2>
              <span class="algo-tag">Maximize Your Vision</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Simple adjustments can drastically improve what you see. Timing, positioning, and eye tricks make all the difference.</p>
          </div>
          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>Averted Vision</h3>
              <p class="meta-note">Look slightly away from faint objects to activate the peripheral light-sensitive cells in your retina.</p>
            </div>
            <div class="guide-item">
              <h3>Anchor Stars</h3>
              <p class="meta-note">Use bright stars as stepping stones to find dim nebulae or clusters efficiently.</p>
            </div>
          </div>
        </section>

        <section id="tip2" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l2"></span>
            <div class="title-meta">
              <h2>Tip 2 — <span class="pink-text">Equipment Tricks</span></h2>
              <span class="algo-tag">Get the Most Out of Gear</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Whether it’s binoculars, scopes, or cameras, small tweaks in handling and setup save frustration and enhance results.</p>
          </div>
          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step"><span class="tech-name">Cool Gear</span><p>Wait for thermal equilibrium</p></div>
              <div class="operator">+</div>
              <div class="step"><span class="tech-name">Lens Care</span><p>Use caps, avoid sprays</p></div>
            </div>
            <p class="api-note">*Pro Tip: Mirror-based scopes need collimation. Refractors are low-maintenance but watch for chromatic aberration.*</p>
          </div>
        </section>

        <section id="tip3" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l3"></span>
            <div class="title-meta">
              <h2>Tip 3 — <span class="pink-text">Data Logging</span></h2>
              <span class="algo-tag">Keep Track Like a Pro</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Document your observations efficiently to improve pattern recognition and future planning.</p>
          </div>
          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>Quick Notes</h3>
              <p class="meta-note">Time, location, and sky conditions are essentials. Sketch or type a short description of what you see.</p>
            </div>
            <div class="guide-item">
              <h3>Observation Journal</h3>
              <p class="meta-note">Keep track of star brightness, apparent movement, and other anomalies. Helps the Engine give smarter recommendations.</p>
            </div>
          </div>
        </section>

        <section id="tip4" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l4"></span>
            <div class="title-meta">
              <h2>Tip 4 — <span class="pink-text">Environmental Insights</span></h2>
              <span class="algo-tag">Sky & Atmosphere</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Weather, moonlight, and light pollution affect everything. Understanding these factors will let you pick the perfect observing window.</p>
          </div>
          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step"><span class="tech-name">Moon Phase</span><p>New Moon = Deep Sky Success</p></div>
              <div class="operator">+</div>
              <div class="step"><span class="tech-name">Transparency</span><p>Clear skies maximize contrast</p></div>
            </div>
            <p class="api-note">*Tip: High humidity or light pollution reduces faint object visibility. Choose your site carefully.*</p>
          </div>
        </section>

        <footer class="cosmic-panel observation-footer">
          <h3>🌌 Explore & Apply</h3>
          <p class="panel-intro">These tips enhance your Poppy Universe missions. Keep experimenting and noting your discoveries.</p>
          <div class="footer-btns">
            <router-link to="/stargazing-guide" class="details-link">How to Stargaze</router-link>
            <router-link to="/equipment-guide" class="details-link secondary-btn">Equipment Guide</router-link>
          </div>
        </footer>

      </main>
    </div>
  </div>
</template>


<script setup>
/**
 * Poppy's General Tips & Tricks
 * V1.0 - Focused on Stargazing Mechanics
 */
</script>

<style scoped>
/* Reusing the exact CSS architecture from your Hardware page for 1:1 cohesion */

.engine-details-container { padding: 40px 20px; color: #e6e6fa; font-family: 'Inter', sans-serif; min-height: 100vh; }

.cosmic-panel {
    background-color: rgba(10, 0, 50, 0.85); 
    padding: 35px;
    border-radius: 10px;
    border: 1px solid #00ffff; 
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3); 
}

.intro-container { text-align: center; max-width: 1300px; margin: 0 auto 60px auto; }
.hero-title { font-size: 3.5rem; font-weight: 900; color: #c0fcfc; text-shadow: 0 0 15px #00ffff; margin: 0; }
.pink-glow { color: #ff69b4; text-shadow: 0 0 15px #ff007f; }
.pink-text { color: #ff69b4; }
.engine-tagline { color: #00ffff; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
.panel-intro { max-width: 850px; margin: 20px auto 0; color: #a0f0ff; line-height: 1.8; font-size: 1.1rem; font-style: italic; }

.details-layout { 
  display: flex; 
  align-items: flex-start; 
  max-width: 1300px; 
  margin: 0 auto; 
  gap: 50px; 
}

.side-nav-rail { 
  flex: 0 0 320px; 
  position: sticky; 
  top: 40px; 
  z-index: 10; 
}

.nav-rail-stack { display: flex; flex-direction: column; gap: 20px; }
.content-body { flex: 1; min-width: 0; }

.nav-header { color: #00ffff; font-size: 1.2rem; border-bottom: 2px solid #00ffff; padding-bottom: 10px; margin-bottom: 20px; font-weight: 700; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; color: #e6e6fa; text-decoration: none; font-weight: 600; transition: 0.3s; border-bottom: 1px solid rgba(0, 255, 255, 0.1); }
.nav-item:hover { color: #00ffff; padding-left: 10px; background: rgba(0, 255, 255, 0.05); }

.sidebar-extra-section { padding: 20px; }
.sidebar-info-text { font-size: 0.75rem; color: #a0f0ff; margin-bottom: 12px; line-height: 1.4; font-style: italic; }
.resource-box { display: flex; flex-direction: column; gap: 8px; padding: 15px; border: 1px dashed rgba(0, 255, 255, 0.3); border-radius: 8px; background: rgba(0, 255, 255, 0.02); }
.guide-link { color: #a0f0ff; font-size: 0.85rem; text-decoration: none; transition: 0.2s; }
.guide-link:hover { color: #ff69b4; padding-left: 5px; }

.layer-card { margin-bottom: 60px; }
.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; }
.title-meta h2 { color: #00ffff; font-size: 1.6rem; margin: 0; text-shadow: 0 0 5px rgba(0, 255, 255, 0.3); }
.algo-tag { color: #ff69b4; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
.engine-description { color: #e6e6fa; font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px; padding-left: 20px; border-left: 2px solid; border-image: linear-gradient(to bottom, #00d2ff, #ff69b4, transparent) 1; }

.troubleshoot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.guide-item { padding: 15px; border: 1px dashed rgba(106, 13, 173, 0.5); border-radius: 8px; background-color: rgba(106, 13, 173, 0.05); }
.guide-item h3 { color: #00ffff; font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; }
.meta-note { font-size: 0.85rem; color: #e0ceff; margin: 0; line-height: 1.4; }

.math-logic-box { margin-top: 30px; padding: 25px; border-radius: 8px; border: 1px solid rgba(0, 255, 255, 0.2); background: rgba(0,0,0,0.3); }
.logic-breakdown { display: flex; justify-content: space-around; align-items: center; text-align: center; }
.tech-name { font-weight: 700; color: #ff69b4; display: block; margin-bottom: 5px; font-size: 0.9rem; text-transform: uppercase; }
.operator { font-size: 1.8rem; color: #00ffff; font-weight: 900; }
.api-note { color: #ffb6c1; font-size: 0.85rem; text-align: center; margin-top: 15px; border-top: 1px solid rgba(255, 105, 180, 0.2); padding-top: 10px; font-style: italic;}

.layer-dot, .nav-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 8px currentColor; }
.l1 { color: #00ff00; background-color: #00ff00; } .l2 { color: #00ffff; background-color: #00ffff; } .l3 { color: #8a2be2; background-color: #8a2be2; } .l4 { color: #ff0000; background-color: #ff0000; }
.meta-label { color: #ff69b4; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 10px; display: block;}

.observation-footer { text-align: center; margin-top: 60px; }
 .footer-btns {display: flex; justify-content: center; gap: 1rem; margin-top: 20px; }

.details-link { display: inline-block; padding: 12px 30px; border-radius: 12px; background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: #fff; font-weight: 700; text-decoration: none; transition: 0.3s; }
.details-link:hover { box-shadow: 0 0 20px rgba(162, 155, 254, 0.5); transform: translateY(-3px); }

@media (max-width: 1100px) { .details-layout { flex-direction: column; } .side-nav-rail { width: 100%; position: static; } }
</style>
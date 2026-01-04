<template>
  <div class="engine-details-container">
    
    <div class="cosmic-panel intro-container">
      <header class="engine-main-header">
        <h1 class="hero-title loaded">
          Hardware <span class="pink-glow">Arsenal</span> 🛠️
        </h1>
        <p class="engine-tagline">POPPY'S GUIDE — EQUIPMENT BASICS V1.0</p>
      </header>
      
      <div class="intro-content">
        <p class="panel-intro">
          From naked-eye observation to high-aperture optics. Select your <strong>optical hardware</strong> 
          to understand its technical capabilities and constraints.
        </p>
      </div>
    </div>

    <div class="details-layout">
      <aside class="side-nav-rail">
        <div class="nav-rail-stack"> 
          
          <div class="cosmic-panel sticky-nav">
            <div class="nav-header">Hardware <span class="pink-text">Classes</span></div>
            <div class="nav-items-wrapper">
              <a href="#class1" class="nav-item"><span class="nav-dot l1"></span>Biological Optics</a>
              <a href="#class2" class="nav-item"><span class="nav-dot l2"></span>Refractor Core</a>
              <a href="#class3" class="nav-item"><span class="nav-dot l3"></span>Reflector Core</a>
              <a href="#class4" class="nav-item"><span class="nav-dot l4"></span>Catadioptric</a>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Quick <span class="pink-text">Tips</span></h4>
            <p class="sidebar-info-text">Hardware maintenance & optimization protocols.</p>
            <div class="resource-box">
              <div class="guide-link">Keep lenses capped</div>
              <div class="guide-link">Avoid glass cleaners</div>
              <div class="guide-link">Cool down for 30m</div>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Other Modules</h4>
            <div class="resource-box">
              <router-link to="/stargazing-guide" class="guide-link">How to Stargaze</router-link>
              <router-link to="/tips_and_tricks" class="guide-link">Tips & Tricks</router-link>
            </div>
          </div>
        </div>
      </aside>

      <main class="content-body">
        
        <section id="class1" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l1"></span>
            <div class="title-meta">
              <h2>Class 0 — <span class="pink-text">Biological</span> Optics</h2>
              <span class="algo-tag">Naked Eye & Binoculars</span>
            </div>
          </div>
          <div class="engine-description">
            <p>The baseline for every explorer. High field-of-view (FOV) observation allows for constellation recognition and spotting bright satellites.</p>
          </div>
          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>Human Eye</h3>
              <p class="meta-note">FOV: ~180°. Best for meteor showers and major constellations. Requires dark adaptation (Step 2 of Guide).</p>
            </div>
            <div class="guide-item">
              <h3>Binoculars (7x50)</h3>
              <p class="meta-note">The "7" is magnification; the "50" is aperture in mm. Perfect for scanning the Milky Way and large star clusters.</p>
            </div>
          </div>
        </section>

        <section id="class2" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l2"></span>
            <div class="title-meta">
              <h2>Class 1 — <span class="pink-text">Refractor</span> Core</h2>
              <span class="algo-tag">Lens-Based Systems</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Uses a glass objective lens at the front to bend light. Known for high-contrast images and zero maintenance (no collimation needed).</p>
          </div>
          

[Image of refractor telescope diagram]

          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step"><span class="tech-name">Primary</span><p>Convex Lens</p></div>
              <div class="operator">+</div>
              <div class="step"><span class="tech-name">Result</span><p>Sharp Planetary Detail</p></div>
            </div>
            <p class="api-note">*Pros: Crisp views of Moon/Planets. Cons: Can have "Chromatic Aberration" (purple halos).*</p>
          </div>
        </section>

        <section id="class3" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l3"></span>
            <div class="title-meta">
              <h2>Class 2 — <span class="pink-text">Reflector</span> Core</h2>
              <span class="algo-tag">Mirror-Based Systems</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Uses a curved primary mirror at the back to reflect light. Best "bang for your buck" for seeing faint deep-sky objects like nebulae.</p>
          </div>
          

[Image of Newtonian reflector telescope diagram]

          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step"><span class="tech-name">Primary</span><p>Parabolic Mirror</p></div>
              <div class="operator">+</div>
              <div class="step"><span class="tech-name">Result</span><p>Deep Space Reach</p></div>
            </div>
            <p class="api-note">*Pros: Cheap aperture. Cons: Needs "collimation" (aligning mirrors) regularly.*</p>
          </div>
        </section>

        <section id="class4" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l4"></span>
            <div class="title-meta">
              <h2>Class 3 — <span class="pink-text">Catadioptric</span></h2>
              <span class="algo-tag">Hybrid Systems</span>
            </div>
          </div>
          <div class="engine-description">
            <p>The ultimate high-tech hybrid. Uses both mirrors and lenses to "fold" the light path, making a long-reach telescope very compact.</p>
          </div>
          

[Image of Schmidt-Cassegrain telescope diagram]

          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>SCT / Maksutov</h3>
              <p class="meta-note">High focal length in a small tube. Perfect for high-power planetary observation and astrophotography.</p>
            </div>
            <div class="guide-item">
              <h3>Maintenance</h3>
              <p class="meta-note">Requires thermal equilibrium. The closed tube takes longer to cool down than reflectors.</p>
            </div>
          </div>
        </section>

        <footer class="cosmic-panel observation-footer">
            <h3>🔭 Choose Your Instrument</h3>
            <p class="panel-intro">Each hardware class has its own role in the Poppy Universe. Ready to test your optics?</p>
            <div class="footer-btns">
              <router-link to="/stargazing-forecast" class="details-link">Check Conditions</router-link>
            </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
// Purely informational blueprint page
</script>

<style scoped>
/* Reusing your structural CSS logic for 100% cohesion */
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

/* LAYOUT SYSTEM - NO OVERLAP FIX */
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

/* NAV STYLING */
.nav-header { color: #00ffff; font-size: 1.2rem; border-bottom: 2px solid #00ffff; padding-bottom: 10px; margin-bottom: 20px; font-weight: 700; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; color: #e6e6fa; text-decoration: none; font-weight: 600; transition: 0.3s; border-bottom: 1px solid rgba(0, 255, 255, 0.1); }
.nav-item:hover { color: #00ffff; padding-left: 10px; background: rgba(0, 255, 255, 0.05); }

/* SIDEBAR EXTRA SECTIONS */
.sidebar-extra-section { padding: 20px; }
.sidebar-info-text { font-size: 0.75rem; color: #a0f0ff; margin-bottom: 12px; line-height: 1.4; font-style: italic; }
.resource-box { display: flex; flex-direction: column; gap: 8px; padding: 15px; border: 1px dashed rgba(0, 255, 255, 0.3); border-radius: 8px; background: rgba(0, 255, 255, 0.02); }
.guide-link { color: #a0f0ff; font-size: 0.85rem; text-decoration: none; transition: 0.2s; }
.guide-link:hover { color: #ff69b4; padding-left: 5px; }

/* CONTENT CARDS */
.layer-card { margin-bottom: 60px; }
.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; }
.title-meta h2 { color: #00ffff; font-size: 1.6rem; margin: 0; text-shadow: 0 0 5px rgba(0, 255, 255, 0.3); }
.algo-tag { color: #ff69b4; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
.engine-description { color: #e6e6fa; font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px; padding-left: 20px; border-left: 2px solid; border-image: linear-gradient(to bottom, #00d2ff, #ff69b4, transparent) 1; }

.troubleshoot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.guide-item { padding: 15px; border: 1px dashed rgba(106, 13, 173, 0.5); border-radius: 8px; background-color: rgba(106, 13, 173, 0.05); }
.guide-item h3 { color: #00ffff; font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; }
.meta-note { font-size: 0.85rem; color: #e0ceff; margin: 0; line-height: 1.4; }

/* LOGIC BLOCKS (Technical Feel) */
.math-logic-box { margin-top: 30px; padding: 25px; border-radius: 8px; border: 1px solid rgba(0, 255, 255, 0.2); background: rgba(0,0,0,0.3); }
.logic-breakdown { display: flex; justify-content: space-around; align-items: center; text-align: center; }
.tech-name { font-weight: 700; color: #ff69b4; display: block; margin-bottom: 5px; font-size: 0.9rem; text-transform: uppercase; }
.operator { font-size: 1.8rem; color: #00ffff; font-weight: 900; }
.api-note { color: #ffb6c1; font-size: 0.85rem; text-align: center; margin-top: 15px; border-top: 1px solid rgba(255, 105, 180, 0.2); padding-top: 10px; font-style: italic;}

/* UTILS */
.layer-dot, .nav-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 8px currentColor; }
.l1 { color: #00ff00; background-color: #00ff00; } .l2 { color: #00ffff; background-color: #00ffff; } .l3 { color: #8a2be2; background-color: #8a2be2; } .l4 { color: #ff0000; background-color: #ff0000; }
.meta-label { color: #ff69b4; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 10px; display: block;}

.observation-footer { text-align: center; margin-top: 60px; }
.details-link { display: inline-block; padding: 12px 30px; border-radius: 12px; background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: #fff; font-weight: 700; text-decoration: none; transition: 0.3s; }
.details-link:hover { box-shadow: 0 0 20px rgba(162, 155, 254, 0.5); transform: translateY(-3px); }

@media (max-width: 1100px) { .details-layout { flex-direction: column; } .side-nav-rail { width: 100%; position: static; } }
</style>
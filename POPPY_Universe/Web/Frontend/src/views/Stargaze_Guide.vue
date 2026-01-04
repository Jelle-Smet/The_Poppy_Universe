<template>
  <div class="engine-details-container">
    
    <div class="cosmic-panel intro-container">
      <header class="engine-main-header">
        <h1 class="hero-title">
          How to <span class="pink-glow">Stargaze</span> 🌠
        </h1>
        <p class="engine-tagline">POPPY'S GUIDE — MISSION PROTOCOL V1.0</p>
      </header>
      
      <div class="intro-content">
        <p class="panel-intro">
          Stargazing is more than just looking up; it’s about aligning yourself with the universe. 
          Follow these <strong>four core mission steps</strong> to master the night sky.
        </p>
      </div>
    </div>

    <div class="details-layout">
      <aside class="side-nav-rail">
        <div class="nav-rail-stack"> 
          
          <div class="cosmic-panel sticky-nav">
            <div class="nav-header">Mission <span class="pink-text">Phases</span></div>
            <div class="nav-items-wrapper">
              <a href="#step1" class="nav-item"><span class="nav-dot l1"></span>1. Prep the Lab</a>
              <a href="#step2" class="nav-item"><span class="nav-dot l2"></span>2. Dark Adaptation</a>
              <a href="#step3" class="nav-item"><span class="nav-dot l3"></span>3. Finding Targets</a>
              <a href="#step4" class="nav-item"><span class="nav-dot l4"></span>4. Recording Data</a>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Mission <span class="pink-text">Progress</span></h4>
            <p class="sidebar-info-text">Read each protocol to activate the phase.</p>
            <div class="resource-box">
              <button 
                v-for="step in missionSteps" 
                :key="step.id" 
                class="guide-link clean-status-btn" 
                @click="scrollToStep(step.anchor)"
              >
                <div class="status-btn-content">
                  <span :class="{ 'text-completed': completedSteps.has(step.anchor) }">{{ step.id }}</span>
                  <span :class="['mini-pill', completedSteps.has(step.anchor) ? 'status-active active-glow pulse' : 'status-ready']">
                    {{ completedSteps.has(step.anchor) ? 'ACTIVATED' : 'PENDING' }}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Live Telemetry</h4>
            <p class="sidebar-info-text">Check current atmospheric conditions before you head out.</p>
            <router-link to="/stargazing-forecast" class="forecast-btn">
              View Sky Forecast →
            </router-link>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Technical Resources</h4>
            <p class="sidebar-info-text">Continue your training with other modules.</p>
            <div class="resource-box">
              <router-link to="/Poppy's-Tips-&-Tricks" class="guide-link">Tips & Tricks</router-link>
              <router-link to="/equipment-basics" class="guide-link">Equipment Basics</router-link>
              <router-link to="/object-identification" class="guide-link">Identify Your Discovery</router-link>
            </div>
          </div>

        </div>
      </aside>

      <main class="content-body">
        
        <section id="step1" class="cosmic-panel layer-card mission-trigger">
          <div class="section-header">
            <span :class="['layer-dot l1', { 'active-glow': completedSteps.has('step1') }]"></span>
            <div class="title-meta">
              <h2>Step 1 — <span class="pink-text">Prepare</span> Your Lab</h2>
              <span class="algo-tag">The Pre-Flight Check</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Success starts before the sun goes down. A good observer checks the technical parameters of the sky to ensure the "signal-to-noise" ratio is optimal.</p>
          </div>
          <div class="troubleshoot-grid">
            <div class="guide-item highlight-item">
              <h3>Check Telemetry</h3>
              <p>Check Cloud Cover and Transparency. If seeing is below 3/8, planets will look blurry due to air turbulence.</p>
              <router-link to="/stargazing-forecast" class="mini-inline-link">Open Forecast Page</router-link>
            </div>
            <div class="guide-item">
              <h3>Moon Phase</h3>
              <p>Wait for a New Moon for faint Nebulae. If the Moon is >50%, stick to observing Lunar craters and Planets.</p>
            </div>
          </div>
        </section>

        <section id="step2" class="cosmic-panel layer-card mission-trigger">
          <div class="section-header">
            <span :class="['layer-dot l2', { 'active-glow': completedSteps.has('step2') }]"></span>
            <div class="title-meta">
              <h2>Step 2 — <span class="pink-text">Dark</span> Adaptation</h2>
              <span class="algo-tag">Bio-Sensor Calibration</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Your eyes are your most important sensors. It takes roughly <strong>20 to 30 minutes</strong> for your pupils to fully dilate and produce night-vision chemicals.</p>
          </div>
          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step"><span class="tech-name">Avoid</span><p>White Light / Phone Screens</p></div>
              <div class="operator">→</div>
              <div class="step"><span class="tech-name">Use</span><p>Dim Red Flashlights</p></div>
            </div>
            <p class="api-note">*Interpreted: A single second of white light resets your bio-sensors, forcing another 20-minute wait.*</p>
          </div>
        </section>

        <section id="step3" class="cosmic-panel layer-card mission-trigger">
          <div class="section-header">
            <span :class="['layer-dot l3', { 'active-glow': completedSteps.has('step3') }]"></span>
            <div class="title-meta">
              <h2>Step 3 — <span class="pink-text">Find</span> Your Targets</h2>
              <span class="algo-tag">Navigating the Sphere</span>
            </div>
          </div>
          <div class="engine-description">
            <p>Don't wander aimlessly. Use <strong>Star Hopping</strong> to move from bright "anchor stars" to faint cosmic treasures.</p>
          </div>
          
          <div class="troubleshoot-grid" style="margin-top: 25px;">
            <div class="guide-item">
              <h3>Averted Vision</h3>
              <p>Look slightly to the side of a dim cluster to hit your eye's most light-sensitive receptors.</p>
            </div>
            <div class="guide-item">
              <h3>Anchor Stars</h3>
              <p>Use bright constellations identified in Poppy's Recommendations as your starting waypoint.</p>
            </div>
          </div>
        </section>

        <section id="step4" class="cosmic-panel layer-card mission-trigger">
          <div class="section-header">
            <span :class="['layer-dot l4', { 'active-glow': completedSteps.has('step4') }]"></span>
            <div class="title-meta">
              <h2>Step 4 — <span class="pink-text">Record</span> Your Discovery</h2>
              <span class="algo-tag">Data Archiving</span>
            </div>
          </div>
          <div class="engine-description">
            <p>An observation isn't complete until it's logged. Keeping a journal helps the Engine understand your specific sky preferences.</p>
          </div>
          <div class="math-logic-box">
             <div class="logic-breakdown">
              <div class="step"><span class="tech-name">Logged Data</span><p>Time, Place, & Transparency</p></div>
              <div class="operator">+</div>
              <div class="step"><span class="tech-name">Visual Note</span><p>Sketch or Description</p></div>
            </div>
          </div>
        </section>

        <footer class="cosmic-panel observation-footer">
            <h3>🔭 Mission Status: {{ completedSteps.size === 4 ? 'COMPLETE' : 'IN PROGRESS' }}</h3>
            <p class="panel-intro">Visit your personalized recommendations or check the current sky forecast.</p>
            <div class="footer-btns">
              <router-link to="/engine-details" class="details-link">Launch Recommendations</router-link>
              <router-link to="/stargazing-forecast" class="details-link secondary-btn">Check Stargaze Forecast</router-link>
            </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const missionSteps = [
    { id: 'Phase 1', label: 'PREP', anchor: 'step1', statusClass: 'status-ready' },
    { id: 'Phase 2', label: 'DARK', anchor: 'step2', statusClass: 'status-ready' },
    { id: 'Phase 3', label: 'FIND', anchor: 'step3', statusClass: 'status-ready' },
    { id: 'Phase 4', label: 'LOG',  anchor: 'step4', statusClass: 'status-ready' }
];

const completedSteps = ref(new Set());
let observer = null;

const scrollToStep = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
    // This watches the containers. Once 80% is visible, it counts as "read/activated"
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                completedSteps.value.add(entry.target.id);
            }
        });
    }, { threshold: 0.8 });

    document.querySelectorAll('.mission-trigger').forEach(section => {
        observer.observe(section);
    });
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});
</script>

<style scoped>
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

/* LAYOUT SYSTEM */
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

/* CLEANER BUTTONS */
.clean-status-btn {
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  padding: 0;
  cursor: pointer;
  display: block;
}

.status-btn-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 0;
}

.text-completed { color: #ff69b4; font-weight: bold; transition: 0.3s; }

.mini-pill {
  font-size: 0.6rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 800;
  transition: 0.5s;
}

.nav-header { color: #00ffff; font-size: 1.2rem; border-bottom: 2px solid #00ffff; padding-bottom: 10px; margin-bottom: 20px; font-weight: 700; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; color: #e6e6fa; text-decoration: none; font-weight: 600; border-bottom: 1px solid rgba(0, 255, 255, 0.1); transition: 0.3s; }
.nav-item:hover { color: #00ffff; padding-left: 10px; background: rgba(0, 255, 255, 0.05); }

/* SIDEBAR REUSABLES */
.sidebar-extra-section { padding: 20px; }
.sidebar-info-text { font-size: 0.75rem; color: #a0f0ff; margin-bottom: 12px; line-height: 1.4; font-style: italic; }
.resource-box { display: flex; flex-direction: column; gap: 8px; padding: 15px; border: 1px dashed rgba(0, 255, 255, 0.3); border-radius: 8px; background: rgba(0, 255, 255, 0.02); }

.guide-link {
  color: #a0f0ff;
  font-size: 0.85rem;
  text-decoration: none;
  transition: 0.2s;
}
.guide-link:hover { color: #ff69b4; padding-left: 5px; }

.forecast-btn {
  display: block;
  text-align: center;
  padding: 12px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid #00ffff;
  color: #00ffff;
  text-decoration: none;
  font-weight: 800;
  font-size: 0.8rem;
  border-radius: 8px;
  transition: 0.3s;
  text-transform: uppercase;
}
.forecast-btn:hover { background: #00ffff; color: #000; box-shadow: 0 0 15px #00ffff; }

/* CONTENT CARDS */
.layer-card { margin-bottom: 60px; transition: 0.5s; }
.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; }
.title-meta h2 { color: #00ffff; font-size: 1.6rem; margin: 0; }
.algo-tag { color: #ff69b4; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
.engine-description { color: #e6e6fa; font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px; padding-left: 20px; border-left: 2px solid; border-image: linear-gradient(to bottom, #00d2ff, #ff69b4, transparent) 1; }

.troubleshoot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.guide-item { padding: 15px; border: 1px dashed rgba(106, 13, 173, 0.5); border-radius: 8px; background-color: rgba(106, 13, 173, 0.05); }
.highlight-item { border-color: #00ffff; background: rgba(0, 255, 255, 0.05); }
.guide-item h3 { color: #00ffff; font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; }
.mini-inline-link { color: #ff69b4; text-decoration: none; font-size: 0.8rem; font-weight: bold; }

/* MATH BLOCKS */
.math-logic-box { margin-top: 30px; padding: 25px; border-radius: 8px; border: 1px solid rgba(0, 255, 255, 0.2); background: rgba(0,0,0,0.3); }
.logic-breakdown { display: flex; justify-content: space-around; align-items: center; text-align: center; }
.tech-name { font-weight: 700; color: #ff69b4; display: block; margin-bottom: 5px; font-size: 0.9rem; text-transform: uppercase; }
.operator { font-size: 1.8rem; color: #00ffff; font-weight: 900; }
.api-note { color: #ffb6c1; font-size: 0.85rem; text-align: center; margin-top: 15px; border-top: 1px solid rgba(255, 105, 180, 0.2); padding-top: 10px; font-style: italic;}

/* STATUS COLORS */
.status-ready { background: rgba(255, 255, 255, 0.1); color: #aaa; border: 1px solid rgba(255, 255, 255, 0.2); }
.status-active { background: rgba(255, 105, 180, 0.2); color: #ff69b4; border: 1px solid #ff69b4; }
.active-glow { box-shadow: 0 0 15px #ff69b4; }

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
.pulse { animation: pulse 1.5s infinite ease-in-out; }

/* UTILS */
.layer-dot, .nav-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 8px currentColor; transition: 0.5s; }
.l1 { color: #00ff00; background-color: #00ff00; } .l2 { color: #00ffff; background-color: #00ffff; } .l3 { color: #8a2be2; background-color: #8a2be2; } .l4 { color: #ff0000; background-color: #ff0000; }
.meta-label { color: #ff69b4; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 10px; display: block;}

.observation-footer { text-align: center; margin-top: 60px; }
.footer-btns { display: flex; gap: 20px; justify-content: center; margin-top: 25px; }
.details-link { padding: 12px 30px; border-radius: 12px; background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: #fff; font-weight: 700; text-decoration: none; }
.secondary-btn { background: rgba(0, 255, 255, 0.1); border: 1px solid #00ffff; color: #00ffff; }

@media (max-width: 1100px) {
  .details-layout { flex-direction: column; }
  .side-nav-rail { width: 100%; position: static; }
}
</style>
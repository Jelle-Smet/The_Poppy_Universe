<template>
  <div class="engine-details-container">
    
    <div class="cosmic-panel intro-container">
      <header class="engine-main-header">
        <h1 class="hero-title">
          Poppy <span class="pink-glow">Universe</span> Information Hub 📂
        </h1>
        <p class="engine-tagline">POPPY UNIVERSE — SYSTEM DOCUMENTATION & FAQ</p>
      </header>
      
      <div class="intro-content">
        <p class="panel-intro">
          Deep dive into the logic of the <strong>Poppy (Poppy's Observations & Planetary Predictions for You)</strong> Universe. 
          Here you can find technical breakdowns of our discovery tools, ownership protocols, and the 
          academic foundations of our recommendation engine.
        </p>
      </div>
    </div>

    <div class="details-layout">
      <aside class="side-nav-rail">
        <div class="nav-rail-stack"> 
          
          <div class="cosmic-panel sticky-nav">
            <div class="nav-header">Universe <span class="pink-text">Index</span></div>
            <div class="nav-items-wrapper">
              <a href="#academic" class="nav-item"><span class="nav-dot l2"></span>Project Foundations</a>
              <a href="#scanner" class="nav-item"><span class="nav-dot l3"></span>Scanner Logic</a>
              <a href="#faq" class="nav-item"><span class="nav-dot l5"></span>Ownership FAQ</a>
              <a href="#corp" class="nav-item"><span class="nav-dot l1"></span>The Poppy Corporation</a>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">System <span class="pink-text">Status</span></h4>
            <div class="status-grid-mini">
              <div class="status-row"><span>Scanner</span> <span class="tech-status status-active">ONLINE</span></div>
              <div class="status-row"><span>Engine</span> <span class="tech-status status-active">ACTIVE</span></div>
              <div class="status-row"><span>Registry</span> <span class="tech-status status-ready">STABLE</span></div>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Quick Links</h4>
            <div class="resource-box">
              <router-link to="/contact_hub" class="guide-link">Contact Hub →</router-link>
              <router-link to="/tips_and_tricks" class="guide-link">Tips & Tricks →</router-link>
              <router-link to="/System-Status" class="guide-link">System Health →</router-link>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Build Specs</h4>
            <div class="nav-footer-info">
              <div class="stack-pill">Frontend: Vue 3</div>
              <div class="stack-pill">Engine: .NET 8 / C#</div>
              <div class="stack-pill">DB: MySQL</div>
            </div>
          </div>

        </div>
      </aside>

      <main class="content-body">
        
        <section id="academic" class="cosmic-panel layer-card">
          <div class="section-header">
            <div class="title-meta">
              <h2>Academic <span class="pink-text">Foundations</span></h2>
              <span class="algo-tag">Four-Course Engineering Synthesis</span>
            </div>
          </div>

          <div class="engine-description">
            <p>Poppy Universe is a comprehensive project integrating technical requirements from four major computer science disciplines:</p>
          </div>

          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step">
                <span class="tech-name">AI & ML</span>
                <p>MF, NN, and Genetic Algorithms</p>
              </div>
              <div class="operator">+</div>
              <div class="step">
                <span class="tech-name">Security & Ethics</span>
                <p>Adversarial Defense & Bias Mitigation</p>
              </div>
            </div>
          </div>

          <div class="troubleshoot-grid" style="margin-top: 25px;">
            <div class="guide-item">
              <h3>ML & Forecasting</h3>
              <p>Advanced data cleaning protocols that filter out incomplete celestial objects to ensure 100% data integrity for your observations.</p>
            </div>
            <div class="guide-item">
              <h3>Hacking AI Systems</h3>
              <p>Implementation of security layers to protect our recommendation algorithms from input manipulation.</p>
            </div>
          </div>
        </section>

        <section id="scanner" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l3"></span>
            <div class="title-meta">
              <h2>Deep Space <span class="pink-text">Scanner</span> Logic</h2>
              <span class="algo-tag">Precise Discovery Tool</span>
            </div>
          </div>

          <div class="engine-description">
            <p>The Scanner allows you to search our master database directly by defining exact physical parameters for mass and luminosity.</p>
          </div>
          
          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step">
                <span class="tech-name">Query Filters</span>
                <p>Mass Range | Luminosity Range | Object Type</p>
              </div>
              <div class="operator">→</div>
              <div class="step">
                <span class="tech-name">Integrity Check</span>
                <p>Excluded: Null/Incomplete Data Strings</p>
              </div>
            </div>
            <p class="api-note">*Note: To ensure accuracy, the scanner only surfaces "Complete Objects" with validated float and decimal values.*</p>
          </div>
        </section>

        <section id="faq" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l5"></span>
            <div class="title-meta">
              <h2>Ownership <span class="pink-text">FAQ</span></h2>
              <span class="algo-tag">User Protocol Knowledge Base</span>
            </div>
          </div>

          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>What does "Ownership" mean?</h3>
              <p>Adopting a star links your account ID to the object in our MySQL database. You are officially registered as the primary owner on the details page.</p>
            </div>
            <div class="guide-item">
              <h3>Can I rename my star?</h3>
              <p>All celestial bodies maintain their scientific names for observational consistency, but the <strong>Owner</strong> field is your personal digital legacy.</p>
            </div>
            <div class="guide-item">
              <h3>How are picks refined?</h3>
              <p>Every time you like or own a star, our 5-layer engine (MF/NN) learns your tastes to evolve better matches in the <strong>Poppy's Pick</strong> layer.</p>
            </div>
            <div class="guide-item">
              <h3>Found a system anomaly?</h3>
              <p>If you encounter any data errors, please report them via the <strong>Contact Hub</strong> to alert our maintenance team.</p>
            </div>
          </div>
        </section>

        <section id="corp" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l1"></span>
            <div class="title-meta">
              <h2>The <span class="pink-text">Poppy</span> Corporation</h2>
              <span class="algo-tag">Corporate Heritage</span>
            </div>
          </div>

          <div class="engine-description">
            <p>
              Poppy Universe is the flagship division of the <strong>Poppy Corporation</strong>. 
              We share our "Poppy Always" philosophy with our sister divisions:
            </p>
          </div>

          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>Poppy Stays</h3>
              <p><strong>P</strong>oppy <strong>O</strong>ffers <strong>P</strong>erfect <strong>P</strong>laces for <strong>Y</strong>ou.</p>
            </div>
            <div class="guide-item">
              <h3>Poppy Space</h3>
              <p><strong>P</strong>oppy's <strong>O</strong>bservations & <strong>P</strong>ioneering of <strong>P</strong>lanets for <strong>Y</strong>ou.</p>
            </div>
          </div>
        </section>

        <footer class="cosmic-panel observation-footer">
            <h3>📂 <span class="pink-text">Poppy Universe</span> Manifest End</h3>
            <p class="panel-intro">Academic Project 2025/2026 — Built with precision for the Poppy Corporation.</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* COPIED CSS TO ENSURE THE FULL PAGE IS READY TO USE */
.engine-details-container {
    padding: 100px 20px 40px; 
    color: #e6e6fa; 
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
}

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

.details-layout { display: flex; align-items: flex-start; max-width: 1300px; margin: 0 auto; gap: 50px; }
.side-nav-rail { flex: 0 0 320px; position: sticky; top: 120px; z-index: 10; }
.nav-rail-stack { display: flex; flex-direction: column; gap: 20px; }
.content-body { flex-grow: 1; min-width: 0; }
.layer-card { margin-bottom: 60px; scroll-margin-top: 150px; }

.nav-header {
  color: #00ffff; font-size: 1.2rem; border-bottom: 2px solid #00ffff; 
  padding-bottom: 10px; margin-bottom: 20px; font-weight: 700;
}

.nav-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 0; color: #e6e6fa;
  text-decoration: none; font-weight: 600; transition: 0.3s; border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}
.nav-item:hover { color: #00ffff; padding-left: 10px; background: rgba(0, 255, 255, 0.05); }

.sidebar-extra-section { padding: 20px; }
.sidebar-info-text { font-size: 0.75rem; color: #a0f0ff; margin-bottom: 12px; font-style: italic; }
.resource-box { display: flex; flex-direction: column; gap: 8px; padding: 10px; }
.guide-link { color: #a0f0ff; font-size: 0.85rem; text-decoration: none; transition: 0.2s; font-weight: bold; }
.guide-link:hover { color: #ff69b4; padding-left: 5px; }

.status-grid-mini { padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px; }
.status-row { display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 8px; color: #c0fcfc; }

.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; }
.title-meta h2 { color: #00ffff; font-size: 1.6rem; margin: 0; text-shadow: 0 0 5px rgba(0, 255, 255, 0.3); }
.algo-tag { color: #ff69b4; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
.engine-description { 
    color: #e6e6fa; font-size: 1.1rem; line-height: 1.6; margin-bottom: 25px;
    padding-left: 20px; border-left: 2px solid #ff69b4;
}

.troubleshoot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.guide-item { padding: 15px; border: 1px dashed rgba(106, 13, 173, 0.5); border-radius: 8px; background-color: rgba(106, 13, 173, 0.05); }
.guide-item h3 { color: #00ffff; font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; }
.guide-item p { font-size: 0.9rem; color: #e0ceff; margin: 0; line-height: 1.4; }

.math-logic-box { margin-top: 30px; padding: 25px; border-radius: 8px; border: 1px solid rgba(0, 255, 255, 0.2); background: rgba(0,0,0,0.3); }
.logic-breakdown { display: flex; justify-content: space-around; align-items: center; text-align: center; }
.tech-name { font-weight: 700; color: #ff69b4; display: block; margin-bottom: 5px; font-size: 0.9rem; text-transform: uppercase; }
.operator { font-size: 1.8rem; color: #00ffff; font-weight: 900; }
.api-note { color: #ffb6c1; font-size: 0.85rem; text-align: center; margin-top: 15px; border-top: 1px solid rgba(255, 105, 180, 0.2); padding-top: 10px; font-style: italic;}

.meta-label { color: #ff69b4; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 10px; display: block;}
.stack-pill { font-size: 0.75rem; color: #c0fcfc; font-weight: bold; margin-bottom: 5px; }
.tech-status { padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 0.65rem; }
.status-active { background: rgba(0, 255, 0, 0.1); color: #00ff00; }
.status-ready { background: rgba(0, 255, 255, 0.1); color: #00ffff; }

.layer-dot, .nav-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 8px currentColor; }
.l1 { color: #00ff00; background-color: #00ff00; }
.l2 { color: #00ffff; background-color: #00ffff; }
.l3 { color: #8a2be2; background-color: #8a2be2; }
.l5 { color: #ffff00; background-color: #ffff00; }

.observation-footer { text-align: center; margin-top: 60px; }

@media (max-width: 1100px) {
  .details-layout { flex-direction: column; }
  .side-nav-rail { width: 100%; position: static; }
  .troubleshoot-grid { grid-template-columns: 1fr; }
}
</style>
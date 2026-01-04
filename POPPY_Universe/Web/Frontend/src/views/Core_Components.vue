<template>
  <div class="architecture-details-wrapper">
    <div class="details-container">
      
      <header class="cosmic-glass-panel header-panel hero-reveal">
        <div class="status-badge">
          <span class="status-dot cyan-pulse"></span>
          SYSTEM_ARCHITECTURE // VER 1.0.0
        </div>
        <h1 class="hero-title">Core <span class="pink-glow">Components</span></h1>
        <p class="hero-subtitle">Detailed Technical Specification of the Poppy Universe</p>
        <div class="intro-block">
          <p>
            The Poppy Universe is built on a distributed cloud architecture designed for high-precision 
            astronomical data processing and ethical AI recommendations. Every layer of this ecosystem 
            is engineered for modularity, scalability, and extreme data integrity.
          </p>
        </div>
      </header>

      <section class="details-section">
        <div class="cosmic-glass-panel deployment-spec">
          <div class="spec-header">
            <h2 class="pink-text">Cloud <span class="cyan-text">Infrastructure</span></h2>
            <p class="spec-intro">The platform utilizes a distributed cloud strategy to optimize for compute power and global delivery.</p>
          </div>
          
          <div class="deployment-grid">
            <div class="deploy-card">
              <span class="provider">Vercel</span>
              <span class="layer">Frontend // UI</span>
              <p>Edge Network deployment for the Vue interface, ensuring low-latency delivery across all sectors.</p>
            </div>
            <div class="deploy-card">
              <span class="provider">Render</span>
              <span class="layer">Backend // Engine</span>
              <p>Orchestrates the Node.js runtime, managing the complex API logic and recommendation threading.</p>
            </div>
            <div class="deploy-card">
              <span class="provider">HuggingFace</span>
              <span class="layer">ML // Intelligence</span>
              <p>Dedicated inference points for Python-based models, handling neural logic and matrix calculations.</p>
            </div>
            <div class="deploy-card">
              <span class="provider">Aiven</span>
              <span class="layer">Database // SQL</span>
              <p>Managed MySQL instance ensuring high availability and ACID compliance for celestial datasets.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="details-section">
        <h2 class="section-title"><span class="pulse-dot"></span> COMPONENT_DEEP_DIVE</h2>
        <div class="tech-deep-grid">
          
          <div class="cosmic-glass-panel tech-detail-card">
            <div class="card-top">
              <span class="detail-icon">💻</span>
              <h3 class="pink-text">Frontend Architecture</h3>
            </div>
            <p>Built with <strong>Vue 3</strong> and the <strong>Composition API</strong>. The UI utilizes custom reactive hooks for real-time data binding, allowing the Encyclopedia and Feed to update without full page reloads.</p>
            <div class="tech-tags"><span class="tag">Vite</span> <span class="tag">Vue Router</span> <span class="tag">Axios</span></div>
          </div>

          <div class="cosmic-glass-panel tech-detail-card">
            <div class="card-top">
              <span class="detail-icon">⚙️</span>
              <h3 class="pink-text">Backend Ecosystem</h3>
            </div>
            <p>A <strong>Node.js & Express</strong> server acts as the central brain. It handles JWT authentication, coordinates between SQL and ML nodes, and implements rate-limiting for system security.</p>
            <div class="tech-tags"><span class="tag">REST API</span> <span class="tag">Express</span> <span class="tag">CORS</span></div>
          </div>

          <div class="cosmic-glass-panel tech-detail-card highlight-card">
            <div class="card-top">
              <span class="detail-icon pink-text">🧠</span>
              <h3 class="pink-text">The Engine</h3>
            </div>
            <p>A <strong>Hybrid Multi-Layer Engine</strong> combining rule-based filtering, Matrix Factorization, Neural Networks, and Genetic Algorithms to produce the final "Poppy's Pick" results.</p>
            <div class="tech-tags"><span class="tag">Neural Nets</span> <span class="tag">Genetic Alg</span></div>
          </div>

          <div class="cosmic-glass-panel tech-detail-card">
            <div class="card-top">
              <span class="detail-icon">🔄</span>
              <h3 class="pink-text">Data Integrity (ETL)</h3>
            </div>
            <p>Every celestial body is validated through custom <strong>SQL heuristics</strong>. Our ETL process cleans astronomical data to ensure no missing metrics enter the recommendable asset pool.</p>
            <div class="tech-tags"><span class="tag">Data Cleaning</span> <span class="tag">SQL Heuristics</span></div>
          </div>
        </div>
      </section>

      <section class="dual-section">
        <div class="cosmic-glass-panel info-box">
          <h3 class="cyan-text">AI Ethics & Transparency</h3>
          <p>Implementation of <strong>Explainable AI (XAI)</strong>. Explorers are provided with the reasoning behind every star recommendation, ensuring transparency in the celestial sky.</p>
        </div>
        <div class="cosmic-glass-panel info-box">
          <h3 class="cyan-text">System Observability</h3>
          <p>Continuous monitoring of API response times and inference latency ensures the distributed system maintains a seamless "Poppy Experience" across all sectors.</p>
        </div>
      </section>

      <div class="footer-spacer"></div>
    </div>
  </div>
</template>

<style scoped>
/* REMOVED BLACK BACKGROUND - ALLOWS MAIN LAYOUT STARS TO SHOW */
.architecture-details-wrapper {
  min-height: 100vh;
  padding: 100px 20px 0;
  color: #e6e6fa;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.details-container {
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* HEADER PANEL (NEW SEPARATE CONTAINER) */
.header-panel {
  text-align: center;
  margin-bottom: 20px;
  padding: 60px 40px !important;
}

.hero-title { font-size: clamp(2.5rem, 8vw, 4.5rem); color: #00ffff; font-weight: 900; line-height: 1.1; }
.pink-glow { color: #ff69b4; text-shadow: 0 0 25px #ff007f; }
.hero-subtitle { font-size: 0.9rem; letter-spacing: 6px; color: #00ffff; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
.intro-block p { font-size: 1.1rem; line-height: 1.8; color: #a0f0ff; margin-top: 30px; max-width: 800px; margin-left: auto; margin-right: auto; }

.status-badge {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(0, 255, 255, 0.05); padding: 8px 15px;
  border-radius: 50px; border: 1px solid rgba(0, 255, 255, 0.2);
  font-family: monospace; font-size: 0.7rem; color: #00ffff; margin-bottom: 20px;
}

/* PANELS */
.cosmic-glass-panel {
  background: rgba(15, 0, 40, 0.7); /* Reduced opacity for better transparency */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

/* DEPLOYMENT GRID */
.deployment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
.deploy-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.provider { display: block; color: #ff69b4; font-weight: 900; font-size: 1.1rem; margin-bottom: 5px; }
.layer { display: block; font-family: monospace; font-size: 0.65rem; color: #00ffff; margin-bottom: 12px; }
.deploy-card p { font-size: 0.8rem; line-height: 1.5; color: #a0f0ff; }

/* TECH DEEP GRID */
.tech-deep-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}
.tech-detail-card { transition: 0.3s; padding: 35px !important; }
.tech-detail-card:hover { transform: translateY(-5px); border-color: #ff69b4; }
.card-top { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
.tech-detail-card h3 { font-size: 1.2rem; margin: 0; }
.tech-detail-card p { font-size: 0.9rem; line-height: 1.7; color: #e6e6fa; margin-bottom: 20px; }

.tech-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { font-family: monospace; font-size: 0.65rem; background: rgba(0, 255, 255, 0.1); color: #00ffff; padding: 3px 8px; border-radius: 4px; }

/* DUAL SECTION */
.dual-section { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
.info-box h3 { margin-bottom: 15px; font-weight: 800; font-size: 1.1rem; }

/* UTILS */
.pink-text { color: #ff69b4; text-transform: uppercase; letter-spacing: 2px; font-weight: 800; }
.cyan-text { color: #00ffff; }
.section-title { 
  font-family: 'Inter', monospace; 
  font-size: 0.85rem; 
  font-weight: 800; /* Heavier weight for visibility */
  letter-spacing: 6px; 
  color: #00ffff; /* Brighter Cyan instead of faded lavender */
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.4); /* Subtle glow */
  display: flex; 
  align-items: center; 
  gap: 15px; 
  margin: 60px 0 30px; 
  text-transform: uppercase;
}

.pulse-dot { 
  width: 10px; 
  height: 10px; 
  background: #00ffff; 
  border-radius: 50%; 
  /* Intense neon box shadow */
  box-shadow: 0 0 15px #00ffff, 0 0 30px rgba(0, 255, 255, 0.6); 
  animation: pulse-glow 1.5s infinite ease-in-out;
}
.cyan-pulse { animation: pulse 2s infinite; }
.footer-spacer { height: 140px; } 

@keyframes pulse-glow {
  0% { transform: scale(0.9); opacity: 0.7; box-shadow: 0 0 10px #00ffff; }
  50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 20px #00ffff, 0 0 35px rgba(0, 255, 255, 0.8); }
  100% { transform: scale(0.9); opacity: 0.7; box-shadow: 0 0 10px #00ffff; }
}

@media (max-width: 800px) {
  .dual-section { grid-template-columns: 1fr; }
  .header-panel { padding: 40px 20px !important; }
}
</style>
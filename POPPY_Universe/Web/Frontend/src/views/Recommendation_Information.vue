<template>
  <div class="engine-details-container">
    
    <div class="cosmic-panel intro-container">
      <header class="engine-main-header">
        <h1 class="hero-title">
          Poppy's <span class="pink-glow">Engine</span> Explained ⚙️
        </h1>
        <p class="engine-tagline">POPPY UNIVERSE — RECOMMENDATION CORE V1.0.0</p>
      </header>
      
      <div class="intro-content">
        <p class="panel-intro">
          The Poppy Universe Recommendation Engine is a sophisticated, <strong>five-layer pipeline</strong> 
          built in C#. It intelligently filters thousands of celestial data points, refining them through 
          social trends, mathematical modeling, and artificial intelligence to find your perfect night sky.
        </p>
      </div>
    </div>

    <div class="details-layout">
      <aside class="side-nav-rail">
        <div class="nav-rail-stack"> 
          
          <div class="cosmic-panel sticky-nav">
            <div class="nav-header">Pipeline <span class="pink-text">Phases</span></div>
            <div class="nav-items-wrapper">
              <a href="#l1" class="nav-item"><span class="nav-dot l1"></span>Poppy's Right Now</a>
              <a href="#l2" class="nav-item"><span class="nav-dot l2"></span>Poppy's Trend Booster</a>
              <a href="#l3" class="nav-item"><span class="nav-dot l3"></span>Poppy's Familiar Picks</a>
              <a href="#l4" class="nav-item"><span class="nav-dot l4"></span>Poppy's Hidden Matches</a>
              <a href="#l5" class="nav-item"><span class="nav-dot l5"></span>Poppy's Pick</a>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
                <h4 class="meta-label">Pipeline <span class="pink-text">Status</span></h4>
                <p class="sidebar-info-text">Live heartbeat of the recommendation layers.</p>
                <div class="status-grid-mini">
                    <div 
                        v-for="layer in pipelineLayers" 
                        :key="layer.id" 
                        class="status-row clickable-status" 
                        @click="navigateToLayer(layer.route)"
                    >
                        <span>{{ layer.id }}</span> 
                        <span :class="['tech-status', getStatusClass(layer.status)]">
                            {{ layer.status }} <span class="arrow-mini">→</span>
                        </span>
                    </div>
                </div>
                <p class="last-checked" v-if="lastChecked">Last sync: {{ lastChecked }}</p>
            </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Engine <span class="pink-text">Architecture</span></h4>
            <div class="hierarchy-map">
                <div class="h-stage">Stage 3: The Winner</div>
                <div class="h-block fusion">L5: Consensus Ranker</div>
                <div class="h-connector">▲</div>
                
                <div class="h-stage">Stage 2: Intelligence Layers</div>
                <div class="h-row">
                    <div class="h-block branch">L2: Social</div>
                    <div class="h-block branch">L3: Taste</div>
                    <div class="h-block branch">L4: AI</div>
                </div>
                <div class="h-connector">▲</div>
                
                <div class="h-stage">Stage 1: Physical Reality</div>
                <div class="h-block base">L1: Horizon Visibility</div>
            </div>
            <p class="sidebar-info-text" style="margin-top: 15px; border-top: 1px solid rgba(0, 255, 255, 0.1); padding-top: 10px;">
                <strong>How it works:</strong> Visibility is checked first. Then, Social, Taste, and AI analyze the visible stars. Finally, the Ranker picks the #1 spot.
            </p>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Technical Resources</h4>
            <div class="resource-box">
              <a href="https://en.wikipedia.org/wiki/Rule-based_system" target="_blank" class="guide-link">Deterministic Logic</a>
              <a href="https://developers.google.com/machine-learning/recommendation/overview" target="_blank" class="guide-link">Recommender Systems</a>
              <a href="https://developers.google.com/machine-learning/recommendation/collaborative/matrix" target="_blank" class="guide-link">Matrix Factorization</a>
              <a href="https://www.ibm.com/topics/neural-networks" target="_blank" class="guide-link">Neural Architectures</a>
              <a href="https://en.wikipedia.org/wiki/Genetic_algorithm" target="_blank" class="guide-link">Evolutionary Computing</a>
            </div>
          </div>

          <div class="cosmic-panel sidebar-extra-section">
            <h4 class="meta-label">Stack Specs</h4>
            <div class="nav-footer-info">
              <div class="stack-pill">.NET 8 C# Core</div>
              <div class="stack-pill">Layered Architecture</div>
            </div>
          </div>

        </div>
      </aside>

      <main class="content-body">
        
        <section id="l1" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l1"></span>
            <div class="title-meta">
              <h2>Layer 1 — <span class="pink-text">Deterministic</span> Personalization</h2>
              <span class="algo-tag">Rule-Based Heuristics</span>
            </div>
          </div>
          
          <div class="engine-description">
            <p>The foundation layer. It ensures recommendations are <strong>physically observable</strong> from your GPS coordinates before applying any personal bias.</p>
          </div>

          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>Horizon Check</h3>
              <p>Filters the sky in real-time. If an object is behind the Earth or below the horizon, it's discarded immediately.</p>
            </div>
            <div class="guide-item">
              <h3>Magnitude Scaling</h3>
              <p>Prioritizes brightness. Objects you can see with the naked eye are weighted higher than deep-space targets.</p>
            </div>
          </div>

          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step">
                <span class="tech-name">Brightness Score</span>
                <p>Inverse Magnitude Scaling</p>
              </div>
              <div class="operator">+</div>
              <div class="step">
                <span class="tech-name">User Multiplier</span>
                <p>Preference database injection</p>
              </div>
            </div>
            <p class="api-note">*Interpreted: We find everything visible, rank them by how bright they are, and then "bump up" your favorite objects to the top.*</p>
          </div>
        </section>

        <section id="l2" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l2"></span>
            <div class="title-meta">
              <h2>Layer 2 — <span class="pink-text">Social</span> Momentum</h2>
              <span class="algo-tag">Trend Signals</span>
            </div>
          </div>

          <div class="engine-description">
            <p>Injects <strong>Community Interaction</strong>. This layer monitors global traffic to highlight objects that are currently "trending" among other observers.</p>
          </div>
          
          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step">
                <span class="tech-name">Community Action</span>
                <p>Global Clicks + Global Likes (60% Weight)</p>
              </div>
              <div class="operator">+</div>
              <div class="step">
                <span class="tech-name">Trend Velocity</span>
                <p>How fast interest is growing right now (40% Weight)</p>
              </div>
            </div>
            <p class="api-note">*Interpreted: If thousands of people are suddenly clicking on Saturn, it gets a "Boost" badge and moves up your list, capped at 25% of the total score.*</p>
          </div>
        </section>

        <section id="l3" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l3"></span>
            <div class="title-meta">
              <h2>Layer 3 — <span class="pink-text">Semantic</span> Patterns</h2>
              <span class="algo-tag">Matrix Factorization</span>
            </div>
          </div>

          <div class="engine-description">
            <p>Captures <strong>Hidden Tastes</strong>. This layer doesn't look at specific objects, but at the <em>types</em> of things you like (e.g., Gas Giants vs. Dwarf Planets).</p>
          </div>
          
          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>Matrix Construction</h3>
              <p>Builds a User × Category matrix where Star types (O/B/A/F/G/K/M), Planet types, and Moon types are columns.</p>
            </div>
            <div class="guide-item">
              <h3>Interaction Strength</h3>
              <p>Learns latent features from interaction strengths (0-10) to estimate scores for unseen categories.</p>
            </div>
          </div>
          
          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step">
                <span class="tech-name">User Latent Vector</span>
                <p>Your unique "Cosmic Flavor Profile"</p>
              </div>
              <div class="operator">×</div>
              <div class="step">
                <span class="tech-name">Category Matrix</span>
                <p>Hidden trait mapping</p>
              </div>
            </div>
            <p class="api-note">*Interpreted: If you love Jupiter, the engine predicts you will like Saturn because they share similar latent features.*</p>
          </div>
        </section>

        <section id="l4" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l4"></span>
            <div class="title-meta">
              <h2>Layer 4 — <span class="pink-text">Deep</span> Refinement</h2>
              <span class="algo-tag">Neural Network</span>
            </div>
          </div>

          <div class="engine-description">
            <p>The <strong>Pattern Brain</strong>. While Layer 3 finds broad similarities, Layer 4 finds deep, complex reasons why you might like something.</p>
          </div>

          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step">
                <span class="tech-name">Input</span>
                <p>Your unique User ID + Object Category</p>
              </div>
              <div class="operator">→</div>
              <div class="step">
                <span class="tech-name">Neural Processing</span>
                <p>Multiple "Hidden Layers" simulate a decision-making process.</p>
              </div>
            </div>
            <p class="api-note">*Interpreted: This mini-AI "guesses" your reaction based on non-linear patterns. It gets better as you use the app.*</p>
          </div>
        </section>

        <section id="l5" class="cosmic-panel layer-card">
          <div class="section-header">
            <span class="layer-dot l5"></span>
            <div class="title-meta">
              <h2>Layer 5 — <span class="pink-text">Genetic</span> Rank Fusion</h2>
              <span class="algo-tag">Consensus Optimizer</span>
            </div>
          </div>

          <div class="engine-description">
            <p>The <strong>Final Vote</strong>. It intelligently combines all previous layers to find the most balanced, high-consensus ranking.</p>
          </div>

          <div class="troubleshoot-grid">
            <div class="guide-item">
              <h3>Genetic Evolution</h3>
              <p>Evolves a population of weight combinations over 50+ generations using Tournament selection.</p>
            </div>
            <div class="guide-item">
              <h3>Constraint Check</h3>
              <p>Ensures all weights sum to 1.0, preventing any single strategy from dominating unfairly.</p>
            </div>
          </div>
          
          <div class="math-logic-box">
            <div class="logic-breakdown">
              <div class="step">
                <span class="tech-name">Sum of Layer Ranks</span>
                <p>Positions from Layer 1, 2, 3, and 4.</p>
              </div>
              <div class="operator">→</div>
              <div class="step">
                <span class="tech-name">Evolutionary Contest</span>
                <p>Finds the "fittest" weight to minimize disagreement.</p>
              </div>
            </div>
            <p class="api-note">*Interpreted: All layers "vote" on the top list, and the most consistent objects win the #1 spot.*</p>
          </div>
        </section>

        <footer class="cosmic-panel observation-footer">
            <h3>⚙️ <span class="pink-text">Observability</span> Diagnostic</h3>
            <p class="panel-intro">Visibility percentages are diagnostic tools only and do not influence recommendation scores.</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const API_BASE_URL = import.meta.env.VITE_API_URL;

const lastChecked = ref(null);

// Define layers with reactive status
const pipelineLayers = ref([
    { id: 'L1', status: 'Checking... 🔄', route: '/Layer1_Recommendations' },
    { id: 'L2', status: 'Checking... 🔄', route: '/Layer2_Recommendations' },
    { id: 'L3', status: 'Checking... 🔄', route: '/Layer3_Recommendations' },
    { id: 'L4', status: 'Checking... 🔄', route: '/Layer4_Recommendations' },
    { id: 'L5', status: 'Checking... 🔄', route: '/Layer5_Recommendations' }
]);

const checkPipelineStatus = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/status`, { 
            signal: AbortSignal.timeout(10000) 
        });
        
        if (response.ok) {
            const data = await response.json();
            pipelineLayers.value.forEach((layer, index) => {
                if (index < 4) layer.status = 'Active 🟢';
                else layer.status = 'Stable ✅';
            });
        } else {
            pipelineLayers.value.forEach(layer => layer.status = 'Limited 🟡');
        }
    } catch (error) {
        pipelineLayers.value.forEach(layer => layer.status = 'Offline ❌');
    } finally {
        lastChecked.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
};

function getStatusClass(status) {
    if (status.includes('Active') || status.includes('Stable') || status.includes('✅') || status.includes('🟢')) return 'status-active';
    if (status.includes('Offline') || status.includes('❌')) return 'status-error';
    if (status.includes('Checking') || status.includes('Limited')) return 'status-ready';
    return '';
}

const navigateToLayer = (routePath) => {
    router.push(routePath);
};

onMounted(() => {
    checkPipelineStatus();
});
</script>

<style scoped>
.engine-details-container {
    padding: 40px 20px; 
    color: #e6e6fa; 
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
}

/* --- COSMIC PANEL BASE --- */
.cosmic-panel {
    background-color: rgba(10, 0, 50, 0.85); 
    padding: 35px;
    border-radius: 10px;
    border: 1px solid #00ffff; 
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3); 
}

/* HEADER STYLE */
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

.nav-rail-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* CONTENT AREA */
.content-body {
  flex-grow: 1;
  min-width: 0;
}

.layer-card { margin-bottom: 60px; }

/* NAV STYLING */
.nav-header {
  color: #00ffff; 
  font-size: 1.2rem;
  border-bottom: 2px solid #00ffff; 
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: 700;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: #e6e6fa;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}
.nav-item:hover { color: #00ffff; padding-left: 10px; background: rgba(0, 255, 255, 0.05); }

/* SIDEBAR EXTRA SECTIONS */
.sidebar-extra-section {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
}

.sidebar-info-text {
  font-size: 0.75rem;
  color: #a0f0ff;
  margin-bottom: 12px;
  line-height: 1.4;
  font-style: italic;
}

.resource-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  border: 1px dashed rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(0, 255, 255, 0.02);
}

.guide-link {
  color: #a0f0ff;
  font-size: 0.85rem;
  text-decoration: none;
  transition: 0.2s;
}
.guide-link:hover { color: #ff69b4; padding-left: 5px; }

.status-grid-mini {
  padding: 12px;
  background: rgba(0,0,0,0.2);
  border-radius: 8px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 8px;
  color: #c0fcfc;
}

.clickable-status {
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 4px 8px;
    border-radius: 4px;
}

.clickable-status:hover {
    background: rgba(0, 255, 255, 0.1);
    transform: translateX(5px);
}

.last-checked {
    font-size: 0.65rem;
    color: rgba(0, 255, 255, 0.5);
    margin-top: 10px;
    text-align: right;
}

/* HIERARCHY MAP STYLES */
.hierarchy-map {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0,0,0,0.4);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(0, 255, 255, 0.3);
}
.h-stage {
    font-size: 0.6rem;
    color: #ff69b4;
    text-transform: uppercase;
    font-weight: 800;
    margin-bottom: 5px;
    letter-spacing: 1px;
}
.h-block {
    padding: 8px 12px;
    font-size: 0.75rem;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.h-block.fusion { background: #ff69b4; color: #000; width: 100%; }
.h-block.base { background: #00ff00; color: #000; width: 100%; }
.h-row { display: flex; gap: 6px; width: 100%; justify-content: center; }
.h-block.branch { 
    background: rgba(0, 255, 255, 0.1); 
    border: 1px solid #00ffff; 
    color: #00ffff; 
    flex: 1; 
}
.h-connector { color: #00ffff; font-weight: bold; margin: 8px 0; font-size: 1rem; }

/* COMPONENT ACCENTS */
.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; }
.title-meta h2 { color: #00ffff; font-size: 1.6rem; margin: 0; text-shadow: 0 0 5px rgba(0, 255, 255, 0.3); }
.algo-tag { color: #ff69b4; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
.engine-description { 
    color: #e6e6fa; 
    font-size: 1.1rem; 
    line-height: 1.6; 
    margin-bottom: 25px;
    padding-left: 20px;
    border-left: 2px solid;
    border-image: linear-gradient(to bottom, #00d2ff, #ff69b4, transparent) 1;
}

.troubleshoot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
.guide-item { padding: 15px; border: 1px dashed rgba(106, 13, 173, 0.5); border-radius: 8px; background-color: rgba(106, 13, 173, 0.05); }
.guide-item h3 { color: #00ffff; font-size: 1.1rem; margin-top: 0; margin-bottom: 8px; }
.guide-item p { font-size: 0.9rem; color: #e0ceff; margin: 0; line-height: 1.4; }

/* LOGIC BLOCKS */
.math-logic-box { margin-top: 30px; padding: 25px; border-radius: 8px; border: 1px solid rgba(0, 255, 255, 0.2); background: rgba(0,0,0,0.3); }
.logic-breakdown { display: flex; justify-content: space-around; align-items: center; text-align: center; }
.tech-name { font-weight: 700; color: #ff69b4; display: block; margin-bottom: 5px; font-size: 0.9rem; text-transform: uppercase; }
.operator { font-size: 1.8rem; color: #00ffff; font-weight: 900; }
.api-note { color: #ffb6c1; font-size: 0.85rem; text-align: center; margin-top: 15px; border-top: 1px solid rgba(255, 105, 180, 0.2); padding-top: 10px; font-style: italic;}

/* SIDEBAR FOOTER */
.meta-label { color: #ff69b4; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 10px; display: block;}
.stack-pill { font-size: 0.75rem; color: #c0fcfc; font-weight: bold; margin-bottom: 5px; display: block; }

/* REUSED STATUS STYLES */
.tech-status { padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 0.65rem; }
.status-active { background: rgba(0, 255, 0, 0.1); color: #00ff00; }
.status-ready { background: rgba(0, 255, 255, 0.1); color: #00ffff; }
.status-error { background: rgba(255, 0, 0, 0.1); color: #ff0000; }

/* DOTS */
.layer-dot, .nav-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 8px currentColor; }
.nav-dot { width: 8px; height: 8px; }
.l1 { color: #00ff00; background-color: #00ff00; }
.l2 { color: #00ffff; background-color: #00ffff; }
.l3 { color: #8a2be2; background-color: #8a2be2; }
.l4 { color: #ff0000; background-color: #ff0000; }
.l5 { color: #ffff00; background-color: #ffff00; }

.observation-footer { text-align: center; margin-top: 60px; }

@media (max-width: 1100px) {
  .details-layout { flex-direction: column; }
  .side-nav-rail { width: 100%; position: static; }
  .sticky-nav { position: static; }
  .troubleshoot-grid { grid-template-columns: 1fr; }
}
</style>
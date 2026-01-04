<template>
  <div class="poppy-universe-home"> 
    <header class="hero">
      <h1 :class="['hero-title', { 'loaded': isLoaded }]">
        Welcome to the <span class="universe-highlight">Poppy Universe</span>
      </h1>
      <p class="hero-subtitle">
        Explore planets, moons, and Gaia stars while logging your cosmic discoveries.
      </p>
      <router-link to="/all_objects" class="cta-button">
        Begin Expedition →
      </router-link>
    </header>

    <main class="content-section">
      
      <section class="project-mission cosmic-panel large-panel">
        <h2>✨ Project Core</h2>

        <p class="mission-text">
          <strong>Poppy Universe</strong> is a cosmic exploration platform designed to
          <strong>collect, structure, and analyze celestial data</strong>.
          It allows users to explore planets, moons, and stars while receiving
          <strong>intelligent, transparent recommendations</strong> tailored to their interests.
        </p>

        <p class="mission-text subtle">
          Rather than replacing exploration, the system supports it —
          helping users decide <em>what</em> to observe next and <em>why</em>.
        </p>

        <div class="mission-details">
          <strong class="section-label">Core Features</strong>
          <ul class="feature-list">
            <li>
              <span class="bullet-glow">🌍</span>
              Structured planet and moon database <span class="note">(Solar System)</span>
            </li>
            <li>
              <span class="bullet-glow">🌟</span>
              Stellar data derived from <strong>Gaia observations</strong>
            </li>
            <li>
              <span class="bullet-glow">🤖</span>
              Multi-layer recommendation engine for discovery guidance
            </li>
            <li>
              <span class="bullet-glow">🔐</span>
              Secure authentication and user interaction logging
            </li>
          </ul>
        </div>
      </section>


      <section class="architecture-hint cosmic-panel large-panel">
        <h2>🏗️ Data Flow Overview</h2>
        <p class="mission-text">
          All explorer observations and logs are processed through a structured data flow. Below is the full pipeline from frontend to backend:
        </p>
        <div class="diagram-placeholder">
          <pre class="dataflow-md">
            {{ dataFlowMd }}
          </pre>
        </div>
      </section>

      <div class="content-row">
        <section class="tech-overview cosmic-panel">
          <h2>💻 Core Components</h2>
          <div class="tech-grid">

            <div class="tech-card">
              <h3><span class="card-icon"></span> Frontend</h3>
              <p>
                <strong>Vue 3 (Composition API)</strong><br>
                Responsive, modular interfaces for exploring celestial data and interacting with recommendations in real-time.
              </p>
            </div>

            <div class="tech-card">
              <h3><span class="card-icon"></span> Backend</h3>
              <p>
                <strong>Node.js & Express</strong><br>
                Handles all user requests, orchestrates the ML-models & recommendation engine, and serves data efficiently and securely.
              </p>
            </div>

            <div class="tech-card">
              <h3><span class="card-icon"></span> Database</h3>
              <p>
                <strong>MySQL</strong><br>
                Stores structured celestial and user data, powering both recommendation logic and analytics.
              </p>
            </div>

            <div class="tech-card">
              <h3><span class="card-icon"></span> ETL / Data Pipeline</h3>
              <p>
                <strong>Data Research & Transformation</strong><br>
                Prepared raw celestial data for the Database, ensuring accuracy and consistency.
              </p>
            </div>

            <div class="tech-card">
              <h3><span class="card-icon"></span> Data Reliability</h3>
              <p>
                <strong>Integrity & Observability</strong><br>
                Ensures all celestial and user data is accurate, consistent, and traceable. Monitors system activity, pipeline health, and logs to maintain trustworthiness of recommendations.
              </p>
            </div>

            <div class="tech-card">
              <h3><span class="card-icon"></span> ML Models</h3>
              <p>
                <strong>Trend & Interaction Analysis</strong><br>
                Processes historical interactions and trends to enhance recommendations via layered scoring and predictions.
              </p>
            </div>

            <div class="tech-card">
              <h3><span class="card-icon"></span> Recommendation Engine</h3>
              <p>
                <strong>Layered Algorithm System</strong><br>
                Combines rule-based layers (1 & 2), matrix factorization (3), neural networks (4), and a genetic Algorithm fusion (5) to produce ranked celestial recommendations.
              </p>
            </div>

            <div class="tech-card">
              <h3><span class="card-icon"></span> Ethics & Transparency</h3>
              <p>
                <strong>Fairness & Explainability</strong><br>
                Ensures recommendations are explainable, privacy-conscious, and responsibly presented to users.
              </p>
            </div>

          </div>

          <div class="more-info-button" style="text-align: center; margin-top: 20px;">
            <router-link to="/core_components" class="more-info-btn">
              More Information <span class="arrow">→</span>
            </router-link>
          </div>
        </section>

        <section class="sidebar-group">
          <section class="component-showcase cosmic-panel small-panel">
            <h2>⚙️ Poppy's Recommendations</h2>
            <div class="component-wrapper">
              <TestComponent />
            </div>
          </section>

          <section class="quick-links cosmic-panel small-panel">
            <h2>🔗 Quick Jumps</h2>
            <ul class="link-list">
              <li><router-link to="/our_story" class="link-glow">About Poppy Universe</router-link></li>
              <li><router-link to="/all_objects" class="link-glow">Start Exploring</router-link></li>
              <li><router-link to="/System-Status" class="link-glow">System Status Check &rarr; </router-link></li>
              <li><a href="https://github.com/your-repo-link" target="_blank" class="link-glow">Source Code (GitHub)</a></li>
            </ul>
          </section>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TestComponent from '../components/Engine_Summary.vue';

const isLoaded = ref(false);
const dataFlowMd = ref('Loading data flow...');

onMounted(async () => {
  // Trigger initial animation
  setTimeout(() => {
    isLoaded.value = true;
  }, 50);

  // Fetch the Markdown data flow file
  try {
    const response = await fetch('/Data_Flow/Poppy_Universe_Data_Flow.md');
    if (response.ok) {
      dataFlowMd.value = await response.text();
    } else {
      dataFlowMd.value = 'Failed to load data flow documentation.';
    }
  } catch (e) {
    console.error(e);
    dataFlowMd.value = 'Error fetching data flow documentation.';
  }
});
</script>

<style scoped>

  .dataflow-md {
    font-size: 0.85rem; 
    line-height: 1.4;
    max-width: 900px;   
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #c0fcfc;
    background-color: rgba(0,0,0,0.6);
    padding: 15px;
    border-radius: 8px;
  }
  /*
  |--------------------------------------------------------------------------
  | Global Container & Hero Styling (Kept the same)
  |--------------------------------------------------------------------------
  */
  .poppy-universe-home {
      padding: 20px; 
      color: #e6e6fa; 
      font-family: 'Inter', sans-serif;
      padding-bottom: 80px;
  }

  .hero { 
      text-align: center;
      padding: 100px 20px 80px; 
      margin-bottom: 50px;
  }

  .hero-title {
      font-size: 4rem; 
      font-weight: 900;
      color: #c0fcfc; 
      letter-spacing: 2px;
      text-shadow: 0 0 5px #c0fcfc, 0 0 15px #6fffe9, 0 0 25px #00ffff;
      opacity: 0;
      transform: translateY(30px) scale(0.9);
      transition: opacity 1s ease-out, transform 1s ease-out;
  }

  .hero-title.loaded {
      opacity: 1;
      transform: translateY(0) scale(1);
  }

  .universe-highlight {
      color: #ff69b4; 
      text-shadow: 0 0 5px #ff69b4, 0 0 10px #ff007f;
  }

  .hero-subtitle {
      font-size: 1.6rem;
      color: #a0f0ff; 
      margin-bottom: 40px;
      font-style: italic;
      font-weight: 300;
  }

  .cta-button {
      /* Slightly refined CTA color for a unique glow */
      background: linear-gradient(45deg, #00ffff, #007bff); 
      color: white; 
      padding: 14px 30px;
      border: none;
      border-radius: 50px; 
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
      text-transform: uppercase;
  }

  .cta-button:hover {
      background: linear-gradient(45deg, #007bff, #00ffff);
      transform: translateY(-4px) scale(1.05); 
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 123, 255, 0.5);
  }

  /*
  |--------------------------------------------------------------------------
  | Content Sections (Cosmic Panels - Layout & Shared Styles)
  |--------------------------------------------------------------------------
  */
  .content-section {
      display: flex;
      flex-direction: column; /* Stack main rows */
      align-items: center;
      gap: 50px; 
      padding: 0 20px;
  }

  /* Full width panels for Mission and Architecture */
  .large-panel {
      max-width: 1000px;
      width: 100%;
  }

  .small-panel {
    width: 100%;
    box-sizing: border-box;
}

  /* Two-column container for the remaining content */
  .content-row {
    display: flex;
    gap: 50px;
    max-width: 1200px; /* Increase the total "table" width */
    width: 100%;
}

  /* Change this section */
.sidebar-group {
    display: flex;
    flex-direction: column;
    gap: 50px;
    flex: 1; /* Allows it to grow to fill space */
    min-width: 450px; /* Increase this so the Engine Summary has room */
}

.tech-overview {
    flex: 1.5; /* Keeps the tech section slightly larger than sidebar but flexible */
}

  /* Universal Panel Styles */
  .cosmic-panel {
      background-color: rgba(10, 0, 50, 0.85); 
      padding: 35px;
      border-radius: 10px;
      border: 1px solid #6a0dad; 
      box-shadow: 0 0 15px rgba(106, 13, 173, 0.5); 
      transition: box-shadow 0.3s, transform 0.3s;
  }

  .cosmic-panel:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 25px rgba(106, 13, 173, 0.8), 0 0 50px rgba(138, 43, 226, 0.4);
  }

  h2 {
      color: #00ffff; 
      font-size: 1.8rem;
      border-bottom: 2px solid #00ffff; 
      padding-bottom: 10px;
      margin-bottom: 25px;
      font-weight: 700;
      text-shadow: 0 0 5px rgba(0, 255, 255, 0.5); 
  }

  .more-info-btn {
  text-decoration: none;
  background: rgba(0, 210, 255, 0.1); /* soft cosmic glow */
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid rgba(0, 210, 255, 0.4);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(4px);
}

.more-info-btn:hover {
  background: rgba(0, 210, 255, 0.3);
  border-color: #00f0ff;
  color: #00f0ff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 210, 255, 0.4);
}

.more-info-btn .arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}

.more-info-btn:hover .arrow {
  transform: translateX(6px);
}

  /*
  |--------------------------------------------------------------------------
  | Mission & Architecture Styles
  |--------------------------------------------------------------------------
  */
  .mission-text {
      line-height: 1.6;
      margin-bottom: 15px;
      color: #e0ceff;
  }
  .mission-details {
      padding: 10px;
      border-left: 4px solid #ff69b4;
      background-color: rgba(255, 105, 180, 0.05);
      font-size: 0.95rem;
      color: #ffb6c1;
      margin-top: 15px;
  }

  .feature-list {
      list-style: none;
      padding: 0;
      margin-top: 10px;
  }

  .feature-list li {
      margin-bottom: 8px;
      font-size: 1rem;
      color: #c0fcfc;
  }

  .bullet-glow {
      color: #00ffff;
      margin-right: 8px;
      text-shadow: 0 0 5px #00ffff;
  }

  .diagram-placeholder {
      margin-top: 25px;
      padding: 20px;
      border: 1px dashed #00ffff;
      border-radius: 10px;
      background-color: rgba(0, 255, 255, 0.05);
      text-align: center;
  }


  /*
  |--------------------------------------------------------------------------
  | Technology Overview Styles
  |--------------------------------------------------------------------------
  */
  .tech-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
  }

  .tech-card {
      background-color: rgba(255, 255, 255, 0.05); 
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(0, 255, 255, 0.2);
      transition: background-color 0.3s;
  }

  .tech-card:hover {
      background-color: rgba(255, 255, 255, 0.1);
  }

  .tech-card h3 {
      font-size: 1.2rem;
      color: #ff69b4; 
      border-bottom: 1px dashed rgba(255, 105, 180, 0.5);
      padding-bottom: 5px;
      margin-bottom: 10px;
      font-weight: 600;
      display: flex;
      align-items: center;
  }

  .card-icon {
      font-size: 1.1em;
      margin-right: 8px;
      color: #00ffff;
  }

  .tech-card p {
      font-size: 0.9rem;
      color: #e6e6fa;
  }

  .tech-card p strong {
      color: #00ffff;
      font-weight: 700;
  }


  /*
  |--------------------------------------------------------------------------
  | Showcase and Link Styles 
  |--------------------------------------------------------------------------
  */
  .component-wrapper {
    padding: 15px; /* Reduced from 25px to give inner component more room */
    border: 2px dashed #ff69b4; 
    border-radius: 15px;
    background-color: rgba(5, 0, 30, 0.6); 
    width: 100%; /* Ensure it takes full width of sidebar */
    box-sizing: border-box; /* Crucial to include padding in width calculation */
}

  .test-component-note {
      color: #ffb6c1; 
      margin-top: 15px;
      font-size: 0.95rem;
  }

  .quick-links ul {
      list-style: none;
      padding: 0;
  }

  .quick-links li {
      margin-bottom: 15px; 
  }

  .link-glow {
      color: #ff69b4; 
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s, text-shadow 0.3s;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 5px;
  }

  .link-glow:hover {
      color: #ffffff; 
      text-decoration: none;
      text-shadow: 0 0 8px #ff007f;
      background-color: rgba(255, 105, 180, 0.1); 
  }

  /*
  |--------------------------------------------------------------------------
  | Media Queries 
  |--------------------------------------------------------------------------
  */
  @media (max-width: 1050px) {
      .content-row {
          flex-direction: column; /* Stack columns vertically */
          gap: 30px;
      }
      .tech-overview, .sidebar-group {
          width: 100%; 
          max-width: 480px; /* Limit width on mid-size screens */
      }
  }

  @media (max-width: 768px) {
      .hero-title {
          font-size: 2.8rem;
      }
      .hero-subtitle {
          font-size: 1.2rem;
      }
      .content-section {
          gap: 30px;
      }
      .cosmic-panel {
          max-width: 100%;
      }
      .tech-grid {
          grid-template-columns: 1fr; /* Stack tech cards vertically on mobile */
      }
  }
</style>
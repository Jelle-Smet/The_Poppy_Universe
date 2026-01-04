<template>
  <div class="legal-container">
    <div class="glass-panel">
      <header class="protocol-header">
        <div class="icon">📜</div>
        <h1>Terms of Use</h1>
        <p class="status">Operational Framework: Educational Simulation</p>
        <p class="revision">Document Ref: PU-2025-TERMS | Revision: 1.0.2</p>
      </header>

      <section class="protocol-section">
        <h2>1. Acceptance of Parameters</h2>
        <p>
          By accessing or initiating a session within <strong>Poppy Universe</strong>, you agree to be bound by these Terms and Conditions. This document constitutes a formal agreement between the Explorer and the project administration.
        </p>
        <p>
          If you do not align with any part of these protocols, you must discontinue your use of the platform immediately. 
          Poppy Universe is intended solely for educational and demonstrative purposes.
        </p>
      </section>

      <section class="protocol-section">
        <h2>2. Nature of the Simulation</h2>
        <p>
          Poppy Universe is a non-commercial, academic project designed to demonstrate technical systems, including data processing, recommendation engines, and user interaction models. 
        </p>
        <div class="highlight-box">
          <strong>Notice:</strong> While the platform presents <strong>real astronomical objects</strong> (stars, planets, and moons) using scientific datasets, all user interactions—including ownership indicators and transactions—are <strong>fully simulated</strong>. Use of this platform does not create real-world ownership, legal rights, or financial value.
        </div>
      </section>

      <section class="protocol-section">
        <h2>3. Explorer Responsibility</h2>
        <p>Accessing advanced sectors requires the creation of an Explorer Account. You agree to:</p>
        <ul>
          <li>Provide accurate information during the initialization process.</li>
          <li>Maintain the strict confidentiality of your login credentials.</li>
          <li>Accept full responsibility for all activity performed under your account.</li>
        </ul>
        <p>The administrator reserves the right to decommission accounts that disrupt the simulation or violate these protocols.</p>
      </section>

      <section class="protocol-section">
        <h2>4. The Recommendation Engine</h2>
        <p>
          The core feature of the Poppy Universe is its recommendation engine, which suggests celestial bodies based on user interaction and preference signals.
        </p>
        <ul>
          <li><strong>Algorithmic Generation:</strong> Recommendations are calculated via experimental logic.</li>
          <li><strong>Educational Intent:</strong> Suggestions are for exploratory learning and are not professional or scientific guarantees.</li>
        </ul>
      </section>

      <section class="protocol-section">
        <h2>5. Acceptable Use Protocol</h2>
        <p>Explorers are strictly prohibited from:</p>
        <ul>
          <li>Attempting to reverse-engineer, exploit, or disrupt system logic.</li>
          <li>Utilizing the platform for unauthorized commercial purposes.</li>
          <li>Submitting malicious input or automated "bot" requests to the API.</li>
          <li>Misrepresenting simulated interactions as real-world claims.</li>
        </ul>
      </section>

      <section class="protocol-section">
        <h2>6. Intellectual Property & Data</h2>
        <p>
          System logic, interface design, and original assets are the intellectual property of the project creator. Astronomical data remains the property of its respective scientific sources and is utilized here under educational fair use.
        </p>
      </section>

      <section class="protocol-section">
        <h2>7. Limitation of Liability</h2>
        <p>
          As this is an academic endeavor, Poppy Universe is provided <strong>"as is"</strong>. The project creator makes no guarantees regarding uptime, accuracy, or completeness and is not liable for any damages resulting from the use of this simulation.
        </p>
      </section>

      <section class="protocol-section">
        <h2>8. Governing Context</h2>
        <p>
          These Terms are governed within the context of an academic, non-commercial project and are not intended to function as a commercial service agreement.
        </p>
      </section>

      <footer class="protocol-footer">
        <p>
          Protocol established for the Poppy Universe Educational Mission. 
          Misuse of the simulation may result in immediate account termination.
        </p>
        <router-link to="/" class="back-link">Return to Home Sector</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions'
};
</script>

<style scoped>
.legal-container {
  padding: 120px 20px 80px;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.glass-panel {
  background: rgba(10, 0, 30, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(77, 77, 255, 0.3);
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  padding: 50px;
  color: #e0e0e0;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.6);
}

.protocol-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(77, 77, 255, 0.2);
  padding-bottom: 30px;
}

.icon { font-size: 3.5rem; margin-bottom: 10px; filter: drop-shadow(0 0 6px rgba(77, 77, 255, 0.8));}
h1 { color: #fff; font-size: 2.8rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
.status { color: #00ffcc; font-size: 0.9rem; letter-spacing: 3px; text-transform: uppercase; margin-top: 10px; }
.revision { color: #666; font-size: 0.75rem; font-family: monospace; margin-top: 5px; }

h2 {
  position: relative;
  color: #fff;
  font-size: 1.5rem;
  margin-top: 40px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: #4d4dff;
  opacity: 0.6;
}

p, li { line-height: 1.8; color: rgba(200, 200, 255, 0.85); font-size: 1.05rem; }

ul { padding-left: 20px; margin-top: 15px; }
li { margin-bottom: 12px; }

.highlight-box {
  background: rgba(77, 77, 255, 0.1);
  padding: 20px;
  border-left: 4px solid #4d4dff;
  border-radius: 4px;
  margin: 20px 0;
  color: #b3b3ff;
}

.protocol-footer {
  margin-top: 60px;
  text-align: center;
  border-top: 1px solid rgba(77, 77, 255, 0.2);
  padding-top: 30px;
  font-style: italic;
  font-size: 0.95rem;
}

.back-link {
  display: inline-block;
  margin-top: 25px;
  color: #00ffcc;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.back-link:hover {
  text-shadow: 0 0 10px #00ffcc;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .glass-panel { padding: 30px; }
  h1 { font-size: 2rem; }
}
</style>
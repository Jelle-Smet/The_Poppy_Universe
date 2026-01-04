<template>
  <div class="legal-container">
    <div class="glass-panel">
      <header class="protocol-header">
        <div class="icon">🛰️</div>
        <h1>Privacy Protocol</h1>
        <p class="status">Classification: Educational / Internal Use Only</p>
        <p class="revision">Document Ref: PU-2026-PRIVACY | Version: 1.0.0</p>
      </header>

      <section class="protocol-section">
        <h2>1. Nature of the Project</h2>
        <p>
          <strong>Poppy Universe</strong> is a non-commercial, educational project developed for academic
          demonstration and technical evaluation.
          The platform provides an interactive environment for exploring
          <strong>real astronomical objects</strong>, including stars, planets, and moons,
          using publicly available scientific data.
        </p>
        <p>
          While the celestial objects themselves are real, all interactions within Poppy Universe —
          such as registrations, recommendations, ownership indicators, and transactions —
          are <strong>fully simulated</strong>.
          No real-world ownership, legal rights, or financial value are created or implied.
        </p>
      </section>

      <section class="protocol-section">
        <h2>2. Data Collection & Categories</h2>
        <p>
          To enable account functionality, personalized recommendations, and session continuity,
          the system collects a limited and controlled set of personal data ("Explorer Data"):
        </p>

        <div class="sub-item">
          <p>
            <strong>2.1 Identity Information:</strong>
            First name, last name, and a chosen username.
            This data is used to identify accounts and associate user profiles with
            selected or recommended celestial objects within the platform.
          </p>
        </div>

        <div class="sub-item">
          <p>
            <strong>2.2 Contact Information:</strong>
            An email address used exclusively for authentication,
            account verification, and essential system communication.
            No marketing or external communication is performed.
          </p>
        </div>

        <div class="sub-item">
          <p>
            <strong>2.3 Security Credentials:</strong>
            Passwords are never stored in plaintext.
            All credentials are processed using secure hashing algorithms
            to protect against unauthorized access.
          </p>
        </div>

        <div class="sub-item">
          <p>
            <strong>2.4 Technical & Contextual Data:</strong>
            Non-identifying technical data — such as interaction history,
            selected objects, and preference signals —
            may be processed to power the platform’s recommendation engine.
            This data is used solely within Poppy Universe
            and is not shared with external systems.
          </p>
        </div>

        <div class="sub-item">
          <p>
            <strong>2.5 Location Processing:</strong>
            If required for astronomical or simulation-based calculations,
            location input is processed temporarily and
            <strong>is never stored, tracked, or logged</strong>
            beyond the active session.
          </p>
        </div>
      </section>

      <section class="protocol-section">
        <h2>3. Purpose of Data Use</h2>
        <p>
          All collected data is processed strictly for functional and educational purposes, including:
        </p>
        <ul>
          <li>
            <strong>Authentication:</strong>
            Verifying Explorer identity and securing access to the platform.
          </li>
          <li>
            <strong>Account Persistence:</strong>
            Maintaining exploration history, preferences,
            and simulated associations across sessions.
          </li>
          <li>
            <strong>Recommendation Engine:</strong>
            Powering the core feature of Poppy Universe —
            generating personalized, algorithm-driven recommendations of
            <strong>real stars, planets, and moons</strong>
            based on user interaction, preferences, and contextual parameters,
            within a fully simulated exploration framework.
          </li>
          <li>
            <strong>Academic Evaluation:</strong>
            Allowing instructors to assess system architecture,
            database relationships, and recommendation logic.
          </li>
        </ul>
        <p>
          No data is used for advertising, commercial profiling,
          or purposes beyond the scope of this educational project.
        </p>
      </section>

      <section class="protocol-section">
        <h2>4. Data Storage & Security Measures</h2>
        <p>
          Explorer Data is stored in a secured, access-restricted database environment.
          Reasonable technical and organizational safeguards are applied
          to prevent unauthorized access, loss, or misuse.
        </p>
        <p>
          <strong>We do not sell, share, lease, or distribute personal data</strong>
          to third parties.
          The platform does not employ advertising services or marketing trackers.
        </p>
        <p>
          All internal system and API communications are transmitted
          using encrypted transport protocols.
        </p>
      </section>

      <section class="protocol-section">
        <h2>5. User Rights</h2>
        <p>
          Explorers retain full control over their personal data within Poppy Universe.
          In line with educational data protection principles, users have the right to:
        </p>
        <ul>
          <li>
            <strong>Access:</strong>
            View their stored personal data through their account interface.
          </li>
          <li>
            <strong>Erasure:</strong>
            Request full account decommissioning,
            after which all personal information and associated records
            are permanently deleted.
          </li>
        </ul>
      </section>

      <section class="protocol-section">
        <h2>6. Policy Updates</h2>
        <p>
          This Privacy Protocol may be updated as the project evolves
          or new system features are introduced.
          Any changes apply only to future use of the platform.
          Explorers are encouraged to review this document periodically.
        </p>
      </section>

      <footer class="protocol-footer">
        <p>
          By interacting with Poppy Universe, you acknowledge that this is a
          simulated educational environment and consent to the data practices described above.
        </p>
        <router-link to="/" class="back-link">Return to Home Sector</router-link>
      </footer>
    </div>
  </div>
</template>

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

h3 { color: #fff; font-size: 1.1rem; margin-top: 25px; }

.sub-item { margin-bottom: 20px; }

p, li { line-height: 1.8; color: rgba(200, 200, 255, 0.85); font-size: 1.05rem; }

ul { padding-left: 20px; margin-top: 15px; }
li { margin-bottom: 12px; }

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

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}

@media (max-width: 768px) {
  .glass-panel { padding: 30px; }
  h1 { font-size: 2rem; }
}
</style>
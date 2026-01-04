<template>
  <div class="contact-container">
    <div class="glass-header">
      <h1>Command Center</h1>
      <p class="intro">
        The Poppy Universe is an independent venture dedicated to mapping the stars. 
        Select a sector to transmit your signal.
      </p>
    </div>

    <div class="dual-hub-layout">
      
      <div class="hub-sector support-sector">
        <div class="sector-header">
          <span class="sector-id">SECTOR_A</span>
          <h2>Technical Support</h2>
          <p>Direct encrypted channels for system stability and data integrity.</p>
        </div>

        <div class="nodes-list">
          <div class="compact-node">
            <div class="node-icon">🛠️</div>
            <div class="node-text">
              <h4>System Glitch</h4>
              <p>Report bugs or coordinate errors.</p>
              <a href="mailto:PoppyUniverse@outlook.com?subject=[BUG] Technical Error Report">Open Ticket</a>
            </div>
          </div>

          <div class="compact-node">
            <div class="node-icon">📜</div>
            <div class="node-text">
              <h4>Registry Query</h4>
              <p>Issues with star ownership or naming.</p>
              <a href="mailto:PoppyUniverse@outlook.com?subject=[REGISTRY] Ownership Inquiry">Query Data</a>
            </div>
          </div>

          <div class="compact-node">
            <div class="node-icon">🔐</div>
            <div class="node-text">
              <h4>Security Node</h4>
              <p>Report private vulnerabilities.</p>
              <a href="mailto:contact@PoppyUniverse@outlook.com?subject=[SECURITY] Vulnerability Report">Secure Comms</a>
            </div>
          </div>
        </div>
      </div>

      <div class="hub-sector evolution-sector">
        <div class="sector-header">
          <span class="sector-id pink">SECTOR_B</span>
          <h2>Project Evolution</h2>
          <p>Public portals for advice and community-driven development.</p>
        </div>

        <div class="nodes-list">
          <div class="compact-node pink">
            <div class="node-icon">💡</div>
            <div class="node-text">
              <h4>Stellar Suggestions</h4>
              <p>Propose new features or star classes.</p>
              <button @click="openForm('suggestions')">Open Suggestions Forum</button>
            </div>
          </div>

          <div class="compact-node pink">
            <div class="node-icon">🎨</div>
            <div class="node-text">
              <h4>Visual Advice</h4>
              <p>Help refine the look of our digital sky.</p>
              <button @click="openForm('visuals')">Open Feedback Form</button>
            </div>
          </div>

          <div class="compact-node pink">
            <div class="node-icon">🤝</div>
            <div class="node-text">
              <h4>Collaborations</h4>
              <p>Partner with the Lead Architect.</p>
              <button @click="openForm('collab')">Apply to Join</button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="protocol-footer-box">
      <p><strong>Transmission Info:</strong> Sector A signals are handled via priority mail, and checked by the Poppy Universe Development team within 2-5 Solar Days. Sector B signals are logged into the project's public roadmap for monthly review.</p>
    </div>

    <div class="command-footer">
      <div class="line"></div>
      <p class="architect">LEAD ARCHITECT: <span class="name">J.S.</span></p>
      <p class="location">POPPY UNIVERSE COMMUNICATIONS // SECTOR 7</p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const openForm = (type) => {
      // You can create 3 different Google Forms and paste the links here:
      const forms = {
        suggestions: 'https://docs.google.com/forms/d/e/1FAIpQLSeCUbcPrehYxxgYhrtpmAmlIjQmh2XBBIpRextpDXcOC3Ts2A/viewform?usp=publish-editor',
        visuals: 'https://docs.google.com/forms/d/e/1FAIpQLSdc7rulZAT18g7nHNo-kI8pARLtdjuaiV5ykf3A8J4ysGAh2g/viewform?usp=publish-editor',
        collab: 'https://docs.google.com/forms/d/e/1FAIpQLSdOzfqvHPl09TVB6mW6ys2QdoXPdSYznwgNjWwPvY9DFxyc-A/viewform?usp=header'
      };

      window.open(forms[type], '_blank');
    };

    return { openForm };
  }
}
</script>

<style scoped>
.contact-container {
  min-height: 100vh;
  padding: 120px 40px 80px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}

/* Glass Header */
.glass-header {
  max-width: 900px;
  margin: 0 auto 80px;
  padding: 3rem 2rem;
  background: rgba(0, 0, 30, 0.9);
  border-radius: 30px;
  border: 1px solid rgba(125, 95, 255, 0.3);
  box-shadow: 0 0 30px rgba(125, 95, 255, 0.2);
}

h1 {
  font-size: 3.5rem;
  background: linear-gradient(to bottom, #fff, #b4a0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  margin: 0;
}

/* Dual Hub Layout */
.dual-hub-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 40px;
  max-width: 1300px;
  margin: 0 auto;
}

.hub-sector {
  background: rgba(10, 10, 30, 0.7);
  border-radius: 40px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: left;
}

.sector-header { margin-bottom: 40px; }
.sector-id { font-family: monospace; color: #3ae3ff; font-weight: 800; font-size: 0.8rem; letter-spacing: 2px; }
.sector-id.pink { color: #f8a5c2; }
.hub-sector h2 { font-size: 2rem; margin: 10px 0; }
.hub-sector p { color: #b4a0ff; font-size: 0.95rem; }

/* Compact Nodes */
.nodes-list { display: flex; flex-direction: column; gap: 20px; }

.compact-node {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(58, 227, 255, 0.2);
  padding: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: 0.3s;
}

.compact-node.pink { border-color: rgba(248, 165, 194, 0.2); }

.compact-node:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(10px);
}

.node-icon { font-size: 1.8rem; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); border-radius: 12px; }

.node-text h4 { margin: 0; font-size: 1.1rem; color: #fff; }
.node-text p { margin: 2px 0 10px; font-size: 0.85rem; color: #999; }

.node-text a, .node-text button {
  background: transparent;
  border: 1px solid #3ae3ff;
  color: #3ae3ff;
  padding: 5px 15px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s;
}

.compact-node.pink .node-text a, 
.compact-node.pink .node-text button {
  border-color: #f8a5c2;
  color: #f8a5c2;
}

.node-text a:hover, .node-text button:hover {
  background: #3ae3ff;
  color: #000;
}

.compact-node.pink .node-text a:hover, 
.compact-node.pink .node-text button:hover {
  background: #f8a5c2;
  color: #000;
}

/* Info Box */
.protocol-footer-box {
  max-width: 1300px;
  margin: 60px auto 0;
  padding: 25px;
  background: rgba(125, 95, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(125, 95, 255, 0.2);
  color: #b4a0ff;
  font-size: 0.9rem;
}

/* Footer Signature */
.command-footer { margin-top: 80px; padding-bottom: 40px; }
.line { height: 1px; background: rgba(125, 95, 255, 0.2); width: 200px; margin: 0 auto 20px; }
.architect { font-weight: 800; font-size: 1rem; letter-spacing: 5px; color: #fff; }
.architect .name { color: #f8a5c2; text-shadow: 0 0 15px #f8a5c2; }
.location { opacity: 0.4; letter-spacing: 6px; font-size: 0.75rem; margin-top: 15px; }

@media (max-width: 600px) {
  .dual-hub-layout { grid-template-columns: 1fr; }
}
</style>
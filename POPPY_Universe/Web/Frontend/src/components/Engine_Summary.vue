<template>
  <div class="engine-mini">
    <div class="engine-header">
      <h2>Poppy Universe — Recommendation Engine</h2>
    </div>

    <p class="engine-tagline">
      A layered recommendation system, each step refining the signal.
    </p>

    <div class="engine-summary">
      <p class="engine-description">
        The Poppy Universe engine is structured as a
        <strong>five-layer pipeline</strong>.  
        Each layer applies a different algorithmic approach, gradually improving
        relevance while keeping the system explainable.
      </p>

      

      <ul class="engine-layers pretty">
        <li>
          <span class="layer-dot l1"></span>
          <div class="layer-info">
            <strong>Layer 1 — Personalized Matching</strong>
            <span class="algo-tag">Rule-based</span>
          </div>
        </li>

        <li>
          <span class="layer-dot l2"></span>
          <div class="layer-info">
            <strong>Layer 2 — Trend Booster</strong>
            <span class="algo-tag">ML Trend Signals</span>
          </div>
        </li>

        <li>
          <span class="layer-dot l3"></span>
          <div class="layer-info">
            <strong>Layer 3 — Behavioral Patterns</strong>
            <span class="algo-tag">Matrix Factorization</span>
          </div>
        </li>

        <li>
          <span class="layer-dot l4"></span>
          <div class="layer-info">
            <strong>Layer 4 — Score Refinement</strong>
            <span class="algo-tag">Neural Network</span>
          </div>
        </li>

        <li>
          <span class="layer-dot l5"></span>
          <div class="layer-info">
            <strong>Layer 5 — Final Ranking</strong>
            <span class="algo-tag">Genetic Algorithm</span>
          </div>
        </li>
      </ul>

      <div class="engine-footer">
        <p class="engine-note subtle">
          Visibility and weather data are shown for context only and never affect scoring.
        </p>
        
        <router-link to="/engine-details" class="more-info-btn">
          More Information <span class="arrow">&rarr;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Purely informational component
</script>

<style scoped>
  /* --- TITLE: Nebula Glow --- */
.engine-header h2 {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0;
  /* Multi-color cosmic gradient */
  background: linear-gradient(135deg, #fff 0%, #00d2ff 50%, #a29bfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Glow effect instead of a border box */
  filter: drop-shadow(0 0 12px rgba(0, 210, 255, 0.4));
  letter-spacing: -0.5px;
}

/* --- TAGLINE: The Electric Signal --- */
.engine-tagline {
  color: #00d2ff;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 10px 0 30px 0;
  display: block;
  /* Subtle glow to make it pop against the dark background */
  text-shadow: 0 0 10px rgba(0, 210, 255, 0.6);
}

/* --- DESCRIPTION: Data Stream --- */
.engine-description {
  font-size: 1rem;
  line-height: 1.7;
  color: #b2bec3; /* Soft gray-blue */
  max-width: 90%;
  margin-bottom: 30px;
  /* No box, just a subtle vertical gradient "anchor" on the left */
  padding-left: 20px;
  border-left: 2px solid;
  border-image: linear-gradient(to bottom, #00d2ff, #a29bfe, transparent) 1;
}

/* Make the specific tech terms pop */
.engine-description strong {
  color: #fff;
  font-weight: 600;
  /* Very subtle underline in the trend color */
  border-bottom: 1px solid rgba(162, 155, 254, 0.5);
}
.engine-mini {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
  color: #fff;
  box-sizing: border-box;
}

.engine-header h2 {
  font-size: 1.25rem;
  margin: 0;
  background: linear-gradient(to right, #fff, #b2bec3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.engine-tagline {
  color: #b2bec3;
  font-style: italic;
  font-size: 0.9rem;
  margin: 8px 0 20px 0;
}

.engine-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #dfe6e9;
  margin-bottom: 20px;
}

/* Layer List Styling */
.engine-layers {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.engine-layers li {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, background 0.3s ease;
}

.engine-layers li:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.layer-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.layer-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.l1 { background: #00ff88; box-shadow: 0 0 10px rgba(0, 255, 136, 0.3); }
.l2 { background: #00d2ff; box-shadow: 0 0 10px rgba(0, 210, 255, 0.3); }
.l3 { background: #a29bfe; box-shadow: 0 0 10px rgba(162, 155, 254, 0.3); }
.l4 { background: #ff7675; box-shadow: 0 0 10px rgba(255, 118, 117, 0.3); }
.l5 { background: #fdcb6e; box-shadow: 0 0 10px rgba(253, 203, 110, 0.3); }

.algo-tag {
  font-size: 0.7rem;
  color: #888;
  text-transform: uppercase;
  font-weight: bold;
}

/* Footer & Button Styling */
.engine-footer {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.engine-note.subtle {
  font-size: 0.8rem;
  color: #636e72;
  margin: 0;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  width: 100%;
}

.more-info-btn {
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.more-info-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #00d2ff;
  color: #00d2ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 210, 255, 0.2);
}

.arrow {
  transition: transform 0.3s ease;
}

.more-info-btn:hover .arrow {
  transform: translateX(4px);
}
</style>
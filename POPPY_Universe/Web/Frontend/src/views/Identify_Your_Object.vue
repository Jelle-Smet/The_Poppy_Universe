<template>
  <div class="scanner-wrapper">
    <div class="header-core main-hero-banner">
      <div class="system-line">
        <span class="loc-code">LOC: Poppy Universe Development Facility </span>
        <span class="status-badge pulse">SYSTEM_ACTIVE</span>
      </div>

      <div class="hero-main-content">
        <div class="tech-bracket left">[</div>
        <div class="title-group">
          <h1 class="hero-title">CELESTIAL <span class="pink-glow">SCANNER</span></h1>
          <p class="hero-subtitle">PHASE_01 // HEURISTIC_IDENTIFICATION_CORE</p>
        </div>
        <div class="tech-bracket right">]</div>
      </div>

      <div class="diagnostic-panel">
        <div class="diag-header">
          <span class="diag-title">DEVELOPMENT_NOTICE // BUILD_1.0.0</span>
          <span class="diag-percent">System Status: Active</span>
        </div>
        <div class="diag-body">
          <p>
            <strong>CURRENT STATUS:</strong> Poppy is currently finalizing the <strong>Geospatial Horizon Module</strong>. 
            While the database matching is operational, the system cannot yet verify if an object is 
            physically above your local horizon. 
          </p>
        </div>
      </div>
    </div>

    <div class="scanner-layout">
      <aside class="hud-pane">
        <div class="hud-module">
          <div class="hud-inner">
            <div class="hud-system-info">
              <div class="status-group">
                <span class="pulse-dot"></span>
                <span class="tech-code">SCAN_READY</span>
              </div>
              <span class="tech-code">MODE: {{ activeSection.toUpperCase() }}</span>
            </div>

            <div class="data-telemetry">
              
              <p class="telemetry-title">SYSTEM_DATABASE_LOADED:</p>
              <div class="telemetry-grid">
                <div class="tel-item">
                  <span class="tel-label">PLANETS:</span>
                  <span class="tel-value" :class="{ 'no-data': !celestialData.Planets.length }">
                    {{ celestialData.Planets.length }}
                  </span>
                </div>
                <div class="tel-item">
                  <span class="tel-label">MOONS:</span>
                  <span class="tel-value" :class="{ 'no-data': !celestialData.Moons.length }">
                    {{ celestialData.Moons.length }}
                  </span>
                </div>
                <div class="tel-item">
                  <span class="tel-label">STARS:</span>
                  <span class="tel-value" :class="{ 'no-data': !celestialData.Stars.length }">
                    {{ celestialData.Stars.length }}
                  </span>
                </div>
              </div>
              
            </div>

            <div class="hud-visual-display">
              <div class="corner-accents">
                <div class="corner top-left"></div>
                <div class="corner top-right"></div>
                <div class="corner bottom-left"></div>
                <div class="corner bottom-right"></div>
              </div>
              
              <div class="display-content">
                <div class="scanline"></div>
                <div class="target-reticle">
                  <div class="reticle-circle"></div>
                  <div class="reticle-cross"></div>
                </div>
                
                <div v-if="result" class="dynamic-label">
                  <p class="meta-label">IDENTIFIED_OBJECT</p>
                  <h2 class="cyan-text glow-text">{{ result.object.Name }}</h2>
                  <p class="confidence-text">{{ result.confidence.toFixed(1) }}% MATCH</p>
                </div>
                
                <div v-else-if="!scanning" class="dynamic-label">
                  <p class="meta-label">AWAITING_INPUT</p>
                  <h2 class="cyan-text glow-text">STANDBY</h2>
                </div>
                
                <div v-else class="dynamic-label">
                  <p class="meta-label">PROCESSING</p>
                  <h2 class="cyan-text glow-text scanning-text">SCANNING...</h2>
                </div>
              </div>

              <div class="hud-mini-telemetry">
                <div v-for="i in 5" :key="i" class="mini-bar-group">
                  <div class="mini-bar" :style="{ height: `${20 + Math.random() * 80}%` }"></div>
                </div>
              </div>
            </div>

            <nav class="hud-nav">
              <button
                v-for="section in sections"
                :key="section.id"
                :class="['hud-nav-item', { active: activeSection === section.id }]"
                @click="activeSection = section.id"
              >
                <span class="nav-id">{{ section.short }}</span>
                <span class="nav-text">{{ section.label }}</span>
              </button>
            </nav>
            <p class="logic-warning">
                <span class="warning-pill">NOTE</span> 
                Database matching is currently based on physical properties. Real-time sky position is not verified.
            </p>

            <div class="hud-footer">
              <button @click="resetScanner" class="tech-link">← RESET_SCANNER</button>
            </div>
          </div>
        </div>
      </aside>

      <main class="content-pane custom-scrollbar">
        <section v-if="activeSection === 'basic'" class="cosmic-panel spec-block">
          <div class="spec-header">
            <span class="layer-dot l1"></span>
            <div class="spec-title-group">
              <span class="algo-tag">LEVEL_00 // BASIC_OBSERVATIONS</span>
              <h2>Visual <span class="pink-text">Characteristics</span></h2>
            </div>
          </div>
          <div class="spec-body">
            <p class="engine-description">Start with what you can see. These basic observations are perfect for beginners and often enough to identify bright objects.</p>
            
            <div class="input-grid">
              <div class="input-group">
                <label class="input-label">
                  <Target :size="16" />
                  What type of object do you think it is?
                </label>
                <select class="scanner-select" v-model="formData.objectType">
                  <option value="">Not sure / Skip</option>
                  <option value="star">Star (twinkles, point of light)</option>
                  <option value="planet">Planet (steady light, doesn't twinkle)</option>
                  <option value="moon">Moon (large, clearly visible disc)</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <Sparkles :size="16" />
                  How bright is it?
                </label>
                <select class="scanner-select" v-model="formData.brightness">
                  <option value="">Select brightness</option>
                  <option value="very-bright">Very Bright (one of the brightest)</option>
                  <option value="bright">Bright (easily visible)</option>
                  <option value="moderate">Moderate (visible but not striking)</option>
                  <option value="faint">Faint (hard to see)</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <Palette :size="16" />
                  What color does it appear?
                </label>
                <select class="scanner-select" v-model="formData.color">
                  <option value="">Select color</option>
                  <option value="white">White / Silvery</option>
                  <option value="blue">Blue / Blue-white</option>
                  <option value="yellow">Yellow / Golden</option>
                  <option value="orange">Orange / Amber</option>
                  <option value="red">Red / Reddish</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <Eye :size="16" />
                  Can you see it with the naked eye?
                </label>
                <select class="scanner-select" v-model="formData.naked_eye_visible">
                  <option value="">Select visibility</option>
                  <option value="yes">Yes, clearly visible</option>
                  <option value="no">No, need telescope/binoculars</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section v-if="activeSection === 'intermediate'" class="cosmic-panel spec-block">
          <div class="spec-header">
            <span class="layer-dot l2"></span>
            <div class="spec-title-group">
              <span class="algo-tag">LEVEL_01 // DETAILED_ANALYSIS</span>
              <h2>Intermediate <span class="pink-text">Observations</span></h2>
            </div>
          </div>
          <div class="spec-body">
            <p class="engine-description">Add more detail about what you're observing. These questions help distinguish between similar objects.</p>
            
            <div class="input-grid">
              <div class="input-group">
                <label class="input-label">
                  <Ruler :size="16" />
                  How large does it appear?
                </label>
                <select class="scanner-select" v-model="formData.apparent_size">
                  <option value="">Select size</option>
                  <option value="point">Point of light (star-like)</option>
                  <option value="small">Small disc (needs magnification)</option>
                  <option value="medium">Medium disc (visible to eye)</option>
                  <option value="large">Large disc (Moon-like)</option>
                  <option value="very-large">Very large (Full Moon size or bigger)</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <Wind :size="16" />
                  Does it move over time?
                </label>
                <select class="scanner-select" v-model="formData.movement">
                  <option value="">Select movement</option>
                  <option value="none">No movement (fixed with stars)</option>
                  <option value="slow">Slow movement (changes position over days)</option>
                  <option value="fast">Fast movement (changes position in minutes)</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <Sparkles :size="16" />
                  Does it twinkle/scintillate?
                </label>
                <select class="scanner-select" v-model="formData.twinkle">
                  <option value="">Select twinkling</option>
                  <option value="yes">Yes, it twinkles</option>
                  <option value="no">No, steady light</option>
                  <option value="slight">Slightly, minimal twinkling</option>
                </select>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <Target :size="16" />
                  Which constellation is it in? (Optional)
                </label>
                <input 
                  type="text"
                  class="scanner-input"
                  placeholder="e.g., Orion, Ursa Major"
                  v-model="formData.constellation"
                />
              </div>
            </div>
          </div>
        </section>

        <section v-if="activeSection === 'advanced'" class="cosmic-panel spec-block">
          <div class="spec-header">
            <span class="layer-dot l3"></span>
            <div class="spec-title-group">
              <span class="algo-tag">LEVEL_02 // PRECISION_DATA</span>
              <h2>Advanced <span class="pink-text">Measurements</span></h2>
            </div>
          </div>
          <div class="spec-body">
            <p class="engine-description">For experienced observers with measurement tools. Provide precise data for maximum accuracy.</p>
            
            <div class="input-grid">
              <div class="input-group">
                <label class="input-label">
                  <Sparkles :size="16" />
                  Estimated Magnitude (Optional)
                </label>
                <input 
                  type="number"
                  step="0.1"
                  class="scanner-input"
                  placeholder="e.g., -2.5, 4.3"
                  v-model="formData.magnitude_estimate"
                />
                <span class="input-hint">Negative = brighter, Positive = fainter</span>
              </div>

              <div class="input-group">
                <label class="input-label">
                  <Thermometer :size="16" />
                  Spectral Features (Optional)
                </label>
                <input 
                  type="text"
                  class="scanner-input"
                  placeholder="e.g., H-alpha emission, absorption lines"
                  v-model="formData.spectral_features"
                />
              </div>

              <div class="input-group">
                <label class="input-label">
                  <Ruler :size="16" />
                  Angular Size (Optional)
                </label>
                <input 
                  type="text"
                  class="scanner-input"
                  placeholder="e.g., 30 arcseconds, 0.5 degrees"
                  v-model="formData.angular_separation"
                />
              </div>

              <div class="input-group-row">
                <div class="input-group half">
                  <label class="input-label">
                    <Target :size="16" />
                    Right Ascension (Optional)
                  </label>
                  <input 
                    type="text"
                    class="scanner-input"
                    placeholder="e.g., 05h 55m"
                    v-model="formData.position_ra"
                  />
                </div>

                <div class="input-group half">
                  <label class="input-label">
                    <Target :size="16" />
                    Declination (Optional)
                  </label>
                  <input 
                    type="text"
                    class="scanner-input"
                    placeholder="e.g., +07° 24'"
                    v-model="formData.position_dec"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-if="result" class="cosmic-panel spec-block result-panel">
          <div class="spec-header">
            <span class="layer-dot l4"></span>
            <div class="spec-title-group">
              <span class="algo-tag">SCAN_COMPLETE // MATCH_FOUND</span>
              <h2>Identification <span class="pink-text">Results</span></h2>
            </div>
          </div>
          <div class="spec-body">
            <div class="result-content">
              <div class="result-header">
                <h3 class="result-name">{{ result.object.Name }}</h3>
                <span class="result-type">{{ result.type }}</span>
              </div>
              
              <div class="confidence-bar-container">
                <div class="confidence-label">
                  <span>Confidence Match</span>
                  <span class="confidence-percent">{{ result.confidence.toFixed(1) }}%</span>
                </div>
                <div class="confidence-bar">
                  <div 
                    class="confidence-fill" 
                    :style="{ width: `${result.confidence}%` }"
                  ></div>
                </div>
              </div>

              <div class="result-details">
                <template v-if="result.type === 'Planet'">
                  <div class="detail-item">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">{{ result.object.Type }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Color:</span>
                    <span class="detail-value">{{ result.object.Color }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Diameter:</span>
                    <span class="detail-value">{{ result.object.Diameter?.toLocaleString() }} km</span>
                  </div>
                  <div v-if="result.object.Magnitude !== null" class="detail-item">
                    <span class="detail-label">Magnitude:</span>
                    <span class="detail-value">{{ result.object.Magnitude }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Moons:</span>
                    <span class="detail-value">{{ result.object.NumberOfMoons }}</span>
                  </div>
                </template>

                <template v-if="result.type === 'Moon'">
                  <div class="detail-item">
                    <span class="detail-label">Parent Planet:</span>
                    <span class="detail-value">{{ result.object.Parent }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Color:</span>
                    <span class="detail-value">{{ result.object.Color }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Diameter:</span>
                    <span class="detail-value">{{ result.object.Diameter?.toLocaleString() }} km</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Composition:</span>
                    <span class="detail-value">{{ result.object.Composition }}</span>
                  </div>
                </template>

                <template v-if="result.type === 'Star'">
                  <div class="detail-item">
                    <span class="detail-label">Spectral Type:</span>
                    <span class="detail-value">{{ result.object.SpectralType }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Magnitude:</span>
                    <span class="detail-value">{{ result.object.Gmag?.toFixed(2) }}</span>
                  </div>
                  <div v-if="result.object.Teff" class="detail-item">
                    <span class="detail-label">Temperature:</span>
                    <span class="detail-value">{{ result.object.Teff.toLocaleString() }} K</span>
                  </div>
                  <div v-if="result.object.Mass" class="detail-item">
                    <span class="detail-label">Mass:</span>
                    <span class="detail-value">{{ result.object.Mass.toFixed(2) }} M☉</span>
                  </div>
                </template>
              </div>

              <div class="result-actions">
                <button @click="resetScanner" class="action-btn secondary">
                  New Scan
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer class="manifest-footer">
          <button 
            @click="handleScan" 
            class="manifest-btn"
            :disabled="scanning || !celestialData"
          >
            {{ scanning ? 'PROCESSING...' : 'INITIATE SCAN' }}
          </button>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { 
  Search, Sparkles, Target, Eye, Palette, 
  Ruler, Thermometer, Wind 
} from 'lucide-vue-next';
const API_BASE_URL = import.meta.env.VITE_API_URL;
const activeSection = ref('basic');
const scanning = ref(false);
const result = ref(null);
const celestialData = ref({
  Planets: [],
  Moons: [],
  Stars: []
});

const formData = reactive({
  objectType: '',
  brightness: '',
  color: '',
  naked_eye_visible: '',
  apparent_size: '',
  movement: '',
  twinkle: '',
  constellation: '',
  magnitude_estimate: '',
  spectral_features: '',
  angular_separation: '',
  position_ra: '',
  position_dec: ''
});

const sections = [
  { id: 'basic', label: 'BASIC', short: 'VISUAL' },
  { id: 'intermediate', label: 'INTERMEDIATE', short: 'DETAIL' },
  { id: 'advanced', label: 'ADVANCED', short: 'PRECISE' }
];

const fetchCelestialPool = async () => {
  console.log("FETCH INITIATED...");
  try {
    // 1. Retrieve the token from storage
    const token = localStorage.getItem('authToken');
    
    // 2. Add the headers object to your fetch call
    const response = await fetch(`${API_BASE_URL}/object_scanner/pool` , {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("RESPONSE RECEIVED:", response.status);

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      celestialData.value = data.data; 
      
      console.log("Successfully loaded data:");
      console.log("Planets:", data.data.Planets?.length || 0);
      console.log("Moons:", data.data.Moons?.length || 0);
      console.log("Stars:", data.data.Stars?.length || 0);
    }
  } catch (error) {
    console.error('Failed to fetch celestial data:', error);
  }
};

onMounted(() => {
  fetchCelestialPool();
});

const calculateMatch = () => {
  if (!celestialData.value) return null;

  let bestMatch = null;
  let highestScore = 0;
  let matchType = '';

  // Planets
  celestialData.value.Planets.forEach(planet => {
    let score = 0;
    let maxScore = 0;
    if (formData.objectType) {
      maxScore += 30;
      if (formData.objectType === 'planet') score += 30;
    }
    if (formData.color && planet.Color) {
      maxScore += 25;
      const colorMap = {
        'red': ['red', 'reddish', 'rusty'],
        'yellow': ['yellow', 'golden', 'cream'],
        'blue': ['blue', 'azure', 'pale blue'],
        'white': ['white', 'bright', 'silvery'],
        'orange': ['orange', 'amber']
      };
      const userColors = colorMap[formData.color] || [formData.color];
      if (userColors.some(c => planet.Color.toLowerCase().includes(c))) score += 25;
    }
    if (formData.brightness && planet.Magnitude !== null) {
      maxScore += 20;
      const brightMap = { 'very-bright': -3, 'bright': 0, 'moderate': 2, 'faint': 4 };
      const userMag = brightMap[formData.brightness];
      if (userMag !== undefined) {
        const diff = Math.abs(planet.Magnitude - userMag);
        score += Math.max(0, 20 - diff * 4);
      }
    }
    if (formData.naked_eye_visible) {
      maxScore += 15;
      if (formData.naked_eye_visible === 'yes' && planet.Magnitude < 5) score += 15;
      if (formData.naked_eye_visible === 'no' && planet.Magnitude >= 5) score += 15;
    }
    if (formData.movement) {
      maxScore += 10;
      if (formData.movement === 'slow') score += 10;
    }
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    if (percentage > highestScore) {
      highestScore = percentage;
      bestMatch = { ...planet, type: 'Planet' };
      matchType = 'Planet';
    }
  });

  // Moons
  celestialData.value.Moons.forEach(moon => {
    let score = 0;
    let maxScore = 0;
    if (formData.objectType) {
      maxScore += 30;
      if (formData.objectType === 'moon') score += 30;
    }
    if (formData.color && moon.Color) {
      maxScore += 25;
      const colorMap = { 'white': ['white', 'bright', 'silvery', 'gray'], 'yellow': ['yellow', 'golden'], 'red': ['red', 'reddish'] };
      const userColors = colorMap[formData.color] || [formData.color];
      if (userColors.some(c => moon.Color.toLowerCase().includes(c))) score += 25;
    }
    if (formData.brightness) {
      maxScore += 20;
      if (formData.brightness === 'very-bright' || formData.brightness === 'bright') score += 20;
    }
    if (formData.apparent_size === 'large' || formData.apparent_size === 'very-large') {
      maxScore += 15;
      score += 15;
    }
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    if (percentage > highestScore) {
      highestScore = percentage;
      bestMatch = { ...moon, type: 'Moon' };
      matchType = 'Moon';
    }
  });

  // Stars
  celestialData.value.Stars.forEach(star => {
    let score = 0;
    let maxScore = 0;
    if (formData.objectType) {
      maxScore += 30;
      if (formData.objectType === 'star') score += 30;
    }
    if (formData.twinkle) {
      maxScore += 25;
      if (formData.twinkle === 'yes') score += 25;
    }
    if (formData.color && star.SpectralType) {
      maxScore += 20;
      const spectralColors = { 'blue': ['O', 'B'], 'white': ['A', 'F'], 'yellow': ['G'], 'orange': ['K'], 'red': ['M'] };
      const firstChar = star.SpectralType.charAt(0);
      if (spectralColors[formData.color]?.includes(firstChar)) score += 20;
    }
    if (formData.brightness && star.Gmag !== null) {
      maxScore += 15;
      const brightMap = { 'very-bright': 0, 'bright': 2, 'moderate': 4, 'faint': 6 };
      const userMag = brightMap[formData.brightness];
      if (userMag !== undefined) {
        const diff = Math.abs(star.Gmag - userMag);
        score += Math.max(0, 15 - diff * 2);
      }
    }
    if (formData.apparent_size) {
      maxScore += 10;
      if (formData.apparent_size === 'point') score += 10;
    }
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    if (percentage > highestScore) {
      highestScore = percentage;
      bestMatch = { ...star, type: 'Star' };
      matchType = 'Star';
    }
  });

  return bestMatch ? { object: bestMatch, confidence: highestScore, type: matchType } : null;
};

const handleScan = async () => {
  scanning.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  const match = calculateMatch();
  result.value = match;
  scanning.value = false;
};

const resetScanner = () => {
  Object.assign(formData, {
    objectType: '', brightness: '', color: '', naked_eye_visible: '',
    apparent_size: '', movement: '', twinkle: '', constellation: '',
    magnitude_estimate: '', spectral_features: '', angular_separation: '',
    position_ra: '', position_dec: ''
  });
  result.value = null;
};
</script>

<style scoped>
.logic-warning {
  font-size: 0.75rem;
  color: rgba(230, 230, 250, 0.6);
  background: rgba(255, 255, 255, 0.03);
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.warning-pill {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.6rem;
  font-weight: bold;
}
.main-hero-banner {
  padding: 40px !important;
  border-bottom: 2px solid rgba(0, 255, 255, 0.3) !important;
  background: linear-gradient(to bottom, rgba(125, 95, 255, 0.1), transparent) !important;
}

.system-line {
  display: flex;
  justify-content: space-between;
  font-family: monospace;
  font-size: 0.7rem;
  color: #00ffff;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.hero-main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
}

.hero-subtitle {
  color: #ff69b4;
  font-family: monospace;
  letter-spacing: 4px;
  font-size: 0.8rem;
  margin-top: 5px;
}

.diagnostic-panel {
  background: rgba(0, 0, 0, 0.6);
  border-left: 4px solid #ffa500;
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  border-radius: 0 8px 8px 0;
}

.diag-header {
  background: rgba(255, 165, 0, 0.15);
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  font-family: monospace;
  font-size: 0.7rem;
  color: #ffa500;
  border-bottom: 1px solid rgba(255, 165, 0, 0.2);
}

.diag-body {
  padding: 20px;
}

.diag-body p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e6e6fa;
}

.diag-footer {
  margin-top: 15px;
  display: flex;
  gap: 20px;
  font-family: monospace;
  font-size: 0.65rem;
  color: rgba(0, 255, 255, 0.6);
}

.pulse {
  animation: soft-pulse 2s infinite ease-in-out;
}

@keyframes soft-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.engine-tagline-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.version-tag {
  font-size: 0.55rem;
  font-family: monospace;
  color: #00ffff;
  border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 1px 6px;
  border-radius: 2px;
  background: rgba(0, 255, 255, 0.05);
}

.engine-tagline {
  margin: 0 !important; /* Overriding your previous margin */
}
  .data-telemetry {
  background: rgba(0, 255, 255, 0.05);
  border: 1px dashed rgba(0, 255, 255, 0.2);
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}
.telemetry-title {
  font-size: 0.65rem;
  font-family: monospace;
  color: #00ffff;
  margin-bottom: 8px;
  opacity: 0.8;
  letter-spacing: 1px;
}
.telemetry-grid {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.tel-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-family: monospace;
}
.tel-label {
  color: rgba(230, 230, 250, 0.7);
}
.tel-value {
  color: #00ff00;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
}
.tel-value.no-data {
  color: #ff4d4d;
  text-shadow: 0 0 5px rgba(255, 77, 77, 0.5);
}
.scanner-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(3, 0, 16, 0.85); 
  color: #e6e6fa;
  font-family: 'Inter', sans-serif;
  
  /* Soft Rounding */
  margin: 15px; 
  border-radius: 40px; /* Highly rounded corners */
  
  /* Neon Blue Edge - Strong color but soft glow */
  border: 2px solid #00ffff;
  box-shadow: 
    0 0 15px rgba(0, 255, 255, 0.5),       /* Core glow */
    0 0 30px rgba(0, 255, 255, 0.2),       /* Outer atmospheric glow */
    inset 0 0 15px rgba(0, 255, 255, 0.2); /* Internal edge glow */
  
  transition: all 0.6s ease-in-out;
  box-sizing: border-box;
  
  /* Frosted Glass Effect (Optional but looks great with rounding) */
  backdrop-filter: blur(8px);
}

/* Pink Neon Hover State */
.scanner-wrapper:hover {
  border-color: #ff69b4;
  box-shadow: 
    0 0 20px rgba(255, 105, 180, 0.6),      /* Strong pink core */
    0 0 40px rgba(255, 105, 180, 0.3),      /* Deep pink bloom */
    inset 0 0 20px rgba(255, 105, 180, 0.3);
}

.scanner-header {
  padding: 25px 40px 15px;
}

.header-core {
  text-align: center;
  padding: 20px;
  background: rgba(125, 95, 255, 0.05);
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin: 0;
}

.pink-glow {
  color: #ff69b4;
  text-shadow: 0 0 15px #ff007f;
}

.tech-bracket {
  color: #00ffff;
  font-size: 2rem;
  font-weight: 300;
  opacity: 0.5;
}

.engine-tagline {
  font-size: 0.75rem;
  color: #00ffff;
  letter-spacing: 5px;
  margin-top: 10px;
  opacity: 0.8;
}

.scanner-layout {
  display: flex;
  flex: 1;
  padding: 0 40px 40px;
  gap: 30px;
  min-height: 0;
}

.hud-pane {
  flex: 0 0 360px;
  height: calc(100vh - 180px);
  position: sticky;
  top: 20px;
}

.hud-module {
  height: 100%;
  background: rgba(0, 255, 255, 0.02);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
  padding: 10px;
  /* Add this line */
  box-sizing: border-box; 
}

.hud-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  /* Add this line */
  box-sizing: border-box;
  /* Optional: Ensure content that overflows stays inside or scrolls */
  overflow: hidden; 
}

.hud-system-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: #00ffff;
  font-family: monospace;
}

.status-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #00ff00;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ff00;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(0.9); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}

.tech-code {
  font-weight: bold;
}

.hud-visual-display {
  flex: 1;
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.corner-accents .corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid #00ffff;
}

.top-left {
  top: 10px;
  left: 10px;
  border-width: 2px 0 0 2px;
}

.top-right {
  top: 10px;
  right: 10px;
  border-width: 2px 2px 0 0;
}

.bottom-left {
  bottom: 10px;
  left: 10px;
  border-width: 0 0 2px 2px;
}

.bottom-right {
  bottom: 10px;
  right: 10px;
  border-width: 0 2px 2px 0;
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(to bottom, rgba(0,255,255,0.1), transparent);
  animation: scan 4s linear infinite;
}

@keyframes scan {
  from { top: -50px; }
  to { top: 100%; }
}

.target-reticle {
  position: absolute;
  width: 100px;
  height: 100px;
}

.reticle-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 105, 180, 0.3);
  border-radius: 50%;
  animation: reticlePulse 3s ease-in-out infinite;
}

@keyframes reticlePulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.6; }
}

.reticle-cross {
  position: absolute;
  width: 100%;
  height: 100%;
}

.reticle-cross::before,
.reticle-cross::after {
  content: '';
  position: absolute;
  background: rgba(255, 105, 180, 0.5);
}

.reticle-cross::before {
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.reticle-cross::after {
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
}

.display-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.dynamic-label {
  margin-top: 20px;
}

.meta-label {
  font-size: 0.6rem;
  color: #00ffff;
  letter-spacing: 2px;
  opacity: 0.6;
  margin-bottom: 5px;
}

.cyan-text {
  color: #00ffff;
}

.glow-text {
  font-size: 1.3rem;
  text-shadow: 0 0 10px #00ffff;
  letter-spacing: 3px;
  margin: 5px 0;
}

.confidence-text {
  font-size: 0.9rem;
  color: #ff69b4;
  margin-top: 5px;
}

.scanning-text {
  animation: scanning 1.5s ease-in-out infinite;
}

@keyframes scanning {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.hud-mini-telemetry {
  position: absolute;
  bottom: 15px;
  left: 20px;
  right: 20px;
  height: 30px;
  display: flex;
  gap: 4px;
  align-items: flex-end;
}

.mini-bar-group {
  flex: 1;
}

.mini-bar {
  width: 100%;
  background: #ff69b4;
  opacity: 0.4;
  transition: height 0.5s ease;
}

.hud-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hud-nav-item {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.7rem;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
}

.hud-nav-item:hover {
  border-color: rgba(255, 105, 180, 0.5);
}

.hud-nav-item.active {
  background: rgba(255, 105, 180, 0.1);
  border-color: #ff69b4;
  color: #ff69b4;
}

.nav-id {
  opacity: 0.5;
}

.hud-footer {
  margin-top: auto;
  padding-top: 10px;
}

.tech-link {
  background: rgba(0, 255, 255, 0.05); /* Very faint cyan background */
  border: 1px solid rgba(0, 255, 255, 0.3); /* Subtle cyan border */
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 0.7rem;
  color: #00ffff;
  opacity: 0.8;
  font-weight: 800;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.tech-link:hover {
  opacity: 1;
  background: rgba(0, 255, 255, 0.15); /* Brightens background on hover */
  border-color: #00ffff;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.2); /* Subtle outer glow */
  transform: translateY(-1px); /* Slight lift effect */
}

.tech-link:active {
  transform: translateY(0); /* Press down effect */
  background: rgba(0, 255, 255, 0.25);
}

.content-pane {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-right: 15px;
  max-height: calc(100vh - 180px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ff69b4;
  border-radius: 10px;
}

.cosmic-panel {
  background: rgba(10, 0, 50, 0.4);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(0, 255, 255, 0.2);
}

.spec-block {
  margin-bottom: 30px;
}

.spec-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 25px;
}

.layer-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0 0 10px currentColor;
  margin-top: 8px;
}

.l1 { color: #00ff00; background: #00ff00; }
.l2 { color: #00ffff; background: #00ffff; }
.l3 { color: #ff69b4; background: #ff69b4; }
.l4 { color: #ffff00; background: #ffff00; }

.spec-title-group h2 {
  font-size: 1.8rem;
  margin: 5px 0 0;
  color: #00ffff;
}

.pink-text {
  color: #ff69b4;
}

.algo-tag {
  color: #ff69b4;
  font-weight: 800;
  font-size: 0.7rem;
  display: block;
  margin-bottom: 5px;
}

.engine-description {
  color: #e6e6fa;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  padding-left: 20px;
  border-left: 2px solid #ff69b4;
}

.input-grid {
  display: grid;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.input-group.half {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #00ffff;
  font-weight: 600;
  font-size: 0.9rem;
}

.scanner-select,
.scanner-input {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #e6e6fa;
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  transition: 0.3s;
}

.scanner-select:focus,
.scanner-input:focus {
  outline: none;
  border-color: #ff69b4;
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.3);
}

.scanner-select option {
  background: #0a0032;
  color: #e6e6fa;
}

.input-hint {
  font-size: 0.75rem;
  color: rgba(230, 230, 250, 0.5);
  font-style: italic;
}

.result-panel {
  background: rgba(255, 105, 180, 0.05) !important;
  border-color: #ff69b4 !important;
}

.result-content {
  margin-top: 20px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 105, 180, 0.3);
}

.result-name {
  font-size: 2rem;
  color: #ff69b4;
  margin: 0;
  text-shadow: 0 0 15px rgba(255, 105, 180, 0.5);
}

.result-type {
  background: rgba(0, 255, 255, 0.2);
  color: #00ffff;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.confidence-bar-container {
  margin: 25px 0;
}

.confidence-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #00ffff;
  font-size: 0.85rem;
  font-weight: 600;
}

.confidence-percent {
  color: #ff69b4;
  font-size: 1.1rem;
}

.confidence-bar {
  height: 12px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.confidence-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ffff, #ff69b4);
  transition: width 1s ease-out;
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
}

.result-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 25px 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 255, 0.1);
}

.detail-label {
  color: #00ffff;
  font-size: 0.85rem;
  font-weight: 600;
}

.detail-value {
  color: #e6e6fa;
  font-size: 0.9rem;
}

.result-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.action-btn {
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.3s;
  font-family: 'Inter', sans-serif;
}

.action-btn.secondary {
  background: transparent;
  border: 1px solid #00ffff;
  color: #00ffff;
}

.action-btn.secondary:hover {
  background: rgba(0, 255, 255, 0.1);
  transform: translateY(-2px);
}

.manifest-footer {
  padding: 40px 0;
  text-align: center;
}

.manifest-btn {
  display: inline-block;
  padding: 18px 50px;
  background: #ff69b4;
  color: #fff;
  border: none;
  font-weight: 900;
  border-radius: 50px;
  box-shadow: 0 0 30px rgba(255, 105, 180, 0.3);
  transition: 0.3s;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
}

.manifest-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 0 50px rgba(255, 105, 180, 0.5);
}

.manifest-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1200px) {
  .scanner-layout {
    flex-direction: column;
  }

  .hud-pane {
    flex: 0 0 auto;
    height: auto;
    position: relative;
  }

  .content-pane {
    max-height: none;
  }

  .result-details {
    grid-template-columns: 1fr;
  }
}
</style>
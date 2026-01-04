<template>
  <div class="lab-container poppy-theme">
    <div class="ui-overlay">
      <div class="glass-header poppy-border">
          <h1 class="neon-text">🔭 COMPARISON <span class="cyan-text">LAB</span></h1>
          <p class="registry-sub">TACTICAL SCALING PROTOCOL // POOL v1.0.0</p>
          <div class="lab-briefing poppy-border-thin">
            <div class="briefing-icon">📡</div>
            <div class="briefing-content">
              <h3 class="briefing-title">LAB OBJECTIVES</h3>
              <p class="briefing-text">
                Analyze celestial scale by linking two analytes. The visualization pods utilize a 1:1 diameter ratio—the largest object anchors the scale while the smaller is mathematically shrunk to match real-world proportions.
              </p>
            </div>
          </div>
        </div>

        

      <div class="dual-selector">
        <div class="slot" :class="{ 'is-selected': objA }">
          <div class="search-wrapper">
            <div class="search-box poppy-border-thin">
              <input v-model="searchQueryA" placeholder="LINK ANALYTE A..." @focus="showResultsA = true" />
              <div class="scanner-line"></div>
            </div>
            <div v-if="showResultsA && filteredA.length" class="results-dropdown poppy-border">
              <div v-for="item in filteredA" :key="item.uniqueId" @click="selectObject(item, 'A')" class="result-item">
                <div class="mini-preview" :style="getOrbStyle(item)"></div>
                <span>{{ item.Name }} <small class="type-tag">[{{ item.sourceType }}]</small></span>
              </div>
            </div>
          </div>

          <div class="visual-pod poppy-border">
            <div class="pod-bg-grid"></div>
            <div v-if="objA" class="orb-wrapper" :style="{ transform: `scale(${scaleA})` }">
              <div class="celestial-orb" :style="getOrbStyle(objA)">
                <div v-if="objA.sourceType === 'Moon'" class="moon-texture"></div>
                <div class="orb-glare"></div>
              </div>
              <div class="orb-label neon-text-blue">{{ objA.Name }}</div>
            </div>
            <div v-else class="empty-state pulse-text">AWAITING INPUT...</div>
          </div>
        </div>

        <div class="vs-seal">
          <div class="vs-circle">VS</div>
        </div>

        <div class="slot" :class="{ 'is-selected': objB }">
          <div class="search-wrapper">
            <div class="search-box poppy-border-thin">
              <input v-model="searchQueryB" placeholder="LINK ANALYTE B..." @focus="showResultsB = true" />
              <div class="scanner-line"></div>
            </div>
            <div v-if="showResultsB && filteredB.length" class="results-dropdown poppy-border">
              <div v-for="item in filteredB" :key="item.uniqueId" @click="selectObject(item, 'B')" class="result-item">
                <div class="mini-preview" :style="getOrbStyle(item)"></div>
                <span>{{ item.Name }} <small class="type-tag">[{{ item.sourceType }}]</small></span>
              </div>
            </div>
          </div>

          <div class="visual-pod poppy-border">
            <div class="pod-bg-grid"></div>
            <div v-if="objB" class="orb-wrapper" :style="{ transform: `scale(${scaleB})` }">
              <div class="celestial-orb" :style="getOrbStyle(objB)">
                <div v-if="objB.sourceType === 'Moon'" class="moon-texture"></div>
                <div class="orb-glare"></div>
              </div>
              <div class="orb-label neon-text-pink">{{ objB.Name }}</div>
            </div>
            <div v-else class="empty-state pulse-text">AWAITING INPUT...</div>
          </div>
        </div>
      </div>

      <transition name="fade-slide">
        <div v-if="objA && objB" class="comparison-table poppy-border">
          <div class="table-header">DATA SYNCHRONIZATION</div>
          <div class="stat-row" v-for="stat in comparableStats" :key="stat.label">
            <div class="val left cyan-text">{{ formatStat(objA, stat.key) }}</div>
            <div class="label-wrapper">
              <div class="stat-line"></div>
              <div class="label">{{ stat.label }}</div>
              <div class="stat-line"></div>
            </div>
            <div class="val right pink-text">{{ formatStat(objB, stat.key) }}</div>
          </div>
          
          <div class="comparison-insight">
            <p>
              SCALING ANALYSIS: <span class="highlight cyan-text">{{ objA.Name }}</span> IS 
              <span class="math-result neon-text-pink">{{ (objA.Diameter / objB.Diameter).toFixed(2) }}x</span> 
              THE VOLUME OF <span class="highlight cyan-text">{{ objB.Name }}</span>
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const loading = ref(true);
const pool = ref([]);
const objA = ref(null);
const objB = ref(null);
const searchQueryA = ref('');
const searchQueryB = ref('');
const showResultsA = ref(false);
const showResultsB = ref(false);

const PLANET_MAP = { 'Grey': '#A0A0A0', 'Blue-Green-Brown-White': '#6699CC', 'Red-Brown-Tan': '#C1440E', 'DEFAULT': '#CCCCCC' };
const MOON_MAP = { 'Grey': '#A0A0A0', 'White': '#FFFFFF', 'Yellowish': '#E3D6A2', 'DEFAULT': '#CCCCCC' };

const comparableStats = [
  { label: 'MASS_INDEX', key: 'Mass' },
  { label: 'THERMAL_K', key: 'Temperature' },
  { label: 'DIA_METERS', key: 'Diameter' },
  { label: 'MAGNITUDE', key: 'Magnitude' }
];

const API_BASE_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('authToken');

// Helper to normalize a Star object from your backend details response
const normalizeStar = (s) => ({
  Id: s.Star_ID,
  Name: s.Star_Name,
  sourceType: 'Star',
  uniqueId: `s-${s.Star_ID}`,
  // Backend gives Radius in Solar Radii. Scaling math needs km.
  // Solar Radius = 695,700 km. Diameter = Radius * 2 * 695700
  Diameter: s.Star_Radius ? s.Star_Radius * 2 * 695700 : (s.Star_Mass ? s.Star_Mass * 1391400 : 1391400),
  Temperature: s.Star_Teff,
  Magnitude: s.Star_GMag,
  Luminosity: s.Star_Luminosity,
  SpectralType: s.Star_SpType,
  Mass: s.Star_Mass
});

const handleAutoFill = async () => {
  const { type, id } = route.query;
  if (!type || !id) return;

  // 1. Try to find in existing pool
  const found = pool.value.find(o => o.sourceType.toLowerCase() === type.toLowerCase() && o.Id == id);
  
  if (found) {
    objA.value = found;
    searchQueryA.value = found.Name;
  } 
  // 2. If it's a star and NOT in the limited pool, fetch it directly
  else if (type.toLowerCase() === 'star') {
    try {
      const res = await axios.get(`${API_BASE_URL}/stars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.star) {
        const fetchedStar = normalizeStar(res.data.star);
        objA.value = fetchedStar;
        searchQueryA.value = fetchedStar.Name;
      }
    } catch (err) {
      console.error("Star deep-fetch failed:", err);
    }
  }
};

watch(() => [route.query.type, route.query.id], () => handleAutoFill());

const fetchAllData = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/object_scanner/pool`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const { Stars, Planets, Moons } = res.data.data;
    
    const normalizedStars = Stars.map(s => ({ 
      ...s, sourceType: 'Star', uniqueId: `s-${s.Id}`, 
      Diameter: s.Mass * 1391400, Temperature: s.Teff, Magnitude: s.Gmag
    }));
    const normalizedPlanets = Planets.map(p => ({ 
      ...p, sourceType: 'Planet', uniqueId: `p-${p.Id}`, 
      Temperature: p.MeanTemperature, Magnitude: p.Magnitude, Color: p.Color 
    }));
    const normalizedMoons = Moons.map(m => ({ 
      ...m, sourceType: 'Moon', uniqueId: `m-${m.Id}`, 
      Temperature: m.SurfaceTemperature, Magnitude: m.Magnitude || 13, Color: m.Color 
    }));

    pool.value = [...normalizedStars, ...normalizedPlanets, ...normalizedMoons];
    await handleAutoFill();

  } catch (err) {
    console.error("Lab Sync Error:", err);
  } finally {
    loading.value = false;
  }
};

const selectObject = (item, slot) => {
  if (slot === 'A') { objA.value = item; showResultsA.value = false; searchQueryA.value = item.Name; }
  else { objB.value = item; showResultsB.value = false; searchQueryB.value = item.Name; }
};

const filteredA = computed(() => pool.value.filter(i => i.Name?.toLowerCase().includes(searchQueryA.value.toLowerCase())).slice(0, 8));
const filteredB = computed(() => pool.value.filter(i => i.Name?.toLowerCase().includes(searchQueryB.value.toLowerCase())).slice(0, 8));

const scaleA = computed(() => (!objA.value || !objB.value) ? 1 : (objA.value.Diameter >= objB.value.Diameter ? 1 : objA.value.Diameter / objB.value.Diameter));
const scaleB = computed(() => (!objA.value || !objB.value) ? 1 : (objB.value.Diameter >= objA.value.Diameter ? 1 : objB.value.Diameter / objA.value.Diameter));

const getOrbStyle = (item) => {
  if (item.sourceType === 'Star') {
    const colors = { 'O': '#9bb0ff', 'B': '#aabfff', 'A': '#cad7ff', 'F': '#f8f7ff', 'G': '#fff4ea', 'K': '#ffd2a1', 'M': '#ffcc6f' };
    const c = colors[item.SpectralType?.[0]] || '#fff';
    const glow = Math.min(Math.sqrt(item.Luminosity || 1) * 5, 40);
    return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -10px -10px 20px rgba(0,0,0,0.4)` };
  }
  if (item.sourceType === 'Planet') {
    const c = PLANET_MAP[item.Color] || PLANET_MAP['DEFAULT'];
    const glow = Math.min(Math.sqrt(Math.abs(item.Magnitude || 1)) * 5, 30);
    return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -5px -5px 15px rgba(0,0,0,0.4)` };
  }
  const c = MOON_MAP[item.Color] || MOON_MAP['DEFAULT'];
  return { backgroundColor: c, boxShadow: `0 0 15px ${c}66, inset -5px -5px 15px rgba(0,0,0,0.4)` };
};

const formatStat = (obj, key) => {
  const val = obj[key];
  if (val === null || val === undefined) return '0.00';
  if (key === 'Mass') return Number(val).toExponential(1);
  return Number(val).toLocaleString(undefined, { maximumFractionDigits: 1 });
};

onMounted(fetchAllData);
</script>

<style scoped>
.lab-container {
  min-height: 100vh;
  background: radial-gradient(circle at center, #0a001a 0%, #000000 100%);
  padding: 40px 20px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

/* NEON BORDERS */
.poppy-border {
  border: 1px solid #7d5fff;
  box-shadow: 0 0 15px rgba(125, 95, 255, 0.3), inset 0 0 10px rgba(125, 95, 255, 0.2);
  background: rgba(10, 0, 30, 0.7);
}

.poppy-border-thin {
  border: 1px solid rgba(125, 95, 255, 0.5);
  box-shadow: 0 0 8px rgba(125, 95, 255, 0.2);
}

/* HEADER */
.glass-header {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 2rem;
  border-radius: 4px;
  text-align: center;
}

.neon-text {
  font-weight: 800;
  letter-spacing: 4px;
  text-shadow: 0 0 10px #7d5fff, 0 0 20px #7d5fff;
}

.cyan-text { color: #00f2ff; text-shadow: 0 0 10px #00f2ff; }
.pink-text { color: #ff007f; text-shadow: 0 0 10px #ff007f; }

/* NEW: Lab Briefing Styling */
.lab-briefing {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(0, 255, 255, 0.03);
  margin: 20px auto;
  padding: 15px 25px;
  max-width: 900px;
  border-radius: 15px;
  backdrop-filter: blur(5px);
}

.briefing-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 5px #00ffff);
}

.briefing-title {
  font-family: monospace;
  font-size: 0.9rem;
  color: #00ffff;
  margin: 0 0 5px 0;
  letter-spacing: 3px;
}

.briefing-text {
  font-size: 0.85rem;
  line-height: 1.5;
  color: #e6e6fa;
  margin: 0;
  opacity: 0.8;
}

/* Enhancing the VS Seal to stand out more */
.vs-circle {
  background: #00ffff;
  color: #030010;
  font-weight: 900;
  box-shadow: 0 0 20px #00ffff;
}

/* Adding a subtle glow to the search boxes when they are active */
.search-box input:focus {
  outline: none;
  border-color: #ff69b4;
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
}

.registry-sub {
  font-family: monospace;
  color: #7d5fff;
  letter-spacing: 2px;
  margin-top: 10px;
}

/* DUAL SELECTOR */
.dual-selector {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  gap: 20px;
}

.slot { flex: 1; max-width: 500px; display: flex; flex-direction: column; align-items: center; }

.visual-pod {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  margin-top: 25px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.pod-bg-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(125, 95, 255, 0.1) 1px, transparent 1px), 
                    linear-gradient(90deg, rgba(125, 95, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

/* ORB */
.celestial-orb {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: relative;
  margin-bottom: 25px;
}

.moon-texture {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.1) 5%, transparent 10%);
}

.orb-glare {
  position: absolute;
  top: 15%;
  left: 15%;
  width: 30%;
  height: 30%;
  background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
  border-radius: 50%;
}

.orb-label {
  font-family: monospace;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.neon-text-blue { color: #00f2ff; text-shadow: 0 0 10px #00f2ff; }
.neon-text-pink { color: #ff007f; text-shadow: 0 0 10px #ff007f; }

/* VS SEAL */
.vs-seal {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.vs-circle {
  width: 100%;
  height: 100%;
  border: 2px solid #ff007f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.5rem;
  background: #000;
  box-shadow: 0 0 20px #ff007f;
  color: #ff007f;
}

/* SEARCH */
.search-wrapper { width: 100%; position: relative; }
.search-box {
  background: rgba(0,0,0,0.6);
  padding: 10px;
  position: relative;
  overflow: hidden;
}

.search-box input {
  width: 100%;
  background: transparent;
  border: none;
  color: #fff;
  font-family: monospace;
  outline: none;
  text-transform: uppercase;
}

.scanner-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #00f2ff;
  box-shadow: 0 0 10px #00f2ff;
  animation: scan 2s linear infinite;
}

@keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

.results-dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
}

.result-item {
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  border-bottom: 1px solid rgba(125, 95, 255, 0.2);
}

.result-item:hover { background: rgba(125, 95, 255, 0.3); }
.mini-preview { width: 20px; height: 20px; border-radius: 50%; }
.type-tag { color: #00f2ff; font-size: 0.7rem; }

/* TABLE */
.comparison-table {
  max-width: 1000px;
  margin: 60px auto;
  border-radius: 4px;
  padding: 0;
  overflow: hidden;
}

.table-header {
  background: #7d5fff;
  color: #000;
  font-weight: 900;
  padding: 10px;
  text-align: center;
  letter-spacing: 5px;
}

.stat-row {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(125, 95, 255, 0.2);
}

.label-wrapper { flex: 1; display: flex; align-items: center; gap: 10px; }
.stat-line { flex: 1; height: 1px; background: rgba(125, 95, 255, 0.3); }
.label { font-family: monospace; font-weight: bold; font-size: 0.9rem; color: #7d5fff; }

.val { width: 120px; font-family: monospace; font-size: 1.2rem; font-weight: bold; }
.val.right { text-align: right; }

.comparison-insight {
  padding: 30px;
  background: rgba(0,0,0,0.5);
  text-align: center;
}

.math-result { font-size: 2.2rem; font-weight: 900; margin: 0 15px; }

/* ANIMATIONS */
.fade-slide-enter-active, .slide-fade-leave-active { transition: all 0.6s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(40px); }

.pulse-text { animation: pulse 2s infinite; color: rgba(125, 95, 255, 0.5); font-family: monospace; }
@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: #7d5fff; }
</style>
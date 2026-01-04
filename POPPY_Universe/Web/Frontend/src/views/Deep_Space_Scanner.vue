<template>
  <div class="scanner-page">
    <div class="ambient-glow"></div>
    
    <div class="scanner-wrapper">
      <header class="scanner-header">
        <div class="header-core">
          <div class="status-bar">
            <span class="pulse-dot"></span> 
            <span class="status-text">NEURAL_LINK: STABLE // SCANNER_MODE: {{ activeMode.toUpperCase() }}</span>
          </div>
          <h1 class="hero-title">DEEP SPACE <span class="pink-glow">SCANNER</span></h1>
          <div class="signal-wave">
            <div v-for="n in 25" :key="n" class="wave-bar"></div>
          </div>
          
        </div>
      </header>

      <div class="scanner-layout">
        <aside class="controls-sidebar">
          <div class="sidebar-inner">
            <div class="scanner-info-card">
            <h3 class="info-title">SCAN PROTOCOL</h3>
            <p class="info-text">
              Filter the Poppy Universe database. 
              Adjust parameters to isolate specific spectral classes, orbital scales, or thermal signatures.
            </p>
            <div class="info-divider"></div>
          </div>
            <div class="mode-glitch-selector">
              <button v-for="mode in ['Stars', 'Planets', 'Moons']" 
                :key="mode" :class="{ active: activeMode === mode }"
                @click="activeMode = mode">
                {{ mode.toUpperCase() }}
              </button>
            </div>

            <div class="filters-container custom-scrollbar">
              <div v-for="filter in currentFilters" :key="filter.key" class="filter-card">
                <div class="filter-header">
                  <span class="filter-label">{{ filter.label }}</span>
                  <span class="filter-readout">{{ ranges[filter.key].min }} : {{ ranges[filter.key].max }}</span>
                </div>
                
                <div class="dual-range-slider">
                  <div class="slider-track-bg"></div>
                  <div class="slider-track-fill" :style="getTrackStyle(filter)"></div>
                  <input type="range" :min="filter.min" :max="filter.max" :step="filter.step" 
                    v-model.number="ranges[filter.key].min" class="range-input min-input">
                  <input type="range" :min="filter.min" :max="filter.max" :step="filter.step" 
                    v-model.number="ranges[filter.key].max" class="range-input max-input">
                </div>
              </div>
            </div>

            <button class="reset-scan-btn" @click="resetFilters">
              PURGE_PARAMETERS [X]
            </button>
          </div>
        </aside>

        <main class="results-viewport">
          <div class="viewport-header">
            <p class="match-count">MATCH_COEFFICIENT: {{ filteredResults.length }} OBJECTS FOUND</p>
          </div>

          <div class="scanner-grid custom-scrollbar">
            <div v-for="item in visibleResults" :key="activeMode + '-' + item.Id" class="galactic-card">
              <span class="type-badge">{{ activeMode.slice(0, -1).toUpperCase() }} // REF_{{ item.Id }}</span>

              <div class="card-content">
                <div class="orb-container">
                  <div v-if="activeMode === 'Stars'" class="orb star" :style="starStyle(item)"></div>
                  <div v-if="activeMode === 'Planets'" class="orb planet" :style="planetStyle(item)"></div>
                  <div v-if="activeMode === 'Moons'" class="orb moon" :style="moonStyle(item)">
                    <div class="moon-texture"></div>
                  </div>
                </div>

                <div class="info">
                  <p><span class="label">Name:</span> {{ item.Name }}</p>
                  
                  <template v-if="activeMode === 'Stars'">
                    <p><span class="label">Spectral:</span> {{ item.SpectralType }}</p>
                    <p><span class="label">Temp:</span> {{ item.Teff }}K</p>
                    <p><span class="label">Gmag:</span> {{ item.Gmag?.toFixed(2) }}</p>
                  </template>

                  <template v-if="activeMode === 'Planets'">
                    <p><span class="label">Class:</span> {{ item.Type }}</p>
                    <p><span class="label">Diameter:</span> {{ item.Diameter?.toLocaleString() }} km</p>
                    <p><span class="label">Mag:</span> {{ item.Magnitude?.toFixed(2) }}</p>
                  </template>

                  <template v-if="activeMode === 'Moons'">
                    <p><span class="label">Parent:</span> {{ item.Parent }}</p>
                    <p><span class="label">Comp:</span> {{ item.Composition }}</p>
                    <p><span class="label">Surface:</span> {{ item.SurfaceTemperature }}°C</p>
                  </template>
                  
                  <button class="details-link" @click="goTo(activeMode.toLowerCase().slice(0, -1), item.Id)">
                    Details ✨
                  </button>
                </div>
              </div>
            </div>

            <div v-if="hasMore" class="load-more-wrapper">
              <button @click="visibleLimit += 40" class="load-more-btn">EXPAND_SEARCH_BUFFER</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const loading = ref(true);
const activeMode = ref('Stars');
const visibleLimit = ref(20);
const poolData = ref({ Stars: [], Planets: [], Moons: [] });
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Your color mappings
const PLANET_MAP = { 'Grey': '#A0A0A0', 'Blue-Green-Brown-White': '#6699CC', 'Red-Brown-Tan': '#C1440E', 'DEFAULT': '#CCCCCC' };
const MOON_MAP = { 'Grey': '#A0A0A0', 'White': '#FFFFFF', 'Yellowish': '#E3D6A2', 'DEFAULT': '#CCCCCC' };

const ranges = ref({
  Teff: { min: 0, max: 30000 },
  Luminosity: { min: 0, max: 1000 },
  Gmag: { min: 0, max: 20 },
  Diameter: { min: 0, max: 200000 },
  MeanTemperature: { min: -200, max: 500 },
  Magnitude: { min: -10, max: 15 },
  MoonDiameter: { min: 0, max: 6000 },
  SurfaceTemperature: { min: -250, max: 100 }
});

const filterConfig = {
  Stars: [
    { label: 'THERMAL_SIGNATURE (K)', key: 'Teff', min: 0, max: 30000, step: 100 },
    { label: 'LUM_INTENSITY (L☉)', key: 'Luminosity', min: 0, max: 1000, step: 1 },
    { label: 'VISUAL_MAG (Gmag)', key: 'Gmag', min: 0, max: 20, step: 0.1 }
  ],
  Planets: [
    { label: 'GEOMETRIC_SCALE (km)', key: 'Diameter', min: 0, max: 200000, step: 1000 },
    { label: 'CLIMATE_INDEX (°C)', key: 'MeanTemperature', min: -200, max: 500, step: 10 },
    { label: 'BRIGHTNESS_VAL', key: 'Magnitude', min: -10, max: 15, step: 0.5 }
  ],
  Moons: [
    { label: 'SATELLITE_SCALE (km)', key: 'MoonDiameter', min: 0, max: 6000, step: 100 },
    { label: 'SURFACE_THERM (°C)', key: 'SurfaceTemperature', min: -250, max: 100, step: 10 }
  ]
};

const currentFilters = computed(() => filterConfig[activeMode.value]);

const filteredResults = computed(() => {
  const data = poolData.value[activeMode.value] || [];
  return data.filter(obj => {
    return currentFilters.value.every(f => {
      const val = f.key === 'MoonDiameter' ? obj.Diameter : obj[f.key];
      if (val === null || val === undefined) return false;
      return val >= ranges.value[f.key].min && val <= ranges.value[f.key].max;
    });
  }).sort((a, b) => a.Name.localeCompare(b.Name));
});

const visibleResults = computed(() => filteredResults.value.slice(0, visibleLimit.value));
const hasMore = computed(() => visibleLimit.value < filteredResults.value.length);

const fetchPool = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${API_BASE_URL}/object_scanner/pool`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    poolData.value = res.data.data;
  } finally { loading.value = false; }
};


const getTrackStyle = (f) => {
  const range = f.max - f.min;
  const left = ((ranges.value[f.key].min - f.min) / range) * 100;
  const right = 100 - ((ranges.value[f.key].max - f.min) / range) * 100;
  return { left: `${left}%`, right: `${right}%`, background: '#7d5fff' };
};

// EXACT visual logic from your Dashboard
const starStyle = (s) => {
  const colors = { 'O': '#9bb0ff', 'B': '#aabfff', 'A': '#cad7ff', 'F': '#f8f7ff', 'G': '#fff4ea', 'K': '#ffd2a1', 'M': '#ffcc6f' };
  const c = colors[s.SpectralType?.[0]] || '#fff';
  const glow = Math.min(Math.sqrt(s.Luminosity || 1) * 5, 40);
  return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -5px -5px 10px rgba(0,0,0,0.4)` };
};

const planetStyle = (p) => {
  const c = PLANET_MAP[p.Color] || PLANET_MAP['DEFAULT'];
  const glow = Math.min(Math.sqrt(Math.abs(p.Magnitude || 1)) * 5, 30);
  return { backgroundColor: c, boxShadow: `0 0 ${glow}px ${c}, inset -5px -5px 15px rgba(0,0,0,0.4)` };
};

const moonStyle = (m) => {
  const c = MOON_MAP[m.Color] || MOON_MAP['DEFAULT'];
  return { backgroundColor: c, boxShadow: `0 0 15px ${c}66, inset -5px -5px 15px rgba(0,0,0,0.4)` };
};

const goTo = (type, id) => router.push(`/${type}/${id}`);

const resetFilters = () => {
  Object.keys(ranges.value).forEach(k => {
    const conf = [...filterConfig.Stars, ...filterConfig.Planets, ...filterConfig.Moons].find(c => c.key === k);
    if(conf) { ranges.value[k].min = conf.min; ranges.value[k].max = conf.max; }
  });
  visibleLimit.value = 20;
};

onMounted(fetchPool);
watch(activeMode, () => visibleLimit.value = 20);
</script>

<style scoped>
.scanner-page {
  min-height: 100vh;
  /* Rounded Corners */
  border-radius: 30px;
  background-color: #030010;
  overflow: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

.ambient-glow {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 80% 20%, rgba(125, 95, 255, 0.1), transparent 40%);
  pointer-events: none;
}

.scanner-wrapper {
  padding: 40px;
  position: relative;
  z-index: 1;

  /* Rounded Corners */
  border-radius: 30px;

  /* Neon Blue Border */
  border: 2px solid #c0fcfc;
  
  /* Outer glow and Inner soft blue shadow */
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3), 
              inset 0 0 10px rgba(0, 255, 255, 0.1);

  /* See-through / Glass-morphism Effect */
  background: rgba(255, 255, 255, 0.03); /* Very transparent white */
  backdrop-filter: blur(10px); /* Blurs objects behind the container */
  -webkit-backdrop-filter: blur(10px); /* Safari support */
}

/* HEADER STYLE */
.header-core { text-align: left; margin-bottom: 40px; }
.status-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.pulse-dot { width: 8px; height: 8px; background: #7d5fff; border-radius: 50%; box-shadow: 0 0 10px #7d5fff; animation: pulse 1.5s infinite; }
.status-text { font-family: monospace; font-size: 0.75rem; color: #9aa4ff; letter-spacing: 2px; }
.hero-title { color: #c0fcfc; font-size: 3rem; font-weight: 900; margin: 0; text-shadow: 0 0 15px rgba(125, 95, 255, 0.7); }
.pink-glow { color: #ff69b4; text-shadow: 0 0 20px #ff69b4; }

.scanner-info-card {
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(125, 95, 255, 0.05);
  border-left: 3px solid #ff69b4;
  border-radius: 0 10px 10px 0;
}

.info-title {
  font-family: monospace;
  font-size: 0.85rem;
  color: #ff69b4;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.info-text {
  font-size: 0.8rem;
  line-height: 1.4;
  color: #c0fcfc;
  margin: 0;
  opacity: 0.9;
}

.info-divider {
  height: 1px;
  background: linear-gradient(90deg, #7d5fff, transparent);
  margin-top: 15px;
}

.signal-wave { display: flex; align-items: flex-end; gap: 3px; height: 20px; margin-top: 15px; opacity: 0.6; }
.wave-bar { width: 4px; height: 100%; background: #ff69b4; animation: wave 1s infinite ease-in-out; }
@keyframes wave { 0%, 100% { height: 20%; } 50% { height: 100%; } }
.wave-bar:nth-child(even) { animation-delay: 0.2s; background: #7d5fff; }

/* 1. Change height from 75vh to auto or min-height */
.scanner-layout { 
  display: grid; 
  grid-template-columns: 380px 1fr; 
  gap: 40px; 
  min-height: 80vh; /* Changed from fixed 75vh */
  align-items: start; /* Ensures sidebar doesn't stretch weirdly */
}

/* 2. Remove fixed height from sidebar and let it be sticky */
.controls-sidebar { 
  background: rgba(0, 0, 30, 0.8); 
  border: 1px solid rgba(125, 95, 255, 0.2); 
  border-radius: 20px; 
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.4);
  /* overflow: hidden;  <-- REMOVE THIS */
  position: sticky;
  top: 20px; /* Keeps it in view while you scroll the grid */
  height: fit-content; 
}

/* 3. Ensure the inner container handles padding correctly */
.sidebar-inner { 
  padding: 30px; 
  display: flex; 
  flex-direction: column; 
  /* height: 100%; <-- REMOVE THIS */
}



.mode-glitch-selector { display: flex; background: rgba(0,0,0,0.4); padding: 6px; border-radius: 15px; margin-bottom: 30px; }
.mode-glitch-selector button { flex: 1; border: none; background: none; color: #9aa4ff; font-family: monospace; font-weight: bold; cursor: pointer; padding: 12px; border-radius: 10px; transition: 0.3s; }
.mode-glitch-selector button.active { background: #7d5fff; color: white; box-shadow: 0 0 15px #7d5fff; }

/* 4. Optional: If the sidebar is still too long for some screens, 
      make the filters-container scrollable internally */
.filters-container { 
  max-height: 60vh; /* Limits height of filters only */
  overflow-y: auto; 
  padding-right: 10px;
  margin-bottom: 20px; /* Adds space before the Purge button */
}

/* DUAL RANGE SLIDER */
.filter-card { background: rgba(255,255,255,0.02); padding: 20px; border-radius: 15px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.05); }
.filter-header { display: flex; justify-content: space-between; margin-bottom: 15px; font-family: monospace; font-size: 0.7rem; }
.filter-label { color: #9aa4ff; }
.filter-readout { color: #ff69b4; }

.dual-range-slider { position: relative; height: 30px; display: flex; align-items: center; }
.slider-track-bg { position: absolute; width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
.slider-track-fill { position: absolute; height: 4px; border-radius: 2px; z-index: 1; }

.range-input { position: absolute; width: 100%; appearance: none; background: none; pointer-events: none; z-index: 2; margin: 0; }
.range-input::-webkit-slider-thumb { appearance: none; pointer-events: auto; width: 16px; height: 16px; background: #fff; border-radius: 50%; cursor: pointer; box-shadow: 0 0 10px rgba(125, 95, 255, 0.8); border: none; }

.reset-scan-btn { width: 100%; padding: 12px; background: rgba(255, 89, 107, 0.1); color: #ff596b; border: 1px solid rgba(255, 89, 107, 0.4); border-radius: 10px; cursor: pointer; font-family: monospace; transition: 0.3s; }
.reset-scan-btn:hover { background: #ff596b; color: white; }

/* RESULTS VIEWPORT */
.results-viewport { display: flex; flex-direction: column; overflow: hidden; }
.viewport-header { margin-bottom: 20px; }
.match-count { font-family: monospace; font-size: 0.75rem; color: rgba(180, 160, 255, 0.8); font-weight: 600; }

.scanner-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; overflow-y: auto; padding-right: 15px; }

/* YOUR ORIGINAL CARD STYLE */
.galactic-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 30, 0.8);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(125, 95, 255, 0.3);
  transition: transform 0.25s ease;
  border: 1px solid rgba(125, 95, 255, 0.1);
}
.galactic-card:hover { transform: translateY(-5px); border-color: #ff69b4; }

.card-content { display: flex; align-items: center; }
.type-badge { position: absolute; top: 10px; right: 15px; font-size: 0.7rem; font-weight: 800; color: #9aa4ff; opacity: 0.6; }
.orb-container { margin-right: 20px; flex-shrink: 0; }
.orb { width: 60px; height: 60px; border-radius: 50%; position: relative; overflow: hidden; }
.moon-texture { position: absolute; width: 100%; height: 100%; background-image: radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.1) 5%, transparent 10%); }
.info { text-align: left; flex: 1; }
.label { font-weight: 600; font-size: 0.9rem; color: #9aa4ff; text-shadow: 0 0 8px rgba(125, 95, 255, 0.6); }

.details-link { margin-top: 12px; padding: 8px; border-radius: 10px; border: none; background: linear-gradient(135deg, #ff596b, #ff7d5f); color: #fff; font-weight: 600; cursor: pointer; width: 100%; }

.load-more-wrapper { grid-column: 1 / -1; display: flex; justify-content: center; padding: 40px 0; }
.load-more-btn { padding: 15px 40px; border-radius: 50px; border: none; font-weight: 600; background: linear-gradient(135deg, #9aa4ff, #7f7fff); color: #fff; cursor: pointer; }

@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #7d5fff; border-radius: 10px; }
</style>
<template>
  <div class="engine-details-container">
    <div class="content-section">
      <div class="cosmic-panel intro-container">
        <header class="engine-main-header">
          <h1 class="hero-title loaded">
            Sky <span class="pink-glow">Forecast</span> 🔭
          </h1>
          <p class="engine-tagline">POPPY UNIVERSE — ATMOSPHERIC TELEMETRY V1.0</p>
        </header>
        
        <div class="intro-content">
          <p class="panel-intro">
            Real-time atmospheric telemetry and orbital mechanics for your selected context.
          </p>
        </div>

        <div class="control-center">
          <p class="control-instruction">Adjust your position in space & time:</p>
          
          <div class="travel-controls">
            <div class="control-group">
              <button class="time-travel-btn" @click="openCalendar">
                🕒 {{ formatDateTime(observationTime) }}
                <span class="edit-pill">Edit</span>
              </button>
            </div>
            
            <div class="control-group">
              <button class="location-travel-btn" @click="openGPS">
                📍 {{ currentLat.toFixed(2) }}°N, {{ currentLong.toFixed(2) }}°E
                <span class="edit-pill">Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showCalendar || showLocation" class="modal-overlay" @click="closeModal">
        <transition name="pop">
          <div v-if="showCalendar || showLocation" :class="['modal-window', { 'wide-modal': showLocation }]" @click.stop>
            <button class="modal-close-btn" @click="closeModal">✕</button>
            
            <Calender_Component
              v-if="showCalendar"
              :selectedStartDate="observationTime"
              @update:selectedStartDate="updateObservationTime"
            />
            
            <Location_Component
              v-if="showLocation"
              :latitude="currentLat"
              :longitude="currentLong"
              @update:location="handleLocationUpdate"
            />
          </div>
        </transition>
      </div>
    </transition>

    <main class="content-section">
      
      <section class="cosmic-panel layer-card">
        <div class="section-header">
          <span class="layer-dot l2"></span>
          <div class="title-meta">
            <h2>Atmospheric <span class="pink-text">Telemetry</span></h2>
            <div v-if="!loading" :class="['tech-status', getRatingClass(astroData[0]?.rating)]">
              {{ astroData[0]?.rating }}
            </div>
          </div>
        </div>

        <div v-if="loading" class="centered-state">
          <div class="pulse-loader"></div>
          <p class="loading-state">Retrieving telemetry data...</p>
        </div>

        <div v-else class="astro-grid">
          <div class="guide-item">
            <h3 class="pink-text">Cloud Cover</h3>
            <p class="data-val">{{ astroData[0]?.cloudcover }}%</p>
            <p class="meta-note">{{ getCloudDesc(astroData[0]?.cloudcover) }}</p>
          </div>
          <div class="guide-item">
            <h3 class="pink-text">Transparency</h3>
            <p class="data-val">{{ astroData[0]?.transparency }}/8</p>
            <p class="meta-note">Aerosol density index.</p>
          </div>
          <div class="guide-item">
            <h3 class="pink-text">Seeing</h3>
            <p class="data-val">{{ astroData[0]?.seeing }}/8</p>
            <p class="meta-note">Air turbulence stability.</p>
          </div>
          <div class="guide-item">
            <h3 class="pink-text">Rel. Humidity</h3>
            <p class="data-val">{{ astroData[0]?.rhumid }}%</p>
            <p class="meta-note">Condensation risk factor.</p>
          </div>
        </div>
      </section>

      <section v-if="!loading" class="cosmic-panel layer-card">
        <div class="section-header">
          <span class="layer-dot l3"></span>
          <div class="title-meta">
            <h2>Lunar <span class="pink-text">Status</span> & Phase</h2>
          </div>
        </div>
        <div class="lunar-grid">
          <div class="moon-phase-graphic">
             <span class="moon-icon">🌔</span>
             <p class="moon-phase-name tech-name">Waxing Gibbous</p>
          </div>
          <div class="moon-data">
            <div class="status-row"><span>Illumination</span><span class="meta-value">92%</span></div>
            <div class="status-row"><span>Moonrise</span><span class="meta-value">11:42 AM</span></div>
            <div class="status-row"><span>Moonset</span><span class="meta-value">02:15 AM</span></div>
            <div class="status-row"><span>Altitude</span><span class="meta-value">42°</span></div>
          </div>
        </div>
      </section>

      <section v-if="!loading" class="cosmic-panel layer-card">
        <div class="section-header">
          <span class="layer-dot l1"></span>
          <div class="title-meta">
            <h2>Live <span class="pink-text">Observability</span> Targets</h2>
          </div>
        </div>
        <div class="targets-grid">
          <div v-for="planet in visiblePlanets" :key="planet.name" class="guide-item target-card">
            <div class="target-header">
              <span class="planet-icon">{{ planet.icon }}</span>
              <span class="tech-name">{{ planet.name }}</span>
            </div>
            <div class="obs-bar-container">
              <div class="obs-bar" :style="{ width: planet.chance + '%', background: planet.color }"></div>
            </div>
            <p class="meta-note">Optimal: {{ planet.time }} ({{ planet.chance }}%)</p>
          </div>
        </div>
      </section>

      <section v-if="!loading" class="cosmic-panel layer-card">
        <div class="section-header">
          <span class="layer-dot l4"></span>
          <div class="title-meta">
            <h2>Technical <span class="pink-text">Timeline</span></h2>
          </div>
        </div>
        <div class="timeline-scroll">
          <table class="tech-table">
            <thead>
              <tr>
                <th>Offset</th>
                <th>Clouds</th>
                <th>Transp.</th>
                <th>Seeing</th>
                <th>Temp</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="slot in astroData.slice(0, 12)" :key="slot.time">
                <td class="tech-name">{{ slot.time }}</td>
                <td>{{ slot.cloudcover }}%</td>
                <td>{{ slot.transparency }}/8</td>
                <td>{{ slot.seeing }}/8</td>
                <td>{{ slot.temp }}°C</td>
                <td><span :class="['tech-status', getRatingClass(slot.rating)]">{{ slot.rating }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-if="!loading" class="cosmic-panel layer-card">
        <div class="section-header">
          <span class="layer-dot l5"></span>
          <div class="title-meta">
            <h2>Dark Sky <span class="pink-text">Windows</span> Tonight</h2>
          </div>
        </div>
        <div class="troubleshoot-grid">
          <div class="guide-item">
            <h3 class="pink-text">Astronomical Twilight</h3>
            <p class="time-range">18:45 — 05:30</p>
            <p class="meta-note">Sun is 18° below horizon. Absolute darkness.</p>
          </div>
          <div class="guide-item">
            <h3 class="pink-text">Peak Window</h3>
            <p class="time-range">02:15 — 05:00</p>
            <p class="meta-note">Optimal window: Post-moonset, Pre-dawn.</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Calender_Component from '../components/Celestial_Calender.vue';
import Location_Component from '../components/Location_Component.vue';

const route = useRoute();
const router = useRouter();

const observationTime = ref(route.query.time ? new Date(route.query.time) : new Date());
const currentLat = ref(parseFloat(route.query.lat) || 51.00);
const currentLong = ref(parseFloat(route.query.long) || 4.30);
const showCalendar = ref(false);
const showLocation = ref(false);

const loading = ref(true);
const astroData = ref([]);

const visiblePlanets = ref([
  { name: 'Mars', icon: '🔴', chance: 85, color: '#ff69b4', time: '01:00 AM' },
  { name: 'Jupiter', icon: '🪐', chance: 70, color: '#00ffff', time: '10:30 PM' },
  { name: 'Saturn', icon: '✨', chance: 60, color: '#ff69b4', time: 'Sunset' },
  { name: 'Venus', icon: '🌕', chance: 90, color: '#00ffff', time: '05:00 AM' }
]);

const fetchForecast = async () => {
  try {
    loading.value = true;
    const response = await fetch(`https://www.7timer.info/bin/astro.php?lon=${currentLong.value}&lat=${currentLat.value}&ac=0&unit=metric&output=json`);
    const data = await response.json();
    astroData.value = data.dataseries.map(item => ({
      time: `+${item.timepoint}h`,
      cloudcover: (item.cloudcover * 12.5).toFixed(0),
      transparency: item.transparency,
      seeing: item.seeing,
      temp: item.temp2m,
      rhumid: (item.rh2m * 10).toFixed(0),
      rating: calculateRating(item)
    }));
  } catch (error) { console.error(error); } finally { loading.value = false; }
};

const openCalendar = () => { showCalendar.value = true; };
const openGPS = () => { showLocation.value = true; };
const closeModal = () => { showCalendar.value = false; showLocation.value = false; };

const updateObservationTime = (newDate) => { observationTime.value = newDate; closeModal(); syncAndFetch(); };
const handleLocationUpdate = (coords) => { currentLat.value = coords.lat; currentLong.value = coords.long; closeModal(); syncAndFetch(); };
const syncAndFetch = () => { router.push({ query: { time: observationTime.value.toISOString(), lat: currentLat.value, long: currentLong.value } }); };
const formatDateTime = (date) => date.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).toUpperCase();
const calculateRating = (item) => (item.cloudcover > 5 ? 'POOR' : item.transparency > 5 ? 'FAIR' : 'EXCELLENT');
const getRatingClass = (rating) => (rating === 'EXCELLENT' ? 'status-active' : rating === 'FAIR' ? 'status-ready' : 'status-error');
const getCloudDesc = (pct) => (pct < 20 ? 'Pristine' : pct < 50 ? 'Scattered' : 'Occluded');

watch(() => route.query, fetchForecast);
onMounted(fetchForecast);
</script>

<style scoped>
.engine-details-container { padding: 40px 20px; color: #e6e6fa; font-family: 'Inter', sans-serif; min-height: 100vh; }

.cosmic-panel {
    background-color: rgba(10, 0, 50, 0.85); 
    padding: 35px;
    border-radius: 10px;
    border: 1px solid #00ffff; 
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3); 
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 40px;
}

.intro-container { text-align: center; }
.hero-title { font-size: 3.5rem; font-weight: 900; color: #c0fcfc; text-shadow: 0 0 15px #00ffff; margin: 0; }
.pink-glow { color: #ff69b4; text-shadow: 0 0 15px #ff007f; }
.pink-text { color: #ff69b4; }
.engine-tagline { color: #00ffff; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }

.control-center { margin-top: 30px; display: flex; flex-direction: column; align-items: center; }
.control-instruction { font-size: 0.75rem; font-weight: 700; color: #9aa4ff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; }
.travel-controls { display: flex; gap: 15px; }

.time-travel-btn, .location-travel-btn {
  background: rgba(125, 95, 255, 0.15);
  border: 1px solid rgba(125, 95, 255, 0.5);
  color: #fff;
  padding: 10px 25px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 12px;
}
.edit-pill { font-size: 0.6rem; background: #ff69b4; color: white; padding: 2px 8px; border-radius: 10px; }
.time-travel-btn:hover { background: #7d5fff; box-shadow: 0 0 20px rgba(125, 95, 255, 0.6); }
.location-travel-btn:hover { background: #00ff88; color: #000; box-shadow: 0 0 20px rgba(0, 255, 136, 0.5); border-color: #00ff88; }

.content-section { display: flex; flex-direction: column; align-items: center; max-width: 1200px; margin: 0 auto; }
.layer-card { margin-bottom: 40px; }
.section-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; }
.title-meta { display: flex; align-items: center; gap: 20px; flex-grow: 1; }
.title-meta h2 { color: #00ffff; font-size: 1.6rem; margin: 0; }

.astro-grid, .troubleshoot-grid, .targets-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; width: 100%; margin-top: 20px; }
.guide-item { padding: 20px; border: 1px dashed rgba(0, 255, 255, 0.3); background: rgba(255,255,255,0.02); border-radius: 8px; }
.data-val { font-size: 2.5rem; font-weight: 900; color: #c0fcfc; margin: 10px 0; }
.time-range { font-size: 1.8rem; font-weight: 900; color: #00ffff; margin: 5px 0; }
.meta-note { font-size: 0.85rem; color: #a0f0ff; line-height: 1.4; }

.lunar-grid { display: flex; gap: 40px; align-items: center; }
.moon-icon { font-size: 4rem; filter: drop-shadow(0 0 10px #fff); }
.moon-data { flex-grow: 1; }
.status-row { display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 8px 0; }
.meta-value { color: #00ffff; font-weight: bold; }
.obs-bar-container { background: rgba(255,255,255,0.1); height: 8px; border-radius: 10px; margin: 10px 0; }
.obs-bar { height: 100%; border-radius: 10px; box-shadow: 0 0 10px currentColor; }

.tech-table { width: 100%; border-collapse: collapse; }
.tech-table th { text-align: left; color: #ff69b4; font-size: 0.8rem; padding: 12px; border-bottom: 2px solid rgba(0, 255, 255, 0.2); }
.tech-table td { padding: 15px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); color: #e6e6fa; }
.tech-name { font-weight: bold; color: #00ffff; }

/* MODAL SYSTEM (Fixed for Cray Cray Sizing) */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 15, 0.9); backdrop-filter: blur(10px); z-index: 10000; display: flex; justify-content: center; align-items: center; }

/* Default size for Calendar */
.modal-window { 
  background: rgba(10, 0, 50, 0.95); 
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 24px; 
  padding: 40px; 
  width: 95%; 
  max-width: 450px; /* Perfect for the Calendar */
  max-height: 85vh;
  overflow-y: auto;
  position: relative; 
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  transition: max-width 0.3s ease; /* Smooth transition when switching */
}

/* Expanded size only for Location */
.wide-modal {
  max-width: 900px; /* Gives the map/location search plenty of room */
}

.modal-close-btn { position: absolute; top: 10px; right: 10px; background: rgba(255, 59, 107, 0.2); border: 1px solid #ff3b6b; color: #ff3b6b; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 100; }

.tech-status { padding: 4px 12px; border-radius: 4px; font-weight: bold; font-size: 0.75rem; }
.status-active { background: rgba(0, 255, 0, 0.2); color: #00ff00; }
.status-ready { background: rgba(255, 255, 0, 0.2); color: #ffff00; }
.status-error { background: rgba(255, 0, 0, 0.2); color: #ff0000; }
.layer-dot { width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 10px currentColor; }
.l1 { color: #00ffff; background: #00ffff; } .l2 { color: #ff69b4; background: #ff69b4; } .l3 { color: #00ff88; background: #00ff88; } .l4 { color: #7d5fff; background: #7d5fff; } .l5 { color: #ffd32a; background: #ffd32a; }

.centered-state { display: flex; flex-direction: column; align-items: center; padding: 60px; width: 100%; }
.pulse-loader { width: 50px; height: 50px; border-radius: 50%; background: #00ffff; box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.7); animation: pulse 1.5s infinite; }
@keyframes pulse { to { box-shadow: 0 0 0 30px rgba(0, 255, 255, 0); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.pop-enter-active, .pop-leave-active { transition: all 0.3s ease-out; }
.pop-enter-from, .pop-leave-to { transform: scale(0.9); opacity: 0; }
</style>